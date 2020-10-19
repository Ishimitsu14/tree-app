<template>
  <div class="tree">
    <search :items="items" :on-search="searchBlock" />
    <div class="tree__zoom">
      <button
        class="zoom-button"
        @click="onChangeZoom(1)"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.3125 0H10.6875V18H7.3125V0Z"
            fill="#606367"
          />
          <path
            d="M18 7.3125V10.6875L0 10.6875L1.47526e-07 7.3125L18 7.3125Z"
            fill="#606367"
          />
        </svg>
      </button>
      <hr />
      <button
        class="zoom-button"
        @click="onChangeZoom(-1)"
      >
        <svg
          width="18"
          height="4"
          viewBox="0 0 18 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.3125 0.3125H10.6875V3.6875H7.3125V0.3125Z"
            fill="#606367"
          />
          <path
            d="M18 0.312501V3.6875L0 3.6875L1.47526e-07 0.3125L18 0.312501Z"
            fill="#606367"
          />
        </svg>
      </button>
    </div>
    <div class="tree__fullscreen"></div>
    <div ref="treeContainer" class="tree__container">
      <div
        ref="tree"
        :style="{ transform: transform }"
        class="tree__container__workspace"
      >
        <block
          :is-detail="isDetailView"
          :items="items"
          @onIsDetail="onIsDetail"
          @onReady="onReady"
        />
      </div>
    </div>
    <edit
      ref="edit"
      :item="currentItem"
      :flat-list="flatList"
      :leader-list="leaderList"
      @onSave="onSaveEdit"
    />
    <add
      ref="add"
      :item="currentItem"
      :flat-list="flatList"
      :leader-list="leaderList"
      @onSave="onSaveAdd"
    />
    <delete
      ref="delete"
      :item="currentItem"
      :flat-list="flatList"
      @onDelete="onSaveDelete"
    />
    <staff-list
      ref="staffList"
      :item="currentItem"
      :flat-list="flatList"
    />
    <user
      ref="user"
      :user="currentUser"
      @openProfile="onOpenUserProfile"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { eventBus } from '../eventBus';
import Block from './Block.vue';
import Actions from './Actions.vue';
import Search from './Search.vue';
import Edit from './modals/Edit.vue';
import Add from './modals/Add.vue';
import Delete from './modals/Delete.vue';
import StaffList from './modals/StaffList.vue';
import User from './modals/User.vue';

export default {
  name: 'MainTree',
  components: {
    User,
    StaffList,
    Delete,
    Add,
    Edit,
    Search,
    Block,
  },
  props: {
    tree: {
      type: [Array, Object],
      required: true,
    },
    leaderList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isMove: false,
      timer: null,
      isDetailView: true,
      zoom: {
        scale: 0.7,
        factor: 0.1,
        maxScale: 3,
        minScale: 0.2,
        point: { x: 0, y: 0 },
        target: { x: 0, y: 0 },
        pos: { x: 0, y: 0 },
      },
      translate: {
        x: 0,
        y: 0,
      },
      mouseMoveData: {
        currentPositionX: null,
        currentPositionY: null,
        width: null,
        height: null,
        scale: null,
        scaleWidth: null,
        scaleHeight: null,
        mouseX: null,
        mouseY: null,
        element: null,
      },
      transform: null,
      actionComponent: null,
      currentActionId: null,
      currentItem: null,
      flatList: [],
      currentAction: null,
      currentUser: null,
    };
  },
  computed: {
    items() {
      if (this.tree instanceof Array) {
        return this.tree;
      }
      return [this.tree];
    },
  },
  created() {
    eventBus.$on('onOpenUser', (data) => this.onUser(data));
    eventBus.$on('onOpenStaffList', (id) => this.onStaffList(id));
    eventBus.$on('onEdit', (id) => this.onEdit(id));
    eventBus.$on('onAdd', (id) => this.onAdd(id));
    eventBus.$on('onDelete', (id) => this.onDelete(id));
  },
  mounted() {
    this.setTransform();
    this.$helper.addEventListenerWheel(this.$refs.tree, this.onMouseWheel);
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('touchend', this.onMouseUp);
    this.$refs.treeContainer.addEventListener('mousedown', this.onMouseDown);
    this.$refs.treeContainer.addEventListener('touchstart', this.onMouseDown);
    this.$nextTick(() => {
      const ActionComponent = Vue.extend(Actions);
      this.actionComponent = new ActionComponent({
        propsData: {
          position: { left: 0, top: 0 },
          item: null,
        },
      });
      this.actionComponent.$mount();
      this.buildFlatList();
    });
  },
  methods: {
    buildFlatList() {
      const flatList = [];
      const generate = (items, parentId) => {
        items.forEach((item) => {
          const childrenIds = [];
          if (item.children && item.children.length > 0) {
            item.children.forEach((children) => childrenIds.push(children.id));
            generate(item.children, item.id);
          }
          flatList.push({ ...item, parentId, childrenIds });
          delete flatList[flatList.length - 1].children;
        });
      };
      generate(this.items, null);
      flatList.sort((a, b) => {
        const x = a.id; const y = b.id;
        // eslint-disable-next-line no-nested-ternary
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
      this.flatList = flatList;
    },
    generateLines(items, withClear = false) {
      const lines = this.$refs.tree.querySelectorAll('.tree-line');
      if (lines && lines.length > 0 && withClear) {
        lines.forEach((line) => {
          line.remove();
        });
      }
      items.forEach((item) => {
        if (item.children && item.children.length > 0) {
          const ids = item.children.map((child) => child.id);
          const element = document.getElementById(`item-${item.id}`);
          const elementBlock = element.querySelector('.block-container__item__component');
          const { offsetTop, offsetLeft } = elementBlock;
          const { clientHeight, clientWidth } = elementBlock;
          const childrenType = item.children[0].type;
          this.generateVerticalLine({
            offsetLeft,
            offsetTop,
            height: clientHeight,
            width: clientWidth,
            childrenType,
            isOneChild: ids.length === 1,
          }, element);
          if (item.type <= 3) {
            this.generateHorizontalLine({
              ids,
              offsetTop,
              height: clientHeight,
            }, element, item.type);
          }
          if (childrenType >= 5) {
            this.generateCurveLine({
              ids,
              offsetLeft,
              offsetTop,
              height: clientHeight,
              width: clientWidth,
            }, element, item.type);
          }
          this.generateLines(item.children);
        }
      });
    },
    generateVerticalLine({
      offsetLeft,
      offsetTop,
      width,
      height,
      isOneChild,
      childrenType,
    }, parent, isTop = false) {
      const div = document.createElement('div');
      div.classList = 'tree-line';
      div.style.background = '#A8ADB5';
      div.style.position = 'absolute';
      div.style.width = '4px';
      div.style.left = `${offsetLeft + (width / 2)}px`;
      if (isTop) {
        div.style.top = `${offsetTop - 42}px`;
      } else {
        div.style.top = `${offsetTop + (height)}px`;
      }
      if (isOneChild && childrenType < 5) {
        div.style.height = '86px';
      } else if (childrenType >= 5) {
        div.style.height = '26px';
      } else {
        div.style.height = '44px';
      }
      parent.prepend(div);
    },
    generateHorizontalLine({
      ids,
      offsetTop,
      height,
    }, parent) {
      if (ids.length > 1) {
        let element = document.getElementById(`item-${ids[0]}`);
        let elementBlock = element.querySelector('.block-container__item__component');
        const offsetsFirst = {
          top: elementBlock.offsetTop,
          left: elementBlock.offsetLeft,
        };
        const sizeFirst = this.$helper.getElementSize(elementBlock);
        element = document.getElementById(`item-${ids[ids.length - 1]}`);
        elementBlock = element.querySelector('.block-container__item__component');
        const offsetsLast = {
          top: elementBlock.offsetTop,
          left: elementBlock.offsetLeft,
        };
        const sizeLast = this.$helper.getElementSize(elementBlock);
        let divWidth = (offsetsLast.left + (sizeLast.width / 2))
          - (offsetsFirst.left + (sizeFirst.width / 2));
        const divLeft = offsetsFirst.left + (sizeFirst.width / 2);
        const div = document.createElement('div');
        if (divWidth === 0) {
          divWidth = 2;
        }
        div.classList = 'tree-line';
        div.style.background = '#A8ADB5';
        div.style.position = 'absolute';
        div.style.height = '4px';
        div.style.width = `${divWidth}px`;
        div.style.left = `${divLeft}px`;
        div.style.top = `${offsetTop + (height) + 40}px`;
        parent.prepend(div);
        ids.forEach((id) => {
          elementBlock = document
            .getElementById(`item-${id}`)
            .querySelector('.block-container__item__component');
          const size = this.$helper.getElementSize(elementBlock);
          this.generateVerticalLine({
            offsetTop: elementBlock.offsetTop,
            offsetLeft: elementBlock.offsetLeft,
            height: size.height,
            width: size.width,
            isParent: false,
          }, parent, true);
        });
      }
    },
    generateCurveLine({
      ids,
      offsetLeft,
      offsetTop,
      width,
      height,
    }, parent) {
      let element = document.getElementById(`item-${ids[0]}`);
      let elementBlock = element.querySelector('.block-container__item__component');
      const topPoint = offsetTop + height + 24;
      const centerPoint = offsetLeft + (width / 2);
      let div = document.createElement('div');
      div.classList = 'tree-line';
      div.style.background = '#A8ADB5';
      div.style.position = 'absolute';
      div.style.height = '4px';
      div.style.width = `${centerPoint - (elementBlock.offsetLeft - 26)}px`;
      div.style.left = `${elementBlock.offsetLeft - 24}px`;
      div.style.top = `${topPoint}px`;
      parent.prepend(div);
      if (ids.length > 1) {
        const lastElement = document.getElementById(`item-${ids[ids.length - 1]}`);
        const lastElementBlock = element.querySelector('.block-container__item__component');
        const header = lastElementBlock.querySelector('.card__header');
        const headerHeight = this.$helper.getElementSize(header).height;
        div = document.createElement('div');
        div.classList = 'tree-line';
        div.style.background = '#A8ADB5';
        div.style.position = 'absolute';
        div.style.height = `${(lastElement.offsetTop + headerHeight) - (topPoint + 42)}px`;
        div.style.width = '4px';
        div.style.left = `${lastElement.offsetLeft - 24}px`;
        div.style.top = `${topPoint}px`;
        lastElement.prepend(div);
      } else {
        const header = elementBlock.querySelector('.card__header');
        const headerHeight = this.$helper.getElementSize(header).height;
        div = document.createElement('div');
        div.classList = 'tree-line';
        div.style.background = '#A8ADB5';
        div.style.position = 'absolute';
        div.style.height = `${(elementBlock.offsetTop + headerHeight) - (topPoint + 42)}px`;
        div.style.width = '4px';
        div.style.left = `${element.offsetLeft - 24}px`;
        div.style.top = `${topPoint}px`;
        element.prepend(div);
      }
      ids.forEach((id) => {
        element = document.getElementById(`item-${id}`);
        elementBlock = element.querySelector('.block-container__item__component');
        const header = elementBlock.querySelector('.card__header');
        const headerHeight = this.$helper.getElementSize(header).height;
        div = document.createElement('div');
        div.classList = 'tree-line';
        div.style.background = '#A8ADB5';
        div.style.position = 'absolute';
        div.style.height = '4px';
        div.style.width = '24px';
        div.style.left = `${element.offsetLeft - 24}px`;
        div.style.top = `${elementBlock.offsetTop + (headerHeight / 2) + 1}px`;
        element.prepend(div);
        const circle = document.createElement('div');
        circle.classList = 'tree-line';
        circle.style.position = 'absolute';
        circle.style.background = '#FFF';
        circle.style.width = '16px';
        circle.style.height = '16px';
        circle.style.right = '-10px';
        circle.style.bottom = '-8px';
        circle.style.border = '2px solid #C4C4C4';
        circle.style.borderRadius = '100%';
        circle.style.zIndex = '10';
        div.prepend(circle);
      });
    },
    createListeners(withRemove = false) {
      const components = document.querySelectorAll('.block-container__item__component');
      if (withRemove) {
        components.forEach((element) => {
          element.removeEventListener('mouseenter', this.onMouseEnter);
          element.removeEventListener('mouseleave', this.onMouseLeave);
        });
      }
      components.forEach((element) => {
        element.addEventListener('mouseenter', this.onMouseEnter);
        element.addEventListener('mouseleave', this.onMouseLeave);
      });
    },
    async updateComponent() {
      await this.$nextTick();
      this.generateLines(this.items, true);
      this.buildFlatList();
      await this.$nextTick();
      this.createListeners();
      await this.$nextTick();
      this.currentActionId = null;
      this.currentItem = null;
      this.actionComponent.$el.remove();
    },
    async onIsDetail() {
      await this.$nextTick();
      this.generateLines(this.items, true);
    },
    onReady() {
      this.generateLines(this.items);
      this.createListeners();
      this.$emit('onReady');
    },
    onMouseWheel($event) {
      $event.preventDefault();
      let delta = $event.wheelDelta || $event.delta || $event.originalEvent.wheelDelta;
      if (delta === undefined) {
        // we are on firefox
        delta = $event.originalEvent.detail;
      }
      delta = Math.max(-1, Math.min(1, delta));
      this.changeZoom($event.pageX, $event.pageY, delta);
    },
    onMouseDown($event) {
      const page = {
        x: $event.type === 'mousedown' ? $event.pageX : $event.changedTouches[0].pageX,
        y: $event.type === 'mousedown' ? $event.pageY : $event.changedTouches[0].pageY,
      };
      const { classList } = $event.target;
      if (classList.contains('block-container__item')
        || classList.contains('block-container')
        || classList.contains('tree')
        || classList.contains('tree__container')
        || classList.contains('tree__container__workspace')) {
        $event.preventDefault();
        if (window.getSelection) {
          window.getSelection().removeAllRanges();
        } else { // старый IE
          document.selection.empty();
        }
        this.isMove = true;
        const target = document.querySelector('.tree__container__workspace');
        const width = target.offsetWidth;
        const height = target.offsetHeight;
        // eslint-disable-next-line radix
        let { scale } = this.zoom;
        if (scale > 1) {
          scale -= 1;
        }
        this.mouseMoveData = {
          ...this.mouseMoveData,
          ...{
            currentPositionX: this.translate.x,
            currentPositionY: this.translate.y,
            width,
            height,
            scale,
            scaleWidth: width * scale,
            scaleHeight: height * scale,
            mouseX: page.x,
            mouseY: page.y,
            element: $event.target.parentNode,
          },
        };
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('touchmove', this.onMouseMove);
      }
    },
    onMouseMove($event) {
      const {
        currentPositionX, currentPositionY, mouseX, mouseY,
      } = this.mouseMoveData;
      const page = {
        x: $event.type === 'mousemove' ? $event.pageX : $event.changedTouches[0].pageX,
        y: $event.type === 'mousemove' ? $event.pageY : $event.changedTouches[0].pageY,
      };
      const newPositionX = currentPositionX + (page.x - mouseX);
      const newPositionY = currentPositionY + (page.y - mouseY);
      this.zoom.pos = {
        x: newPositionX,
        y: newPositionY,
      };
      this.translate.x = newPositionX;
      this.translate.y = newPositionY;
      this.mouseMoveData = {
        ...this.mouseMoveData,
        ...{ newPositionY, newPositionX },
      };
      this.setTransform();
    },
    onMouseUp() {
      if (!this.isMove) {
        return;
      }
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('touchmove', this.onMouseMove);
    },
    onChangeZoom(delta) {
      const container = document.querySelector('.tree');
      const { width, height } = this.$helper.getElementSize(container);
      this.changeZoom(width / 2, height / 2, delta);
    },
    onMouseEnter(element) {
      const id = element.target.parentNode.id.split('-')[1];
      if (id) {
        this.currentActionId = id;
        this.searchById(id);
        this.setActionPosition();
        document.querySelector('.tree').appendChild(this.actionComponent.$el);
      }
    },
    onMouseLeave($event) {
      if ($event.toElement && $event.toElement.parentNode) {
        const { parentNode } = $event.toElement.parentNode;
        const { classList } = parentNode;
        if (classList.contains('block-container__item-children')
          || classList.contains('tree__container__workspace')
          || classList.length <= 0
          || (classList.contains('block-container__item')
            && !$event.target.isEqualNode(parentNode))) {
          this.currentActionId = null;
          this.currentItem = null;
          this.actionComponent.$el.remove();
        }
      }
    },
    async onEdit(id) {
      this.currentAction = 'edit';
      await this.searchById(id);
      this.$refs.edit.show();
    },
    async onAdd(id) {
      this.currentAction = 'add';
      await this.searchById(id);
      this.$refs.add.show();
    },
    async onDelete(id) {
      this.currentAction = 'delete';
      await this.searchById(id);
      this.$refs.delete.show();
    },
    async onStaffList(id) {
      this.currentAction = 'staff-list';
      await this.searchById(id);
      this.$refs.staffList.show();
    },
    async onUser(data) {
      this.currentAction = 'user';
      this.currentUser = data.user;
      this.$refs.user.show();
    },
    onOpenUserProfile(id) {
      this.$emit('onOpenUserProfile', id);
      this.currentAction = null;
      this.currentUser = null;
      this.$refs.user.hide();
    },
    async onSaveDelete(id) {
      await this.deleteElementById(id);
      await this.updateComponent();
      this.$emit('onDelete', id);
    },
    async onSaveAdd({ cardForm, sortForm }) {
      const newItem = JSON.parse(JSON.stringify(cardForm));
      await this.searchById(sortForm.parentId);
      newItem.type = this.currentItem.type < 5 ? this.currentItem.type + 1 : 5;
      newItem.id = sortForm.currentId;
      this.currentItem.children.push(newItem);
      const currentPositionNumber = this.currentItem.children
        .findIndex((children) => children.id === sortForm.currentId) + 1;
      if (currentPositionNumber !== sortForm.positionNumber) {
        this.$helper.swapArrayElements(
          this.currentItem.children,
          currentPositionNumber - 1,
          sortForm.positionNumber - 1,
        );
      }
      await this.updateComponent();
      this.$emit('onAdd', newItem.id);
    },
    async onSaveEdit({ cardForm, sortForm }) {
      this.saveCardFormEdit(cardForm);
      await this.saveSortFormEdit(sortForm);
      await this.updateComponent();
      this.$emit('onEdit', sortForm.currentId);
    },
    async saveSortFormEdit(sortForm) {
      let newItem = null;
      let currentPositionNumber = null;
      let isChangedPosition = false;
      const flatItem = this.flatList.find((item) => item.id === sortForm.currentId);
      this.flatList.forEach((item) => {
        if (item.childrenIds.includes(this.currentItem.id)) {
          currentPositionNumber = item.childrenIds
            .findIndex(((value) => value === this.currentItem.id)) + 1;
        }
      });
      if (sortForm.parentId !== flatItem.parentId) {
        newItem = JSON.parse(JSON.stringify(this.currentItem));
        await this.deleteElementById(sortForm.currentId);
        await this.searchById(sortForm.parentId);
        newItem.type = this.currentItem.type + 1;
        this.currentItem.children.push(newItem);
      }
      if (sortForm.positionNumber !== currentPositionNumber) {
        isChangedPosition = true;
        await this.searchById(sortForm.parentId);
        currentPositionNumber = this.currentItem.children
          .findIndex((children) => children.id === sortForm.currentId) + 1;
        if (currentPositionNumber !== sortForm.positionNumber) {
          this.$helper.swapArrayElements(
            this.currentItem.children,
            currentPositionNumber - 1,
            sortForm.positionNumber - 1,
          );
        }
      }
      if (sortForm.parentId !== flatItem.parentId || isChangedPosition) {
        await this.updateComponent();
      }
    },
    saveCardFormEdit(cardForm) {
      if (cardForm.position) {
        this.$set(this.currentItem, 'position', cardForm.position);
      }
      if (cardForm.name) {
        this.$set(this.currentItem, 'name', cardForm.name);
      }
      if (cardForm.number) {
        this.$set(this.currentItem, 'number', cardForm.number);
      }
      if (cardForm.description) {
        this.$set(this.currentItem, 'description', cardForm.description);
      }
    },
    changeZoom(pageX, pageY, delta) {
      const target = document.querySelector('.tree__container');
      const { scale } = this.zoom;
      if (scale <= this.zoom.maxScale && scale >= this.zoom.minScale) {
        this.zoom.point = {
          x: pageX - (target.offsetLeft),
          y: pageY - (target.offsetTop),
        };
        const fixedScale = parseFloat(scale.toFixed(1));
        if ((delta > 0 && fixedScale < this.zoom.maxScale)
          || (delta < 0 && fixedScale > this.zoom.minScale)) {
          this.zoom.target = {
            x: (this.zoom.point.x - this.zoom.pos.x) / scale,
            y: (this.zoom.point.y - this.zoom.pos.y) / scale,
          };
          this.zoom.scale += delta * this.zoom.factor * this.zoom.scale;
          this.zoom.scale = Math.max(this.zoom.minScale, Math.min(
            this.zoom.maxScale,
            this.zoom.scale,
          ));
          this.zoom.pos.x = -this.zoom.target.x * this.zoom.scale + this.zoom.point.x;
          this.zoom.pos.y = -this.zoom.target.y * this.zoom.scale + this.zoom.point.y;
          this.translate = {
            x: this.zoom.pos.x,
            y: this.zoom.pos.y,
          };
          this.setTransform();
          this.setActionPosition();
        }
      }
    },
    setTransform() {
      const { scale } = this.zoom;
      const { x, y } = this.translate;
      this.transform = `translate(${x}px, ${y}px) scale(${scale}, ${scale})`;
    },
    searchBlock(id) {
      const container = document.querySelector('.tree');
      const element = document.getElementById(`item-${id}`)
        .querySelector('.block-container__item__component');
      if (container && element) {
        const containerSize = this.$helper.getElementSize(container);
        const elementSize = element.getBoundingClientRect();
        const elementPosition = {
          left: element.offsetLeft * this.zoom.scale,
          top: element.offsetTop * this.zoom.scale,
        };
        this.translate.x = (containerSize.width / 2) - elementPosition.left
          - (elementSize.width / 2);
        this.zoom.pos.x = this.translate.x;
        this.translate.y = (containerSize.height / 2) - elementPosition.top
          - (elementSize.height / 2);
        this.zoom.pos.y = this.translate.y;
        this.setTransform();
        this.$emit('onSearch', id);
        return true;
      }
      this.$emit('onSearch', false);
      return false;
    },
    async setActionPosition() {
      await this.$nextTick();
      if (this.actionComponent && this.currentActionId) {
        const element = document.getElementById(`item-${this.currentActionId}`)
          .querySelector('.block-container__item__component');
        const actions = document.querySelector('.controls');
        if (element) {
          const elementRect = element.getBoundingClientRect();
          const position = {
            left: (elementRect.left - document.body.scrollLeft)
              + (element.offsetWidth * this.zoom.scale - actions.offsetWidth) + 15,
            top: (elementRect.top - document.body.scrollTop) - 15,
          };
          this.actionComponent.$el.style.left = `${position.left}px`;
          this.actionComponent.$el.style.top = `${position.top}px`;
          this.actionComponent.$el.id = `currentId-${this.currentActionId}`;
        }
      }
    },
    searchById(id) {
      return new Promise((resolve) => {
        const deepSearch = (array, value) => array.some((el) => {
          if (el.id === value) {
            this.currentItem = el;
            resolve(el);
            return el;
          }
          if (el.children && el.children.length > 0) {
            return deepSearch(el.children, value);
          }
          return false;
        });
        deepSearch(this.items, id);
      });
    },
    deleteElementById(id) {
      return new Promise((resolve) => {
        const deepSearch = (array, value) => array.some((el) => {
          if (el.children && el.children.length > 0) {
            let isFind = false;
            el.children.forEach((children) => {
              if (children.id === value) {
                this.$helper.remove(el.children, children);
                isFind = true;
                resolve(true);
              }
            });
            if (!isFind) {
              return deepSearch(el.children, value);
            }
          }
          return false;
        });
        deepSearch(this.items, id);
      });
    },
  },
  watch: {
    // eslint-disable-next-line func-names
    'zoom.scale': function (value) {
      this.isDetailView = value > 0.4;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');
.tree {
  background: #F5F5F7;
  height: 100%;
  max-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  &__zoom {
    z-index: 99;
    position: absolute;
    left: 20px;
    top: 90px;
    display: flex;
    flex-direction: column;
    border-radius: 2px;
    border: 1px solid #E3E6E9;
    background: white;
    padding: 11px 11px;

    hr {
      width: 100%;
      height: 1px;
      background: #E3E6E9;
      border: none;
    }

    .zoom-button {
      outline: none;
      border: none;
      box-shadow: none;
      background: transparent;
      padding: 0;
      &:hover {
        cursor: pointer;
      }
    }
  }

  &__container {
    flex-grow: 1;
    overflow: hidden;

    &__workspace {
      white-space: nowrap;
      font-family: 'Open Sans', sans-serif;
      font-size: 12px;
      display: inline-block;
      transform-origin: 0 0;
    }
  }
}
</style>

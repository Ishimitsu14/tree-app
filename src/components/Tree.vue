<template>
  <div class="tree">
    <div class="tree__container">
      <div
        ref="tree"
        :style="{ transform: transform }"
        class="tree__container__workspace"
      >
        <block :items="items" @onReady="onReady"/>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import $ from 'jquery';
import Block from './Block.vue';

export default {
  name: 'Tree',
  components: { Block },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      timer: null,
      zoom: {
        scale: 0.5,
        factor: 0.1,
        maxScale: 3,
      },
      transform: 'translate(0px, 0px) scale(0.5, 0.5)',
    };
  },
  mounted() {
    this.$helper.addEventListenerWheel(this.$refs.tree, this.onMouseWheel);
  },
  methods: {
    onReady() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.generateLines(this.items);
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.$emit('onReady');
      }, 300);
    },
    generateLines(items) {
      items.forEach((item) => {
        if (item.children && item.children.length > 0) {
          const ids = item.children.map((child) => child.id);
          const element = document.getElementById(`item-${item.id}`);
          const elementBlock = element.querySelector('.block-container__item__component');
          const { offsetTop, offsetLeft } = elementBlock;
          const { clientHeight, clientWidth } = elementBlock;
          const childrenType = item.children[0].type;
          if (item.type <= 4) {
            this.generateVerticalLine({
              offsetLeft,
              offsetTop,
              height: clientHeight,
              width: clientWidth,
              type: item.type,
              childrenType,
            }, element);
          }
          if (item.type <= 3) {
            this.generateHorizontalLine({
              ids,
              offsetTop,
              height: clientHeight,
            }, element, item.type);
          }
          if (childrenType >= 5) {
            this.generateСurveLine({
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
      type,
      childrenType,
    }, parent, isTop = false) {
      const div = document.createElement('div');
      div.style.background = '#A8ADB5';
      div.style.position = 'absolute';
      div.style.width = '2px';
      div.style.left = `${offsetLeft + (width / 2)}px`;
      if (isTop) {
        div.style.top = `${offsetTop - 42}px`;
      } else {
        div.style.top = `${offsetTop + (height)}px`;
      }
      if (type === 1) {
        div.style.height = '84px';
      } else if (childrenType >= 5) {
        div.style.height = '24px';
      } else {
        div.style.height = '42px';
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
        div.style.background = '#A8ADB5';
        div.style.position = 'absolute';
        div.style.height = '2px';
        div.style.width = `${divWidth}px`;
        div.style.left = `${divLeft}px`;
        div.style.top = `${offsetTop + (height) + 42}px`;
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
    generateСurveLine({
      ids,
      offsetLeft,
      offsetTop,
      width,
      height,
    }, parent) {
      let element = document.getElementById(`item-${ids[0]}`);
      let elementBlock = element.querySelector('.block-container__item__component');
      if (ids[0] === 51) {
        console.log(elementBlock.offsetLeft);
      }
      const topPoint = offsetTop + height + 24;
      const centerPoint = offsetLeft + (width / 2);
      let div = document.createElement('div');
      div.style.background = '#A8ADB5';
      div.style.position = 'absolute';
      div.style.height = '2px';
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
        div.style.background = '#A8ADB5';
        div.style.position = 'absolute';
        div.style.height = `${(lastElement.offsetTop + headerHeight) - (topPoint + 42)}px`;
        div.style.width = '2px';
        div.style.left = `${lastElement.offsetLeft - 24}px`;
        div.style.top = `${topPoint}px`;
        lastElement.prepend(div);
      } else {
        const header = elementBlock.querySelector('.card__header');
        const headerHeight = this.$helper.getElementSize(header).height;
        div = document.createElement('div');
        div.style.background = '#A8ADB5';
        div.style.position = 'absolute';
        div.style.height = `${(elementBlock.offsetTop + headerHeight) - (topPoint + 42)}px`;
        div.style.width = '2px';
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
        div.style.background = '#A8ADB5';
        div.style.position = 'absolute';
        div.style.height = '2px';
        div.style.width = '24px';
        div.style.left = `${element.offsetLeft - 24}px`;
        div.style.top = `${elementBlock.offsetTop + (headerHeight / 2) + 1}px`;
        element.prepend(div);
        const circle = document.createElement('div');
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
    onMouseWheel($event) {
      const { scale } = this.zoom;
      if (scale <= 3 && scale >= 0.5) {
        $event.preventDefault();
        let delta = $event.wheelDelta || $event.delta || $event.originalEvent.wheelDelta;
        if (delta === undefined) {
          // we are on firefox
          delta = $event.originalEvent.detail;
        }
        const fixedScale = parseFloat(scale.toFixed(1));
        if ((delta > 0 && fixedScale < 3) || (delta < 0 && fixedScale > 0.5)) {
          if (delta > 0) {
            this.zoom.scale += this.zoom.factor;
          } else {
            this.zoom.scale -= this.zoom.factor;
          }
          this.zoom.scale = Math.max(0.5, Math.min(
            this.zoom.maxScale,
            this.zoom.scale,
          ));
          this.setTransform();
        }
      }
    },
    setTransform() {
      const { scale } = this.zoom;
      this.transform = `translate(0, 0) scale(${scale}, ${scale})`;
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

    &__container {
      flex-grow: 1;
      overflow: auto;

      &__workspace {
        width: 100%;
        height: 100%;
        white-space: nowrap;
        font-family: 'Open Sans', sans-serif;
        font-size: 12px;
        display: inline-block;
        transform-origin: 0 0;
        transition: all 0.7s ease-out 0s
      }
    }
  }
</style>

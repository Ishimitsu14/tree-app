<template>
  <div
    v-if="items && items.length > 0"
    class="block-container"
    :class="`block-container--type-${type}`"
    :style="!isChildren ? 'position: relative' : ''"
  >
    <div
      v-for="item in items"
      :key="item.id"
      :id="`item-${item.id}`"
      class="block-container__item"
      ref="item"
    >
      <component
        :is="`Type${item.type}`"
        :item="item"
        :class="!isDetail ? 'hide-info' : ''"
      />
      <div
        v-if="item.children && item.children.length > 0"
        class="block-container__item-children"
      >
        <block :is-detail="isDetail" :items="item.children" :is-children="true" />
      </div>
    </div>
  </div>
</template>

<script>
import Type1 from './cards/Type1.vue';
import Type2 from './cards/Type2.vue';
import Type3 from './cards/Type3.vue';
import Type4 from './cards/Type4.vue';
import Type5 from './cards/Type5.vue';
import Actions from './Actions.vue';

export default {
  name: 'Block',
  components: {
    Type1, Type2, Type3, Type4, Type5, Actions,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    isChildren: {
      type: Boolean,
      default() {
        return false;
      },
    },
    isDetail: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      ids: [],
    };
  },
  computed: {
    type() {
      if (this.items.length > 0 && this.items[0].type) {
        return this.items[0].type;
      }
      return null;
    },
  },
  mounted() {
    this.$emit('onReady');
    this.setHeight();
  },
  methods: {
    clearHeight() {
      this.$refs.item.forEach((item) => {
        const element = item.querySelector('.block-container__item__component');
        element.style.height = '';
        element.querySelector('.card').style.height = '';
      });
    },
    setHeight() {
      let maxHeight = 0;
      this.$refs.item.forEach((item) => {
        const element = item.querySelector('.block-container__item__component');
        const { height } = this.$helper.getElementSize(element);
        if (maxHeight < height) {
          maxHeight = height;
        }
      });
      this.$refs.item.forEach((item) => {
        const element = item.querySelector('.block-container__item__component');
        element.style.height = `${maxHeight}px`;
        element.querySelector('.card').style.height = '100%';
      });
    },
  },
  watch: {
    isDetail() {
      this.$nextTick(() => {
        this.clearHeight();
        this.setHeight();
        this.$emit('onIsDetail');
      });
    },
  },
};
</script>

<style scoped lang="scss">
.block-container {
  display: flex;
  justify-content: center;

  &--type-5 {
    flex-direction: column;

    .block-container__item {
      margin: 0;
    }
  }

  &__item {
    display: inline-block;
    vertical-align: top;
    text-align: center;
    margin: 0 20px;

    &__component {
      font-family: 'PT Sans', sans-serif;
      background: white;
      border: 1px solid #DFE1E5;
      border-radius: 8px;
      min-width: 300px;
      display: inline-block;
      min-height: 80px;
      margin-bottom: 80px;
      position: relative;
    }
  }
}
</style>

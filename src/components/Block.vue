<template>
  <div
    v-if="items && items.length > 0"
    class="block-container"
    :class="`block-container--type-${type}`"
  >
    <div
      v-for="item in items"
      :key="item.id"
      :id="`item-${item.id}`"
      class="block-container__item"
      ref="item"
    >
      <component :is="`Type${item.type}`" :item="item" />
<!--      <div-->
<!--        :class="`block-container__item__component&#45;&#45;type-${item.type}`"-->
<!--      >-->
<!--        <div class="card">-->
<!--          <div-->
<!--            :style="`background: ${item.color}`"-->
<!--            class="card__header"-->
<!--          >-->
<!--            <span-->
<!--              v-if="item.number"-->
<!--              class="number"-->
<!--            >-->
<!--                {{ item.number }}-->
<!--              </span>-->
<!--            <span class="position">{{ item.position }}</span>-->
<!--          </div>-->
<!--          <div class="card__body">-->
<!--            <div class="card__body__avatar">-->
<!--              <img src="../assets/avatar.png" />-->
<!--            </div>-->
<!--            <div class="card__body__info">-->
<!--              <span class="name">{{ item.name }}</span>-->
<!--              <span-->
<!--                v-if="item.second_position"-->
<!--                class="second_position"-->
<!--              >-->
<!--                {{ item.second_position }}-->
<!--              </span>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div-->
<!--            v-if="item.description"-->
<!--            class="card__footer"-->
<!--          >-->
<!--            <div class="title">-->
<!--              ЦКП-->
<!--            </div>-->
<!--            <div v-if="item.description" class="description">-->
<!--              <p>{{ item.description }}</p>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
      <div
        v-if="item.children && item.children.length > 0"
        class="block-container__item-children"
      >
        <block :items="item.children" />
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

export default {
  name: 'Block',
  components: {
    Type1, Type2, Type3, Type4, Type5,
  },
  props: {
    items: {
      type: Array,
      required: true,
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
      });
    },
  },
};
</script>

<style lang="scss">
  .tree__container__workspace > .block-container {
    position: relative;
  }
  .block-container {
    display: flex;

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
        overflow: hidden;
        position: relative;
      }
    }
  }
</style>

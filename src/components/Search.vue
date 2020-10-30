<template>
  <form class="tree-search" @submit.prevent="Search">
    <div class="tree-search__input-group">
      <custom-select
        label="Поиск департамента или секции"
        key-label="position"
        :list="items"
        @input="onSelected"
        :value="searchValue"
      />
    </div>
  </form>
</template>

<script>
import CustomSelect from './ui/CustomSelect.vue';

export default {
  name: 'Search',
  components: { CustomSelect },
  props: {
    items: {
      type: Array,
      required: true,
    },
    onSearch: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      searchValue: {},
    };
  },
  methods: {
    onSelected(item) {
      this.searchValue = item;
      this.onSearch(item.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.tree-search {
  z-index: 99;
  position: absolute;
  top: 20px;
  left: 0;
  display: block;
  width: calc(100% - 40px);
  height: 50px;
  background: white;
  border: 1px solid #E3E6E9;
  border-radius: 2px;
  margin: 0 20px;

  &__input-group {
    display: flex;
    flex-wrap: nowrap;
    align-items: stretch;
    width: 100%;
    height: 100%;

    &-prepend {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px 14px;
    }

    &-input {
      font-family: 'PT Sans',sans-serif;
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      box-shadow: none;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
    }
  }
}
</style>

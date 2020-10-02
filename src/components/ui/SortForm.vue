<template>
  <form class="form-sort">
    <div class="form-sort__group">
      <custom-select
        label="Вышестоящее подразделение"
        :list="parentList"
        v-model="form.parentId"
      />
    </div>
    <div class="form-sort__group">
      <custom-input
        label="Сортировочный номер"
        type="number"
        :range-value="rangeValue"
        v-model="form.positionNumber"
      />
    </div>
  </form>
</template>

<script>
import CustomInput from './CustomInput.vue';
import CustomSelect from './CustomSelect.vue';

export default {
  name: 'SortForm',
  components: { CustomSelect, CustomInput },
  props: {
    form: {
      type: Object,
      required: true,
    },
    flatList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      rangeValue: { min: null, max: null },
    };
  },
  computed: {
    parentList() {
      const deepChildren = [this.form.currentId];
      this.flatList.forEach((item) => {
        if (deepChildren.includes(item.parentId)) {
          deepChildren.push(item.id);
        }
      });
      return this.flatList.filter((item) => !deepChildren.includes(item.id) && item.type !== 5)
        .map((item) => ({ value: item.id, label: item.position }));
    },
  },
  watch: {
    // eslint-disable-next-line func-names
    'form.parentId': function () {
      this.setRangeValue();
    },
  },
  mounted() {
    this.setRangeValue();
  },
  methods: {
    async setRangeValue() {
      await this.$nextTick();
      const positions = {
        min: 1,
        max: null,
      };
      this.flatList.forEach((item) => {
        if (item.id === this.form.parentId) {
          positions.max = item.childrenIds.length;
        }
      });
      if (this.form.positionNumber > positions.max) {
        this.form.positionNumber = Number(positions.max);
      }
      if (this.form.positionNumber < positions.min) {
        this.form.positionNumber = Number(positions.min);
      }
      this.rangeValue = positions;
    },
  },
};
</script>

<style lang="scss" scoped>
.form-sort {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__group {
    display: flex;
    width: 100%;
    margin-bottom: 20px;

    & > .input-group {
      &:not(:last-child) {
        margin-right: 20px;
      }
    }
  }
}
</style>

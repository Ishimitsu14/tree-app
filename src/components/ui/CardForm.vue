<template>
  <form class="form-card">
    <div class="form-card__group">
      <custom-input
        label="Название подразделения"
        v-model="form.position"
        :class="checkFormField(form.number) ? 'form-card__big-input' : ''"
      />
      <custom-input
        label="Номер"
        v-model="form.number"
        class="form-card__small-input"
      />
    </div>
    <div class="form-card__group">
      <custom-select
        label="Руководитель"
        :list="leaderList"
        v-model="form.name"
        key-label="label"
        key-value="label"
      />
    </div>
    <div
      v-if="checkFormField(form.description)"
      class="form-card__group"
    >
      <custom-textarea
        label="ЦКП"
        v-model="form.description"
      />
    </div>
  </form>
</template>

<script>
import CustomInput from './CustomInput.vue';
import CustomSelect from './CustomSelect.vue';
import CustomTextarea from './CustomTextarea.vue';

export default {
  name: 'CardForm',
  components: { CustomTextarea, CustomSelect, CustomInput },
  props: {
    form: {
      type: Object,
      required: true,
    },
    leaderList: {
      type: Array,
      required: true,
    },
  },
  created() {
    if (!this.form.number) {
      this.form.number = '';
    }
  },
  methods: {
    checkFormField(value) {
      return value || value === '';
    },
  },
};
</script>

<style lang="scss" scoped>
.form-card {
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

  &__small-input {
    width: 30%;
  }

  &__big-input {
    width: 80%;
  }
}
</style>

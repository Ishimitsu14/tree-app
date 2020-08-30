<template>
  <div class="input-group">
    <input
      :value="value"
      :class="!isEmpty ? 'not-empty' : ''"
      :type="type"
      :required="required"
      @input="handleInput"
    />
    <label>{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'CustomInput',
  props: {
    value: {
      type: [Number, String],
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default() {
        return 'text';
      },
    },
    rangeValue: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      isEmpty: true,
    };
  },
  watch: {
    value: {
      handler(value) {
        this.isEmpty = !value;
      },
      immediate: true,
    },
  },
  methods: {
    // eslint-disable-next-line consistent-return
    handleInput(e) {
      if (this.type === 'number' && this.rangeValue) {
        if (e.target.value < this.rangeValue.min || e.target.value > this.rangeValue.max) {
          e.target.value = this.value;
        }
      }
      this.$emit('input', e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
  .input-group {
    display: flex;
    align-items: flex-end;
    padding: 0 14px;
    position: relative;
    width: 100%;
    height: 56px;
    background: #F5F5F5;
    border: 1px solid #D7DBDF;
    border-radius: 4px;

    input {
      width: 100%;
      padding-bottom: 6px;
      border: none;
      outline: none;
      box-shadow: none;
      background: transparent;
      font-family: PT Sans, sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 135%;
      z-index: 99;

      &:focus ~ label, &.not-empty ~ label {
        left: 16px;
        top: 0;
        font-size: 14px;
        line-height: 200%;
      }
    }

    label {
      position: absolute;
      display: flex;
      align-items: center;
      left: 16px;
      top: 15px;
      font-family: PT Sans, sans-serif;
      font-size: 18px;
      line-height: 135%;
      color: #90979E;
      transition: ease all .3s;
    }
  }
</style>

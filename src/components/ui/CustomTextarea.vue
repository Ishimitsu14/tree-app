<template>
  <div
    class="input-group"
    :class="isFocus ? 'input-group--is-focus' : ''"
  >
    <textarea
      :class="!isEmpty ? 'not-empty' : ''"
      :required="required"
      :value="value"
      @focus="isFocus = true"
      @blur="isFocus = false"
      @input="handleInput"
    />
    <label>{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'CustomTextarea',
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
  },
  data() {
    return {
      isEmpty: true,
      isFocus: false,
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
    handleInput(e) {
      this.$emit('input', e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
  .input-group {
    display: flex;
    align-items: flex-start;
    padding: 25px 14px 0;
    position: relative;
    width: 100%;
    height: 140px;
    background: #F5F5F5;
    border: 1px solid #D7DBDF;
    border-radius: 4px;

    &--is-focus {
      background: white;
    }

    textarea {
      width: 100%;
      height: 100%;
      resize: none;
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

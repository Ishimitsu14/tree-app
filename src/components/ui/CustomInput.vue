<template>
  <div
    class="input-group"
    :class="isFocus ? 'input-group--is-focus' : ''"
  >
    <input
      :value="value"
      :class="!isEmpty ? 'not-empty' : ''"
      :type="type"
      :required="required"
      @focus="isFocus = true"
      @blur="isFocus = false"
      @input="handleInput"
    />
    <label>{{ label }}</label>
    <div v-if="type === 'number'" class="arrow">
      <div
        class="arrow__top"
        @click="changeValue('up')"
      >
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNSIgdmlld0JveD0iMCAwIDEwIDUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMCA1TDUgMEwwIDVIMTBaIiBmaWxsPSIjMUExQTFBIi8+Cjwvc3ZnPgo=" />
      </div>
      <div
        class="arrow__down"
        @click="changeValue('down')"
      >
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNSIgdmlld0JveD0iMCAwIDEwIDUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMCAwTDUgNUwwIDBIMTBaIiBmaWxsPSIjMUExQTFBIi8+Cjwvc3ZnPgo=" />
      </div>
    </div>
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
    changeValue(type) {
      const event = { target: { value: this.value } };
      if (type === 'up') {
        event.target.value += 1;
      } else {
        event.target.value -= 1;
      }
      this.handleInput(event);
    },
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
    transition: all ease-in-out .3s;

    &--is-focus {
      background: white;
    }

    .arrow {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &__top {
        display: flex;
        height: 100%;
        align-items: center;
        width: 13px;

        &:hover {
          background: #a5a5a5;
        }

        img {
          width: 100%;
        }
      }

      &__down {
        display: flex;
        height: 100%;
        align-items: center;
        width: 13px;

        &:hover {
          background: #a5a5a5;
        }

        img {
          width: 100%;
        }
      }
    }

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
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        /* display: none; <- Crashes Chrome on hover */
        -webkit-appearance: none;
        margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
      }
      &[type=number] {
        -moz-appearance:textfield; /* Firefox */
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

<template>
  <div
    class="input-group"
    :class="isFocus ? 'input-group--is-focus' : ''"
  >
    <input
      ref="input"
      :class="!isEmpty ? 'not-empty' : ''"
      :required="required"
      v-model="inputValue"
      @focus="isFocus = true"
      @blur="isFocus = false"
      @input="handleInput"
    />
    <label>{{ label }}</label>
    <ul
      v-if="matchedItems.length > 0 && isShowList"
      ref="list"
      class="list"
    >
      <li
        v-for="(item, index) in matchedItems"
        :key="index"
        @click="setValue(item)"
      >
        {{ item[keyLabel] }}
      </li>
    </ul>
  </div>
</template>

<script>
import _ from 'underscore';
import helper from '../../helper';

export default {
  name: 'CustomSelect',
  props: {
    value: {
      type: [Number, String, Object],
      required: true,
    },
    list: {
      type: Array,
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
    keyLabel: {
      type: String,
      default() {
        return 'label';
      },
    },
    isUseObject: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isEmpty: true,
      isShowList: false,
      isFocus: false,
      matchedItems: [],
      selectedValue: '',
      inputValue: '',
    };
  },
  computed: {
    selectedLabel() {
      const item = this.list
        .find((value) => JSON.stringify(value) === JSON.stringify(this.selectedValue));
      if (item) {
        return item[this.keyLabel];
      }
      return '';
    },
  },
  mounted() {
    this.matchedItems = this.list;
    if (this.value && this.value !== '') {
      this.selectedValue = this.value;
      this.isEmpty = false;
      this.inputValue = this.selectedLabel;
    }
  },
  watch: {
    value(value) {
      this.isEmpty = !value;
    },
    isShowList(value) {
      if (value) {
        document.addEventListener('click', this.onClick);
      } else {
        document.removeEventListener('click', this.onClick);
      }
    },
  },
  methods: {
    onClick($event) {
      if (this.$refs.list && this.$refs.input
        && !this.$refs.list.contains($event.target)
        && !this.$refs.input.contains($event.target)
        && this.isShowList) {
        this.isShowList = false;
      }
    },
    handleInput(e) {
      this.isShowList = true;
      if (e.target.value !== '') {
        // eslint-disable-next-line consistent-return
        this.matchedItems = _.filter(this.list, (item) => {
          if (helper.startsWith(item[this.keyLabel], e.target.value)) {
            return item;
          }
        });
      } else {
        this.matchedItems = this.list;
      }
    },
    setValue(value) {
      this.isShowList = false;
      this.selectedValue = value;
      this.inputValue = this.selectedLabel;
      this.$emit('input', value);
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

    &--is-focus {
      background: white;
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

    .list {
      z-index: 999;
      position: absolute;
      top: 100%;
      left: 0;
      margin: 0;
      width: 100%;
      height: 168px;
      overflow: auto;
      padding: 0;
      list-style: none;
      animation: display-transition 0.3s ease-in-out;

      li {
        display: flex;
        align-items: center;
        font-family: PT Sans, sans-serif;
        font-size: 18px;
        height: 56px;
        padding-left: 16px;
        cursor: pointer;
        background: #F5F5F5;

        &:hover {
          color: white;
          background: #a0a0a0;
        }
      }
    }
  }

  @keyframes display-transition {
    from { opacity: 0 }
    to { opacity: 1 }
  }
</style>

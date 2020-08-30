<template>
  <div class="input-group">
    <input
      ref="input"
      :class="!isEmpty ? 'not-empty' : ''"
      :required="required"
      :value="selectedLabel"
      readonly="readonly"
      @click="showList"
    />
    <label>{{ label }}</label>
    <ul v-show="isShowList" ref="list" class="list">
      <li
        v-for="(item, index) in list"
        :key="index"
        @click="setValue(item[keyValue])"
      >
        {{ item[keyLabel] }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CustomSelect',
  props: {
    value: {
      type: [Number, String],
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
    keyValue: {
      type: String,
      default() {
        return 'value';
      },
    },
    keyLabel: {
      type: String,
      default() {
        return 'label';
      },
    },
  },
  data() {
    return {
      isEmpty: true,
      isShowList: false,
      selectedValue: '',
    };
  },
  computed: {
    selectedLabel() {
      const item = this.list.find((value) => value[this.keyValue] === this.selectedValue);
      if (item) {
        return item[this.keyLabel];
      }
      return '';
    },
  },
  mounted() {
    if (this.value && this.value !== '') {
      this.selectedValue = this.value;
      this.isEmpty = false;
    }
  },
  watch: {
    value(value) {
      this.isEmpty = !value;
    },
  },
  methods: {
    showList() {
      this.isShowList = true;
      document.addEventListener('click', this.onClick);
    },
    setValue(value) {
      this.selectedValue = value;
      this.isShowList = false;
      this.$emit('input', value);
      document.removeEventListener('click', this.onClick);
    },
    onClick($event) {
      if (!this.$refs.list.contains($event.target)
        && !this.$refs.input.contains($event.target)
        && this.isShowList) {
        this.isShowList = false;
        document.removeEventListener('click', this.onClick);
      }
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
      cursor: pointer;

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
      left: 0;
      top: -1px;
      margin: 0;
      width: 50%;
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

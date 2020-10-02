<template>
  <button @click="$emit('click')">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    text: {
      type: [String, Number],
      required: true,
    },
    type: {
      type: String,
      default: 'submit',
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  font-family: PT Sans, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  padding: 13px 16px;
  margin-right: 16px;
  cursor: pointer;
}
</style>

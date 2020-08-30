<template>
  <div
    class="controls"
  >
    <button
      v-tooltip="'Редактировать подразделение'"
      @click="onActionControl('onEdit')"
    >
      <img src="../assets/img/edit.svg">
    </button>
    <button
      v-tooltip="'Создать подразделение'"
      @click="onActionControl('onAdd')"
    >
      <img src="../assets/img/add.svg">
    </button>
    <button
      v-tooltip="'Удалить подразделение'"
      @click="onActionControl('onDelete')"
    >
      <img src="../assets/img/delete.svg">
    </button>
  </div>
</template>

<script>
import { eventBus } from '../main';

export default {
  name: 'Actions',
  methods: {
    onActionControl(method) {
      const { id } = document.querySelector('.controls');
      if (id && id.split('-')[1]) {
        eventBus.$emit(method, Number(id.split('-')[1]));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;

  button {
    cursor: pointer;
    z-index: 98;
    background: none;
    outline: none;
    border: none;
    box-shadow: none;
    padding: 0;
    margin: 0 5px;

    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>

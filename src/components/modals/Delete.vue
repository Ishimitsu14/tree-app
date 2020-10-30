<template>
  <modal
    :name="name"
    height="330px"
    width="500px"
  >
    <img class="close-modal" @click="hide" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggb3BhY2l0eT0iMC43IiBkPSJNMTMuMzUwNiAxMC45OTlMMjAuNTE3MyAzLjg0OTAxQzIwLjgzMTEgMy41MzUxNyAyMS4wMDc0IDMuMTA5NTEgMjEuMDA3NCAyLjY2NTY3QzIxLjAwNzQgMi4yMjE4NCAyMC44MzExIDEuNzk2MTggMjAuNTE3MyAxLjQ4MjM0QzIwLjIwMzQgMS4xNjg1IDE5Ljc3NzggMC45OTIxODcgMTkuMzM0IDAuOTkyMTg4QzE4Ljg5MDEgMC45OTIxODggMTguNDY0NSAxLjE2ODUgMTguMTUwNiAxLjQ4MjM0TDExLjAwMDYgOC42NDkwMUwzLjg1MDYyIDEuNDgyMzRDMy41MzY3OCAxLjE2ODUgMy4xMTExMiAwLjk5MjE4NyAyLjY2NzI4IDAuOTkyMTg4QzIuMjIzNDUgMC45OTIxODggMS43OTc3OSAxLjE2ODUgMS40ODM5NSAxLjQ4MjM0QzEuMTcwMTEgMS43OTYxOCAwLjk5Mzc5NiAyLjIyMTg0IDAuOTkzNzk2IDIuNjY1NjdDMC45OTM3OTYgMy4xMDk1MSAxLjE3MDExIDMuNTM1MTcgMS40ODM5NSAzLjg0OTAxTDguNjUwNjIgMTAuOTk5TDEuNDgzOTUgMTguMTQ5QzEuMzI3NzMgMTguMzAzOSAxLjIwMzc0IDE4LjQ4ODMgMS4xMTkxMyAxOC42OTE0QzEuMDM0NTIgMTguODk0NSAwLjk5MDk1MiAxOS4xMTIzIDAuOTkwOTUyIDE5LjMzMjNDMC45OTA5NTIgMTkuNTUyNCAxLjAzNDUyIDE5Ljc3MDIgMS4xMTkxMyAxOS45NzMzQzEuMjAzNzQgMjAuMTc2NCAxLjMyNzczIDIwLjM2MDcgMS40ODM5NSAyMC41MTU3QzEuNjM4ODkgMjAuNjcxOSAxLjgyMzIyIDIwLjc5NTkgMi4wMjYzMiAyMC44ODA1QzIuMjI5NDIgMjAuOTY1MSAyLjQ0NzI2IDIxLjAwODcgMi42NjcyOCAyMS4wMDg3QzIuODg3MyAyMS4wMDg3IDMuMTA1MTQgMjAuOTY1MSAzLjMwODI0IDIwLjg4MDVDMy41MTEzNCAyMC43OTU5IDMuNjk1NjggMjAuNjcxOSAzLjg1MDYyIDIwLjUxNTdMMTEuMDAwNiAxMy4zNDlMMTguMTUwNiAyMC41MTU3QzE4LjMwNTYgMjAuNjcxOSAxOC40ODk5IDIwLjc5NTkgMTguNjkzIDIwLjg4MDVDMTguODk2MSAyMC45NjUxIDE5LjExMzkgMjEuMDA4NyAxOS4zMzQgMjEuMDA4N0MxOS41NTQgMjEuMDA4NyAxOS43NzE4IDIwLjk2NTEgMTkuOTc0OSAyMC44ODA1QzIwLjE3OCAyMC43OTU5IDIwLjM2MjMgMjAuNjcxOSAyMC41MTczIDIwLjUxNTdDMjAuNjczNSAyMC4zNjA3IDIwLjc5NzUgMjAuMTc2NCAyMC44ODIxIDE5Ljk3MzNDMjAuOTY2NyAxOS43NzAyIDIxLjAxMDMgMTkuNTUyNCAyMS4wMTAzIDE5LjMzMjNDMjEuMDEwMyAxOS4xMTIzIDIwLjk2NjcgMTguODk0NSAyMC44ODIxIDE4LjY5MTRDMjAuNzk3NSAxOC40ODgzIDIwLjY3MzUgMTguMzAzOSAyMC41MTczIDE4LjE0OUwxMy4zNTA2IDEwLjk5OVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=" />
    <div v-if="flatList && item" class="modal">
      <div class="modal__header">
        Удалить подразделение?
      </div>
      <div class="modal__body">
        <p>
          Подразделение будет удалено без возможности восстановления
        </p>
        <div v-if="isNotEmpty" class="modal__info">
          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiAyNEMxOC42Mjc0IDI0IDI0IDE4LjYyNzQgMjQgMTJDMjQgNS4zNzI1OCAxOC42Mjc0IDAgMTIgMEM1LjM3MjU4IDAgMCA1LjM3MjU4IDAgMTJDMCAxOC42Mjc0IDUuMzcyNTggMjQgMTIgMjRaTTEwLjg4MDggMTQuMzcxNUgxMy4xMDk5TDEzLjQyNTcgNUgxMC41NjVMMTAuODgwOCAxNC4zNzE1Wk0xMy4wODIgMTYuMjM4NEMxMi44MDk2IDE1Ljk3MjEgMTIuNDQ3NCAxNS44MzkgMTEuOTk1NCAxNS44MzlDMTEuNTQ5NSAxNS44MzkgMTEuMTg3MyAxNS45NzUyIDEwLjkwODcgMTYuMjQ3N0MxMC42MzYyIDE2LjUxMzkgMTAuNSAxNi44NTE0IDEwLjUgMTcuMjYwMUMxMC41IDE3LjY2ODcgMTAuNjM2MiAxOC4wMDYyIDEwLjkwODcgMTguMjcyNEMxMS4xODczIDE4LjUzODcgMTEuNTQ5NSAxOC42NzE4IDExLjk5NTQgMTguNjcxOEMxMi40NDc0IDE4LjY3MTggMTIuODA5NiAxOC41Mzg3IDEzLjA4MiAxOC4yNzI0QzEzLjM2MDcgMTguMDA2MiAxMy41IDE3LjY2ODcgMTMuNSAxNy4yNjAxQzEzLjUgMTYuODQ1MiAxMy4zNjA3IDE2LjUwNDYgMTMuMDgyIDE2LjIzODRaIiBmaWxsPSIjRUQ2MjVFIi8+Cjwvc3ZnPgo=" />
          Подразделение невозможно удалить, так как в нем есть
          сотрудники или дочернии подразделения
        </div>
      </div>
      <div class="modal__footer">
        <custom-button
          text="Отмена"
          @click="hide"
          class="modal__cancel-button"
        />
        <custom-button
          text="Да, удалить"
          class="modal__delete-button"
          :disabled="isNotEmpty"
          @click="onDelete"
        />
      </div>
    </div>
  </modal>
</template>

<script>

import CustomButton from '../ui/CustomButton.vue';

export default {
  name: 'Delete',
  components: { CustomButton },
  props: {
    item: {
      type: [Object, null],
      default: null,
    },
    flatList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      name: 'delete-item',
    };
  },
  computed: {
    isNotEmpty() {
      const item = this.flatList.find((i) => i.id === this.item.id);
      if (item && item.childrenIds) {
        return item.childrenIds.length > 0 || (this.item.staff && this.item.staff.length > 0);
      }
      return null;
    },
  },
  methods: {
    show() {
      this.$modal.show(this.name);
    },
    hide() {
      this.$modal.hide(this.name);
    },
    onDelete() {
      this.$emit('onDelete', this.item.id);
      this.hide();
    },
  },
};
</script>

<style lang="scss" scoped>
.close-modal {
  cursor: pointer;
  position: absolute;
  right: -35px;
  top: 10px;
}

.modal {
  overflow: auto;
  height: auto;
  background: white;

  &__header {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-family: PT Sans, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 21px;
    line-height: 27px;
    color: #000000;
    padding: 20px;
    margin-bottom: 4px;
  }
  &__body {
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    margin-bottom: 20px;
    text-align: left;

    p {
      margin: 0 0 16px;
    }
  }
  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 20px;
    background: #F1F5F4;

    button {
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &__cancel-button {
    color: #A8ADB5;
    border: 1px solid #D5DAEB;
    border-radius: 4px;
    padding: 13px 16px;
    margin-right: 16px;
    background: transparent;
    transition: all ease-in-out .3s;
    &:hover {
      color: white;
      background: #c8cbc8;
    }
  }
  &__delete-button {
    color: #FFFFFF;
    border: 1px solid #ED625E;
    background: #ED625E;
    border-radius: 4px;
    padding: 13px 16px;
    margin-right: 16px;
    &:hover {
      background: #ca534f;
    }
  }

  &__info {
    display: flex;
    align-items: center;
    padding: 15px;
    border: 1px solid #D7DBDF;
    border-radius: 4px;
    font-family: PT Sans, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 21px;
    color: #1C1B20;

    img {
      margin-right: 15px;
    }
  }
}
</style>

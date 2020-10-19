<template>
  <modal
    :name="name"
    height="330px"
    width="500px"
  >
    <img class="close-modal" :src="require('../../assets/img/close.svg').default" @click="hide" />
    <div v-if="flatList && item" class="modal">
      <div class="modal__header">
        Удалить подразделение?
      </div>
      <div class="modal__body">
        <p>
          Подразделение будет удалено без возможности восстановления
        </p>
        <div v-if="isNotEmpty" class="modal__info">
          <img :src="require('../../assets/img/alert.svg').default" />
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
      const { childrenIds } = this.flatList.find((item) => item.id === this.item.id);
      return childrenIds.length > 0 || (this.item.staff && this.item.staff.length > 0);
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

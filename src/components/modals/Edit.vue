<template>
  <modal
    :name="name"
    height="80%"
  >
    <div v-if="cardForm && sortForm" class="modal">
      <div class="modal__header">
        Редактировать подразделение
      </div>
      <div class="modal__body">
        <card-form
          :form="cardForm"
          :leader-list="leaderList"
        />
        <sort-form
          :form="sortForm"
          :flat-list="flatList"
        />
      </div>
      <div class="modal__footer">
        <button class="modal__cancel-button">
          Отмена
        </button>
        <button
          class="modal__success-button"
          @click="onSave"
        >
          Сохранить
        </button>
      </div>
    </div>
  </modal>
</template>

<script>

import CardForm from '../ui/CardForm.vue';
import SortForm from '../ui/SortForm.vue';

export default {
  name: 'Edit',
  components: { SortForm, CardForm },
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
      name: 'edit-item',
      cardForm: null,
      sortForm: null,
      value: '',
    };
  },
  computed: {
    leaderList() {
      return this.flatList.map((item) => ({ value: item.name, label: item.name }));
    },
  },
  methods: {
    show() {
      this.$modal.show(this.name);
    },
    hide() {
      this.$modal.hide(this.name);
    },
    onSave() {
      this.$emit('onSave', { cardForm: this.cardForm, sortForm: this.sortForm });
      this.hide();
    },
  },
  watch: {
    item: {
      handler() {
        this.cardForm = JSON.parse(JSON.stringify(this.item));
        if (this.item && this.item.id) {
          const flatItem = this.flatList.find((item) => item.id === this.item.id);
          let positionNumber = null;
          this.flatList.forEach((item) => {
            if (item.childrenIds.includes(this.item.id)) {
              positionNumber = item.childrenIds.findIndex(((value) => value === this.item.id)) + 1;
            }
          });
          this.sortForm = {
            currentId: this.item.id,
            parentId: flatItem && flatItem.parentId ? flatItem.parentId : null,
            positionNumber,
          };
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  overflow: auto;
  height: 100%;

  &__header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-family: PT Sans, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 21px;
    line-height: 27px;
    color: #000000;
    border-bottom: 1px solid #E3E6E9;
    padding: 20px;
    margin-bottom: 20px;
  }
  &__body {
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    margin-bottom: 20px;
  }
  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 20px;
    background: #E4ECEA;
  }
  &__cancel-button {
    font-family: PT Sans, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 23px;
    color: #A8ADB5;
    border: 1px solid #D5DAEB;
    border-radius: 4px;
    padding: 13px;
    margin-right: 16px;
  }
  &__success-button {
    font-family: PT Sans, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 23px;
    color: #FFFFFF;
    border: 1px solid #37C29A;
    background: #37C29A;
    border-radius: 4px;
    padding: 13px;
    margin-right: 16px;
  }
}
</style>

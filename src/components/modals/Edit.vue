<template>
  <modal
    :name="name"
    height="663px"
  >
    <img class="close-modal" src="../../assets/img/close.svg" @click="hide" />
    <div v-if="cardForm && sortForm" class="modal">
      <div class="modal__header">
        Редактировать подразделение
      </div>
      <div class="modal__body">
        <card-form
          :form="cardForm"
          :leader-list="leaderList"
        />
        <custom-collapse
          title="Положение на схеме"
          description="Вышестоящее подразделение и сортировочный номер"
        >
          <sort-form
            :form="sortForm"
            :flat-list="flatList"
          />
        </custom-collapse>
      </div>
      <div class="modal__footer">
        <custom-button
          text="Отмена"
          class="modal__cancel-button"
          @click="hide"
        />
        <custom-button
          text="Сохранить"
          class="modal__success-button"
          @click="onSave"
        />
      </div>
    </div>
  </modal>
</template>

<script>

import CardForm from '../ui/CardForm.vue';
import SortForm from '../ui/SortForm.vue';
import CustomCollapse from '../ui/CustomCollapse.vue';
import CustomButton from '../ui/CustomButton.vue';

export default {
  name: 'Edit',
  components: {
    CustomButton, CustomCollapse, SortForm, CardForm,
  },
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
  &__success-button {
    color: #FFFFFF;
    border: 1px solid #37C29A;
    background: #37C29A;
    border-radius: 4px;
    padding: 13px 16px;
    margin-right: 16px;
    transition: all ease-in-out .3s;
    &:hover {
      background: #2da080;
    }
  }
}
</style>

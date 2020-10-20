<template>
  <modal
    :name="name"
    height="663px"
  >
    <img class="close-modal" @click="hide" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggb3BhY2l0eT0iMC43IiBkPSJNMTMuMzUwNiAxMC45OTlMMjAuNTE3MyAzLjg0OTAxQzIwLjgzMTEgMy41MzUxNyAyMS4wMDc0IDMuMTA5NTEgMjEuMDA3NCAyLjY2NTY3QzIxLjAwNzQgMi4yMjE4NCAyMC44MzExIDEuNzk2MTggMjAuNTE3MyAxLjQ4MjM0QzIwLjIwMzQgMS4xNjg1IDE5Ljc3NzggMC45OTIxODcgMTkuMzM0IDAuOTkyMTg4QzE4Ljg5MDEgMC45OTIxODggMTguNDY0NSAxLjE2ODUgMTguMTUwNiAxLjQ4MjM0TDExLjAwMDYgOC42NDkwMUwzLjg1MDYyIDEuNDgyMzRDMy41MzY3OCAxLjE2ODUgMy4xMTExMiAwLjk5MjE4NyAyLjY2NzI4IDAuOTkyMTg4QzIuMjIzNDUgMC45OTIxODggMS43OTc3OSAxLjE2ODUgMS40ODM5NSAxLjQ4MjM0QzEuMTcwMTEgMS43OTYxOCAwLjk5Mzc5NiAyLjIyMTg0IDAuOTkzNzk2IDIuNjY1NjdDMC45OTM3OTYgMy4xMDk1MSAxLjE3MDExIDMuNTM1MTcgMS40ODM5NSAzLjg0OTAxTDguNjUwNjIgMTAuOTk5TDEuNDgzOTUgMTguMTQ5QzEuMzI3NzMgMTguMzAzOSAxLjIwMzc0IDE4LjQ4ODMgMS4xMTkxMyAxOC42OTE0QzEuMDM0NTIgMTguODk0NSAwLjk5MDk1MiAxOS4xMTIzIDAuOTkwOTUyIDE5LjMzMjNDMC45OTA5NTIgMTkuNTUyNCAxLjAzNDUyIDE5Ljc3MDIgMS4xMTkxMyAxOS45NzMzQzEuMjAzNzQgMjAuMTc2NCAxLjMyNzczIDIwLjM2MDcgMS40ODM5NSAyMC41MTU3QzEuNjM4ODkgMjAuNjcxOSAxLjgyMzIyIDIwLjc5NTkgMi4wMjYzMiAyMC44ODA1QzIuMjI5NDIgMjAuOTY1MSAyLjQ0NzI2IDIxLjAwODcgMi42NjcyOCAyMS4wMDg3QzIuODg3MyAyMS4wMDg3IDMuMTA1MTQgMjAuOTY1MSAzLjMwODI0IDIwLjg4MDVDMy41MTEzNCAyMC43OTU5IDMuNjk1NjggMjAuNjcxOSAzLjg1MDYyIDIwLjUxNTdMMTEuMDAwNiAxMy4zNDlMMTguMTUwNiAyMC41MTU3QzE4LjMwNTYgMjAuNjcxOSAxOC40ODk5IDIwLjc5NTkgMTguNjkzIDIwLjg4MDVDMTguODk2MSAyMC45NjUxIDE5LjExMzkgMjEuMDA4NyAxOS4zMzQgMjEuMDA4N0MxOS41NTQgMjEuMDA4NyAxOS43NzE4IDIwLjk2NTEgMTkuOTc0OSAyMC44ODA1QzIwLjE3OCAyMC43OTU5IDIwLjM2MjMgMjAuNjcxOSAyMC41MTczIDIwLjUxNTdDMjAuNjczNSAyMC4zNjA3IDIwLjc5NzUgMjAuMTc2NCAyMC44ODIxIDE5Ljk3MzNDMjAuOTY2NyAxOS43NzAyIDIxLjAxMDMgMTkuNTUyNCAyMS4wMTAzIDE5LjMzMjNDMjEuMDEwMyAxOS4xMTIzIDIwLjk2NjcgMTguODk0NSAyMC44ODIxIDE4LjY5MTRDMjAuNzk3NSAxOC40ODgzIDIwLjY3MzUgMTguMzAzOSAyMC41MTczIDE4LjE0OUwxMy4zNTA2IDEwLjk5OVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=" />
    <div v-if="cardForm && sortForm && leaderList" class="modal">
      <div class="modal__header">
        Создать подразделение
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
import CustomButton from '../ui/CustomButton.vue';
import CustomCollapse from '../ui/CustomCollapse.vue';

export default {
  name: 'Add',
  components: {
    CustomCollapse, CustomButton, SortForm, CardForm,
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
    leaderList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      name: 'add-item',
      cardForm: null,
      sortForm: null,
      value: '',
    };
  },
  watch: {
    item: {
      handler() {
        if (this.item && this.item.id) {
          this.cardForm = {
            name: '',
            position: '',
            color: '#E8C567',
            number: '',
            description: '',
            type: null,
            children: [],
          };
          this.sortForm = {
            currentId: this.flatList[this.flatList.length - 1].id + 10,
            parentId: this.item.id,
            positionNumber: '',
          };
        }
      },
      immediate: true,
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

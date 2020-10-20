<template>
  <modal
    :name="name"
    height="663px"
  >
    <img class="close-modal" @click="hide" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggb3BhY2l0eT0iMC43IiBkPSJNMTMuMzUwNiAxMC45OTlMMjAuNTE3MyAzLjg0OTAxQzIwLjgzMTEgMy41MzUxNyAyMS4wMDc0IDMuMTA5NTEgMjEuMDA3NCAyLjY2NTY3QzIxLjAwNzQgMi4yMjE4NCAyMC44MzExIDEuNzk2MTggMjAuNTE3MyAxLjQ4MjM0QzIwLjIwMzQgMS4xNjg1IDE5Ljc3NzggMC45OTIxODcgMTkuMzM0IDAuOTkyMTg4QzE4Ljg5MDEgMC45OTIxODggMTguNDY0NSAxLjE2ODUgMTguMTUwNiAxLjQ4MjM0TDExLjAwMDYgOC42NDkwMUwzLjg1MDYyIDEuNDgyMzRDMy41MzY3OCAxLjE2ODUgMy4xMTExMiAwLjk5MjE4NyAyLjY2NzI4IDAuOTkyMTg4QzIuMjIzNDUgMC45OTIxODggMS43OTc3OSAxLjE2ODUgMS40ODM5NSAxLjQ4MjM0QzEuMTcwMTEgMS43OTYxOCAwLjk5Mzc5NiAyLjIyMTg0IDAuOTkzNzk2IDIuNjY1NjdDMC45OTM3OTYgMy4xMDk1MSAxLjE3MDExIDMuNTM1MTcgMS40ODM5NSAzLjg0OTAxTDguNjUwNjIgMTAuOTk5TDEuNDgzOTUgMTguMTQ5QzEuMzI3NzMgMTguMzAzOSAxLjIwMzc0IDE4LjQ4ODMgMS4xMTkxMyAxOC42OTE0QzEuMDM0NTIgMTguODk0NSAwLjk5MDk1MiAxOS4xMTIzIDAuOTkwOTUyIDE5LjMzMjNDMC45OTA5NTIgMTkuNTUyNCAxLjAzNDUyIDE5Ljc3MDIgMS4xMTkxMyAxOS45NzMzQzEuMjAzNzQgMjAuMTc2NCAxLjMyNzczIDIwLjM2MDcgMS40ODM5NSAyMC41MTU3QzEuNjM4ODkgMjAuNjcxOSAxLjgyMzIyIDIwLjc5NTkgMi4wMjYzMiAyMC44ODA1QzIuMjI5NDIgMjAuOTY1MSAyLjQ0NzI2IDIxLjAwODcgMi42NjcyOCAyMS4wMDg3QzIuODg3MyAyMS4wMDg3IDMuMTA1MTQgMjAuOTY1MSAzLjMwODI0IDIwLjg4MDVDMy41MTEzNCAyMC43OTU5IDMuNjk1NjggMjAuNjcxOSAzLjg1MDYyIDIwLjUxNTdMMTEuMDAwNiAxMy4zNDlMMTguMTUwNiAyMC41MTU3QzE4LjMwNTYgMjAuNjcxOSAxOC40ODk5IDIwLjc5NTkgMTguNjkzIDIwLjg4MDVDMTguODk2MSAyMC45NjUxIDE5LjExMzkgMjEuMDA4NyAxOS4zMzQgMjEuMDA4N0MxOS41NTQgMjEuMDA4NyAxOS43NzE4IDIwLjk2NTEgMTkuOTc0OSAyMC44ODA1QzIwLjE3OCAyMC43OTU5IDIwLjM2MjMgMjAuNjcxOSAyMC41MTczIDIwLjUxNTdDMjAuNjczNSAyMC4zNjA3IDIwLjc5NzUgMjAuMTc2NCAyMC44ODIxIDE5Ljk3MzNDMjAuOTY2NyAxOS43NzAyIDIxLjAxMDMgMTkuNTUyNCAyMS4wMTAzIDE5LjMzMjNDMjEuMDEwMyAxOS4xMTIzIDIwLjk2NjcgMTguODk0NSAyMC44ODIxIDE4LjY5MTRDMjAuNzk3NSAxOC40ODgzIDIwLjY3MzUgMTguMzAzOSAyMC41MTczIDE4LjE0OUwxMy4zNTA2IDEwLjk5OVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=" />
    <div v-if="flatList && item" class="modal">
      <div class="modal__header">
        Сотрудники
      </div>
      <div class="modal__body">
        <div class="modal__search">
          <div class="modal__search-group">
            <div class="modal__search-group-prepend">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xNS4yNTgzIDE0LjA3NUwxMi40MjUgMTEuMjVDMTMuMzM5MiAxMC4wODU0IDEzLjgzNTIgOC42NDcyMSAxMy44MzMzIDcuMTY2NjdDMTMuODMzMyA1Ljg0ODEzIDEzLjQ0MjMgNC41NTkyIDEyLjcwOTggMy40NjI4N0MxMS45NzczIDIuMzY2NTQgMTAuOTM2MSAxLjUxMjA2IDkuNzE3ODkgMS4wMDc0N0M4LjQ5OTcyIDAuNTAyODg5IDcuMTU5MjcgMC4zNzA4NjYgNS44NjYwNyAwLjYyODEwMUM0LjU3Mjg2IDAuODg1MzM2IDMuMzg0OTcgMS41MjAyNyAyLjQ1MjYyIDIuNDUyNjJDMS41MjAyNyAzLjM4NDk3IDAuODg1MzM2IDQuNTcyODYgMC42MjgxMDEgNS44NjYwN0MwLjM3MDg2NiA3LjE1OTI3IDAuNTAyODg5IDguNDk5NzIgMS4wMDc0NyA5LjcxNzg5QzEuNTEyMDYgMTAuOTM2MSAyLjM2NjU0IDExLjk3NzMgMy40NjI4NyAxMi43MDk4QzQuNTU5MiAxMy40NDIzIDUuODQ4MTMgMTMuODMzMyA3LjE2NjY3IDEzLjgzMzNDOC42NDcyMSAxMy44MzUyIDEwLjA4NTQgMTMuMzM5MiAxMS4yNSAxMi40MjVMMTQuMDc1IDE1LjI1ODNDMTQuMTUyNSAxNS4zMzY0IDE0LjI0NDYgMTUuMzk4NCAxNC4zNDYyIDE1LjQ0MDdDMTQuNDQ3NyAxNS40ODMxIDE0LjU1NjcgMTUuNTA0OCAxNC42NjY3IDE1LjUwNDhDMTQuNzc2NyAxNS41MDQ4IDE0Ljg4NTYgMTUuNDgzMSAxNC45ODcxIDE1LjQ0MDdDMTUuMDg4NyAxNS4zOTg0IDE1LjE4MDkgMTUuMzM2NCAxNS4yNTgzIDE1LjI1ODNDMTUuMzM2NCAxNS4xODA5IDE1LjM5ODQgMTUuMDg4NyAxNS40NDA3IDE0Ljk4NzFDMTUuNDgzMSAxNC44ODU2IDE1LjUwNDggMTQuNzc2NyAxNS41MDQ4IDE0LjY2NjdDMTUuNTA0OCAxNC41NTY3IDE1LjQ4MzEgMTQuNDQ3NyAxNS40NDA3IDE0LjM0NjJDMTUuMzk4NCAxNC4yNDQ2IDE1LjMzNjQgMTQuMTUyNSAxNS4yNTgzIDE0LjA3NVpNMi4xNjY2NyA3LjE2NjY3QzIuMTY2NjcgNi4xNzc3NiAyLjQ1OTkxIDUuMjExMDYgMy4wMDkzMiA0LjM4ODgyQzMuNTU4NzMgMy41NjY1NyA0LjMzOTYyIDIuOTI1NzEgNS4yNTMyNSAyLjU0NzI3QzYuMTY2ODggMi4xNjg4MyA3LjE3MjIyIDIuMDY5ODIgOC4xNDIxMiAyLjI2Mjc0QzkuMTEyMDMgMi40NTU2NyAxMC4wMDI5IDIuOTMxODcgMTAuNzAyMiAzLjYzMTE0QzExLjQwMTUgNC4zMzA0IDExLjg3NzcgNS4yMjEzMSAxMi4wNzA2IDYuMTkxMjJDMTIuMjYzNSA3LjE2MTEyIDEyLjE2NDUgOC4xNjY0NiAxMS43ODYxIDkuMDgwMDlDMTEuNDA3NiA5Ljk5MzcyIDEwLjc2NjggMTAuNzc0NiA5Ljk0NDUyIDExLjMyNEM5LjEyMjI3IDExLjg3MzQgOC4xNTU1OCAxMi4xNjY3IDcuMTY2NjcgMTIuMTY2N0M1Ljg0MDU5IDEyLjE2NjcgNC41Njg4MiAxMS42Mzk5IDMuNjMxMTQgMTAuNzAyMkMyLjY5MzQ1IDkuNzY0NTIgMi4xNjY2NyA4LjQ5Mjc1IDIuMTY2NjcgNy4xNjY2N1oiIGZpbGw9IiNBRUFFQUUiLz4KPC9zdmc+" />
            </div>
            <input
              type="text"
              class="modal__search-group-input"
              placeholder="Поиск по ФИО"
              v-model="searchValue"
              @input="onInputSearch"
            />
          </div>
        </div>
        <div class="modal__staff-table">
          <div class="modal__staff-table__header">
            <div>ФИО Сотрудника</div>
            <div>Телефон</div>
          </div>
          <div class="modal__staff-table__body">
            <div
              v-for="user in matchedItems"
              :key="user.id"
              class="modal__staff-table__item"
            >
              <div
                class="modal__staff-table__item-name"
                @click="onOpenUser(user)"
              >
                <img :src="user.src" />
                <span>{{ user.name }}</span>
              </div>
              <div class="modal__staff-table__item-phone">
                <a :href="`tel:${user.phone}`">{{ user.phone }}</a>
              </div>
            </div>
            <div v-if="matchedItems.length <= 0" class="modal__staff-table__empty-body">
              Ни одного сотрудника не найдено
            </div>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import _ from 'underscore';

export default {
  name: 'StaffList',
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
      name: 'staff-list',
      searchValue: null,
      matchedItems: [],
      value: '',
    };
  },
  methods: {
    onInputSearch(e) {
      if (e.target.value !== '') {
        // eslint-disable-next-line consistent-return
        this.matchedItems = _.filter(this.item.staff, (item) => {
          if (item.name.toLowerCase().includes(e.target.value.toLowerCase())) {
            return item;
          }
        });
      } else {
        this.matchedItems = this.item.staff;
      }
    },
    show() {
      this.$modal.show(this.name);
    },
    hide() {
      this.$modal.hide(this.name);
    },
    onOpenUser(user) {
      this.$parent.onUser({ user });
      this.hide();
    },
  },
  watch: {
    item: {
      handler(item) {
        if (item && item.staff) {
          this.matchedItems = this.item.staff;
        }
      },
      deep: true,
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
  max-height: 100%;
  height: 100%;
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
  }
  &__body {
    display: flex;
    flex-direction: column;
    background: #F5F5F5;
    height: calc(100% - 68px);
  }

  &__search {
    position: relative;
    display: block;
    width: calc(100% - 40px);
    height: 40px;
    background: white;
    border: 1px solid #E3E6E9;
    border-radius: 2px;
    margin: 20px;

    &-group {
      display: flex;
      flex-wrap: nowrap;
      align-items: stretch;
      width: 100%;
      height: 100%;

      &-prepend {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px 14px;
      }

      &-input {
        font-family: 'PT Sans',sans-serif;
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        box-shadow: none;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
      }
    }
  }

  &__staff-table {
    display: flex;
    flex-direction: column;
    background: white;
    height: 100%;

    &__header {
      display: flex;
      height: 42px;

      div {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0 20px;
        font-family: PT Sans, sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 13px;
        line-height: 17px;
        text-transform: uppercase;
        color: #A8ADB5;

        &:not(:last-child) {
          border-right: 1px solid #E3E6E9;
        }
        border-bottom: 1px solid #E3E6E9;

        &:first-child {
          width: 60%;
        }
        &:last-child {
          width: 40%;
        }
      }
    }

    &__body {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: auto;
    }

    &__item {
      display: flex;

      & > div {
        display: flex;
        align-items: center;
        height: 64px;
        width: 50%;
        padding: 0 20px;
        &:not(:last-child) {
          border-right: 1px solid #E3E6E9;
        }
        border-bottom: 1px solid #E3E6E9;
        &:first-child {
          width: 60%;
        }
        &:last-child {
          width: 40%;
        }
      }

      &-name {
        font-family: PT Sans, sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        color: #3268AD;
        cursor: pointer;
        img {
          width: 32px;
          height: 32px;
          border-radius: 100%;
          overflow: hidden;
          margin-right: 10px;
        }

        &:hover {
          background: #F5F5F7;
        }
      }

      &-phone {
        a {
          font-family: PT Sans, sans-serif;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 21px;
          color: #3268AD;
          text-decoration: none;
        }

        &:hover {
          background: #F5F5F7;
        }
      }
    }

    &__empty-body {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      font-family: PT Sans, sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 21px;
      color: #61676F;
      text-align: center;
    }
  }
}
</style>

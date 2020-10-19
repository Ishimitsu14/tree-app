<template>
  <modal
    :name="name"
    height="663px"
  >
    <img class="close-modal" :src="require('../../assets/img/close.svg').default" @click="hide" />
    <div v-if="flatList && item" class="modal">
      <div class="modal__header">
        Сотрудники
      </div>
      <div class="modal__body">
        <div class="modal__search">
          <div class="modal__search-group">
            <div class="modal__search-group-prepend">
              <img :src="require('../../assets/img/search.svg').default" />
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
                <img :src="require(`../../assets/img/${user.src}`)" />
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

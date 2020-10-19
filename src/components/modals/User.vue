<template>
  <modal
    :name="name"
    height="456px"
  >
    <img class="close-modal" :src="require('../../assets/img/close.svg').default" @click="hide" />
    <div v-if="user" class="modal">
      <div class="modal__header" :style="style">
        <span>{{ user.name }}</span>
      </div>
      <div class="modal__body">
        <ul>
          <li>
            <span class="label">Телефон</span>
            <span class="value">{{ user.phone }}</span>
          </li>
          <li
            v-for="(addition, index) in user.additional"
            :key="index"
          >
            <span class="label">{{ addition.label }}</span>
            <span class="value">{{ addition.value }}</span>
          </li>
        </ul>
      </div>
      <div class="modal__footer">
        <custom-button
          text="Отмена"
          class="modal__cancel-button"
          @click="hide"
        />
        <custom-button
          text="Открыть профиль"
          class="modal__success-button"
          @click="onOpenProfile"
        />
      </div>
    </div>
  </modal>
</template>

<script>

import CustomButton from '../ui/CustomButton.vue';

export default {
  name: 'User',
  components: { CustomButton },
  props: {
    user: {
      type: [Object, null],
      default: null,
    },
  },
  data() {
    return {
      name: 'user',
      style: {},
    };
  },
  methods: {
    show() {
      this.$modal.show(this.name);
    },
    hide() {
      this.$modal.hide(this.name);
    },
    onOpenProfile() {
      this.$emit('openProfile', this.user.id);
    },
  },
  watch: {
    user: {
      handler(user) {
        if (user) {
          // eslint-disable-next-line global-require,import/no-dynamic-require
          const avatar = user.src;
          const gradient = `linear-gradient(
                  90deg,
                  rgb(24, 51, 44) 0%,
                  rgb(24, 51, 44) 70%,
                  rgba(13, 29, 25, 0.2) 100%
              ), url(${avatar}) no-repeat right`.replace(/\r?\n/g, '');
          this.style = { background: gradient, backgroundSize: 'contain' };
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
  height: auto;
  background: white;

  &__header {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 185px;
    width: 100%;
    background: rgb(13, 29, 25);

    &-background {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
    }

    span {
      position: absolute;
      left: 20px;
      top: 20px;
      font-family: PT Sans, sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      color: white;
    }

    img {
      width: auto;
      height: 100%;
    }
  }
  &__body {
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
    padding: 20px;

    ul {
      display: flex;
      flex-direction: column;
      list-style: none;
      margin: unset;
      padding: unset;

      li {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 10px;

        .label {
          font-family: PT Sans, sans-serif;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          text-align: left;
          color: #A8ADB5;
          width: 20%;
          text-overflow: ellipsis;
          margin-right: 15px;
        }

        .value {
          font-family: PT Sans, sans-serif;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          color: black;
        }
      }
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

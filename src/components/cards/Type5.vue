<template>
  <div
    class="block-container__item__component"
    @mouseenter="$emit('onMouseEnter', $event)"
    @mouseleave="$emit('onMouseLeave', $event)"
  >
    <div class="card">
      <div
        :style="`background: ${item.color}`"
        class="card__header"
      >
        <span class="position">{{ item.position }}</span>
      </div>
      <div class="card__body">
        <div class="card__body__avatar">
          <img src="../../assets/img/avatar.png" />
        </div>
        <div class="card__body__info">
          <span class="name">{{ item.name }}</span>
          <span
            v-if="item.second_position"
            class="second_position"
          >
                {{ item.second_position }}
              </span>
        </div>
      </div>
      <div
        class="card__footer"
      >
        <div class="title">
          ЦКП
          <button v-tooltip="item.description">
            <img src="../../assets/img/info.svg">
          </button>
        </div>
      </div>
      <div
        v-if="staff.length > 0"
        class="card__staff"
      >
        <div class="title">
          Сотрудники
        </div>
        <div class="users">
          <div
            v-for="user in staff"
            :key="user.id"
            class="users__item"
            v-tooltip="'Открыть профиль'"
            @click="onOpenUser({ elementId: item.id, userId: user.id })"
          >
            <img src="../../assets/img/user1.png" />
          </div>
          <button
            v-if="staffLength > 0"
            class="users__count"
            v-tooltip="'Открыть список сотрудников'"
            @click="onOpenUserList({ elementId: item.id })"
          >
            {{ staffLength }} +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../../main';

export default {
  name: 'Type5',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    staff() {
      const staff = [];
      if (this.item.staff && this.item.staff.length > 0) {
        for (let i = 0; i <= 3; i += 1) {
          staff.push(this.item.staff[i]);
        }
      }
      return staff;
    },
    staffLength() {
      if (this.staff.length > 0) {
        return this.item.staff.length - this.staff.length;
      }
      return 0;
    },
  },
  methods: {
    onOpenUser(data) {
      eventBus.$emit('onOpenUser', data);
    },
    onOpenUserList(data) {
      eventBus.$emit('onOpenUserList', data);
    },
  },
};
</script>

<style scoped lang="scss">
.block-container__item__component {
  width: 254px;

  &.hide-info {
    .card__body, .card__footer, .card__staff {
      display: none;
    }
    .card__header {
      height: 100%;
      .position {
        font-size: 36px;
      }
      .number {
        font-size: 60px;
      }
    }
  }

  .card {
    position: relative;
    overflow: hidden;
    border-radius: 7px;

    &__header {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 90px;
      padding: 15px 20px;

      .position {
        font-style: normal;
        font-weight: bold;
        font-size: 21px;
        white-space: normal;
        color: #FFFFFF;
      }
    }

    &__body {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      flex-direction: column;

      &__avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 72px;
        height: 72px;
        border-radius: 100%;
        background: #E5E5E7;
        margin-bottom: 14px;
      }

      &__info {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .name {
          font-style: normal;
          font-weight: normal;
          font-size: 21px;
          display: flex;
          align-items: flex-end;
          text-align: center;
          color: #000000;
        }

        .second_position {
          font-style: normal;
          font-weight: normal;
          font-size: 18px;
          text-align: center;
          color: #A8ADB5;
        }
      }
    }
    &__footer {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 16px;
      flex-direction: column;
      border-top: 1px solid #DFE1E5;

      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        text-align: center;
        color: #000000;
        margin-bottom: 8px;

        button {
          display: flex;
          align-items: center;
          background: none;
          border: none;
          box-shadow: none;
          outline: none;
          padding: 0 10px;
          font-size: 18px;
        }
      }
    }
    &__staff {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;
      padding-top: 14px;
      border-top: 1px solid #DFE1E5;

      .title {
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        text-align: center;
        color: #000000;
        margin-bottom: 8px;
      }
      .users {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 16px;
        margin-bottom: 20px;

        &__item {
          cursor: pointer;
          width: 32px;
          height: 32px;
          margin: 0 8px;
          overflow: hidden;
          border-radius: 100%;

          &:first-child {
            margin-left: 0;
          }
        }

        &__count {
          cursor: pointer;
          box-shadow: none;
          outline: none;
          background: none;
          border: 1px solid #25AC85;
          border-radius: 16px;
          font-style: normal;
          font-weight: bold;
          font-size: 18px;
          line-height: 23px;
          text-align: center;
          color: #37C29A;
          padding: 2.5px 15px;
        }
      }
    }
  }
}
</style>

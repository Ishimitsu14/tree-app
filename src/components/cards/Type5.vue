<template>
  <div
    class="block-container__item__component"
    @mouseenter="$emit('onMouseEnter', $event)"
    @mouseleave="$emit('onMouseLeave', $event)"
  >
    <div class="tree-card">
      <div
        :style="`background: ${item.color}`"
        class="tree-card__header"
      >
        <span v-if="!!item.number && item.number !== ''" class="number">{{ item.number }}</span>
        <span class="position">{{ item.position }}</span>
      </div>
      <div class="tree-card__body">
        <div class="tree-card__body__avatar">
          <img :src="avatar" />
        </div>
        <div class="tree-card__body__info">
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
        class="tree-card__footer"
      >
        <div class="title">
          ЦКП
          <button v-tooltip="item.description">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTAgMjBDNC40NzY5OSAyMCAwIDE1LjUyMyAwIDEwQzAgNC40NzY5OSA0LjQ3Njk5IDAgMTAgMEMxNS41MjMgMCAyMCA0LjQ3Njk5IDIwIDEwQzIwIDE1LjUyMyAxNS41MjMgMjAgMTAgMjBaTTEwIDE4Ljc1QzEyLjMyMDYgMTguNzUgMTQuNTQ2MiAxNy44MjgxIDE2LjE4NzIgMTYuMTg3MkMxNy44MjgxIDE0LjU0NjIgMTguNzUgMTIuMzIwNiAxOC43NSAxMEMxOC43NSA3LjY3OTM2IDE3LjgyODEgNS40NTM3NiAxNi4xODcyIDMuODEyODJDMTQuNTQ2MiAyLjE3MTg3IDEyLjMyMDYgMS4yNSAxMCAxLjI1QzcuNjc5MzYgMS4yNSA1LjQ1Mzc2IDIuMTcxODcgMy44MTI4MiAzLjgxMjgyQzIuMTcxODcgNS40NTM3NiAxLjI1IDcuNjc5MzYgMS4yNSAxMEMxLjI1IDEyLjMyMDYgMi4xNzE4NyAxNC41NDYyIDMuODEyODIgMTYuMTg3MkM1LjQ1Mzc2IDE3LjgyODEgNy42NzkzNiAxOC43NSAxMCAxOC43NVoiIGZpbGw9IiMzN0MyOUEiLz4KICAgIDxwYXRoIGQ9Ik04Ljc1IDE1LjVWOC41SDExLjI1VjE1LjVIOC43NVoiIGZpbGw9IiMzN0MyOUEiLz4KICAgIDxwYXRoIGQ9Ik0xMS4yNSA0LjVIOC43NVY3SDExLjI1VjQuNVoiIGZpbGw9IiMzN0MyOUEiLz4KPC9zdmc+">
          </button>
        </div>
      </div>
      <div
        v-if="staff.length > 0"
        class="tree-card__staff"
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
            @click="onOpenUser({ elementId: item.id, user: user })"
          >
            <img :src="user.src" />
          </div>
          <button
            v-if="staffLength > 0"
            class="users__count"
            v-tooltip="'Открыть список сотрудников'"
            @click="onOpenStaffList(item.id)"
          >
            {{ staffLength }} +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../../eventBus';

export default {
  name: 'Type5',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    avatar() {
      if (this.item && this.item.avatar) {
        return this.item.avatar;
      }
      // eslint-disable-next-line global-require
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIHZpZXdCb3g9IjAgMCA3MiA3MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjcxLjk5OTkiIGhlaWdodD0iNzIiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0zNS45NzczIDcyQzU1LjY5MjEgNzIgNzEuOTk5OSA1NS42OTIxIDcxLjk5OTkgMzYuMDIyOEM3MS45OTk5IDE2LjMwNzkgNTUuNjQ2NyAwIDM1Ljk3NzMgMEMxNi4yNjI0IDAgMCAxNi4zMDc5IDAgMzYuMDIyOEMwIDU1LjY5MjEgMTYuMzA3OCA3MiAzNS45NzczIDcyWiIgZmlsbD0iI0U1RTVFNyIvPgo8cGF0aCBkPSJNMzAuNjQxMiAyOC4yNDE4QzMwLjY0MTIgMzEuNjA0OCAzMy4wMTk5IDM0LjEyMDIgMzYuMDAwMiAzNC4xNDc2QzM4Ljk4MDUgMzQuMTc0OSA0MS4zODY2IDMxLjYwNDggNDEuMzg2NiAyOC4yNDE4QzQxLjM4NjYgMjUuMTI0OCAzOC45ODA1IDIyLjUgMzYuMDAwMiAyMi41QzMzLjAxOTkgMjIuNSAzMC42NDEyIDI1LjEyNDggMzAuNjQxMiAyOC4yNDE4WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTI1LjIwMDIgNDQuODY1NkMyNS4yMDAyIDQ1LjU3NjQgMjUuNTU1NyA0Ni4wNjg2IDI2LjMyMTIgNDYuMDY4Nkg0NS42NzkyQzQ2LjQ0NDggNDYuMDY4NiA0Ni44MDAyIDQ1LjU3NjQgNDYuODAwMiA0NC44NjU2QzQ2LjgwMDIgNDIuNTQxNSA0My4zNTUyIDM2LjUyNjMgMzYuMDAwMiAzNi41MjYzQzI4LjY3MjYgMzYuNTI2MyAyNS4yMDAyIDQyLjU0MTUgMjUuMjAwMiA0NC44NjU2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==';
    },
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
    onOpenStaffList(data) {
      eventBus.$emit('onOpenStaffList', data);
    },
  },
};
</script>

<style scoped lang="scss">
.block-container__item__component {
  width: 254px;

  &.hide-info {
    .tree-card__body, .tree-card__footer, .tree-card__staff {
      display: none;
    }
    .tree-card__header {
      height: 100%;
      .position {
        font-size: 36px;
      }
      .number {
        font-size: 60px;
      }
    }
  }

  .tree-card {
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
      .number {
        font-style: normal;
        font-weight: bold;
        font-size: 25px;
        color: #FFFFFF;
        opacity: 0.5;
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

          img {
            width: 100%;
          }

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

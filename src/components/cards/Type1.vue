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
        <span v-if="!!item.number && item.number !== ''" class="number">{{ item.number }}</span>
        <span class="position">{{ item.position }}</span>
      </div>
      <div class="card__body">
        <div class="card__body__avatar">
          <img :src="avatar" />
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'Type1',
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
  },
};
</script>

<style scoped lang="scss">
.block-container__item__component {
  width: 650px;

  &.hide-info {
    .card__body {
      display: none;
    }
    .card__header {
      height: 100%;
      .position {
        font-size: 64px;
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
      height: 120px;
      padding: 15px 20px;

      .position {
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        text-align: center;
        white-space: normal;
        color: #FFFFFF;
      }

      .number {
        font-style: normal;
        font-weight: bold;
        font-size: 40px;
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
  }
}
</style>

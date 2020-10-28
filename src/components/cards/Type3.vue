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
        </div>
        <div class="description">
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Type3',
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
  width: 680px;

  &.hide-info {
    .tree-card__body, .tree-card__footer {
      display: none;
    }
    .tree-card__header {
      height: 100%;
      .position {
        font-size: 64px;
      }
      .number {
        font-size: 90px;
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
      justify-content: space-between;
      flex-direction: column;
      height: 120px;
      padding: 15px 20px;

      .number {
        font-style: normal;
        font-weight: bold;
        font-size: 40px;
        color: #FFFFFF;
        opacity: 0.5;
      }

      .position {
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        white-space: normal;
        text-align: center;
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
      padding: 20px;
      flex-direction: column;
      border-top: 1px solid #DFE1E5;

      .title {
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        text-align: center;
        color: #000000;
        margin-bottom: 8px;
      }

      .description {
        width: 100%;

        p {
          margin: 0;
          white-space: normal;
          font-style: normal;
          font-weight: normal;
          font-size: 18px;
          text-align: center;
          color: #434B53;
        }
      }
    }
  }
}
</style>

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
      <div
        class="card__footer"
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
      return require('../../assets/img/avatar.png');
    },
  },
};
</script>

<style scoped lang="scss">
.block-container__item__component {
  width: 680px;

  &.hide-info {
    .card__body, .card__footer {
      display: none;
    }
    .card__header {
      height: 100%;
      .position {
        font-size: 64px;
      }
      .number {
        font-size: 90px;
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

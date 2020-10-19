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
  name: 'Type2',
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
      return require('../../assets/img/avatar.svg');
    },
  },
};
</script>

<style scoped lang="scss">
.block-container__item__component {
  width: 500px;

  &.hide-info {
    width: 600px;
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

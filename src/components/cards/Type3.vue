<template>
  <div
    class="block-container__item__component"
  >
    <div class="card">
      <div
        :style="`background: ${item.color}`"
        class="card__header"
      >
         <span class="number">{{ item.number }}</span>
        <span class="position">{{ item.position }}</span>
      </div>
      <div class="card__body">
        <div class="card__body__avatar">
          <img src="../../assets/avatar.png" />
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
};
</script>

<style scoped lang="scss">
  .block-container__item__component {
    width: 680px;

    .card {
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
          line-height: 41px;
          text-align: center;
          text-transform: uppercase;
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

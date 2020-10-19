<template>
  <div class="collapse">
    <div class="collapse__header" @click="onShow">
      <img v-if="isIcon" :src="require('../../assets/img/collapse.svg').default" />
      <div>
        <div class="collapse__title">
          {{ title }}
        </div>
        <div class="collapse__description">
          {{ description }}
        </div>
      </div>
      <div class="collapse__icon" :class="isShow ? 'collapse__icon--show' : ''">
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.513672 1.7793C0.513672 2.10303 0.629883 2.36865 0.845703 2.58447L7.06299
            8.95117C7.34521 9.2334 7.63574 9.37451 7.99268 9.37451C8.34961 9.37451 8.64844 9.2417
            8.92236 8.95117L15.1479 2.58447C15.3638 2.36035 15.48 2.09473
            15.48 1.7793C15.48 1.14014
            14.9653 0.617187 14.3262 0.617187C14.0107 0.617187 13.7119 0.75 13.4795 0.982422L7.99268
             6.62695L2.51416 0.982421C2.28174 0.749999 1.98291 0.617187 1.66748 0.617187C1.02832
            0.617187 0.513672 1.14014 0.513672 1.7793Z"
            fill="#3C3C43"
            fill-opacity="0.4"
          />
        </svg>
      </div>
    </div>
    <div class="collapse__body" :style="isShow ? `max-height: ${slotHeight}px` : 'max-height: 0'">
      <div ref="slot" class="collapse__slot">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import helper from '../../helper';

export default {
  name: 'CustomCollapse',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default() {
        // eslint-disable-next-line global-require
        return require('../../assets/img/collapse.svg').default;
      },
    },
    isIcon: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      parseIcon: '',
      isShow: false,
      slotHeight: '',
    };
  },
  mounted() {
    this.slotHeight = helper.getElementSize(this.$refs.slot).height;
  },
  methods: {
    onShow() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style lang="scss" scoped>
.collapse {
  border: 1px solid #D7DBDF;
  border-radius: 4px;
  padding: 16px;

  &__header {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    img {
      margin-right: 15px;
    }

    &:hover {
      cursor: pointer;
    }
  }

  &__title {
    text-align: left;
    font-family: PT Sans, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 21px;
    color: #1C1B20;
  }

  &__description {
    text-align: left;
    font-family: PT Sans, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    color: #61676F;
  }

  &__icon {
    position: absolute;
    right: 0;

    svg {
      transition: all ease-in-out .3s;
    }

    &--show {
      svg {
        transform: rotate(180deg);
      }
    }
  }

  &__body {
    height: 100%;
    overflow: auto;
    transition: all ease-in-out .5s;
  }

  &__slot {
    padding-top: 28px;
  }
}
</style>

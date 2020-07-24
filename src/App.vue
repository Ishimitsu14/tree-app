<template>
  <div id="app">
    <tree :items="items"/>
  </div>
</template>

<script>
import Tree from './components/Tree.vue';

export default {
  name: 'App',
  data() {
    return {
      items: [
        {
          id: 1,
          name: 'Сарычев Михаил',
          position: 'Владелец',
          color: '#E8C567',
          type: 1,
          children: [
            {
              id: 2,
              name: 'Петров Василий',
              position: 'Генеральный Директор',
              color: '#E8C567',
              type: 2,
              children: [
                {
                  id: 3,
                  name: 'Иванова Екатерина',
                  position: 'Административный директор',
                  color: '#E8C567',
                  type: 2,
                  children: [],
                },
                {
                  id: 4,
                  name: 'Рыжиков Генадий',
                  position: 'Технический директор',
                  color: '#E8C567',
                  type: 2,
                  children: [
                    {
                      id: 12,
                      name: 'Горин Генадий',
                      position: 'Чисто поц',
                      color: '#E8C567',
                      type: 3,
                      children: [],
                    },
                  ],
                },
                {
                  id: 5,
                  name: 'Катеринин Александр',
                  position: 'Директор по развитию',
                  color: '#E8C567',
                  type: 2,
                  children: [
                    {
                      id: 6,
                      name: 'Порядин Сергей',
                      position: 'Руководитель',
                      color: '#E8C567',
                      number: 1,
                      description: `Сохраненные, учтенные и не утрачивающие своей
                      ценности денежные и материальные активы`,
                      type: 3,
                      children: [
                        {
                          id: 21,
                          name: 'Порядин Сергей',
                          position: 'Руководитель',
                          color: '#E8C567',
                          number: 1,
                          description: `Сохраненные, учтенные и не утрачивающие своей
                      ценности денежные и материальные активы`,
                          type: 4,
                          children: [],
                        },
                        {
                          id: 22,
                          name: 'Порядин Сергей(2)',
                          position: 'Руководитель',
                          color: '#E8C567',
                          number: 2,
                          description: `Профессионально оказанные
                      услуги косметической ортодонтии`,
                          type: 4,
                          children: [
                            {
                              id: 51,
                              name: 'Имя Фамилия',
                              position: 'Руководитель',
                              color: '#E8C567',
                              number: 2,
                              description: `Профессионально оказанные
                      услуги косметической ортодонтии`,
                              type: 5,
                              children: [],
                            },
                            {
                              id: 52,
                              name: 'Имя Фамилия',
                              position: 'Руководитель',
                              color: '#E8C567',
                              number: 3,
                              description: `Профессионально оказанные
                      услуги косметической ортодонтии`,
                              type: 5,
                              children: [
                                {
                                  id: 62,
                                  name: 'Имя Фамилия',
                                  position: 'Руководитель',
                                  color: '#E8C567',
                                  number: 3,
                                  description: `Профессионально оказанные
                      услуги косметической ортодонтии`,
                                  type: 5,
                                  children: [],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 23,
                          name: 'Порядин Сергей(3)',
                          position: 'Руководитель',
                          color: '#E8C567',
                          number: 3,
                          description: 'Доход компании, больше чем расходы',
                          type: 4,
                          children: [],
                        },
                      ],
                    },
                    {
                      id: 7,
                      name: 'Порядин Сергей(2)',
                      position: 'Руководитель',
                      color: '#E8C567',
                      number: 2,
                      description: `Профессионально оказанные
                      услуги косметической ортодонтии`,
                      type: 3,
                      children: [],
                    },
                    {
                      id: 8,
                      name: 'Порядин Сергей(3)',
                      position: 'Руководитель',
                      color: '#E8C567',
                      number: 3,
                      description: 'Доход компании, больше чем расходы',
                      type: 3,
                      children: [],
                    },
                    {
                      id: 9,
                      name: 'Порядин Сергей(4)',
                      position: 'Руководитель',
                      color: '#E8C567',
                      number: 4,
                      description: `Введенные в должность,
                      хорошо производящие свои продукты сотрудники`,
                      type: 3,
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
  },
  components: {
    Tree,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

body {
  margin: 0;
}

* {
  box-sizing: border-box;
}
</style>

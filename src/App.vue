<template>
  <div id="app">
    <tree :tree="tree"/>
  </div>
</template>

<script>
import Tree from './components/Tree.vue';

export default {
  name: 'App',
  data() {
    return {
      tree: {
        id: 1,
        name: 'Сарычев Михаил',
        position: 'Владелец',
        second_position: 'Руководитель',
        description: 'TEST',
        color: '#E8C567',
        type: 1,
        children: [
          {
            id: 2,
            name: 'Петров Василий',
            position: 'Генеральный Директор',
            second_position: 'Руководитель',
            color: '#E8C567',
            type: 2,
            children: [
              {
                id: 3,
                name: 'Иванова Екатерина',
                position: 'Административный директор',
                second_position: 'Руководитель',
                color: '#E8C567',
                type: 2,
                children: [],
              },
              {
                id: 4,
                name: 'Рыжиков Генадий',
                position: 'Технический директор',
                second_position: 'Руководитель',
                color: '#E8C567',
                type: 2,
                children: [
                  {
                    id: 12,
                    name: 'Горин Генадий',
                    position: 'Кто-то',
                    second_position: 'Руководитель',
                    description: 'Сохраненные, учтенные и не утрачивающие своей ценности денежные и материальные активы',
                    color: '#E8C567',
                    number: 1,
                    type: 3,
                    children: [],
                  },
                ],
              },
              {
                id: 5,
                name: 'Катеринин Александр',
                position: 'Директор по развитию',
                second_position: 'Руководитель',
                color: '#E8C567',
                type: 2,
                children: [
                  {
                    id: 6,
                    name: 'Порядин Сергей',
                    position: 'Руководитель',
                    second_position: 'Руководитель',
                    color: '#E8C567',
                    number: 1,
                    description: `Сохраненные, учтенные и не утрачивающие своей
                      ценности денежные и материальные активы`,
                    type: 3,
                    children: [
                      {
                        id: 21,
                        name: 'Порядин Сергей (5)',
                        position: 'Руководитель',
                        second_position: 'Руководитель',
                        color: '#E8C567',
                        number: 1,
                        description: `Сохраненные, учтенные и не утрачивающие своей
                      ценности денежные и материальные активы`,
                        type: 4,
                        children: [],
                      },
                      {
                        id: 22,
                        name: 'asdadsasdasddas',
                        position: 'Руководитель',
                        second_position: 'Руководитель',
                        color: '#E8C567',
                        number: 2,
                        description: `Профессионально оказанные
                      услуги косметической ортодонтии`,
                        type: 4,
                        children: [
                          {
                            id: 51,
                            name: 'Имя Фамилия (1)',
                            position: 'Руководитель',
                            second_position: 'Руководитель',
                            color: '#E8C567',
                            number: 2,
                            description: `Профессионально оказанные
                      услуги косметической ортодонтии`,
                            type: 5,
                            staff: [
                              { id: 1, src: '../../assets/img/user1.png' },
                              { id: 2, src: '../../assets/img/user2.png' },
                              { id: 3, src: '../../assets/img/user3.png' },
                              { id: 4, src: '../../assets/img/user4.png' },
                              { id: 5, src: '../../assets/img/user4.png' },
                              { id: 6, src: '../../assets/img/user4.png' },
                            ],
                            children: [],
                          },
                          {
                            id: 52,
                            name: 'Имя Фамилия (2)',
                            position: 'Руководитель',
                            second_position: 'Руководитель',
                            color: '#E8C567',
                            number: 3,
                            description: `Профессионально оказанные
                      услуги косметической ортодонтии`,
                            type: 5,
                            children: [
                              {
                                id: 62,
                                name: 'Имя Фамилия (3)',
                                position: 'Руководитель',
                                second_position: 'Руководитель',
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
                        second_position: 'Руководитель',
                        color: '#E8C567',
                        number: 3,
                        description: 'Доход компании, больше чем расходы',
                        type: 4,
                        children: [
                          {
                            id: 71,
                            name: 'Имя Фамилия (4)',
                            position: 'Руководитель',
                            second_position: 'Руководитель',
                            color: '#E8C567',
                            number: 2,
                            description: `Профессионально оказанные
                      услуги косметической ортодонтии`,
                            type: 5,
                            children: [],
                          },
                          {
                            id: 72,
                            name: 'Имя Фамилия (5)',
                            position: 'Руководитель',
                            second_position: 'Руководитель',
                            color: '#E8C567',
                            number: 3,
                            description: `Профессионально оказанные
                      услуги косметической ортодонтии`,
                            type: 5,
                            children: [
                              {
                                id: 77,
                                name: 'Имя Фамилия (6)',
                                position: 'Руководитель',
                                second_position: 'Руководитель',
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
                    name: 'Порядин Сергей(32)',
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

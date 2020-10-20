# tree-app

## Demo
https://ishimitsu14.github.io/tree-app/

## Install library
```
npm install --save tree-app
```

## Then, import and register the component

```
import Vue from "vue";
import TreeApp from 'tree-app';
import TreeApp from 'tree-app/lib/tree-app.css';
Vue.component('tree-app', TreeApp);
```

## Props
```
<tree :tree="tree" :leader-list="leaderList"/>
```
### Tree
| Prop       | Type               | Example Value | isRequired |
| ---------- |------------------  | ------------  | ------     |
| id         | Number             | 1             | true       |
| name       | String             | John Conor    | true       |
| position   | String             | Owner         | true       |
| number     | Number             | 10            | false      |
| second_position   | String      | Holder        | false      |
| description| String             | Some description| false    |
| color      | String             | #E8C567       | true       |
| type       | Number             | 1             | true       |
| children   | Array              |               | false      |
| staff      | Array              |               | false      |

##### Staff

| Prop       | Type               | Example Value | isRequired |
| ---------- |------------------  | ------------  | ------     |
| id         | Number             | 1             | true       |
| src        | String             | https://i.ibb.co/6Fjxq6D/user1.jpg | false  |
| name       | String             | Jessica Alba  | true       |
| phone      | String             | +7 (999) 999-99-99| true   |
| additional | Object [ ] | { label: 'Telegram', value: '+7 (999) 999-99-99' }| false   |

###### Type can be: `1, 2, 3, 4, 5`.

###### Example:
```
{
    id: 2,
    name: 'Sara Conor',
    position: 'General Manager',
    second_position: 'Leader',
    color: '#E8C567',
    type: 2,
    children: [
        {
            id: 3,
            name: 'Jonh Conor',
            position: 'Manager`s Assistant',
            second_position: 'Assistant Manager',
            color: '#FFFFFF',
            type: 3,
            children: [...]
            staff: [
                {
                    id: 4,
                    src: 'https://i.ibb.co/88YjHBT/user4.png',
                    name: 'Петров Иван Николаевич',
                    phone: '+7 (902) 789-09-08',
                    additional: [
                        { label: 'Telegram', value: '+7 (902) 789-09-08' },
                        { label: 'Дата рождения', value: '01.02.1998' },
                    ],
                },
            ]
        }
    ],
}
```

### Leader List
| Prop       | Type               | Example Value | isRequired |
| ---------- |------------------  | ------------  | ------     |
| label      | string             | John Conor    | true       |

###### Must be array, used for 'leader' in change and add modals


## Event
| Event             | Return      | Description                              |
| ----------        |------------ | --------------------------------------   |
| onReady           | null        | Emit when component is mounted           |
| onDelete          | Id of user  | Emit when deleted item                   |
| onAdd             | Id of user  | Emit when added item                     |
| onEdit            | Id of user  | Emit when edited item                    |
| onOpenUserProfile | Id of user  | Emit when click on user open user profile|

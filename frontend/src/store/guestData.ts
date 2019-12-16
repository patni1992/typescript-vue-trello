export const guestBoards = [
    {
        id: 10,
        title: 'Tutorial',
        color: 'blue',
        userId: 0,
    },
    {
        id: 11,
        title: 'Client SPA Vue',
        color: 'green',
        userId: 0,
    },
    {
        id: 12,
        title: 'Javascript resources',
        color: 'orange',
        userId: 0,
    },
];

export const columnsWithCards = [
    {
        id: 10,
        boardId: 10,
        title: 'Todo',
        createdAt: '2019-12-02T23:53:51.000Z',
        cards: [
            {
                id: 1,
                columnId: 10,
                content: `## Welcome to kanban-board in React
      `,
                color: 'red',
            },
            {
                id: 2,
                columnId: 10,
                content: `Cards support markup for more information see \n \n
          \n [**Markdown Cheatsheet**](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)`,
                color: 'green',
            },
        ],
    },
    {
        id: 1338,
        boardId: 10,
        title: 'In Progress',
        createdAt: '2019-12-02T23:53:51.000Z',
        cards: [
            {
                id: 3,
                columnId: 1338,
                content: `  - Move a card
      \n - Create a card
      \n  - Move a list
      \n  - Create a list
      `,
                color: 'blue',
            },
        ],
    },
    {
        id: 1339,
        boardId: 10,
        title: 'Done',
        createdAt: '2019-12-02T23:53:51.000Z',
        cards: [
            {
                id: 4,
                columnId: 1339,
                content: `## Techonoliges used \n ![alt text](https://www.docker.com/sites/default/files/social/docker_facebook_share.png) 
                \n ![alt text](https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png)
                \n ![alt text](https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/TypeScript_Logo_%28Blue%29.svg/640px-TypeScript_Logo_%28Blue%29.svg.png)
  `,
                color: 'red',
            },
        ],
    },
];

export const guestBoards = [
    {
        id: 10,
        title: 'Tutorial',
        color: '#0279BF',
        userId: 0,
    },
    {
        id: 11,
        title: 'Client SPA React',
        color: '#4ABF6B',
        userId: 0,
    },
    {
        id: 12,
        title: 'Javascript resources',
        color: '#FFAB4A',
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
                color: '#eb5a46',
            },
            {
                id: 2,
                columnId: 10,
                content: `Cards support markup for more information see \n \n
          \n [**Markdown Cheatsheet**](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)`,
                color: '#0279BF',
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
                content: `  - [ ] Move a card
      \n - [ ] Create a card
      \n  - [ ] Move a list
      \n  - [ ] Create a list
      `,
                color: '#FFAB4A',
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
                id: '4',
                columnId: '1339',
                content: `## Techonoliges used \n ![alt text](http://www.siamhtml.com/wp-content/uploads/2014/07/sass.png)
  ![alt text](data:image/png;base64,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 "Logo Title Text 1")
  ![alt text]( https://cdn-images-1.medium.com/max/614/1*SRL22ADht1NU4LXUeU4YVg.png) \n  <h1 onclick="alert(this)" style="font-size: 7rem;"> Vuex </h1>
  `,
                color: '#4ABF6B',
            },
        ],
    },
];

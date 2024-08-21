export const SOURCES_DATA = [
  {
    IndentedTree: {
      data: [
        {
          child: ['0x2', '0x3', '0x5'],
          id: '0x1',
          root: true,
          data: 'A',
          type: 'default',
        },
        { child: ['0x9'], id: '0x2', data: 'B', type: 'default' },
        {
          child: ['0x4', '0x7'],
          id: '0x3',
          data: 'C',
          type: 'default',
        },
        {
          child: ['0x6'],
          id: '0x4',
          data: 'D',
          type: 'default',
        },
        {
          id: '0x5',
          data: 'E',
          type: 'default',
        },
        { child: ['0x8'], id: '0x6', data: 'F', type: 'default' },
        {
          id: '0x7',
          data: 'G',
          type: 'default',
        },
        {
          id: '0x8',
          data: 'I',
          type: 'default',
        },
        {
          id: '0x9',
          data: 'J',
          type: 'default',
        },
      ],
      layouter: 'Indented',
    },
  },
];

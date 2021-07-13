import controller from './controller';

export default [{
  method: 'get',
  path: '/continents',
  handlers: [
    controller.listContinentsByCode,
  ],
},{
    method: 'get',
    path: '/countrys',
    handlers: [
      controller.listContrysByCode,
    ],
  }];

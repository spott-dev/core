const {PLACE_ID_1} = require('./constants');

const places = testUtils.generateFixtures({
  type: 'place',
  recipe: [
    {
      id: PLACE_ID_1,
      population: 1000,
      createdAt: new Date(0),
      updatedAt: new Date(0)
    }
  ]
});

module.exports = {
  places
};

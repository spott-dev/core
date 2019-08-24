const {PLACE_ID_1} = require('./constants');

const places = testUtils.generateFixtures({
  type: 'place',
  recipe: [
    {
      id: PLACE_ID_1
    }
  ]
});

module.exports = {
  places
};

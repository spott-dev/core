const { uniq } = require('lodash');
const getLocalizedNames = require('./get-localized-names');

const REQUIRED_FIELDS = ['id', 'geonameId', 'name', 'code'];

const getParentCodes = (place) => [
  place.countryCode,
  place.adminDivision1Code,
  place.adminDivision2Code
].filter((e) => !!e);

const addNames = async ({ database, places, languages }) => Promise.all(
  places.map(async (place) => {
    const localizedNames = await getLocalizedNames({
      database,
      languages,
      geonameId: place.geonameId,
    });

    return { ...place, localizedNames };
  })
);

async function getParentsData({ database, places, languages }) {
  const codes = places.reduce(
    (prev, place) => prev.concat(getParentCodes(place)),
    [],
  );

  const parents = await database.places.findAllBy('code', uniq(codes), {
    fields: REQUIRED_FIELDS
  });

  return addNames({ database, languages, places: parents });
}

module.exports = getParentsData;

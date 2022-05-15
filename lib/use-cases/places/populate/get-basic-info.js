const getLocalizedNames = require('./get-localized-names');

const REQUIRED_FIELDS = ['id', 'geonameId', 'name'];

async function getBasicInfo({database, placeCode, languages}) {
  const options = {fields: REQUIRED_FIELDS};
  const place = await database.places.findByCode(placeCode, options);

  if (!place) return null;

  const localizedNames = await getLocalizedNames({
    database,
    languages,
    geonameId: place.geonameId
  });

  return {
    ...place,
    localizedNames
  };
}

module.exports = getBasicInfo;

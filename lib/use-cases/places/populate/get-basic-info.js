const getLocalizedNames = require('./get-localized-names');

const REQUIRED_FILEDS = ['id', 'geonameId', 'name'];

async function getBasicInfo({database, placeId, languages}) {
  const options = {fields: REQUIRED_FILEDS};
  const place = await database.places.findById(placeId, options);

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

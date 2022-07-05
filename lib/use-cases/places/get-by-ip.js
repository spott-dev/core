const populatePlace = require('./populatePlace');
const discoverPlaceByIp = require('./discover-by-ip');
const {getIpRelationsTtl} = require('../../../config');

const CACHE_TTL = getIpRelationsTtl();

/**
 * Finds the best place given an IP an returns it
 * @param {Object} params - Use case parameters
 * @param {Object} params.database - Database
 * @param {string} params.ip - IPv4 or IPv6 to find its related place
 * @param {string[]} [params.languages] - Languages to localize the name of the place
 */
async function getPlaceById({database, ip, languages}) {
  const execute = async () => {
    const place = await getPlace();
    const placeId = (place || {}).id || null;

    await cacheResult(placeId);

    if (!place) return null;

    return populatePlace({ database, languages, place });
  };

  const getPlace = async () => {
    const ipRelation = await database.ipRelations.findValidByIp(ip);
    if (!ipRelation) return discoverPlaceByIp({database, ip});

    const {placeId} = ipRelation;
    if (!placeId) return null;

    return database.places.findById(placeId);
  };

  const cacheResult = (placeId) => {
    const expiresAt = new Date(Date.now() + CACHE_TTL);
    const params = {ip, placeId, expiresAt};
    return database.ipRelations.upsert(params);
  };

  return execute();
}

module.exports = getPlaceById;

const {get} = require('lodash');
const {IpInsightsService} = require('../../services');
const {ObjectNotFoundError} = require('spott-errors');

const NOT_FOUND_ERROR_CODE = new ObjectNotFoundError().code;

/**
 * Request IP insights and relates the result with a store place.
 * @param {Object} params - Use case parameters
 * @param {Object} params.database - Database
 * @param {string} params.ip - IPv4 or IPv6 to discover a related place
 */
async function discoverPlaceById({database, ip}) {
  const execute = async () => {
    const ipInsights = await getIpInsights();

    if (!ipInsights) return null;
    if (!ipInsights.country) return null;
    if (!ipInsights.city) return getPlaceByGeonameId(get(ipInsights, 'country.geonameId'));
    return figureOutCity(ipInsights);
  };

  const getIpInsights = () => {
    return IpInsightsService.getCityByIp(ip)
      .catch(handleIpInsightsError);
  };

  const handleIpInsightsError = (error) => {
    if (error.code === NOT_FOUND_ERROR_CODE) return Promise.resolve(null);
    return Promise.reject(error);
  };

  const getPlaceByGeonameId = geonameId => database.places.findByGeonameId(geonameId);

  const figureOutCity = async (ipInsights) => {
    const geonameId = get(ipInsights, 'city.geonameId');
    const place = await getPlaceByGeonameId(geonameId);
    return place || guessCity(ipInsights);
  };

  const guessCity = (ipInsights) => {
    const {country, city, coordinates} = ipInsights;
    const {name} = city;
    const types = ['CITY'];
    const countries = [country.iso2];
    const filter = { types, countries, coordinates };

    return database.indexedPlaces.findByNameAndFilter(name, filter);
  };

  return execute();
}

module.exports = discoverPlaceById;

const {get} = require('lodash');
const NAME_KEY = 'names.en';

function parseIpResponse(response) {
  const data = get(response, 'data') || {};

  return {
    ip: getIpAddress(data),
    coordinates: getCoordinates(data),
    timezoneId: get(data, 'location.time_zone', null),
    country: getCountry(data),
    city: getCity(data)
  };
}

const getCoordinates = ({location}) => {
  if (!location) return null;
  return {
    latitude: location.latitude,
    longitude: location.longitude,
    accuracyRadiusKm: location.accuracy_radius
  };
};

const getIpAddress = data => get(data, 'traits.ip_address');

const getCountry = ({country}) => {
  if (!country) return null;
  return {
    iso2: country.iso_code,
    geonameId: `${country.geoname_id}`,
    name: get(country, NAME_KEY)
  };
};

const getCity = ({city}) => {
  if (!city) return null;
  return {
    geonameId: `${city.geoname_id}`,
    name: get(city, NAME_KEY)
  };
};

module.exports = parseIpResponse;

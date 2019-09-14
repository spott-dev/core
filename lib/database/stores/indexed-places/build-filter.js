const {isArray, isPlainObject, isEmpty} = require('lodash');

const and = must => ({ bool: { must } });

const or = should => ({ bool: { should } });

function buildFilter(filter = {}) {
  const { types, countries, coordinates } = filter;
  const filtersArray = [];

  if (isArray(types) && !isEmpty(types)) {
    const queries = buildTermQueries('type', types);
    filtersArray.push(or(queries));
  }

  if (isArray(countries) && !isEmpty(countries)) {
    const queries = buildTermQueries('country.id', countries);
    filtersArray.push(or(queries));
  }

  if (isPlainObject(coordinates)) {
    const distanceQuery = buildDistanceQuery('coordinates', coordinates);
    filtersArray.push(distanceQuery);
  }

  return and(filtersArray);
}

function buildTermQueries(field, array) {
  return array.map(value => {
    return {
      term: { [field]: value }
    };
  });
}

function buildDistanceQuery(field, coordinates) {
  const { longitude, latitude, accuracyRadiusKm } = coordinates;
  return {
    geo_distance: {
      distance: `${accuracyRadiusKm}km`,
      [field]: {
        lat: latitude,
        lon: longitude
      }
    }
  };
}

module.exports = buildFilter;

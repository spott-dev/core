const {getLocalizedName} = require('../../alternate-names');

async function getLocalizedNames({database, geonameId, languages}) {
  return (languages || []).reduce(async (promise, language) => {
    const result = await promise;
    const name = await getLocalizedName({database, geonameId, language});
    return Object.assign(result, {[language]: name});
  }, Promise.resolve({}));
}

module.exports = getLocalizedNames;

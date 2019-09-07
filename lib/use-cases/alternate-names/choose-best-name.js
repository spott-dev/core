const {head, sortBy, get} = require('lodash');

const SCORES_PER_FEATURE = {
  isPreferred: 2,
  isShort: 1,
  isColloquial: -1,
  isHistoric: -2
};

function chooseBestName(alternateNames) {
  const best = head(sortBy(alternateNames, [
    calculateScore,
    getLength,
    byName
  ]));
  return get(best, 'name') || null;
}

function calculateScore(alternateName) {
  const score = Object.keys(SCORES_PER_FEATURE).reduce((score, feature) => {
    const value = SCORES_PER_FEATURE[feature] || 0;
    return get(alternateName, feature) ? score + value : score;
  }, 0);
  return score * -1;
}

function getLength(alternateName) {
  return get(alternateName, 'name').length;
}

function byName(alternateName) {
  return get(alternateName, 'name');
}

module.exports = chooseBestName;

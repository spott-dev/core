const database = require(`${ROOT_PATH}/lib/database`);
const populate = require(`${ROOT_PATH}/lib/use-cases/places/populate`);
const {
  CITY_ID,
  COUNTRY_ID,
  COUNTRY_GEONAME_ID,
  DEFAULT_ALTERNATE_NAME
} = require('./constants');

const EXPECTED_COUNTRY_PROPERTIES = [
  'iso2', 'iso3', 'isoNumeric', 'fips', 'capitalName', 'areaSqHm', 'continentId',
  'domain', 'currencyCode', 'currencyName', 'postalCodeFormat', 'postalCodeRegex',
  'phoneCodes', 'languages', 'locales', 'neighbourCountryIds'
];

describe('UseCases | Places | .populate', () => {
  const fixtures = require('./fixtures');
  const [
    ,
    countryFixture,
    adminDivision1Fixture,
    adminDivision2Fixture
  ] = fixtures.geonamesPlaces;

  before(async () => {
    await testUtils.resetDatabase();
    await testUtils.insertFixtures(fixtures);
  });

  describe('Populate a city', () => {
    let place;

    before(async () => {
      place = await database.places.findById(CITY_ID);
    });

    it('should keep all default propierties of the place', async () => {
      const result = await populate({database, place});
      expect(result).to.be.an('object');
      expect(result.id).to.be.equal(CITY_ID);

      Object.keys(place).forEach(key => {
        expect(result[key]).to.be.eql(place[key]);
      });
    });

    it('should add parents information', async () => {
      const result = await populate({database, place});
      expectParent(result.adminDivision1, adminDivision1Fixture);
      expectParent(result.adminDivision2, adminDivision2Fixture);
      expectParent(result.country, countryFixture);
    });

    it('should not return properties of a country', async () => {
      const result = await populate({database, place});
      expect(result.type).to.be.equal('CITY');

      Object.keys(EXPECTED_COUNTRY_PROPERTIES).forEach(countryProperty => {
        expect(result[countryProperty]).to.be.a('undefined');
      });
    });
  });

  describe('Populate a country', () => {
    let country;
    let place;

    before(async () => {
      place = await database.places.findById(COUNTRY_ID);
      country = await database.countries.findByGeonameId(COUNTRY_GEONAME_ID);
    });

    it('should keep all default propierties of the place', async () => {
      const result = await populate({database, place});
      expect(result).to.be.an('object');
      expect(result.id).to.be.equal(COUNTRY_ID);

      Object.keys(place).forEach(key => {
        expect(result[key]).to.be.eql(place[key]);
      });
    });

    it('should return properties of a country', async () => {
      const result = await populate({database, place});
      expect(result.type).to.be.equal('COUNTRY');

      Object.keys(EXPECTED_COUNTRY_PROPERTIES).forEach(countryProperty => {
        expect(result[countryProperty]).to.be.eql(country[EXPECTED_COUNTRY_PROPERTIES]);
      });
    });

    it('should not have parents information', async () => {
      const result = await populate({database, place});
      expect(result.adminDivision1).to.be.a('undefined');
      expect(result.adminDivision2).to.be.a('undefined');
      expect(result.country).to.be.a('undefined');
    });
  });

  describe('Handle languages', () => {
    let place;

    before(async () => {
      place = await database.places.findById(CITY_ID);
    });

    it('should return "localizedNames" property even when languages are not specified', async () => {
      const result = await populate({database, place});
      expect(result.localizedNames).to.be.an('object');
      expect(result.localizedNames).to.be.eql({});
    });

    it('should return "localizedNames" with all required languages', async () => {
      const languages = ['en', 'de'];
      const result = await populate({database, place, languages});
      expect(result.localizedNames).to.be.an('object');

      languages.forEach(language => {
        expect(result.localizedNames[language]).to.be.equal(DEFAULT_ALTERNATE_NAME);
      });
    });

    it('should return null on "localizedNames" when name for a language is not found', async () => {
      const notExistentLanguages = ['it', 'pt'];
      const result = await populate({database, place, languages: notExistentLanguages});
      expect(result.localizedNames).to.be.an('object');

      notExistentLanguages.forEach(language => {
        expect(result.localizedNames[language]).to.be.equal(null);
      });
    });
  });
});

function expectParent(actualParent, expectedParent) {
  expect(actualParent).to.be.an('object');
  expect(actualParent.id).to.be.equal(expectedParent.id);
  expect(actualParent.geonameId).to.be.equal(expectedParent.geonameId);
  expect(actualParent.name).to.be.equal(expectedParent.name);
  expect(actualParent.localizedNames).to.be.an('object');
}

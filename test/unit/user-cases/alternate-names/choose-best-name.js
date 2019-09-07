const chooseBestName = require(`${ROOT_PATH}/lib/use-cases/alternate-names/choose-best-name`);

const DEFAULT_VALUES = {
  isPreferred: false,
  isShort: false,
  isColloquial: false,
  isHistoric: false
};

describe('USeCases | AlternateNames | .chooseBestName', () => {
  it('should return null when sending void', () => {
    const expectedName = null;
    const alternateNames = null;
    const name = chooseBestName(alternateNames);
    expect(name).to.be.equal(expectedName);
  });

  it('should return null when empty array', () => {
    const expectedName = null;
    const alternateNames = [];
    const name = chooseBestName(alternateNames);
    expect(name).to.be.equal(expectedName);
  });

  it('should choose preferred + short combination', () => {
    const expectedName = 'PREFERRED_AND_SHORT_NAME';
    const alternateNames = buildAlternateNames([
      {
        ...DEFAULT_VALUES
      },
      {
        ...DEFAULT_VALUES,
        isPreferred: true
      },
      {
        ...DEFAULT_VALUES,
        isShort: true
      },
      {
        ...DEFAULT_VALUES,
        name: expectedName,
        isPreferred: true,
        isShort: true
      }
    ]);
    const name = chooseBestName(alternateNames);
    expect(name).to.be.equal(expectedName);
  });

  it('should choose preferred over others', () => {
    const expectedName = 'PREFERRED_NAME';
    const alternateNames = buildAlternateNames([
      {
        ...DEFAULT_VALUES
      },
      {
        ...DEFAULT_VALUES,
        name: expectedName,
        isPreferred: true
      },
      {
        ...DEFAULT_VALUES,
        isShort: true
      },
      {
        ...DEFAULT_VALUES,
        isColloquial: true
      },
      {
        ...DEFAULT_VALUES,
        isHistoric: true
      }
    ]);
    const name = chooseBestName(alternateNames);
    expect(name).to.be.equal(expectedName);
  });

  it('should avoid historic and colloqial names', () => {
    const expectedName = 'NON_HISTORIC_OR_COLLOQUIAL_NAME';
    const alternateNames = buildAlternateNames([
      {
        ...DEFAULT_VALUES,
        isColloquial: true
      },
      {
        ...DEFAULT_VALUES,
        isHistoric: true
      },
      {
        ...DEFAULT_VALUES,
        name: expectedName
      }
    ]);
    const name = chooseBestName(alternateNames);
    expect(name).to.be.equal(expectedName);
  });

  it('should choose colloqial over historic names', () => {
    const expectedName = 'COLLOQUIAL_NAME';
    const alternateNames = buildAlternateNames([
      {
        ...DEFAULT_VALUES,
        isColloquial: true,
        name: expectedName
      },
      {
        ...DEFAULT_VALUES,
        isHistoric: true
      }
    ]);
    const name = chooseBestName(alternateNames);
    expect(name).to.be.equal(expectedName);
  });

  it('should choose shortner name when other options are the same', () => {
    const expectedName = 'shortName';
    const alternateNames = buildAlternateNames([
      {
        ...DEFAULT_VALUES,
        name: 'shortName'
      },
      {
        ...DEFAULT_VALUES,
        name: 'kind of long name'
      },
      {
        ...DEFAULT_VALUES,
        name: 'This is a ridiculous long name for god sake'
      }
    ]);
    const name = chooseBestName(alternateNames);
    expect(name).to.be.equal(expectedName);
  });

  it('should choose first alphabetically name when other options are the same and they have the same length', () => {
    const expectedName = 'nameA';
    const alternateNames = buildAlternateNames([
      {
        ...DEFAULT_VALUES,
        name: 'nameZ'
      },
      {
        ...DEFAULT_VALUES,
        name: 'nameW'
      },
      {
        ...DEFAULT_VALUES,
        name: 'nameA'
      },
      {
        ...DEFAULT_VALUES,
        name: 'nameB'
      }
    ]);
    const name = chooseBestName(alternateNames);
    expect(name).to.be.equal(expectedName);
  });
});

function buildAlternateNames(recipe) {
  return testUtils.generateFixtures({
    recipe,
    type: 'geonamesAlternateName'
  });
}

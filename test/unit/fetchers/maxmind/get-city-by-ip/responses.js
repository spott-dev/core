module.exports = {
  '189.163.219.127': {
    status: 200,
    data: {
      country: {
        names: {
          ru: 'Мексика',
          en: 'Mexico',
          ja: 'メキシコ合衆国',
          fr: 'Mexique',
          es: 'México',
          de: 'Mexiko',
          'pt-BR': 'México',
          'zh-CN': '墨西哥'
        },
        iso_code: 'MX',
        geoname_id: 3996063
      },
      registered_country: {
        names: {
          'zh-CN': '墨西哥',
          de: 'Mexiko',
          es: 'México',
          en: 'Mexico',
          ja: 'メキシコ合衆国',
          fr: 'Mexique',
          ru: 'Мексика',
          'pt-BR': 'México'
        },
        iso_code: 'MX',
        geoname_id: 3996063
      },
      continent: {
        code: 'NA',
        geoname_id: 6255149,
        names: {
          es: 'Norteamérica',
          de: 'Nordamerika',
          ru: 'Северная Америка',
          en: 'North America',
          ja: '北アメリカ',
          fr: 'Amérique du Nord',
          'zh-CN': '北美洲',
          'pt-BR': 'América do Norte'
        }
      },
      maxmind: {
        queries_remaining: 12324
      },
      location: {
        latitude: 19.4371,
        longitude: -99.0111,
        accuracy_radius: 1000
      },
      traits: {
        organization: 'Telmex',
        autonomous_system_organization: 'Uninet S.A. de C.V.',
        autonomous_system_number: 8151,
        isp: 'Telmex',
        ip_address: '189.163.219.127',
        domain: 'prod-infinitum.com.mx'
      },
      subdivisions: []
    }
  },
  '189.217.104.79': {
    status: 200,
    data: {
      city: {
        geoname_id: 3530597,
        names: {
          es: 'Ciudad de México',
          de: 'Mexiko-Stadt',
          ru: 'Мехико',
          en: 'Mexico City',
          ja: 'メキシコシティ',
          fr: 'Mexico',
          'zh-CN': '墨西哥城',
          'pt-BR': 'Cidade do México'
        }
      },
      continent: {
        names: {
          ru: 'Северная Америка',
          fr: 'Amérique du Nord',
          ja: '北アメリカ',
          en: 'North America',
          es: 'Norteamérica',
          de: 'Nordamerika',
          'zh-CN': '北美洲',
          'pt-BR': 'América do Norte'
        },
        geoname_id: 6255149,
        code: 'NA'
      },
      country: {
        names: {
          de: 'Mexiko',
          es: 'México',
          en: 'Mexico',
          fr: 'Mexique',
          ja: 'メキシコ合衆国',
          ru: 'Мексика',
          'zh-CN': '墨西哥',
          'pt-BR': 'México'
        },
        iso_code: 'MX',
        geoname_id: 3996063
      },
      location: {
        time_zone: 'America/Mexico_City',
        accuracy_radius: 20,
        latitude: 19.4342,
        longitude: -99.1386
      },
      maxmind: {
        queries_remaining: 12323
      },
      postal: {
        code: '63000'
      },
      registered_country: {
        geoname_id: 3996063,
        iso_code: 'MX',
        names: {
          es: 'México',
          de: 'Mexiko',
          ru: 'Мексика',
          ja: 'メキシコ合衆国',
          fr: 'Mexique',
          en: 'Mexico',
          'zh-CN': '墨西哥',
          'pt-BR': 'México'
        }
      },
      subdivisions: [
        {
          geoname_id: 3527646,
          iso_code: 'DIF',
          names: {
            en: 'Mexico City',
            es: 'Distrito Federal'
          }
        }
      ],
      most_specific_subdivision: {
        geoname_id: 3527646,
        iso_code: 'DIF',
        names: {
          en: 'Mexico City',
          es: 'Distrito Federal'
        }
      },
      traits: {
        isp: 'Cablevisión, S.A. de C.V.',
        domain: 'cablevision.net.mx',
        ip_address: '189.217.104.79',
        autonomous_system_organization: 'Cablevisión, S.A. de C.V.',
        organization: 'Cablevisión, S.A. de C.V.',
        autonomous_system_number: 28548
      }
    }
  },
  'RESERVED_IP': {
    status: 400,
    data: {
      code: 'IP_ADDRESS_RESERVED',
      error: 'The IP address \'127.0.0.1\' is a reserved IP address (private, multicast, etc.).'
    }
  },
  'INVALID_IP': {
    status: 400,
    data: {
      code: 'IP_ADDRESS_INVALID',
      error: 'Paratemer "ip" is invalid, must be either an IP v4 or v6.'
    }
  },
  'NOT_FOUND': {
    status: 404,
    data: {
      code: 'IP_ADDRESS_NOT_FOUND',
      error: 'The supplied IP address is not in the database.'
    }
  },
  'UNAUTHORIZED': {
    status: 401,
    data: {
      code: 'AUTHORIZATION_INVALID',
      error: 'You have supplied an invalid MaxMind account ID and/or license key in the Authorization header.'
    }
  },
  'UNKNOWN_ERROR': {
    status: 500,
    data: {
      code: '????',
      error: 'Unknown error'
    }
  }
};

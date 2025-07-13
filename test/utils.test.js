const {
  extractTypeAndIdFromUrl,
  mapType,
  mapTypeToTMDB,
  generateTMDBUrl,
  mapTypeToCaptainWatch,
  generateCaptainWatchUrl
} = require('../utils');

describe('extractTypeAndIdFromUrl (CaptainWatch)', () => {
  const domain = 'captainwatch.com';
  const types = ['serie', 'film', 'artiste'];
  it('extrait serie et id', () => {
    expect(extractTypeAndIdFromUrl('https://www.captainwatch.com/serie/93405/squid-game', domain, types)).toEqual({ type: 'serie', id: '93405' });
  });
  it('extrait film et id', () => {
    expect(extractTypeAndIdFromUrl('https://www.captainwatch.com/film/27205/inception', domain, types)).toEqual({ type: 'film', id: '27205' });
  });
  it('extrait artiste et id', () => {
    expect(extractTypeAndIdFromUrl('https://www.captainwatch.com/artiste/138/quentin-tarantino', domain, types)).toEqual({ type: 'artiste', id: '138' });
  });
  it('retourne null si url non valide', () => {
    expect(extractTypeAndIdFromUrl('https://www.google.com', domain, types)).toBeNull();
  });
  it('extrait type et id même si l’URL n’a pas de segment nom', () => {
    expect(extractTypeAndIdFromUrl('https://www.captainwatch.com/serie/93405/', domain, types)).toEqual({ type: 'serie', id: '93405' });
  });
  it('retourne null si id non numérique', () => {
    expect(extractTypeAndIdFromUrl('https://www.captainwatch.com/film/abc/inception', domain, types)).toBeNull();
  });
  it('extrait avec paramètres dans l’URL', () => {
    expect(extractTypeAndIdFromUrl('https://www.captainwatch.com/serie/93405/squid-game?param=test', domain, types)).toEqual({ type: 'serie', id: '93405' });
  });
  it('extrait avec fragment dans l’URL', () => {
    expect(extractTypeAndIdFromUrl('https://www.captainwatch.com/serie/93405/squid-game#fragment', domain, types)).toEqual({ type: 'serie', id: '93405' });
  });
  it('retourne null pour chaîne vide', () => {
    expect(extractTypeAndIdFromUrl('', domain, types)).toBeNull();
  });
  it('retourne null pour null', () => {
    expect(extractTypeAndIdFromUrl(null, domain, types)).toBeNull();
  });
  it('retourne null pour undefined', () => {
    expect(extractTypeAndIdFromUrl(undefined, domain, types)).toBeNull();
  });
});

describe('mapTypeToTMDB', () => {
  it('mappe serie vers tv', () => {
    expect(mapTypeToTMDB('serie')).toBe('tv');
  });
  it('mappe film vers movie', () => {
    expect(mapTypeToTMDB('film')).toBe('movie');
  });
  it('mappe artiste vers person', () => {
    expect(mapTypeToTMDB('artiste')).toBe('person');
  });
});

describe('generateTMDBUrl', () => {
  test('film', () => {
    expect(generateTMDBUrl('https://www.captainwatch.com/film/12345')).toBe('https://www.themoviedb.org/movie/12345');
  });
  test('serie', () => {
    expect(generateTMDBUrl('https://www.captainwatch.com/serie/67890')).toBe('https://www.themoviedb.org/tv/67890');
  });
  test('artiste', () => {
    expect(generateTMDBUrl('https://www.captainwatch.com/artiste/54321')).toBe('https://www.themoviedb.org/person/54321');
  });
  test('type inconnu', () => {
    expect(generateTMDBUrl({ type: 'autre', id: '99999' })).toBeNull();
  });
});

describe('extractTypeAndIdFromUrl (TMDB vers CaptainWatch)', () => {
  test('movie', () => {
    expect(extractTypeAndIdFromUrl('https://www.themoviedb.org/movie/12345', 'themoviedb.org', ['tv', 'movie', 'person'])).toEqual({ type: 'movie', id: '12345' });
  });
  test('tv', () => {
    expect(extractTypeAndIdFromUrl('https://www.themoviedb.org/tv/67890', 'themoviedb.org', ['tv', 'movie', 'person'])).toEqual({ type: 'tv', id: '67890' });
  });
  test('person', () => {
    expect(extractTypeAndIdFromUrl('https://www.themoviedb.org/person/54321', 'themoviedb.org', ['tv', 'movie', 'person'])).toEqual({ type: 'person', id: '54321' });
  });
  test('invalid', () => {
    expect(extractTypeAndIdFromUrl('https://www.themoviedb.org/other/99999', 'themoviedb.org', ['tv', 'movie', 'person'])).toBeNull();
  });
  test('URL CaptainWatch', () => {
    expect(extractTypeAndIdFromUrl('https://www.captainwatch.com/film/12345', 'themoviedb.org', ['tv', 'movie', 'person'])).toBeNull();
  });
});
describe('mapType (générique)', () => {
  it('mappe tv vers serie', () => {
    expect(mapType('tv', { tv: 'serie', movie: 'film', person: 'artiste' })).toBe('serie');
  });
  it('mappe serie vers tv', () => {
    expect(mapType('serie', { serie: 'tv', film: 'movie', artiste: 'person' })).toBe('tv');
  });
  it('retourne null si type inconnu', () => {
    expect(mapType('autre', { tv: 'serie', movie: 'film', person: 'artiste' })).toBeNull();
  });
});

describe('generateCaptainWatchUrl', () => {
  test('film', () => {
    expect(generateCaptainWatchUrl('https://www.themoviedb.org/movie/12345')).toBe('https://www.captainwatch.com/film/12345/');
  });
  test('serie', () => {
    expect(generateCaptainWatchUrl('https://www.themoviedb.org/tv/67890')).toBe('https://www.captainwatch.com/serie/67890/');
  });
  test('artiste', () => {
    expect(generateCaptainWatchUrl('https://www.themoviedb.org/person/54321')).toBe('https://www.captainwatch.com/artiste/54321/-');
  });
  test('type inconnu', () => {
    expect(generateCaptainWatchUrl({ type: 'autre', id: '99999' })).toBeNull();
  });
});

const {
  extractTypeAndId,
  mapTypeToTMDB,
  generateTMDBUrl,
  extractTypeAndIdFromTMDB,
  mapTypeToCaptainWatch,
  generateCaptainWatchUrl
} = require('../utils');

describe('extractTypeAndId', () => {
  it('extrait serie et id', () => {
    expect(extractTypeAndId('https://www.captainwatch.com/serie/93405/squid-game')).toEqual({ type: 'serie', id: '93405' });
  });
  it('extrait film et id', () => {
    expect(extractTypeAndId('https://www.captainwatch.com/film/27205/inception')).toEqual({ type: 'film', id: '27205' });
  });
  it('extrait artiste et id', () => {
    expect(extractTypeAndId('https://www.captainwatch.com/artiste/138/quentin-tarantino')).toEqual({ type: 'artiste', id: '138' });
  });
  it('retourne null si url non valide', () => {
    expect(extractTypeAndId('https://www.google.com')).toBeNull();
  });
  it('extrait type et id même si l’URL n’a pas de segment nom', () => {
    expect(extractTypeAndId('https://www.captainwatch.com/serie/93405/')).toEqual({ type: 'serie', id: '93405' });
  });
  it('retourne null si id non numérique', () => {
    expect(extractTypeAndId('https://www.captainwatch.com/film/abc/inception')).toBeNull();
  });
  it('extrait avec paramètres dans l’URL', () => {
    expect(extractTypeAndId('https://www.captainwatch.com/serie/93405/squid-game?param=test')).toEqual({ type: 'serie', id: '93405' });
  });
  it('extrait avec fragment dans l’URL', () => {
    expect(extractTypeAndId('https://www.captainwatch.com/serie/93405/squid-game#fragment')).toEqual({ type: 'serie', id: '93405' });
  });
  it('retourne null pour chaîne vide', () => {
    expect(extractTypeAndId('')).toBeNull();
  });
  it('retourne null pour null', () => {
    expect(extractTypeAndId(null)).toBeNull();
  });
  it('retourne null pour undefined', () => {
    expect(extractTypeAndId(undefined)).toBeNull();
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

describe('extractTypeAndId (CaptainWatch vers TMDB)', () => {
  test('film', () => {
    expect(extractTypeAndId('https://www.captainwatch.com/film/12345')).toEqual({ type: 'film', id: '12345' });
  });
  test('serie', () => {
    expect(extractTypeAndId('https://www.captainwatch.com/serie/67890')).toEqual({ type: 'serie', id: '67890' });
  });
  test('artiste', () => {
    expect(extractTypeAndId('https://www.captainwatch.com/artiste/54321')).toEqual({ type: 'artiste', id: '54321' });
  });
  test('invalid', () => {
    expect(extractTypeAndId('https://www.captainwatch.com/unknown/99999')).toBeNull();
  });
  test('URL TMDB', () => {
    expect(extractTypeAndId('https://www.themoviedb.org/movie/12345')).toBeNull();
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

describe('extractTypeAndIdFromTMDB (TMDB vers CaptainWatch)', () => {
  test('movie', () => {
    expect(extractTypeAndIdFromTMDB('https://www.themoviedb.org/movie/12345')).toEqual({ type: 'movie', id: '12345' });
  });
  test('tv', () => {
    expect(extractTypeAndIdFromTMDB('https://www.themoviedb.org/tv/67890')).toEqual({ type: 'tv', id: '67890' });
  });
  test('person', () => {
    expect(extractTypeAndIdFromTMDB('https://www.themoviedb.org/person/54321')).toEqual({ type: 'person', id: '54321' });
  });
  test('invalid', () => {
    expect(extractTypeAndIdFromTMDB('https://www.themoviedb.org/other/99999')).toBeNull();
  });
  test('URL CaptainWatch', () => {
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

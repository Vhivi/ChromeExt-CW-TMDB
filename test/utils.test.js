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
  it('retourne null si url sans nom', () => {
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
  // CaptainWatch vers TMDB
  test('extractTypeAndId: film', () => {
    expect(extractTypeAndId('https://www.captainwatch.com/film/12345')).toEqual({ type: 'film', id: '12345' });
  });
  test('extractTypeAndId: serie', () => {
    expect(extractTypeAndId('https://www.captainwatch.com/serie/67890')).toEqual({ type: 'serie', id: '67890' });
  });
  test('extractTypeAndId: artiste', () => {
    expect(extractTypeAndId('https://www.captainwatch.com/artiste/54321')).toEqual({ type: 'artiste', id: '54321' });
  });
  test('extractTypeAndId: invalid', () => {
    expect(extractTypeAndId('https://www.captainwatch.com/unknown/99999')).toBeNull();
  });
  test('generateTMDBUrl: film', () => {
    expect(generateTMDBUrl('https://www.captainwatch.com/film/12345')).toBe('https://www.themoviedb.org/movie/12345');
  });
  test('generateTMDBUrl: serie', () => {
    expect(generateTMDBUrl('https://www.captainwatch.com/serie/67890')).toBe('https://www.themoviedb.org/tv/67890');
  });
  test('generateTMDBUrl: artiste', () => {
    expect(generateTMDBUrl('https://www.captainwatch.com/artiste/54321')).toBe('https://www.themoviedb.org/person/54321');
  });

  // TMDB vers CaptainWatch
  test('extractTypeAndIdFromTMDB: movie', () => {
    expect(extractTypeAndIdFromTMDB('https://www.themoviedb.org/movie/12345')).toEqual({ type: 'movie', id: '12345' });
  });
  test('extractTypeAndIdFromTMDB: tv', () => {
    expect(extractTypeAndIdFromTMDB('https://www.themoviedb.org/tv/67890')).toEqual({ type: 'tv', id: '67890' });
  });
  test('extractTypeAndIdFromTMDB: person', () => {
    expect(extractTypeAndIdFromTMDB('https://www.themoviedb.org/person/54321')).toEqual({ type: 'person', id: '54321' });
  });
  test('extractTypeAndIdFromTMDB: invalid', () => {
    expect(extractTypeAndIdFromTMDB('https://www.themoviedb.org/other/99999')).toBeNull();
  });
  test('generateCaptainWatchUrl: film', () => {
    expect(generateCaptainWatchUrl('https://www.themoviedb.org/movie/12345')).toBe('https://www.captainwatch.com/film/12345/');
  });
  test('generateCaptainWatchUrl: serie', () => {
    expect(generateCaptainWatchUrl('https://www.themoviedb.org/tv/67890')).toBe('https://www.captainwatch.com/serie/67890/');
  });
  test('generateCaptainWatchUrl: artiste', () => {
    expect(generateCaptainWatchUrl('https://www.themoviedb.org/person/54321')).toBe('https://www.captainwatch.com/artiste/54321/-');
  });

  // Cas mixtes et robustesse
  test('extractTypeAndId: URL TMDB', () => {
    expect(extractTypeAndId('https://www.themoviedb.org/movie/12345')).toBeNull();
  });
  test('extractTypeAndIdFromTMDB: URL CaptainWatch', () => {
    expect(extractTypeAndIdFromTMDB('https://www.captainwatch.com/film/12345')).toBeNull();
  });
  test('generateTMDBUrl: type inconnu', () => {
    expect(generateTMDBUrl({ type: 'autre', id: '99999' })).toBeNull();
  });
  test('generateCaptainWatchUrl: type inconnu', () => {
    expect(generateCaptainWatchUrl({ type: 'autre', id: '99999' })).toBeNull();
  });
})

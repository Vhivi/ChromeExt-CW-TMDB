const { extractTypeAndId, mapTypeToTMDB, generateTMDBUrl } = require('../utils');

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
  it('retourne null pour type inconnu', () => {
    expect(mapTypeToTMDB('autre')).toBeNull();
  });
});

describe('generateTMDBUrl', () => {
  it('génère l’URL TMDB pour une série', () => {
    expect(generateTMDBUrl('https://www.captainwatch.com/serie/93405/squid-game')).toBe('https://www.themoviedb.org/tv/93405');
  });
  it('génère l’URL TMDB pour un film', () => {
    expect(generateTMDBUrl('https://www.captainwatch.com/film/27205/inception')).toBe('https://www.themoviedb.org/movie/27205');
  });
  it('génère l’URL TMDB pour un artiste', () => {
    expect(generateTMDBUrl('https://www.captainwatch.com/artiste/138/quentin-tarantino')).toBe('https://www.themoviedb.org/person/138');
  });
  it('retourne null si url non valide', () => {
    expect(generateTMDBUrl('https://www.google.com')).toBeNull();
  });
});

// utils.js
// Fonctions métier pour l’extension CaptainWatch → TMDB

/**
 * Extrait le type de contenu (serie, film, artiste) et l’identifiant numérique d’une URL CaptainWatch.
 *
 * @function extractTypeAndId
 * @param {string} url - L’URL CaptainWatch à analyser.
 * @returns {{type: string, id: string}|null} Un objet contenant le type et l’ID, ou null si l’URL n’est pas valide.
 *
 * @example
 * extractTypeAndId('https://www.captainwatch.com/serie/93405/squid-game');
 * // => { type: 'serie', id: '93405' }
 */
function extractTypeAndId(url) {
  if (typeof url !== 'string') return null;
  const regex = /https:\/\/www\.captainwatch\.com\/(serie|film|artiste)\/(\d+)/;
  const match = url.match(regex);
  if (!match) return null;
  return { type: match[1], id: match[2] };
}

/**
 * Mappe le type CaptainWatch ("serie", "film", "artiste") vers le type TMDB ("tv", "movie", "person").
 *
 * @function mapTypeToTMDB
 * @param {string} type - Le type CaptainWatch à convertir.
 * @returns {string|null} Le type TMDB correspondant, ou null si le type n’est pas reconnu.
 *
 * @example
 * mapTypeToTMDB('serie'); // => 'tv'
 */
function mapTypeToTMDB(type) {
  const typeMap = { serie: 'tv', film: 'movie', artiste: 'person' };
  return typeMap[type] || null;
}

/**
 * Génère l’URL TMDB à partir d’une URL CaptainWatch valide.
 *
 * @function generateTMDBUrl
 * @param {string} url - L’URL CaptainWatch à convertir.
 * @returns {string|null} L’URL TMDB correspondante, ou null si l’URL n’est pas valide ou le type non reconnu.
 *
 * @example
 * generateTMDBUrl('https://www.captainwatch.com/serie/93405/squid-game');
 * // => 'https://www.themoviedb.org/tv/93405'
 */
function generateTMDBUrl(url) {
  const data = extractTypeAndId(url);
  if (!data) return null;
  const tmdbType = mapTypeToTMDB(data.type);
  if (!tmdbType) return null;
  return `https://www.themoviedb.org/${tmdbType}/${data.id}`;
}

module.exports = { extractTypeAndId, mapTypeToTMDB, generateTMDBUrl };

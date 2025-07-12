// utils.js
// Fonctions métier pour l’extension CaptainWatch → TMDB

/**
 * Extrait le type et l’ID d’une URL CaptainWatch
 * @param {string} url
 * @returns {{type: string, id: string}|null}
 */
function extractTypeAndId(url) {
  const regex = /https:\/\/www\.captainwatch\.com\/(serie|film|artiste)\/(\d+)/;
  const match = url.match(regex);
  if (!match) return null;
  return { type: match[1], id: match[2] };
}

/**
 * Mappe le type CaptainWatch vers le type TMDB
 * @param {string} type
 * @returns {string|null}
 */
function mapTypeToTMDB(type) {
  const typeMap = { serie: 'tv', film: 'movie', artiste: 'person' };
  return typeMap[type] || null;
}

/**
 * Génère l’URL TMDB à partir d’une URL CaptainWatch
 * @param {string} url
 * @returns {string|null}
 */
function generateTMDBUrl(url) {
  const data = extractTypeAndId(url);
  if (!data) return null;
  const tmdbType = mapTypeToTMDB(data.type);
  if (!tmdbType) return null;
  return `https://www.themoviedb.org/${tmdbType}/${data.id}`;
}

module.exports = { extractTypeAndId, mapTypeToTMDB, generateTMDBUrl };

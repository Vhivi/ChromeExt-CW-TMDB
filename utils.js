/**
 * Extrait le type et l’ID d’une URL CaptainWatch ou TMDB selon le domaine et les types attendus.
 *
 * @function extractTypeAndIdFromUrl
 * @param {string} url - L’URL à analyser.
 * @param {string} domain - Domaine attendu ("themoviedb.org" ou "captainwatch.com").
 * @param {string[]} types - Tableau des types attendus (ex: ["tv", "movie", "person"] ou ["serie", "film", "artiste"]).
 * @returns {{type: string, id: string}|null} Un objet contenant le type et l’ID, ou null si l’URL n’est pas valide.
 *
 * @example
 * extractTypeAndIdFromUrl('https://www.themoviedb.org/tv/93405', 'themoviedb.org', ['tv','movie','person']);
 * // => { type: 'tv', id: '93405' }
 * extractTypeAndIdFromUrl('https://www.captainwatch.com/serie/93405/squid-game', 'captainwatch.com', ['serie','film','artiste']);
 * // => { type: 'serie', id: '93405' }
 */
function extractTypeAndIdFromUrl(url, domain, types) {
  if (typeof url !== 'string' || typeof domain !== 'string' || !Array.isArray(types)) {
    return null;
  }
  // Construction dynamique du regex selon le domaine et les types
  const typesPattern = types.join('|');
  const regex = new RegExp(`https://www\\.${domain}\\/(${typesPattern})\\/(\\d+)`);
  const match = url.match(regex);
  if (!match) {
    return null;
  }
  return { type: match[1], id: match[2] };
}

/**
 * Mappe le type TMDB (tv, movie, person) vers le type CaptainWatch (serie, film, artiste).
 *
 * @function mapTypeToCaptainWatch
 * @param {string} type - Le type TMDB à convertir.
 * @returns {string|null} Le type CaptainWatch correspondant, ou null si le type n’est pas reconnu.
 *
 * @example
 * mapTypeToCaptainWatch('tv'); // => 'serie'
 */
function mapTypeToCaptainWatch(type) {
  const typeMap = { tv: 'serie', movie: 'film', person: 'artiste' };
  return typeMap[type] || null;
}

/**
 * Génère l’URL CaptainWatch à partir d’une URL TMDB valide.
 * 
 * Vérification du type artiste pour ajouter un tiret à la fin de l’URL CaptainWatch.
 * Il s'agit d'un bug de CaptainWatch qui nécessite un tiret pour les artistes.
 *
 * @function generateCaptainWatchUrl
 * @param {string} url - L’URL TMDB à convertir.
 * @returns {string|null} L’URL CaptainWatch correspondante, ou null si l’URL n’est pas valide ou le type non reconnu.
 *
 * @example
 * generateCaptainWatchUrl('https://www.themoviedb.org/tv/93405');
 * // => 'https://www.captainwatch.com/serie/93405/'
 */
function generateCaptainWatchUrl(url) {
  const data = extractTypeAndIdFromUrl(url, 'themoviedb.org', ['tv', 'movie', 'person']);
  if (!data) {
    return null;
  }
  const cwType = mapTypeToCaptainWatch(data.type);
  if (!cwType) {
    return null;
  }
  if (cwType === 'artiste') {
    return `https://www.captainwatch.com/artiste/${data.id}/-`;
  }
  return `https://www.captainwatch.com/${cwType}/${data.id}/`;
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
  const data = extractTypeAndIdFromUrl(url, 'captainwatch.com', ['serie', 'film', 'artiste']);
  if (!data) {
    return null;
  }
  const tmdbType = mapTypeToTMDB(data.type);
  if (!tmdbType) {
    return null;
  }
  return `https://www.themoviedb.org/${tmdbType}/${data.id}`;
}

// Exportation universelle : Node.js (Jest) et navigateur (Chrome Extension)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    mapTypeToTMDB,
    generateTMDBUrl,
    extractTypeAndIdFromUrl,
    mapTypeToCaptainWatch,
    generateCaptainWatchUrl
  };
}
if (typeof window !== 'undefined') {
  window.mapTypeToTMDB = mapTypeToTMDB;
  window.generateTMDBUrl = generateTMDBUrl;
  window.extractTypeAndIdFromUrl = extractTypeAndIdFromUrl;
  window.mapTypeToCaptainWatch = mapTypeToCaptainWatch;
  window.generateCaptainWatchUrl = generateCaptainWatchUrl;
}
if (typeof self !== 'undefined') {
  self.mapTypeToTMDB = mapTypeToTMDB;
  self.generateTMDBUrl = generateTMDBUrl;
  self.extractTypeAndIdFromUrl = extractTypeAndIdFromUrl;
  self.mapTypeToCaptainWatch = mapTypeToCaptainWatch;
  self.generateCaptainWatchUrl = generateCaptainWatchUrl;
}

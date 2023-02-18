const searchBar = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
const resultList = document.querySelector('.results-list');

// Establishing Event Listeners for each result element
(() => {
  [...resultList.children].forEach((item) => {
    item.addEventListener('click', toggleLyricsClass);
  });
})();

// Event Listeners
searchBtn.addEventListener('click', searchSongs);

// Search Songs
function searchSongs(e) {
  console.log(searchBar.value);
  searchBar.value = '';
}

// Toggle album Display
function toggleLyrics(e) {
  console.log(e.target);
  if (e.target.classList.contains('result')) {
    toggleLyricsClass();
  }
}

function toggleLyricsClass() {
  this.classList.toggle('show-album');
}

// Fetch Song Data
async function fetchSongs() {
  const songData = await fetch(
    'http://ws.audioscrobbler.com/2.0/?method=album.search&album=believe&api_key=17ba43496b63af18f69826bc04d8b940&format=json'
  );
  //   const songData = await fetch(
  //     'http://ws.audioscrobbler.com/2.0/?method=track.search&track=One&api_key=17ba43496b63af18f69826bc04d8b940&format=json'
  //   );
  const parsedSong = await songData.json();
  console.log(parsedSong);
  console.log(await parsedSong.results.albummatches.album[1]);
}

fetchSongs();

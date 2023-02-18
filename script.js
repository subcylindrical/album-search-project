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

// Toggle Lyrics Display
function toggleLyrics(e) {
  console.log(e.target);
  if (e.target.classList.contains('result')) {
    toggleLyricsClass();
  }
}

function toggleLyricsClass() {
  this.classList.toggle('show-lyrics');
}

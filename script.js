const searchBar = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
const resultList = document.querySelector('.results-list');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const pageNum = document.querySelector('.page-number');
let albumMap = new Map();
let page = 1;
let albumSearchCache;

// Event Listeners
searchBtn.addEventListener('click', searchAlbums);
nextBtn.addEventListener('click', getNextPage);
prevBtn.addEventListener('click', getPrevPage);
searchBar.addEventListener('keypress', (e) => {
  console.log(e.key);
  if (e.key == 'Enter') searchAlbums();
});

// Set Visible Page Number & Buttons
function displayPage() {
  if (page <= 1) {
    nextBtn.classList.remove('btn-hidden');
    prevBtn.classList.add('btn-hidden');
  } else {
    nextBtn.classList.remove('btn-hidden');
    prevBtn.classList.remove('btn-hidden');
  }
  pageNum.innerHTML = `~ ${page} ~`;
}

// Pull next page of results
function getNextPage() {
  page++;
  resultList.innerHTML = '';
  fetchAlbums(albumSearchCache);
}

// Pull prev page of results
function getPrevPage() {
  page--;
  resultList.innerHTML = '';
  fetchAlbums(albumSearchCache);
}

// Search Songs
function searchAlbums(e) {
  page = 1;
  resultList.innerHTML = '';
  fetchAlbums(searchBar.value);
  albumSearchCache = searchBar.value;
  searchBar.value = '';
}

// Toggle album Display
function toggleAlbum(e) {
  console.log(e.target);
  if (e.target.classList.contains('result')) {
    toggleAlbumClass();
  }
}

function toggleAlbumClass(e) {
  if (!this.classList.contains('show-album')) {
    this.classList.toggle('show-album');
  } else if (
    e.target.classList.contains('x-btn') ||
    e.target.parentElement.classList.contains('x-btn')
  ) {
    this.classList.toggle('show-album');
  }
}

// Fetch Song Data
async function fetchAlbums(albumPrompt) {
  const albumDatum = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${albumPrompt}&api_key=17ba43496b63af18f69826bc04d8b940&limit=10&page=${page}&format=json`
  );
  const parsedAlbums = await albumDatum.json();
  const albumListArray = parsedAlbums.results.albummatches.album;
  loadSearchResult(albumListArray);
  displayPage();
}

function loadSearchResult(resultArray) {
  resultArray.forEach((item) => {
    const albumEntry = `
    <div class="inner-result-wrapper">
      <span class="album-artist-result"
        ><span class="artist-result">${item.artist}</span>
        <span class="album-result"
          >${item.name}</span
        ></span
      >
      <button class="btn x-btn"><span>x</span></button>
      <button class="btn get-album-btn">See album</button>
    </div>
    <div class="album-data">
      <img src="${item.image[2]['#text']}" class="album-cover" />
      <a href="${item.url}" target="_blank" class="link">Visit on Lastfm</a>
    </div>
        `;
    const newEle = document.createElement('li');
    newEle.classList.add('result');
    newEle.innerHTML = albumEntry;
    resultList.appendChild(newEle);
    newEle.addEventListener('click', toggleAlbumClass);
  });
}

const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const food = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => food.push(...data));

function findMatches(wordToMatch, food) {
  return food.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.name.match(regex) || place.zip.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, food);
  const html = matchArray.map(place => {
      return
      
  }
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', findMatches);
searchInput.addEventListener('keyup', displayMatches);

async function windowActions {

const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';



const request = await fetch(endpoint)
const food = await request.json()

function findMatches(event) {
  return food.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.name.match(regex) || place.zip.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(event.target.value, food);
  const html = matchArray.map(place => {
    const regex = new RegExp(event.target.value, 'gi');
    const placeName = place.name.replace(regex, `<span class="hl">${event.target.value}</span>`);
    const placeZip = place.zip.replace(regex, `<span class="hl">${event.target.value}</span>`);
    return ` 
      <li>
        <span class="name">${placeName}, ${placeZip}</span>
      </li>
      `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', findMatches);
searchInput.addEventListener('keyup', (evt) => { displayMatches(evt) });
}

window.onload = windowActions;
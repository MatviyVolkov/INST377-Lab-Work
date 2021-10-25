async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const request = await fetch(endpoint);
  const restaurant = await request.json();
  const mymap = L.map('mapid').setView([38.989, -76.938], 10);
  const token = pk.eyJ1IjoibXlhdGh1IiwiYSI6ImNrdjYwNmtxNTUyd2kydnBnMWFqOGxlZzAifQ.jBS2Nkz8Wcg9JIYT_i_kRg

  L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${token}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
  }).addTo(mymap);




  function findMatches(wordToMatch, restaurant) {
    return restaurant.filter(place => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.name.match(regex) || place.zip.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, restaurant);
    matchArray = matchArray.slice(0, 5);
    const html = matchArray.map((place) => {
      return `
      <li><div>${place.name}</div></li>
      <div>${place.address_line_1}</div>
      <div>${place.city} - ${place.zip}</div>
      <br>  `;
    }).join('');
    suggestions.innerHTML = html;
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });

}

window.onload = windowActions;






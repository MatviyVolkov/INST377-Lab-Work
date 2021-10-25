async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const request = await fetch(endpoint);
  const restaurant = await request.json();
  const mymap = L.map('mapid').setView([38.989, -76.93], 12);
  let itemCounter = 0;

  function mapInit() {
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoibXlhdGh1IiwiYSI6ImNrdjYwNmtxNTUyd2kydnBnMWFqOGxlZzAifQ.jBS2Nkz8Wcg9JIYT_i_kRg'
    }).addTo(mymap);
    return mymap
  }
  mapInit()

  function findMatches(wordToMatch, restaurant) {
    return restaurant.filter(place => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.name.match(regex) || place.zip.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, restaurant);
    const html = matchArray.map(place => {
      if (!event.target.value || itemCounter > 4) {
        document.querySelector('.suggestions').innerHTML = '';
      } else {
        itemCounter += 1;
      const regex = new RegExp(event.target.value, 'gi');
      const placeName = place.name;
      const addressName = place.address_line_1;
      const cityName = place.city;
      const zipName = place.zip;
      const point = place.geocoded_column_1;
      const latLong = point.coordinates;
      const marker = latLong.reverse();
      L.marker(marker).addTo(mymap);
      return `
      <li>
      <span class="name">${placeName}</span> 
      <span class="name">${addressName}</span>
      <span class="name">${cityName}</span>
      <span class="name">${zipName}</span>
      </li>
      `;
    }
  }).join('');
    suggestions.innerHTML = html;
    itemCounter = 0;
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
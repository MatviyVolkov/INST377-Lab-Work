async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const request = await fetch(endpoint);
  const restaurant = await request.json();
  const mymap = L.map('mapid').setView([38.989, -76.93], 12);
  const limitedList = filteredList.slice(0, 5);

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

  limitedList.forEach((place, index) => {
    const coordinates = place.hasOwnProperty('geocoded_column_1');
    if (coordinates) {
      const latlong = place.geocoded_column_1.coordinates;
      const marker = latlong.reverse();
      markers.push(L.marker(marker).addTo(mymap));
      if (index === 0) mymap.setView(marker);
    }
  });
  return limitedList

  function findMatches(zip, data, mymap) {
    const filteredList = data.filter((place) => place.zip.startsWith(zip));
  }

  function displayMatches(event) {
    markers.forEach((marker) => {
      marker.remove();
    });
    if (event.target.value.length !== 0) {
      const matchArray = findMatches(event.target.value, data, mymap);
      console.log(matchArray);
      const html = matchArray
        .map((place) => `<li class= "box">
        <span class="name"> ${place.name} </span><br>
        <i>${place.address_line_1} <br>
        ${place.zip}</i>
        </li>`).join('');
      suggestions.innerHTML = html;
    } else {
      suggestions.innerHTML = '';
    }
  }}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// searchInput.addEventListener('change', displayMatches);
// searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });

// window.onload = windowActions;
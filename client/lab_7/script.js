async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const request = await fetch(endpoint);
  const restaurant = await request.json();
  const mymap = L.map('mapid').setView([38.989, -76.93], 12);

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

  function slicedMaches(event, data) {
    const matchArray = findMatches(event.target.value, data).slice(0, 5);
    return matchArray;
  }

  function findMatches(wordToMatch, restaurant) {
    return restaurant.filter(place => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.zip.match(regex);
    });
  }

  function removeMarkers(newmap) {
    newmap.eachLayer((layer) => {
      if (Object.keys(layer.options).length === 0) {
        console.log(layer);
        newmap.removeLayer(layer);
      }
    });
    
    function addMarker(matchArray,mymap) {
      removeMarkers(mymap);
      matchArray.forEach((element) => {
        console.log(element.geocoded_column_1.coordinates);
        const point = element.geocoded_column_1;
        if (!point || !point.coordinates) {
          return map();
        }
        const marker = latLong.reverse();
        const coordinates = point.coordinates;
        L.marker(marker).addTo(mymap);
      });

  function displayMatches(event) {
    return ` 
    <li>
    <div class="box">
    <span class="name"><b>${nameName}</b></span> 
    <br>
    <span class="name"> <em>${addressName}</em></span>
    <br>
    </div>
    </li>
    `;}.join('');
    suggestions.innerHTML = html;

  

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
}

window.onload = windowActions;

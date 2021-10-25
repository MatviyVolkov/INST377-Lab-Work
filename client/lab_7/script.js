async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const request = await fetch(endpoint);
  const restaurant = await request.json();
  const mymap = L.map('mapid').setView([38.989, -76.938], 10);
  const token = 'pk.eyJ1IjoibXlhdGh1IiwiYSI6ImNrdjYwNmtxNTUyd2kydnBnMWFqOGxlZzAifQ.jBS2Nkz8Wcg9JIYT_i_kRg'

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={AccessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    AccessToken: ''pk.eyJ1IjoibXlhdGh1IiwiYSI6ImNrdjYwNmtxNTUyd2kydnBnMWFqOGxlZzAifQ.jBS2Nkz8Wcg9JIYT_i_kRg''
    }).addTo(mymap);

    function removeMarker(mymap){
      mymap.eachLayer(function(layer){
        if(Object.keys(layer.options).length === 0)
        {
          console.log(layer);
          mymap.removeLayer(layer);
        }})};

  function findMatches(wordToMatch, restaurant) {
    return restaurant.filter(place => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.name.match(regex) || place.zip.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, cities, mymap);
    sliceArray = matchArray.slice(0, 5);
    removeMarkers(mymap);
    sliceArray.forEach((place) => {
      const point = place.geocoded_column_1;
      if (!point || !point.coordinates) {
        console.log(place);
        return;
    })
    suggestions.innerHTML = html;
    const coordinates = point.coordinates;
    const marker = latlong.reverse();
    L.marker(marker).addTo(mymap);
  }

  const html = sliceArray.map((place) => { return `
  <li><div>${place.name}</div></li>
  <div>${place.address_line_1}</div>
  <div>${place.city} - ${place.zip}</div> `
}).join('')

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });    

}

window.onload = windowActions;






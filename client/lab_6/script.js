async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const request = await fetch(endpoint);
  const restaurant = await request.json();

  function findMatches(wordToMatch, restaurant) {
    return restaurant.filter(place => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.name.match(regex) || place.zip.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, restaurant);
    const html = matchArray.map(place => {
      const regex = new RegExp(event.target.value, 'gi');
      const placeName = place.name;
      const addressName = place.address_line_1;
      const cityName = place.city;
      const zipName = place.zip;
      return `
      <li>
      <span class="name">${placeName}</span> 
      <span class="name">${addressName}</span>
      <span class="name">${cityName}</span>
      <span class="name">${zipName}</span>
      </li>
      `;
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






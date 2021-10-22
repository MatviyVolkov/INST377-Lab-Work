const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const food = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => food.push(...data));




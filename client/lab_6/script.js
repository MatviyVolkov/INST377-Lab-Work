<script>
const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'

const food = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => food.push(...data))

function findMatches(wordToMatch, food) {
    return food.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return name.food.match(regex) || zip.food.match(regex)
    }); 
    
}

</script>
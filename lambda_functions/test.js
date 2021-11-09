// test script


var xhr = new XMLHttpRequest();
xhr.open("POST", "/.netlify/functions/pokemon", true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({
    name: "Pikachu",
    number: 25,
}));

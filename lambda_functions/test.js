// test script
console.log("test");
const postRequest =  fetch("/.netlify/functions/pokemon", {
    method: "POST",
    body: JSON.stringify({
      name: "Pikachu",
      number: 25,
    }),
  });
  
  console.log("POST request status code", postRequest.status);

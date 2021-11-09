// test script
import fetch from "node-fetch";

const postRequest = await fetch("/.netlify/functions/pokemon", {
    method: "POST",
    body: JSON.stringify({
      name: "Pikachu",
      number: 25,
    }),
  });
  
  console.log("POST request status code", postRequest.status);
  
  const newGetRequest = await fetch("/.netlify/functions/pokemon");
  const newListJson = await newGetRequest.json();
  
  console.log("GET request new result", newListJson);
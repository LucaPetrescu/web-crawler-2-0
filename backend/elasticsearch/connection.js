const { Client } = require("@elastic/elasticsearch");

var client = new Client({
  node: "https://companies.es.us-central1.gcp.cloud.es.io",
  cloud: {
    id: "companies:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyQzZDU1MTU5YTA4YWE0ZTBiOTE3N2I0YzMzZWE5NzJiMiQ3ZDk5YWMyNmY5ZTQ0M2ViOGFiNTRkNThiY2ZlYzhkNA==",
  },
  auth: {
    username: "elastic",
    password: "Yt4u2ESrWK9oB8XDxuta34vY",
  },
});

module.exports = client;

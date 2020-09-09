const localStorageKey = "API_KEY"
function network({binId : endpoint = "", binName}, {body, ...customConfig} = {}) {
  const API_KEY = localStorage.getItem(localStorageKey);
  const COLLECTION_ID = "5f1d6d37c58dc34bf5dafba4";
  const baseUrl = "https://api.jsonbin.io/v3/b";

  const headers = {
    "Content-Type": "application/json",
    "X-COLLECTION-ID": COLLECTION_ID,
    "X-Master-Key": API_KEY,
    "X-Bin-Name": binName
  };

  const url = `${baseUrl}/${endpoint}`;

  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  console.log(`Sending ${config.method} to ${url} with data:`, body);

  return fetch(url, config).then(async (response) => {
    if (response.status === 401) {
      logout();
      location.assign(location);
      return;
    }
    const data = await response.json();
    if (response.ok) {
      console.log(`Got response ${response.status}`, data);
      return data;
    } else {
      console.error(`${response.status} : '${data.message}'`);
      return Promise.reject(`${response.status} : '${data.message}'`);
    }
  });
}

network.put = (id, options) => network(id, {method: "PUT", ...options});
network.post = (id, options) => network(id, {method: "POST", ...options});
network.get = (id, options) => network(id, {method: "GET", ...options});
network.delete = (id, options) => network(id, {method: "DELETE", ...options});

function logout() {
  localStorage.removeItem(localStorageKey);
}
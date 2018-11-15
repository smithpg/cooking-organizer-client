/**
 * DEFINE THE API URL HERE
 */

const hostname = window && window.location && window.location.hostname;

const apiURL = hostname.includes("localhost")
  ? "http://localhost:8070"
  : "https://cooking-organizer.herokuapp.com";

export default function apiCall(method, path, data) {
  return new Promise((resolve, reject) => {
    path = apiURL + path;

    // Create a config object for the Fetch call
    let configObj = { method, mode: "cors" };
    if (data) {
      configObj.body = JSON.stringify(data);
    }

    console.log(configObj);
    configObj.headers = { "Content-Type": "application/json" };
    if (localStorage.jwtToken) {
      configObj.headers["Authorization"] = "Bearer " + localStorage.jwtToken;
    }

    return fetch(path, configObj)
      .then(async res => {
        if (res.ok) {
          return res.json();
        }

        // if !res.ok, a server error has occured
        const parsed = await res.json();
        throw new Error(parsed.error.message);
      })
      .catch(err => {
        reject(err);
      })
      .then(json => {
        resolve(json);
      });
  });
}

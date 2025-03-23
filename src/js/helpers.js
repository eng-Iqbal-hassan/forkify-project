// Lecture 10:
//  This file will contain the functions which we will use over and over again in our project
// like we are getting the JSON so many times from our fetch request, so this thing will be place in a function over here and will be use again and again

import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// This function will fail the request after sometime to avoid it running forever. As in normal the case of bad internet connection and data is not coming from API.
// so this thing will be done by the race between setTimeout and fetch request. And whatever will win the race will occur first
// so this thing will be achieved by promise.race method

export const getJSON = async function (url) {
  try {
    // const res = await fetch(url);
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new error(`${data.message} ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};
// ok the thing is that if the data is not coming within 5 second then the timeout function will be the winner and in this function there is the error and this error will be thrown below and fetch request is no longer running.

// Up till this point simply with the fetch request, we pass the url then it automatically make the get request for getting the data from API.
// But when we have to pass the data to the API then we have to make the post request.
// so in post request, we have to pass some more value along with API url. there is one object in which we tell about the method which is post method and an header in which additional information is shared, the most important is Content-Type, by which we tell the API we are giving the data in json format, only then API allow us to send data to it. And in the last in the body data is send which is accepted as second parameter of the function. and everything next is same as that in get request

export const sendJSON = async function (url, uploadData) {
  try {
    // const res = await fetch(url);
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData), //This is also called the payload of the request.
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new error(`${data.message} ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};

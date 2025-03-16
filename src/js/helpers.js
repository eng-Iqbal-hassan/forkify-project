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
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new error(`${data.message} ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};
// ok the thing is that if the data is not coming within 5 second then the timeout function will be the winner and in this function there is the error and this error will be thrown below and fetch request is no longer running.

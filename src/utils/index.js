import uuid from "uuid";
import { debounce } from "lodash";

import api from "./api";
import browser from "./browser";
import states from "./states";

const agencyApi = (args) => api({ app: "agent", ...args });
const platformApi = (args) => api({ app: "platform", ...args });

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}

function debounceEventHandler(...args) {
  const debounced = debounce(...args);
  return function (e) {
    e.persist();
    return debounced(e);
  };
}

function generateRandomString() {
  return uuid.v4();
}

export {
  debounceEventHandler,
  fileToBase64,
  agencyApi,
  platformApi,
  browser,
  generateRandomString,
  states,
};

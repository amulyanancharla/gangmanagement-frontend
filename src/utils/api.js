import { browser, generateRandomString } from "./index";

const BASE_URI =
  "http://gangmanagementservice-env.eba-xwdd8dtq.us-east-2.elasticbeanstalk.com/v1";
// "http://localhost:5000/v1";

export async function parseJsonResponse(response) {
  let json = null;

  try {
    json = await response.json();
  } catch (e) {
    // TODO Do something if response has no, or invalid JSON
  }

  if (response.ok) {
    return json;
  }

  const error = new Error(response.statusText);

  error.isFromServer = true;
  error.response = response;
  error.message = json.error;
  error.errors = json.errors;
  error.responseJson = json;

  throw error;
}

export default async ({
  path,
  body,
  method = "POST",
  headers = {},
  app,
  contentType = "json",
  stringify = true,
  thirdPartyApi = false,
}) => {
  const uri = thirdPartyApi ? path : `${BASE_URI}/${path}`;

  const token = thirdPartyApi ? false : localStorage.getItem(`${app}_jwt`);

  if (token) {
    headers = { ...headers, "X-Access-Token": token };
  }

  // eslint-disable-next-line no-param-reassign
  if (contentType === "json") {
    headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    };
  } else if (contentType === "multipart") {
    headers = {
      ...headers,
    };
  }

  let fetchProperties = {
    method,
    headers,
  };

  if (body && contentType === "json") {
    fetchProperties = {
      ...fetchProperties,
      body:
        stringify === false
          ? body
          : JSON.stringify({
              ...body,
              device: {
                browser_settings: {
                  type: "Chrome",
                },
                device_type: "BROWSER",
                device_id: generateRandomString(),
              },
            }),
    };
  } else if (body && contentType === "multipart") {
    fetchProperties = {
      ...fetchProperties,
      body,
    };
  }

  const response = await fetch(uri, fetchProperties);

  return parseJsonResponse(response);
};

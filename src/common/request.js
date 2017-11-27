let request = {};

function req(method, url, data, headers) {
  let config = {
    credentials: 'include',
    method: method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  };
  if (method == "get") {
    if (url.indexOf("?") > 0) {
      url = url + "&" + getParams(data);
    } else {
      url = url + "?" + getParams(data);
    }
  }
  if (method == "post") {
    config.body = getParams(data)
  }
  return fetch(url, config);
}

request.get = function (url, data) {
  return req("get", url, data, {});
}
request.getJson = async function (url, data) {
  try {
    let res = await req("get", url, data);
    return res.json();
  } catch (e) {
    console.log(e);
    return {
      code: -1
    };
  }
}
request.post = function (url, data, headers) {
  return req("post", url, data, headers);
}
request.postJson = async function (url, data, headers) {
  try {
    let res = await req("post", url, data, headers);
    return res.json();
  } catch (e) {
      console.log(e);
    return {
      code: -1
    };
  }
}

function getParams(data) {
  if (data) {
    let arr = [];
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const item = data[key];
        arr.push(key + "=" + item);
      }
    }
    return arr.join("&");
  }
  return "";
}

export default request

import Cookie from "js-cookie";

// Cấu hình base URL
const BASE_URL = "https://localhost:7242/api/";

// Hàm fetchWithAuth
export const fetchWithAuth = async (
  endpoint,
  options = {},
  failCallBack = () => {}
) => {
  const token = Cookie.get("token");
  const url = `${BASE_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  // Thiết lập cấu hình cho fetch
  const config = {
    method: options.method || "POST", // Mặc định là GET
    headers: headers,
  };
  // Nếu có body, chuyển đổi thành JSON
  if (options.body) {
    config.body = JSON.stringify(options.body);
  }
  const response = await fetch(url, config);

  if (["401"].includes(response.status.toString())) {
    console.log("Error while fetching", response);
    if (failCallBack) failCallBack();
    window.location.href = "/Login";
    return response;
  } else {
    const data = await response.json();
    return { code: response.status, data: data };
  }
};
export const fetchApi = async (endpoint, options = {}, failCallBack = null) => {
  const url = `${BASE_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Thiết lập cấu hình cho fetch
  const config = {
    method: options.method || "GET", // Mặc định là GET
    headers,
    ...options,
  };

  // Nếu có body, chuyển đổi thành JSON
  if (options.body) {
    config.body = JSON.stringify(options.body);
  }
  const response = await fetch(url, config);

  if (["401"].includes(response.status.toString())) {
    console.log("Error while fetching", response);
    if (failCallBack) failCallBack();
    return response;
  } else {
    const data = await response.json();
    return { code: response.status, data: data };
  }
};
export const fetchForm = async (
  endpoint,
  options = {},
  failCallBack = () => {}
) => {
  const token = Cookie.get("token");
  const url = `${BASE_URL}${endpoint}`;

  const headers = {
    // "Content-Type": "multipart/form-data",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  // Thiết lập cấu hình cho fetch
  const config = {
    method: options.method || "POST", // Mặc định là GET
    headers: headers,
  };
  // Nếu có body, chuyển đổi thành JSON
  if (options.body) {
    config.body = options.body;
  }
  const response = await fetch(url, config);

  if (["401"].includes(response.status.toString())) {
    console.log("Error while fetching", response);
    if (failCallBack) failCallBack();
    window.location.href = "/Login";
    return response;
  } else {
    const data = await response.json();
    return { code: response.status, data: data };
  }
};
export const getWithAuth = async (endpoint, data, failCallBack = null) => {
  const token = Cookie.get("token");
  const url = `${BASE_URL}${endpoint}${data ? "?" + data : ""}`;

  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Thiết lập cấu hình cho fetch
  const config = {
    method: "GET",
    headers,
  };

  const response = await fetch(url, config);

  if (["401"].includes(response.status.toString())) {
    console.log("Error while fetching", response);
    if (failCallBack) failCallBack();
    return response;
  } else {
    const data = await response.json();
    return { code: response.status, data: data };
  }
};
export default fetchWithAuth;

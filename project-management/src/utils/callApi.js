import Cookie from "js-cookie";

// Cấu hình base URL
const BASE_URL = "https://localhost:7242/api/";

// Hàm fetchWithAuth
export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = Cookie.get("token");
  const url = `${BASE_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

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

  if (!response.ok) {
    console.log("Error while fetching", response);
  }
console.log("LTA",response);

  try {
    return response.json();
  } catch (error) {
    return response;
  }
};
export const fetchApi = async (endpoint, options = {}, successCallback = null, failCallBack = null) => {
  
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

  if (!response.ok) {
    console.log("Error while fetching", response);
    if(failCallBack) failCallBack();
  }

  try {
    return response.json();
  } catch (error) {
    return response;
  }
};
export default fetchWithAuth;

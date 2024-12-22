import axios from "axios";

const API_URI = "http://localhost:8000";

axios.interceptors.response.use(
  (response) => {
    console.log("Simulated API call success:", response);
    return response;
  },
  (error) => {
    console.log("Simulated API call error:", error);
    return Promise.reject(error);
  }
);

const API_GMAIL = async (serviceUrlObject, requestData = {}, type = "") => {
  if (!serviceUrlObject || !serviceUrlObject.method) {
    console.error("Invalid serviceUrlObject:", serviceUrlObject);
    return; // Safely exit if undefined
  }

  const { params, urlParams, ...body } = requestData;

  try {
    const response = await axios({
      method: serviceUrlObject.method,
      url: `${API_URI}/${serviceUrlObject.endpoint}/${type}`,
      data: requestData,
    });
    console.log("API call success:", response.data);
    return response;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};

export default API_GMAIL;

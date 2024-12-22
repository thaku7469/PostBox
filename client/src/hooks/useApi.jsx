import { useState } from "react";
import API_GMAIL from "../api/Api";

const useApi = (urlObject) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const call = async (payload, type = "") => {
    setResponse(null);
    setIsLoading(true);
    setError("");

    try {
      console.log("Calling API with:", urlObject);
      let res = await API_GMAIL(urlObject, payload, type);
      setResponse(res.data);
    } catch (error) {
      console.error("API call error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { call, response, error, isLoading };
};

export default useApi;

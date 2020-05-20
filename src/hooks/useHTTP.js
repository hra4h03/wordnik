import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const request = useCallback(
    async (url, method = "get", body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
        }
        // headers["Content-Type"] = "application/json";
        const response = await fetch(url, { method, headers, body });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "error");
        }

        setLoading(false);
        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );
  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};

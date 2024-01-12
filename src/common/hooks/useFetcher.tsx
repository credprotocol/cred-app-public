import axios, { AxiosError } from "axios";
import { useCallback, useContext, useEffect, useState } from "react";

import { AppContext } from "../context/app.context";

function useFetch(url: string, tokenRequire = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError>(null);
  const { auth } = useContext(AppContext);

  const fetch = useCallback(
    (signal) => {
      if (tokenRequire) {
        if (!auth) return;
      }
      const authHeader = auth
        ? { headers: { Authorization: "Bearer " + auth.accessToken } }
        : {};

      const currentUrl = new URL(window.location.href);
      const utmSource = currentUrl.searchParams.get("utm_source");

      const urlWithParams = new URL(url);
      urlWithParams.searchParams.append("utm_source", utmSource);

      setLoading(true);
      axios
        .get(urlWithParams.toString(), {
          ...authHeader,
          signal,
        })
        .then((response) => {
          setData(response.data);
          setLoading(false);
          setError(null);
        })
        .catch((err) => {
          if (err.code !== "ERR_CANCELED") {
            setError(err);
            setLoading(false);
          }
        });
    },
    [auth, tokenRequire, url]
  );

  useEffect(() => {
    const controller = new AbortController();
    if (!url) {
      setLoading(false);
      setData(null);
      setError(null);
    } else {
      fetch(controller.signal);
    }

    return () => {
      controller.abort();
    };
  }, [url, auth, fetch]);

  return { data, loading, error, refetch: fetch };
}

export default useFetch;

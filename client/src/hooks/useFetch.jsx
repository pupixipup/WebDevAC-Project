import { useAuthContext } from "./useAuthHooks";
import { useState, useEffect  } from "react";

export const useFetch = ({ url, options, isAuth, callback, parameters, deps }) => {
  const { token } = useAuthContext();
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  if (typeof options === "object" && isAuth) {
    options = {  
      credentials: 'include',
      headers: {
      Authorization: token
    }, ...options }
  }
  let retreive = () => null;
  if (url) {
  const fetchUrl = url.startsWith("/") ? import.meta.env.VITE_BASE_URL + url : url;
  const params = typeof parameters === "object" ? "?" + (new URLSearchParams(parameters)).toString() : "";
   retreive = async () => {
    try {
      const response = await fetch(fetchUrl + params, options)
      const contentType = response.headers.get("content-type");
      let data;
      if (contentType.includes("application/json")) {
        data = await response.json()
      } else {
        data = await response.text()
      }
      callback && callback(data)
      setData(data)
    } catch (err) {
      callback && callback(err)
      setError(err)
    }
  }
}
  useEffect(() => {
    retreive()
  }, [deps])

  const invalidate = () => retreive()
  return [data, error, invalidate]
}
/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export default function ReturnUserLoged() {
  const [data, setData] = useState(false);

  const { getAccessTokenSilently } = useAuth0();
  const loadertoken = () => {
    getAccessTokenSilently().then((res) => {
      var decoded = jwt_decode(res);
      setData(decoded);    
      
    });
  };


  useEffect(() => {
    loadertoken();
  }, [getAccessTokenSilently]);

  if (data) {
    return data["https://my-domain.com/roles"][0];
  }

  return null;
}

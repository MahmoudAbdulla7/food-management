import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let AuthContext = createContext(null);

export default function AuthContextProvider(props) {
  const url = `https://upskilling-egypt.com:443/api/v1/`;
  let Authorization =`Bearer ${localStorage.getItem("userTkn")}`


  let [userData, setUserData] = useState(null);

  function saveUserData() {
    let encodedData = localStorage.getItem("userTkn");
    let decodedTkn = jwtDecode(encodedData);
    setUserData(decodedTkn);
  }

  useEffect(() => {
    if (localStorage.getItem("userTkn")) {
      saveUserData();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userData, saveUserData,url,Authorization }}>
      {props.children}
    </AuthContext.Provider>
  );
}

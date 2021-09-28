import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const UserContext = createContext({
  info: { user: null, isLoading: true },
});

const UserProvider = (props) => {
  const behost = process.env.REACT_APP_BACKEND_HOST;
  const [info, setInfo] = useState({ user: null, isLoading: true });
  const fetchInfo = () => {
    axios.get(`${behost}auth/status`).then((res) => {
      if (res.data.user) {
        setInfo({ user: res.data.user, isLoading: false });
      } else {
        setInfo({ user: null, isLoading: false });
      }
    });
  };
  useEffect(() => {
    fetchInfo();
  }, []);
  return (
    <UserContext.Provider value={{info,fetchInfo}}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { register, login, me } from '../services/authService';

export const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const isUserLoggedIn = async () => {
    const token = localStorage.getItem("accessToken");
    if(token != null) {
       const response = await me(token);
       const json = await response.json();
       if(json.statusCode == 200) {
        setUser(json.data);
        setLoggedIn(true);
       }
    }
  }

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  let history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    id: 0,
    email: '',
    fullName: '',
    phoneNumber: '',
    content: '',
    avatarImage: {
      avatarUrl: '',
      backgroundUrl: '',
    },
    location: {
      street: '',
      ward: '',
      district: '',
      city: '',
    }
  });

  const signIn = async (params) => {
    const response = await login(params);
    const json = await response.json();
    if (json.data != null) {
      console.log(json.data, 'sign in form Props');
      setUser(json.data.user);
      setLoggedIn(true);
      localStorage.setItem("accessToken", json.data.accessToken)
      history.push(`/`);
    }
  };

  const signUp = async (params) => {
    const response = await register(params);
    const json = await response.json();
    if (json.data != null) {
      history.push(`/sign-in`);
    }
  };

  const logOut = () => {
    setUser(null);
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        isUserLoggedIn,
        logOut,
        signIn,
        signUp,
        user,
      }}
    >
      <>{props.children}</>
    </AuthContext.Provider>
  );
};

export default AuthProvider;

import AuthService from "../Service/AuthService";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      console.log("data.user: " + data.user);
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
    });
  }, []);

  return (
    <div>
      {!isLoaded ? (
        <div>
          {/* <h1>Loading...</h1> */}
          <img
            className="loading_image"
            src="https://media3.giphy.com/media/PhIVSuv73eW98i931o/giphy.gif?cid=ecf05e476f47dbf0a8fa9746d85000bb3e6b585bfb9ad3c6&rid=giphy.gif"
          ></img>
        </div>
      ) : (
        <AuthContext.Provider
          value={{
            user,
            setUser,
            isAuthenticated,
            setIsAuthenticated,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};

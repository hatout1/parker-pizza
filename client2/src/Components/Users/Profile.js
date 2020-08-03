import React from "react";
import axios from "axios";
import { useState } from "react";

function Profile(e) {
  const [user, setUser] = useState("");

  const information = (e) => {
    // e.preventDefault();
    axios.get("/all", (req, res) => {
      let setUser = res.data;
      console.log(setUser);
    });
  };
  information();

  return (
    <div className="loginDiv">
      <div className="loginContainer">
        <div className="form-groupDiv">
          <div className="inputRow">
            <h3>photo</h3>
          </div>
          <div className="inputRow">
            <h3>username:</h3>
            <h3>email:</h3>
          </div>
          <div className="inputRow">
            <h3>first name</h3>
          </div>
          <div className="inputRow">
            <h3>last name</h3>
          </div>
          <div className="inputRow">
            <h3>Account type</h3>
            <h3>company name</h3>
          </div>
          <div className="inputRow">
            <h3>address</h3>
            <h3>city</h3>
          </div>
          <div className="inputRow">
            <h3>zipcode</h3>
            <h3>state</h3>
          </div>
          <div className="inputRow">
            <h3>phone number</h3>
          </div>

          <div className="signupBtn">
            <button
              className="btn btn-dark btn-lg btn-block mt-4"
              type="update"
            >
              update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

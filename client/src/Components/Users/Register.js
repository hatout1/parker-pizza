import React, { useEffect, useRef, useState } from "react";

import Message from "../../Message/Message";
import AuthService from "../../Service/AuthService";

const Register = (props) => {
  const [user, setUser] = useState({ username: "", password: "", email: "" });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({
      username: "",
      password: "",
      email: "",
      role: "",
      firstName: "",
      lastName: "",
      companyName: "",
      category: "",
      address: "",
      phoneNumber: "",
      userRelation: "",
      city: "",
      state: "",
      zipcode: "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.register(user).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push("/home");
        }, 2000);
      }
    });
  };

  return (
    <div className="loginDiv">
      <div className="loginContainer">
        <div className="title">
          <h2 className="h2">This is registration page</h2>
        </div>
        <form className="formDiv" onSubmit={onSubmit}>
          <div className="form-groupDiv">
            <div className="inputRow">
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={onChange}
                className="input"
                placeholder="First Name"
              />
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={onChange}
                className="input"
                placeholder="Last Name"
              />
            </div>
            <div className="inputRow">
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={onChange}
                className="input"
                placeholder="Enter email"
              />
            </div>
            <div className="inputRow">
              <input
                className="input"
                type="text"
                name="username"
                value={user.username}
                onChange={onChange}
                placeholder="Enter username"
              />
            </div>
            <div className="inputRow">
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={onChange}
                className="input"
                placeholder="Enter Password"
              />
              <input
                type="password"
                name="password2"
                value={user.password2}
                onChange={onChange}
                className="input"
                placeholder="Confirm Password"
              />
            </div>
            <div className="inputRow">
              <input
                type="text"
                name="address"
                value={user.address}
                onChange={onChange}
                className="input"
                placeholder="Enter your address"
              />
              <input
                type="text"
                name="city"
                value={user.city}
                onChange={onChange}
                className="input"
                placeholder="Enter your city"
              />
            </div>
            <div className="inputRow">
              <input
                type="text"
                name="zipcode"
                value={user.zipcode}
                onChange={onChange}
                className="input"
                placeholder="Zip code"
              />
              <input
                type="text"
                name="state"
                value={user.state}
                onChange={onChange}
                className="input"
                placeholder="State"
              />
            </div>
            <div className="inputRow">
              <input
                type="text"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={onChange}
                className="input"
                placeholder="Phone number"
              />
            </div>

            <div className="inputRow">
              <select
                type="text"
                name="category"
                value={user.category}
                onChange={onChange}
                className="input"
                placeholder="Account Type"
              >
                <option selected value="">
                  Select Account Type
                </option>
                <option value="personal">Personal</option>
                <option value="business">Business</option>
              </select>
            </div>
            <div className="signupBtn">
              <button
                className="btn btn-dark btn-lg btn-block mt-4"
                type="submit"
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Register;

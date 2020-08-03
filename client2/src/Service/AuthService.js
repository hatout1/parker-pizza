export default {
  login: (user) => {
    console.log(user);
    return fetch("/login", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return { isAuthenticated: false, user: { username: "" } };
    });
  },
  productSet: (FormData) => {
    console.log("FormData: " + FormData);
    return fetch("/api/ProductsSetting", {
      method: "post",
      body: JSON.stringify(FormData),
      // headers: {
      //   "Content-Type": "application/json",
      //   "Content-Type": "multipart/form-data",
      // Accept: "application/json",
      // },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
  register: (user) => {
    console.log(user);
    return fetch("/register", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
  logout: () => {
    return fetch("/logout")
      .then((res) => res.json())
      .then((data) => data);
  },
  isAuthenticated: () => {
    return fetch("/authenticated").then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return { isAuthenticated: false, user: { username: "", role: "" } };
    });
  },
};

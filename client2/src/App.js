import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import Contact from "./Components/Contact";
import Events from "./Components/Events";
import Home from "./Components/Home";
import Headers from "./Components/Layout/Header";
import Navbar from "./Components/Layout/Navbar";
import Invoices from "./Components/Operations/Invoices";
import OrderRequest from "./Components/Operations/OrderRequest";
import ProductsSetting from "./Components/ProductsSetting";
import Login from "./Components/Users/Login";
import PortfolioSetting from "./Components/Users/PortfolioSetting";
import Profile from "./Components/Users/Profile";
import Register from "./Components/Users/Register";
import PrivateRoute from "./Hocs/PrivateRoutes";
import UnPrivateRoute from "./Hocs/UnPrivateRoutes";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/home" component={Home} />
        <Route exact path="/" component={Home} />
        <Route exact path="/Contact" component={Contact} />
        <Route exact path="/Events" component={Events} />
        <UnPrivateRoute
          path="/login"
          // roles={["Customer", "Admin", "Manager"]}
          component={Login}
        />
        <UnPrivateRoute
          path="/Register"
          // roles={["Customer", "Admin", "Manager"]}
          component={Register}
        />

        <PrivateRoute
          path="/PortfolioSetting"
          roles={["Admin", "Manager"]}
          component={PortfolioSetting}
        />
        <PrivateRoute
          path="/Invoices"
          roles={["Customer"]}
          component={Invoices}
        />
        <PrivateRoute
          exact
          path="/OrderRequest"
          roles={["Customer", "Admin", "Manager"]}
          component={OrderRequest}
        />
        <PrivateRoute
          exact
          path="/Profile"
          roles={["Customer", "Admin", "Manager"]}
          component={Profile}
        />
        <PrivateRoute
          exact
          path="/ProductsSetting"
          roles={["Admin", "Manager"]}
          component={ProductsSetting}
        />
      </div>
    </Router>
  );
}

export default App;

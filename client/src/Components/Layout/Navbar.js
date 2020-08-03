import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";

import { AuthContext } from "../../Context/AuthContext";
import AuthService from "../../Service/AuthService";

const Navbar = (props) => {
  const { isAuthenticated, user, setIsAutenticated, setUser } = useContext(
    AuthContext
  );
  const onClickLogOutHandler = () => {
    AuthService.logout().then((data) => {
      // console.log("data.success: " + data.success);
      if (!data) {
        setUser(data);
        setIsAutenticated(false);
      }
    });
    props.history.push("/home");
    window.location.reload();
  };

  const unauthenticatedNav = () => {
    return (
      <nav className="navbar navbar-expend-lg navbar-light bg-light">
        <div className="navTag">
          <Link to="/home" className="labelNav">
            Home
          </Link>
        </div>
        <div className="navTag">
          <Link to="/login" className="labelNav">
            Login
          </Link>
        </div>
        <div className="navTag">
          <Link to="/register" className="labelNav">
            Register
          </Link>
        </div>
      </nav>
    );
  };
  const authenticatedNav = () => {
    return (
      <nav
        id="navbar"
        className="navbar navbar-expand-lg navbar-light bg-light"
      >
        <div className="navTag">
          <Link to="/home" className="labelNav">
            Home
          </Link>
        </div>
        {user.role === "Customer" ? (
          <>
            <div className="navTag">
              <Link to="/OrdersHistory" className="labelNav">
                Orders History
              </Link>
            </div>
            <div className="navTag">
              <Link to="/profile" className="labelNav">
                Profile
              </Link>
            </div>
            <div className="navTag">
              <Link to="/Invoices" className="labelNav">
                Invoices
              </Link>
            </div>
          </>
        ) : null}
        {user.role === ("Admin" || "Manager") ? (
          <>
            <div className="navTag">
              <Link to="/PortfolioSetting" className="labelNav">
                Portfolios
              </Link>
            </div>
            <div className="navTag">
              <Link to="/productsSetting" className="labelNav">
                Products
              </Link>
            </div>
          </>
        ) : null}
        <div className="navTag">
          <Link className="labelNav" onClick={onClickLogOutHandler}>
            Logout
          </Link>
        </div>
      </nav>
    );
  };
  return (
    <div className="Wrapper">
      {!isAuthenticated ? unauthenticatedNav() : authenticatedNav()}
    </div>
  );
};

export default withRouter(Navbar);

import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import {
  Nav,
  NavUl,
  BurgerBtn,
  RWDNav,
} from "../StyledComponents/StyledComponents";
import SwitchTheme from "../Button/SwitchTheme";

const Navbar = ({ isAuth }) => {
  const [open, setOpen] = useState(false); //控制side navbar開關

  return (
    <>
      <Nav>
        <div className="mycontainer">
          <NavUl>
            <li className="position-relative">
              <Link to="/">
                <i className="fas fa-home"></i>
              </Link>
              <SwitchTheme />
            </li>

            <li>
              <h4>My Taiwan Stock</h4>
            </li>

            <li>
              {isAuth ? (
                <Link to="/logout" onClick={() => setOpen(false)}>
                  Logout <i className="fas fa-user-circle"></i>
                </Link>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)}>
                    Login <i className="fas fa-sign-in-alt"></i>
                  </Link>

                  <Link
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="signupButton"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </li>
          </NavUl>

          <BurgerBtn onClick={() => setOpen(!open)}>
            <i className="fas fa-bars"></i>
          </BurgerBtn>
        </div>
      </Nav>
      <RWDNav open={open}>
        <ul>
          <li>
            <Link to="/" onClick={() => setOpen(false)}>
              <i className="fas fa-home"></i>
            </Link>
          </li>

          {isAuth ? (
            <li>
              <Link to="/logout" onClick={() => setOpen(false)}>
                Logout <i className="fas fa-user-circle"></i>
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={() => setOpen(false)}>
                  Login <i className="fas fa-sign-in-alt"></i>
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="signupButton"
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
          <li>
            <Link to="/hito" onClick={() => setOpen(false)} className="">
              熱門股票＆追蹤清單
            </Link>
          </li>
        </ul>
      </RWDNav>
    </>
  );
};

export default Navbar;

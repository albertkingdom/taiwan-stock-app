import React, { useState } from "react";
import { Link } from "react-router-dom";
// import styles from "./Navbar.module.css";
import styled from "styled-components";

const NavUl = styled.ul`
  display: flex;
  list-style: none;
  flex-direction: row;
  margin-bottom: 0;
  justify-content: space-between;
  /* background-color: darkgray; */
  padding-inline-start: 0px;

  li {
    padding: 10px 24px;
    /* color: black; */
    text-align: center;
  }
  a {
    color: black;
    text-decoration: none;
    margin-left: 15px;
    padding: 5px 15px;
  }

  a.signupButton {
    background-color: firebrick;
    color: #fff;
    /* border: 2px solid brown; */
    border-radius: 8px;
  }
  /* width:0px; */
  @media screen and (min-width: 850px) {
    li {
      flex-basis: 33.3%;
    }
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const BurgerBtn = styled.button`
  color: gray;
  border: none;
  &:focus {
    outline: none;
  }
  width: 50px;
  height: 50px;
  text-align: left;
  margin-left: 10px;
  background-color: transparent;
  @media (min-width: 768px) {
    display: none;
  }
`;
const Nav = styled.nav`
  font-family: "Goldman", cursive;
  border-bottom: 1px solid silver;
  text-align: left;
  position: fixed;
  width: 100vw;
  z-index: 200;
  h4 {
    margin-bottom: 0;
  }
`;
const RWDNav = styled.nav`
  @media screen and (min-width: 768px) {
    display: none;
  }

  display: block;
  flex-flow: column nowrap;
  background-color: #0d2538;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: ${({ open }) => (open ? "300px" : "0px")};
  overflow: hidden;
  padding-top: 3.5rem;
  transition: all 0.3s ease-in-out;
  justify-content: start;
  z-index: 200;
  li {
    flex-basis: auto;
    height: 50px;
  }
  a {
    color: #fff;
    width: 100%;
  }
`;
const Navbar = ({ isAuth }) => {
  const [open, setOpen] = useState(false); //控制side navbar開關

  return (
    <>
      <Nav>
        <div className="mycontainer">
          <NavUl open={open}>
            <li>
              <Link to="/">
                <i className="fas fa-home"></i>
              </Link>
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
            <Link to="/">
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
        </ul>
      </RWDNav>
    </>
  );
};

export default Navbar;

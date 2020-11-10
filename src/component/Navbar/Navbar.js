import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import styles from "./Navbar.module.css";
import styled from "styled-components";

const Rwdul = styled.ul`
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
  }
  a {
    color: black;
    text-decoration: none;
  }
  /* width:0px; */
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0d2538;
    position: fixed;

    /* transform: ${({ open }) =>
      open ? "translateX(0)" : "translateX(100%)"}; */

    top: 0;
    right: 0;
    height: 100vh;
    width: ${({ open }) => (open ? "300px" : "0px")};
    overflow: hidden;
    padding-top: 3.5rem;
    /* padding-left:20px; */
    transition: all 0.3s ease-in-out;
    justify-content: start;
    /* border-bottom: 1.5px solid blue; */

    a {
      color: #fff;
    }
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
const Navbar = ({ isAuth }) => {
  const [open, setOpen] = useState(false); //控制side navbar開關
  // const lists = useRef();
  useEffect(() => {
    setOpen(false);
  }, []);
  return (
    <Nav>
      <div className="container">
        <Rwdul open={open}>
          <li>
            <Link to="/" onClick={() => setOpen(!open)}>
              <i className="fas fa-home"></i>
            </Link>
          </li>
          <li>
            <h4>My Taiwan Stock</h4>
          </li>

          <li>
            {isAuth ? (
              <Link to="/logout">
                Logout <i className="fas fa-user-circle"></i>
              </Link>
            ) : (
              <Link to="/login" onClick={() => setOpen(!open)}>
                Login <i className="fas fa-sign-in-alt"></i>
              </Link>
            )}
          </li>
        </Rwdul>

        <BurgerBtn onClick={() => setOpen(!open)}>
          <i className="fas fa-bars"></i>
        </BurgerBtn>
      </div>
    </Nav>
  );
};

export default Navbar;

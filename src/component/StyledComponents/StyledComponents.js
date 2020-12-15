import styled from "styled-components";

//Hito.js
export const StyledFollowingButton = styled.button`
  background-color: transparent;
  border: none;
  &:focus {
    outline: none;
  }
`;
export const StyledSubmitButton = styled(StyledFollowingButton)`
  &:focus {
    outline: none;
  }
`;

//Home.js
export const RemindLoginHint = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  width: 100%;
  z-index: 200;

  p {
    font-size: 24px;

    margin: 10px auto;
  }
`;

//AddRecord.js
export const StyledAddButton = styled.button`
  width: 200px;
  background-color: #e5f4f3;
  border: 0px;
  padding: 5px 10px;
  margin: 20px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
`;

//Filter.js
export const StyledLink = styled.span`
  padding: 5px;
  a {
    color: black;
    span {
      display: inline-block;
      width: 20px;
    }
  }
`;

//HitoItem
export const StyledHitoButton = styled.button`
  background-color: #e5f4f3;
  border: none;
  border-radius: 15px;
  padding: 5px 10px;
  margin: 10px;
  outline: none;
  position: relative;
  &:focus {
    outline: none;
  }
`;

//Tooltip
export const StyledFollowingLink = styled.a`
  background-color: transparent;
  border: none;
  &:focus {
    outline: none;
  }
`;

export const HitoTooltip = styled.div`
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  z-index: 1;

  .hitotooltiptext {
    /* visibility: hidden; */
    width: 100%;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    top: 100%;
    left: 0;
    position: absolute;
    /* z-index: 1; */
    &::after {
      content: " ";
      position: absolute;
      bottom: 100%; /* At the top of the tooltip */
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent black transparent;
    }
  }
`;

//Navbar
export const NavUl = styled.ul`
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
export const BurgerBtn = styled.button`
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
export const Nav = styled.nav`
  font-family: "Goldman", cursive;
  border-bottom: 1px solid silver;
  text-align: left;
  position: fixed;
  width: 100vw;
  z-index: 200;
  background-color: #fff;
  h4 {
    margin-bottom: 0;
  }
`;
export const RWDNav = styled.nav`
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
  ul {
    padding-left: 0px;
  }
  li {
    flex-basis: auto;
    height: 50px;
    padding-left: 20px;
  }
  a {
    color: #fff;
    width: 100%;
  }
`;

//Edit
export const StyledEditDiv = styled.div`
  ul {
    list-style: none;
    display: flex;
    li {
      flex-grow: 1;
    }
  }
  button {
    width: 120px;
    border: none;
    padding: 5px;
    background-color: #e5f4f3;
  }
  a {
    display: block;
    color: #000;
    width: 100%;
    &:hover {
      text-decoration: none;
    }
  }
`;

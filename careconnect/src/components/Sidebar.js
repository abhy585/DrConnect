import React from "react";
import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { ArrowRightIcon, AtSignIcon, CalendarIcon, EditIcon } from "@chakra-ui/icons";
import { useAuth } from "../AuthContext";
import "./style.css";

const Sidebar = () => {
  const { token, login, logout } = useAuth();

  if (token) {
    const [header, payload, signature] = token.split(".");
    const decodedPayload = JSON.parse(atob(payload));
    const [firstName, lastName] = decodedPayload.name.split(" ");
    if(firstName === "Patient"){
    return (
      <List color="white" fontSize="1.2em" spacing={4}>
        <ListItem>
          <NavLink to="/">
            <ListIcon as={CalendarIcon} color="white" />
            <NavLink to="/grid"> Dashboard </NavLink>
          </NavLink>
        </ListItem>

        <ListItem>
          <NavLink to="/profile">
            <ListIcon as={AtSignIcon} color="white" />
            Profile
          </NavLink>
        </ListItem>

        <ListItem>
          <NavLink to="/uploadForm">
            <ListIcon as={ArrowRightIcon} color="white" />
            Check your health
          </NavLink>
        </ListItem>
      </List>
    );
    }
    else{
      return (
        <List color="white" fontSize="1.2em" spacing={4}>
          <ListItem>
            <NavLink to="/">
              <ListIcon as={CalendarIcon} color="white" />
              <NavLink to="/grid"> Dashboard </NavLink>
            </NavLink>
          </ListItem>
  
          <ListItem>
            <NavLink to="/profile">
              <ListIcon as={AtSignIcon} color="white" />
              Profile
            </NavLink>
          </ListItem>
        </List>
      );

    }
  } else {
    return (
      <List color="white" fontSize="1.2em" spacing={4}>
        <ListItem>
          <NavLink to="/">
            <ListIcon as={CalendarIcon} color="white" />
            <NavLink to="/"> Home </NavLink>
          </NavLink>
        </ListItem>

        <ListItem>
          <NavLink to="/">
            <ListIcon as={AtSignIcon} color="white" />
            About Us
          </NavLink>
        </ListItem>
      </List>
    );
  }
};

export default Sidebar;

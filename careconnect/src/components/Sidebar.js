import React from "react";
import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { AtSignIcon, CalendarIcon, EditIcon } from "@chakra-ui/icons";

const Sidebar = () => {
  return (
    <List color="white" fontSize="1.2em" spacing={4}>
      <ListItem>
        <NavLink to="/">
          <ListIcon as={CalendarIcon} color="white" />
          <NavLink to="/grid"> Dashboard </NavLink>
        </NavLink>
      </ListItem>

      <ListItem>
        <NavLink to="/create">
          <ListIcon as={EditIcon} color="white" />
          New Task
        </NavLink>
      </ListItem>

      <ListItem>
        <NavLink to="/uploadForm">
          <ListIcon as={EditIcon} color="white" />
          Dissease Details
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
};

export default Sidebar;

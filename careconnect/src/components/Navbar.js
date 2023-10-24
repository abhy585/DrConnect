import { UnlockIcon } from "@chakra-ui/icons";
import { Box,Flex,Heading,Spacer,Button,Text,useToast,Avatar,AvatarBadge,Link} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const toast = useToast();
  const [username, setUsername] = useState(null);
  const { token, login, logout } = useAuth();
  const navigate = useNavigate();

  // const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    if (token) {
      const [header, payload, signature] = token.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      const [firstName, lastName] = decodedPayload.name.split(" ");
      setUsername(firstName);
    }
  }, []);

  const showToast = () => {
    toast({
      title: "Logged Out",
      description: "pehli phursat mein nikal",
      duration: 5000,
      isClosable: true,
      status: "success",
      position: "top", // default is bottom
      icon: <UnlockIcon />,
    });
  };

  function Logout() {
    //const navigate = useNavigate();
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    }).then((response) => {
      if (response.ok) {
        logout();
      }
    });
    setUsername(null);
    showToast();
    navigate("/login");
  }
  //const username = userInfo?.username;

  return (
    <Flex as="nav" p="10px" mb="40px" alignItems="center" gap="15px">
      <Heading as="h1">My Workflows</Heading>

      <Spacer />

      <Avatar src="/img/mario.png">
        <AvatarBadge width="1.3em" bg="teal.400">
          <Text fontSize="xs" color="white">
            3
          </Text>
        </AvatarBadge>
      </Avatar>

      {username === "Patient" && (
        <>
          <Button>
            {" "}
            <NavLink to="/uploadForm">Upload a Medical Report </NavLink>{" "}
          </Button>
        </>
      )}
      {username && (
        <>
          <Button onClick={Logout}>Logout ({username})</Button>
        </>
      )}

      {!username && (
        <>
          <Button>
            {" "}
            <NavLink to="/login">Login </NavLink>{" "}
          </Button>
          <Button>
            <NavLink to="/signup">Signup </NavLink>{" "}
          </Button>
        </>
      )}
    </Flex>
  );
}

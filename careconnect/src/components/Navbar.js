import { UnlockIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Spacer, Button, Text, useToast, Avatar, AvatarBadge, Link } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext';
import { NavLink } from 'react-router-dom';

export default function Navbar() {

  const toast  = useToast();
  const [username,setUsername] = useState(null);
 // const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        //setUserInfo(userInfo);
        setUsername(userInfo.username);
      });
    });
  }, []);


  const showToast = () =>{
    toast({
      title: "Logged Out",
      description: "pehli phursat mein nikal",
      duration: 5000,
      isClosable: true,
      status: 'success',
      position: 'top',   // default is bottom
      icon: <UnlockIcon/>
    })
  }

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUsername(null);
    showToast();
  }
  //const username = userInfo?.username;
  return (

    <Flex as = "nav" p="10px" mb="40px" alignItems="center" gap = "15px">
        <Heading as = "h1">My Workflows</Heading>

        <Spacer />

        <Avatar src="/img/mario.png">
          <AvatarBadge width="1.3em" bg="teal.400">
            <Text fontSize="xs" color="white">3</Text>
          </AvatarBadge>
        </Avatar>
       
        {username && (
          <>
            <Button onClick={logout}>Logout ({username})</Button>
          </>
        )}
        
        {!username && (
          <>
            <Button > <NavLink to="/login">Login </NavLink> </Button>
            <Button ><NavLink to="/signup">Signup </NavLink> </Button>
          </>
        )}

    </Flex>
  )
}

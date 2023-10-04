import { AtSignIcon, EditIcon, EmailIcon, ViewIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, FormControl, FormLabel, HStack, Heading, Input, List, ListIcon, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useLoaderData } from 'react-router'
import {  NavLink } from 'react-router-dom';
import BasicUsage from '../components/ModalDialog';
import io from "socket.io-client";
import ChatBox from './ChatBox';
//import InitialFocus from '../components/ModalDialog';

function InitialFocus() {
  <BasicUsage />;
}

//const [showModal,setShowModal] = useState(false);
function BasicUsage1() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Modal isOpen={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>abc</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default function GridView() {
  const tasks = useLoaderData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const socket = io.connect("http://localhost:3002");

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("123");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <SimpleGrid spacing={10} minChildWidth="300px">
      {tasks &&
        tasks.map((task) => (
          <Card key={task.id} borderTop="8px" borderColor="purple.600">
            <CardHeader>
              <Flex>
                <Avatar src={task.img} />
                <Box>
                  <Heading as="h3" size="sm">
                    {" "}
                    {task.title}{" "}
                  </Heading>
                  <Text> by {task.author} </Text>
                </Box>
              </Flex>
            </CardHeader>
            <CardBody color="gray.500">
              <Text> {task.description} </Text>
            </CardBody>
            <CardFooter>
              <HStack>
                <Button
                  variant="ghost"
                  leftIcon={<ViewIcon />}
                  onClick={onOpen}
                >
                  Watch
                </Button>
                <Button variant="ghost" leftIcon={<EditIcon />}>
                  Comment
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>About {task.author} </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <List fontSize="1.2em" spacing={4}>
                        <ListItem>
                          <ListIcon as={EmailIcon} color="red.400" />
                          Email: devanshchitransh@gmail.com
                        </ListItem>
                        <ListItem>
                          <ListIcon as={EditIcon} />
                          Edit: Lorem ipsum dolor sit, amet consectetur
                          adipisicing elit. Possimus nobis quasi ducimus.
                        </ListItem>
                        <ListItem>
                          <ListIcon as={AtSignIcon} />
                          Profile Info: Lorem ipsum dolor sit amet consectetur
                          adipisicing elit. Nisi, adipisci cum!
                        </ListItem>
                        <ListItem>
                          <ListIcon as={AtSignIcon} />
                          Doctor's history : Lorem ipsum dolor sit, amet
                          consectetur adipisicing elit. Architecto cum
                          perspiciatis modi atque dolores dolorum ipsum
                          quibusdam soluta a? Aspernatur numquam excepturi,
                          omnis inventore atque eum magni debitis. Debitis
                          tempora, expedita suscipit voluptates neque veritatis
                          minima, magni necessitatibus iusto asperiores sunt
                          earum officiis sint totam! Perferendis ratione officia
                          deserunt voluptatibus!
                        </ListItem>
                      </List>
                    </ModalBody>

                  <ModalFooter>
                  <Button variant="ghost" mr={3} onClick={joinRoom}> <NavLink to="/connect">Connect </NavLink></Button>
                    <Button variantColor="blue"  onClick={onClose}>
                      Close
                  </Button>
                  {/* <ChatBox socket={socket} username={username} room={room} /> */}
                    
                  </ModalFooter>
                </ModalContent>
              </Modal>

            </HStack>
          </CardFooter>
        </Card>



      ))}

    </SimpleGrid>
  );
}

export const tasksLoader = async () => {
  const res = await fetch("http://localhost:3000/tasks");

  return res.json();
};

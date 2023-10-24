import { AtSignIcon, EditIcon, EmailIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import BasicUsage from "../components/ModalDialog";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
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
  const navigate = useNavigate();
  const tasks = useLoaderData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { token, login, logout } = useAuth();

  const handleClick = () => {
    // Navigate to Page 2 when the button is clicked
    // props.history.push('/page2');

    navigate("/chatbox");
  };

  useEffect(() => {
    //console.log("Hello", token);
    if (token) {
    } else {
    }
  }, []);

  return (
    <SimpleGrid spacing={10} minChildWidth="300px">
      
          <Card  borderTop="8px" borderColor="purple.600">
            <CardHeader>
              <Flex>
                <Avatar 
                src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1697997229~exp=1697997829~hmac=fae9e34e56f253907c029e46bb4fc31109d6b7c07cca30643daeed03ef4dde46" 
                />
                <Box>
                  <Heading as="h3" size="sm">
                    {" "}
                    Lorem, ipsum dolor.{" "}
                  </Heading>
                  <Text> by Johnathan </Text>
                </Box>
              </Flex>
            </CardHeader>
            <CardBody color="gray.500">
              <Text> Lorem ipsum dolor sit amet consectetur 
                adipisicing elit. Nisi tempore minima consequuntur quae. Totam officiis dolore dolorum. </Text>
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
                    <ModalHeader>About Johnathan </ModalHeader>
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
                      <Button variant="ghost" onClick={handleClick} mr={3}>
                        Connect
                      </Button>
                      <Button variantColor="blue" onClick={onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </HStack>
            </CardFooter>
          </Card>
        
    </SimpleGrid>
  );
}

export const tasksLoader = async () => {
  const res = await fetch("http://localhost:3000/tasks");

  return res.json();
};

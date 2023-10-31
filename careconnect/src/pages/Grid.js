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
  OrderedList,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { MdCastForEducation, MdCheckCircle, MdOutlineHomeRepairService, MdSettings } from 'react-icons/md'
import {LuTableProperties} from 'react-icons/lu'
import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import BasicUsage from "../components/ModalDialog";
import { NavLink, useNavigate } from "react-router-dom";
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
      
          <Card  borderTop="8px" borderColor="blue.800">
            <CardHeader>
              <Flex>
                <Avatar 
                src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1697997229~exp=1697997829~hmac=fae9e34e56f253907c029e46bb4fc31109d6b7c07cca30643daeed03ef4dde46" 
                />
                <Box>
                  <Heading as="h3" size="sm">
                    {" "}
                    Dr. Johnathan{" "}
                  </Heading>
                  <Text> Dr. Johnathan is a Consultant General Physician at Yashoda Hospitals, Somajiguda. </Text>
                </Box>
              </Flex>
            </CardHeader>
            <CardBody color="gray.500">
              <Text> 
              Special Interest and Expertise:
              Infectious Diseases,
              HIV,
              Critical Care,
              Hypertension,
              Geriatric Medicine,
              Septicemia
              </Text>
            </CardBody>
            <CardFooter>
              <HStack>
                <Button
                  variant="ghost"
                  leftIcon={<ViewIcon />}
                  onClick={onOpen}
                >
                  Read more
                </Button>
                <Button variant="ghost" leftIcon={<EditIcon />}>
                 <NavLink to = "/chatbox"> Connect </NavLink> 
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>About Johnathan </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <List fontSize="1.2em" spacing={4}>
                        <ListItem>
                          <ListIcon as={EditIcon} color='blue.800' />
                          Consultant Physician
                        </ListItem>
                        <ListItem>
                          <ListIcon as={EmailIcon} color='blue.800' />
                          Email: doctorconnect001@gmail.com
                        </ListItem>
                        <ListItem>
                          <ListIcon as={LuTableProperties} color='blue.800' />
                          Expertise: Fever and Infections, Sepsis
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCastForEducation} color='blue.800' />
                          Education Qualifications : MD (General Medicine)
                        </ListItem>
                        <ListItem>
                        <ListIcon as={MdOutlineHomeRepairService} color='blue.800' />
                        Services offered : 
                        <OrderedList>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='blue.800' />
                          Infectious Diseases</ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='blue.800' />
                          Septicaemia
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='blue.800' />
                          Critical Care
                        </ListItem>
                      </OrderedList>
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

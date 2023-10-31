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

export default function Patients() {
  const navigate = useNavigate();
  const tasks = useLoaderData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { token, login, logout } = useAuth();

  useEffect(() => {
    console.log("Hello", token);
    if (token) {
    } else {
    }
  }, []);

  const handleClick = () => {
    navigate("/chatbox");
  };

  return (
    <SimpleGrid spacing={10} minChildWidth="300px">
      {tasks &&
        tasks.map((task) => (
          <Card key={task.id} borderTop="8px" borderColor="purple.600">
            <CardHeader>
              <Flex>
                <Avatar src="https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129416.jpg?w=1060&t=st=1698732195~exp=1698732795~hmac=f41f7012c4018dd200380da37d28aff238ef4cb98ecb35426734eec5e0e40f76" />
                <Box mt={"12px"} ml="12px">
                  <Text as="h3" size="sm">
                    {" "}
                    Patient001{" "}
                  </Text>
                 
                </Box>
              </Flex>
            </CardHeader>
            <CardBody color="gray.500">
              <Text> Patient001 has provided us the Symtoms and Medical reports. Click below to see medical reports </Text>
            </CardBody>
            <CardFooter>
              <HStack>
                <Button
                  variant="ghost"
                  leftIcon={<ViewIcon />}
                >
                   <NavLink to = "/patient"> See full Details and reports </NavLink> 
                </Button>
                <Button variant="ghost" leftIcon={<EditIcon />}>
                   <NavLink to =  "/chatbox">Connect</NavLink>  
                </Button>
              </HStack>
            </CardFooter>
          </Card>
        ))}
    </SimpleGrid>
  );
}

export const patientsLoader = async () => {
  const res = await fetch("http://localhost:3000/patients");

  return res.json();
};

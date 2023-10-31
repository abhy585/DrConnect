import { AtSignIcon, DownloadIcon, EditIcon, EmailIcon, ViewIcon } from "@chakra-ui/icons";
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
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import firebase from "firebase/compat/app";
import { properties } from "../properties";

//import InitialFocus from '../components/ModalDialog';


const app = firebase.initializeApp({
  apiKey: "AIzaSyCIRalKnTYNoWAgwkQ6n-w4CmLORYmhWBo",
  authDomain: "chatbox-fe36a.firebaseapp.com",
  projectId: "chatbox-fe36a",
  storageBucket: "chatbox-fe36a.appspot.com",
  messagingSenderId: "249794876908",
  appId: "1:249794876908:web:66888abecbaa140e3e5cc9",
  measurementId: "G-M0MNJMD9PD",
});

const db = getFirestore(app);

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

async function retrieveFile(token,fileId) {
  const collectionRef = collection(db, "patientsData");
  const q = query(collectionRef);
 

  const url = `${properties.css_url}/v2/content/${fileId}=/download?file-name=patient001report.pdf&mime-type=application/pdf`;

  const fetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/octet-stream",
    },
  };

  fetch(url, fetchOptions)
    .then((response) => response.blob())
    .then((blob) => {
      const fileURL = URL.createObjectURL(blob);
      let alink = document.createElement("a");
      alink.href = fileURL;
      alink.download = "ghi12345.pdf";
      alink.click();
      URL.revokeObjectURL(fileURL);
    })
    .catch((error) => console.error("Error: ", error));
}

export default function PatientInfo() {
  const navigate = useNavigate();
  const tasks = useLoaderData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { token, login, logout } = useAuth();

  const [disease, setDisease] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const [data1, dataSet] = useState(null);
  const [fileId, setFileId] = useState(null);
  
  const handleClick = () => {
    navigate("/chatbox");
  };

  const handleDownload = (token,fielId) => {
    retrieveFile(token,fileId);
  };

   useEffect(() => {
    const collectionRef = collection(db, "patientsData");
    
    try {
      const snap = async () => {
        const snap1 =  await getDocs(collectionRef); 
        console.log(snap1);
        snap1.forEach((doc) => {
          const data = doc.data();
          dataSet(data);
          if (data.name === "Patient") {
            setDisease(data.disease_prediction);
            setSymptoms(data.patient_symptoms);
            setFileId(data. file_id);
          }
         
        });
       }
       const snaps = snap();   
    } catch (e) {
      console.error("Error retrieving documents: ", e);
    }

    console.log(data1);
  }, []);

 

  return (

    <SimpleGrid spacing={10} minChildWidth="300px">
      
          <Card  borderTop="8px" borderColor="blue.800">
            <CardHeader>
              <Flex>
                <Avatar 
                src="https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129416.jpg?w=1060&t=st=1698732195~exp=1698732795~hmac=f41f7012c4018dd200380da37d28aff238ef4cb98ecb35426734eec5e0e40f76" 
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
              Symptoms Given: 
              {symptoms.map(symptom =>{
                return (
                  <div color ="blackAlpha.800">{symptom.value}</div>
                );
              })} 
              </Text>
              <Text color="blackAlpha.800">Diseasse Predicted : {disease}</Text>
            </CardBody>
            <CardFooter>
              <HStack>
                <Button variant="ghost" leftIcon={<EditIcon />}>
                 <NavLink to = "/chatbox"> Connect </NavLink> 
                </Button>
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

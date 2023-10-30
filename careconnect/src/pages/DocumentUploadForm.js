import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Form, redirect } from "react-router-dom";
import { Select } from "chakra-react-select";
import { properties } from "../properties";
import { list_symptoms, options } from "../properties";
import { useAuth } from "../AuthContext";
import Mailjet from "node-mailjet";
import firebase from "firebase/compat/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
} from "firebase/firestore";

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

export default function DocumentForm() {
  const collectionRef = collection(db, "patientsData");

  let newData = {
    name: "Patient",
    file_id: "",
    file_name: "",
    file_memetype: "",
    disease_prediction: "",
    patient_symptoms: "",
  };
  const [files, setFiles] = useState("");
  const [Fileid, setFileid] = useState("");
  const [pdfFile, setPdfFile] = React.useState({
    size: "",
    type: "",
  });
  let blob = "";
  const [value, setValue] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const { token, login, logout } = useAuth();

  const handleClick = async (ev) => {
    const data = new FormData();
    data.set("file", files[0]);
    data.set("test", value);
    //uploadFileToCSS();
    const symptoms_indexes = Array(132).fill(0);
    for (let i = 0; i < symptoms.length; i++) {
      let index = list_symptoms.indexOf(symptoms[i]);
      symptoms_indexes[index] = 1;
    }

    const url1 = `http://localhost:4000/api/predict`;
    const requestOptions1 = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: symptoms_indexes,
      }),
    };

    const response1 = await fetch(url1, requestOptions1)
      .then((response) => response.json())
      .catch((error) => console.error("Error: ", error));

    console.log("Expected disease :", response1[0]);

    blob = await getBlobFromFile(files[0]);

    setPdfFile(blob);
    newData.file_id = await uploadFileToCSS();
    //retrieveFile();
    newData.file_name = value;
    newData.file_memetype = files[0].type;
    newData.disease_prediction = response1[0];
    newData.patient_symptoms = symptoms;
    try {
      const docRef = await addDoc(collectionRef, newData);
      console.log("Document added with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  function getBlobFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        // Create a Blob object from the file data
        const blob = new Blob([reader.result], { type: file.type });
        resolve(blob);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  }

  async function retrieveFile() {
    const q = query(collectionRef);

    try {
      const querySnapshot = await getDocs(collectionRef);

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        if (data.name === "Patient") {
          console.log("Document ID: ", doc.id);
          console.log("Document File Id: ", data.file_id);
        }
      });
    } catch (e) {
      console.error("Error retrieving documents: ", e);
    }

    const url = `${properties.css_url}/v2/content/cj0xNmNmNjU0OS1kNmUxLTQ2YjYtYWE2Yi1hZWI3OGRjYzNhMzcmaT1lZTcyMDE1ZS03NTllLTRlYTAtOWI0My05YmNlOWJkMTg5N2Y=/download?file-name=ghi12345.pdf&mime-type=application/pdf`;

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

  async function uploadFileToCSS() {
    const cssUrl = `${properties.css_url}/v2/tenant/${properties.tenant_id}/content`;
    const cssFetchOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/hal+json",
        "Content-Type": blob.type,
        "Content-Length": blob.size,
      },
      body: blob,
    };

    const response = await fetch(cssUrl, cssFetchOptions).catch((error) => {
      // Handle errors here, including network errors or JSON parsing errors
      console.error("Fetch error:", error);
    });
    const data = await response.json();
    //console.log(data.entries[0].id);
    newData.file_id = data.entries[0].id;
    //console.log(newData.file_id);

    return data.entries[0].id.toString();
  }

  function handleselect(data) {
    //console.log(data);
    setSymptoms(data);
  }

  return (
    <Form method="post" action="/uploadForm" onSubmit={handleClick}>
      <FormControl isRequired mb="40px">
        <FormLabel mx="2px" my="2px">
          Choose the type of Report
        </FormLabel>
        <Select options={options} onChange={(ev) => setValue(ev.value)}>
          {" "}
        </Select>
        <FormHelperText>Enter a descriptive name</FormHelperText>
      </FormControl>

      <FormControl isRequired mb="40px" maxW="250px">
        <FormLabel mx="2px" my="2px">
          Choose File
        </FormLabel>
        <Input
          display="block"
          type="file"
          name="file"
          mt="10px"
          mx="-2px"
          border="none"
          accept="application/pdf"
          onChange={(ev) => setFiles(ev.target.files)}
        />
        <FormHelperText>Upload File in pdf format</FormHelperText>
      </FormControl>

      <FormControl isRequired mb="40px">
        <FormLabel mx="2px" my="2px">
          Please Select the symptoms:{" "}
        </FormLabel>
        <Select
          options={list_symptoms}
          value={symptoms}
          onChange={handleselect}
          isMulti
          closeMenuOnSelect={false}
        >
          {" "}
        </Select>
        <FormHelperText>Select all appicable symptoms</FormHelperText>
      </FormControl>

      <Button display="block" type="submit" my="20px">
        {" "}
        Submit{" "}
      </Button>
    </Form>
  );
}

export const uploadFormAction = async ({ request }) => {
  //const data = await request.formData();

  //console.log(data);
  return redirect("/grid");
};

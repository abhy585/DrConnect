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

export default function DocumentForm() {
  const [files, setFiles] = useState("");
  const [pdfFile, setPdfFile] = React.useState({
    //file blob retrieved from Capture Service
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
    console.log(files[0]);
    console.log(value);
    //uploadFileToCSS();
    const symptoms_indexes = Array(132).fill(0);
    for (let i = 0; i < symptoms.length; i++) {
      let index = list_symptoms.indexOf(symptoms[i]);
      symptoms_indexes[index] = 1;
    }
    console.log(symptoms_indexes);

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
    console.log("Blob:", blob);

    setPdfFile(blob);
    console.log(pdfFile);
    uploadFileToCSS();
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
    console.log(data.entries[0]);
  }

  function handleselect(data) {
    console.log(data);
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

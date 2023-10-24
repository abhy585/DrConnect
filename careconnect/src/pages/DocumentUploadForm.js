import React, { useState } from "react";
import { Button, FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { Form, redirect } from "react-router-dom";
import { Select } from "chakra-react-select";
import { list_symptoms, options } from "../properties";

export default function DocumentForm() {
  const [files, setFiles] = useState("");
  const [value, setValue] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const handleClick = (ev) => {
    const data = new FormData();
    data.set('file',files[0]);
    data.set('test',value);
    console.log(files[0]);
    console.log(value);
    const symptoms_indexes = Array(132).fill(0);
    for (let i = 0; i < symptoms.length; i++) {
      let index = list_symptoms.indexOf(symptoms[i]);
      symptoms_indexes[index] = 1;
    }
    console.log(symptoms_indexes);
  };

  function handleselect(data)
  {
    console.log(data);
    setSymptoms(data);
  }
  
  return (
    <Form method="post" action="/uploadForm" onSubmit={handleClick}>

      <FormControl isRequired mb="40px">
        <FormLabel mx="2px" my="2px">
          Choose the type of Report
        </FormLabel>
        <Select options={options} onChange={(ev) => setValue(ev.value)}> </Select>
        <FormHelperText>Enter a descriptive name</FormHelperText>
      </FormControl>

      <FormControl isRequired mb="40px" maxW="250px" >
        <FormLabel mx="2px" my="2px" >
          Choose File
        </FormLabel>
        <Input display="block" type="file" name="file" mt="10px" mx="-2px" border="none"
          accept="application/pdf"
          onChange={(ev) => setFiles(ev.target.files)} />
        <FormHelperText>Upload File in pdf format</FormHelperText>
      </FormControl>

      <FormControl isRequired mb="40px">
        <FormLabel mx="2px" my="2px">Please Select the symptoms: </FormLabel>
        <Select options={list_symptoms} value={symptoms} onChange={handleselect}
          isMulti> </Select>
        <FormHelperText>Select all appicable symptoms</FormHelperText>
      </FormControl>

      <Button display="block" type="submit" my="20px"> Submit </Button>
    </Form>
  );
}

export const uploadFormAction = async ({ request }) => {
  //const data = await request.formData();

  //console.log(data);
  return redirect("/grid");
};

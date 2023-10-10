import { Button } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Form, redirect } from "react-router-dom";
import { Select } from "chakra-react-select";
import { options } from "../properties";
import { useAuth } from "../AuthContext";

export default function UploadForm() {
  const [document, setDocument] = useState("");
  const [files, setFiles] = useState("");
  const [value, setValue] = useState("");
  const { token, login, logout } = useAuth();

  const handleClick = (ev) => {
    const data = new FormData();
    data.set("file", files[0]);
    data.set("test", value);
    console.log(files[0]);
    console.log(value);
  };
  return (
    <Form method="post" action="/uploadForm" onSubmit={handleClick}>
      <FormControl isRequired mb="40px">
        <FormLabel mx="2px" my="2px">
          Choose the type of Report:{" "}
        </FormLabel>
        <Select
          options={options}
          onChange={(ev) => setValue(ev.value)}
        ></Select>
        <FormHelperText>Enter a descriptive name</FormHelperText>
      </FormControl>

      <FormControl isRequired mb="40px" maxW="250px">
        <FormLabel mx="2px" my="2px">
          Choose File:{" "}
        </FormLabel>
        <Input
          display="block"
          type="file"
          name="file"
          onChange={(ev) => setFiles(ev.target.files)}
          mt="10px"
          mb="10px"
          mx="-2px"
          border="none"
        />
      </FormControl>
      <Button display="block" type="submit" my="20px">
        Submit
      </Button>
    </Form>
  );
}

export const uploadFormAction = async ({ request }) => {
  //const data = await request.formData();

  //console.log(data);
  return redirect("/grid");
};

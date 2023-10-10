import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Form, redirect } from "react-router-dom";

export default function Create() {
  return (
    <Form method="post" action="/create">
      <FormControl isRequired mb="40px">
        <FormLabel>Task Name: </FormLabel>
        <Input type="text" name="title" />
        <FormHelperText>Enter a descriptive name</FormHelperText>
      </FormControl>

      <FormControl mb="40px">
        <FormLabel>Task description: </FormLabel>
        <FormHelperText>Enter a description</FormHelperText>
        <Textarea
          placeholder="Enter a detailed description"
          name="description"
        />
      </FormControl>

      <FormControl display="flex" alignItems="center">
        <Checkbox name="isPriority" size="lg" colorScheme="purple" />
        <FormLabel mb="0px" ml="10px">
          Make the priority task
        </FormLabel>
      </FormControl>

      <Button type="submit">Submit</Button>
    </Form>
  );
}

export const createAction = async ({ request }) => {
  const data = await request.formData();

  const task = {
    title: data.get("title"),
    description: data.get("description"),
    isPriority: data.get("isPriority") === "",
  };

  console.log(task);
  return redirect("/grid");
};

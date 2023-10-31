import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Container,
  Heading,
  Image,
  Img,
  Text,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
  const boxStyle = {
    p: "10px",
    bg: "purple.400",
    color: "white",
    m: "10px",
    textAlign: "center",
  };
  return (
    <Container align="center">
      <Image
        src="/img/logo.png"
        height="240px"
        width="240px"
        align="center"
      ></Image>
      <Text ml="10px" color="pink.700">
        Welcome to DrConnect. Healthcare at your fingertips!!!
      </Text>

      <Box my="10px" bg="orange.500" p="5px">
        <Text color="whiteAlpha.900" p="5px">
          Team Members
          <li>
            <p>Abhay Singh</p>
            <p>Devansh Chitransh</p>
            <p>Nupur Singh</p>
            <p>Mohan Konem</p>
          </li>
        </Text>
      </Box>

      <Box sx={boxStyle}>
        Login as a Doctor or a Patient
        <Button ml="15px">
          {" "}
          <NavLink to="/login">Login </NavLink>{" "}
        </Button>
      </Box>
    </Container>
  );
}

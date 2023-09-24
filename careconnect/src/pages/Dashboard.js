import { Box, Container, Heading, Text } from "@chakra-ui/react";

export default function Dashboard() {

  const boxStyle = {
    p : "10px",
    bg : "purple.400",
    color : "white",
    m : "10px",
    textAlign : "center"
  }
  return (
    <Container>
      <Heading my="20px">Lorem ipsum, dolor sit amet conse.</Heading>
      <Text ml="40px" color ="pink.700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, obcaecati.</Text>

      <Box my="50px" bg="orange.500" p="30px">
        <Text color ="whiteAlpha.900" p="30px"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur sint cumque ipsa expedita
           adipisci dolorem repellendus quia porro debitis culpa?</Text>
      </Box>

      <Box sx={boxStyle}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque, saepe.
      </Box>
    </Container>
    
  )
}

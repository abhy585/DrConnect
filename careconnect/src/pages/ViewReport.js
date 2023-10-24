import { TabList, Tabs, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { List, ListIcon, ListItem } from '@chakra-ui/react';
import { useLoaderData } from 'react-router-dom';
import { AtSignIcon, CalendarIcon, EditIcon, EmailIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

export default function ViewReport() {
  const tasks = useLoaderData();
  console.log(tasks);
  return (
    <Tabs colorScheme="purple" variant="enclosed">
      <TabList>
        <Tab _selected={{ color: 'white', bg: 'purple.400' }}>Personal Info</Tab>
        <Tab _selected={{ color: 'white', bg: 'purple.400' }}>Public Info</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <SimpleGrid spacing={10} minChildWidth="300px">
            {tasks &&
              tasks.map((task) => (

                <Card key={task.id} borderTop="8px" borderColor="purple.600" >
                  <CardHeader>
                    <Flex>
                      <Avatar src={task.img} />
                      <Box>
                        <Heading as="h3" size="sm">
                          {" "}
                          {task.title}{" "}
                        </Heading>
                        <Text> by {task.author} </Text>
                      </Box>
                    </Flex>
                  </CardHeader>
                  <CardBody color="gray.500">
                    <Text> Average Heart Rate: {task.heart_rate} </Text>
                    <Text> Calories Burnt: {task.calories} </Text>
                  </CardBody>
                  <CardFooter>
                    <HStack>
                      <Button
                        variant="ghost"
                        leftIcon={<ViewIcon />}

                      >
                        Watch
                      </Button>
                      <Button variant="ghost" leftIcon={<EditIcon />}>
                        Comment
                      </Button>
                      <Modal>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>About {task.author} </ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            <List fontSize="1.2em" spacing={4}>
                              <ListItem>
                                <ListIcon as={EmailIcon} color="red.400" />
                                Email: devanshchitransh@gmail.com
                              </ListItem>
                              <ListItem>
                                <ListIcon as={EditIcon} />
                                Edit: Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Possimus nobis quasi ducimus.
                              </ListItem>
                              <ListItem>
                                <ListIcon as={AtSignIcon} />
                                Profile Info: Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Nisi, adipisci cum!
                              </ListItem>
                              <ListItem>
                                <ListIcon as={AtSignIcon} />
                                Doctor's history : Lorem ipsum dolor sit, amet
                                consectetur adipisicing elit. Architecto cum
                                perspiciatis modi atque dolores dolorum ipsum
                                quibusdam soluta a? Aspernatur numquam excepturi,
                                omnis inventore atque eum magni debitis. Debitis
                                tempora, expedita suscipit voluptates neque veritatis
                                minima, magni necessitatibus iusto asperiores sunt
                                earum officiis sint totam! Perferendis ratione officia
                                deserunt voluptatibus!
                              </ListItem>
                            </List>
                          </ModalBody>

                          <ModalFooter>
                            <Button variant="ghost" mr={3}>
                              Connect
                            </Button>
                            <Button variantColor="blue">
                              Close
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </HStack>
                  </CardFooter>
                </Card>
              ))}
          </SimpleGrid>
        </TabPanel>

        <TabPanel>
          <List fontSize="1.2em" spacing={4}>
            <ListItem>
              <ListIcon as={CalendarIcon} color="teal.400" />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime saepe cum esse!
            </ListItem>
            <ListItem>
              <ListIcon as={EditIcon} />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro exercitationem assumenda quisquam! Inventore?
            </ListItem>
            <ListItem>
              <ListIcon as={AtSignIcon} />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae eos quod, aliquam nihil magni dolor sint blanditi
            </ListItem>
          </List>
        </TabPanel>

      </TabPanels>
    </Tabs>
  )
}


export const reportLoader = async () => {
  const res = await fetch("http://localhost:3000/tasks");

  return res.json();
};

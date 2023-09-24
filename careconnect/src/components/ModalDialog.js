import { EditIcon, ViewIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button,Card, CardBody, CardFooter, CardHeader, Flex, FormControl, FormLabel, HStack, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useLoaderData } from 'react-router'



function BasicUsage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            abc
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
  export default BasicUsage;
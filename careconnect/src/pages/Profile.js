import { TabList, Tabs, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { List, ListIcon, ListItem } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { AtSignIcon, CalendarIcon, EditIcon, EmailIcon } from '@chakra-ui/icons';

export default function Profile() {
  return (
    <Tabs colorScheme="purple" variant="enclosed">
      <TabList>
        <Tab _selected={{color: 'white', bg: 'purple.400'}}>Personal Info</Tab>
        <Tab _selected={{color: 'white', bg: 'purple.400'}}>Public Info</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <List fontSize="1.2em" spacing = {4}>
            <ListItem> 
                <ListIcon as = {EmailIcon} color="red.400"/>
                Email: patientconnect001@gmail.com
            </ListItem>
            <ListItem>
                <ListIcon as = {EditIcon} />
                Edit: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus nobis quasi ducimus.      
            </ListItem>
            <ListItem>
                <ListIcon as = {AtSignIcon} />
                Profile Info: Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, adipisci cum!
            </ListItem>
          </List>
        </TabPanel>

        <TabPanel>
          <List fontSize="1.2em" spacing = {4}>
            <ListItem> 
                <ListIcon as = {CalendarIcon} color="teal.400"/>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime saepe cum esse!   
            </ListItem>
            <ListItem>
                <ListIcon as = {EditIcon} />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro exercitationem assumenda quisquam! Inventore?       
            </ListItem>
            <ListItem>
                <ListIcon as = {AtSignIcon} />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae eos quod, aliquam nihil magni dolor sint blanditi
            </ListItem>
          </List>
        </TabPanel>

      </TabPanels>
    </Tabs>
  )
}

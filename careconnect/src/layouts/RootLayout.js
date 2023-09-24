import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { Grid, GridItem } from "@chakra-ui/react"
import Sidebar from "../components/Sidebar"
import GridView from "../pages/Grid"

export default function RootLayout() {
  return (
    <Grid templateColumns="repeat(6 , 1fr)">

      <GridItem 
      as = "aside"
      colSpan={{base: 6, lg: 2, xl:1}}
      bg="brand.800"
      minHeight="100vh"
      p="20px"
      >
       <Sidebar/>
      </GridItem>

      <GridItem 
      colSpan={{base: 6, lg: 4, xl:5}}
      p="20px"
      >

      <Navbar/>
      <Outlet />
      

      </GridItem>
    </Grid>
  )
}

import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Link,
    Stack,
    Text,
  } from '@chakra-ui/react'
  import { Logo } from '../Logo'
  //import { OAuthButtonGroup } from '../OAuthButtonGroup'
  //import { PasswordField } from '../PasswordField'
import { useState } from 'react';


  
  export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    async function register(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/signup', {
      method: 'POST',
      body: JSON.stringify({username,password,email}),
      headers: {'Content-Type':'application/json'},
    });
    if (response.status === 200) {
      alert('registration successful');
    } else {
      alert('registration failed');
    }
  }  

    return(
    <Container
      maxW="lg"
      py={{
        base: '12',
        md: '24',
      }}
      px={{
        base: '0',
        sm: '8',
      }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack
            spacing={{
              base: '2',
              md: '3',
            }}
            textAlign="center"
          >
            <Heading
              size={{
                base: 'xs',
                md: 'sm',
              }}
            >
              Create your new account
            </Heading>
            <Text color="fg.muted">
              Already have an account? <Link href="#">Login</Link>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{
            base: '0',
            sm: '8',
          }}
          px={{
            base: '4',
            sm: '10',
          }}
          bg={{
            base: 'transparent',
            sm: 'bg.surface',
          }}
          boxShadow={{
            base: 'none',
            sm: 'md',
          }}
          borderRadius={{
            base: 'none',
            sm: 'xl',
          }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email" >Email</FormLabel>
                <Input id="email" type="email" value={email} onChange={ev => setEmail(ev.target.value)}/>
              </FormControl>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input  value={username} onChange={ev => setUsername(ev.target.value)}  type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input  type="password" value={password} onChange={ev => setPassword(ev.target.value)} />
              </FormControl>
             
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="text" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button onClick={register}>Sign in</Button>
              <HStack>
                <Divider />
                
                <Divider />
              </HStack>
              
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
 
)}
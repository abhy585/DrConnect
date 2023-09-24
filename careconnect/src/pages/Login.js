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
    useToast,
  } from '@chakra-ui/react'
  import { Logo } from '../Logo'
  //import { OAuthButtonGroup } from '../OAuthButtonGroup'
  //import { PasswordField } from '../PasswordField'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UnlockIcon } from '@chakra-ui/icons';



  
  export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);

    const toast  = useToast();
    const showToast = () =>{
    toast({
      title: "Logged in",
      description: "Successfully logged in",
      duration: 5000,
      isClosable: true,
      status: 'success',
      position: 'top',   // default is bottom
      icon: <UnlockIcon/>
    })
  }

    async function login(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type':'application/json'},
    });
    if (response.status === 200) {
      //  alert('login successful');
      showToast();
        setRedirect(true);
    } else {
      alert('wrong credentials');
    }
  }  
  if (redirect) {
    return <Navigate to={'/grid'} />
  }
  else{
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
              Log in to your account
            </Heading>
            <Text color="fg.muted">
              Don't have an account? <Link href="#">Sign up</Link>
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
              <Button onClick={login}>Sign in</Button>
              <HStack>
                <Divider />
                
                <Divider />
              </HStack>
              
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
 
)}}
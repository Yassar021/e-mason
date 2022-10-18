import { Box, Button, Center, HStack, Input, InputGroup, InputRightElement, Link, Stack, Text, VStack } from "@chakra-ui/react"
import { useState } from "react";
import LayoutAuth from "../../layout/LayoutAuth"

const AuthLogin = ()  => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    return(
       <LayoutAuth pageTitle={'Login'}>
            <Box>
                <Center>
                    <Stack>
                        <Text fontSize={'40px'} fontWeight='500' fontFamily={'Poppins'}>Login</Text>
                        <Text fontSize={'14px'} fontWeight='500' fontFamily={'Poppins'} pb='35px'>Hi, Selamat Datang</Text>
                    </Stack>
                </Center>
                
                <VStack spacing={'10px'} alignItems='baseline'>
                    <Text fontSize={'20px'} fontWeight='500' fontFamily={'Poppins'}>Email</Text>
                    <Input placeholder='masukkan email anda' size='lg' />
                </VStack>

                <VStack mt='24px' spacing={'10px'} alignItems='baseline'>
                    <Text fontSize={'20px'} fontWeight='500' fontFamily={'Poppins'}>Passowrd</Text>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </VStack>

                <Button
                    mt='46px'
                    size='md'
                    height='60px'
                    width={'100%'}
                    color={'#fff'}
                    bgColor='#3E38F5'
                    borderRadius={'6px'}
                    _hover={{ bg: '#3E38F5' }}
                    _active={{
                      bg: '#3E38F5',
                      transform: 'scale(0.98)',
                    }}
                    >
                    Login
                </Button>

                <Center>
                    <Stack direction={{base:'column',md:'row'}} spacing={'10px'} mt='24px'>
                        <Text fontSize={'18px'} fontWeight='500' fontFamily={'Poppins'}>Belum Punya Akun ?</Text>
                        <Link href='/RegisterPage'>
                            <Text fontSize={'18px'} fontWeight='500' fontFamily={'Poppins'} color='#3E38F5'>Daftar Tukang</Text>
                        </Link>
                        <Link href='/RegisterPage'>
                            <Text fontSize={'18px'} fontWeight='500' fontFamily={'Poppins'} color='#3E38F5'>Daftar Pengguna</Text>
                        </Link>
                    </Stack>
                </Center>
            </Box>
       </LayoutAuth>
    )
}

export default AuthLogin
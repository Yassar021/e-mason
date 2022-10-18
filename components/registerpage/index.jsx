import { Box, Button, Center, Flex, Input, InputGroup, InputRightElement, Link, Stack, Text, VStack } from "@chakra-ui/react"
import { useState } from "react";
import LayoutAuth from "../../layout/LayoutAuth"

const RegisterPage = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    return (
        <LayoutAuth pageTitle={'Register'}>
            <Box>
                <Center>
                    <Text fontFamily={'Poppins'} fontSize='40px' fontWeight={'500'}>Registrasi Pengguna</Text>
                </Center>

                <Flex direction={'column'} gap='24px'>
                    <VStack spacing={'10px'} alignItems='baseline'>
                        <Text fontSize={'20px'} fontWeight='500' fontFamily={'Poppins'}>Nama</Text>
                        <Input placeholder='masukkan nama anda' size='lg' />
                    </VStack> 

                    <VStack spacing={'10px'} alignItems='baseline'>
                        <Text fontSize={'20px'} fontWeight='500' fontFamily={'Poppins'}>Email Address</Text>
                        <Input placeholder='masukkan email anda' size='lg' />
                    </VStack>

                    <VStack spacing={'10px'} alignItems='baseline'>
                        <Text fontSize={'20px'} fontWeight='500' fontFamily={'Poppins'}>Passowrd</Text>
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='masukkan password anda'
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </VStack>

                    <VStack spacing={'10px'} alignItems='baseline'>
                        <Text fontSize={'20px'} fontWeight='500' fontFamily={'Poppins'}>Confirm Passowrd</Text>
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='masukkan ulang password anda'
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </VStack>

                    <VStack spacing={'10px'} alignItems='baseline'>
                        <Text fontSize={'20px'} fontWeight='500' fontFamily={'Poppins'}>Usia</Text>
                        <Input placeholder='masukkan usia anda' size='lg' />
                    </VStack>

                    <VStack spacing={'10px'} alignItems='baseline'>
                        <Text fontSize={'20px'} fontWeight='500' fontFamily={'Poppins'}>Nomor Telepon</Text>
                        <Input placeholder='masukkan telepon anda' size='lg' />
                    </VStack>

                    <VStack spacing={'10px'} alignItems='baseline'>
                        <Text fontSize={'20px'} fontWeight='500' fontFamily={'Poppins'}>alamat</Text>
                        <Input placeholder='masukkan alamat anda' size='lg' />
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
                            <Text fontSize={'18px'} fontWeight='500' fontFamily={'Poppins'}>Sudah Punya Akun ?</Text>
                            <Link href='/' >
                                <Text fontSize={'18px'} fontWeight='500' fontFamily={'Poppins'} color='#3E38F5'>Login</Text>
                            </Link>
                        </Stack>
                    </Center>
                </Flex>
            </Box>
        </LayoutAuth>
    )
}

export default RegisterPage
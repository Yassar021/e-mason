import { Box, Button, Center, HStack, Input, InputGroup, InputRightElement, Link, Stack, Text, VStack, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import LayoutAuth from "../../layout/LayoutAuth"
import { authCheck } from "../../utils/firebase/auth";
import { useRouter } from "next/router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const AuthLogin = () => {
    const router = useRouter();
    const [check, user] = authCheck();
    useEffect(() => {
        if (check) {
            if (user.data.type === 'pengguna') {
                router.replace("/HomePage")
            }
            if (user.data.type === 'tukang') {
                router.replace("/dashboardTukangPage")
            }
        }
    }, [check, router, user]);

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast()
    const [loading, setLoading] = useState(false);
    const [field, setField] = useState({
        email: "",
        password: "",
    })
    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await signInWithEmailAndPassword(auth, field.email, field.password)
            setLoading(false)
        } catch (error) {
            toast({
                title: 'Whooooopsss. Gagal masuk',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            setLoading(false)
        }
    }
    return (
        <LayoutAuth pageTitle={'Login'}>
            <Box as="form" onSubmit={handleLogin}>
                <Center>
                    <Stack>
                        <Text fontSize={'40px'} fontWeight='500' fontFamily={'Poppins'}>Login</Text>
                        <Text fontSize={'14px'} fontWeight='500' fontFamily={'Poppins'} pb='35px'>Hi, Selamat Datang</Text>
                    </Stack>
                </Center>

                <VStack spacing={'10px'} alignItems='baseline'>
                    <Text fontSize={'20px'} fontWeight='500' fontFamily={'Poppins'}>Email</Text>
                    <Input type='email' required placeholder='masukkan email anda' size='lg' onChange={(e) => setField(field => ({ ...field, email: e.target.value }))} />
                </VStack>

                <VStack mt='24px' spacing={'10px'} alignItems='baseline'>
                    <Text fontSize={'20px'} fontWeight='500' fontFamily={'Poppins'}>Passowrd</Text>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                            required
                            onChange={(e) => setField(field => ({ ...field, password: e.target.value }))}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </VStack>

                <Button
                    isLoading={loading}
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
                    type='submit'
                >
                    Login
                </Button>

                <Center>
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={'10px'} mt='24px'>
                        <Text fontSize={'18px'} fontWeight='500' fontFamily={'Poppins'}>Belum Punya Akun ?</Text>
                        <Link href='/RegisterPage' style={{ textDecoration: 'none' }}>
                            <Text fontSize={'18px'} fontWeight='500' fontFamily={'Poppins'} color='#3E38F5'>Daftar Pengguna</Text>
                        </Link>
                        <Text>||</Text>
                        <Link href='/RegisterTukang' style={{ textDecoration: 'none' }}>
                            <Text fontSize={'18px'} fontWeight='500' fontFamily={'Poppins'} color='#3E38F5'>Daftar Tukang</Text>
                        </Link>
                    </Stack>
                </Center>
            </Box>
        </LayoutAuth>
    )
}

export default AuthLogin
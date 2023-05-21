import { Box, Button, Center, Flex, Input, InputGroup, InputRightElement, Link, Stack, Text, VStack, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import LayoutAuth from "../../layout/LayoutAuth";

import { httpsCallable } from "firebase/functions";
import functions from "../../utils/firebase/function";
import { authCheck } from "../../utils/firebase/auth";
import { useRouter } from "next/router";

const RegisterTukang = () => {
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const router = useRouter();
    const [show, setShow] = useState(false);

    const [check] = authCheck();
    if (check) {
        router.replace('/');
    }

    const [field, setField] = useState({
        nama: "",
        email: "",
        password: "",
        confirmPassword: "",
        tanggalLahir: "",
        nomorTelepon: "",
        alamat: "",
    })
    const handleClick = () => setShow(!show);
    const handleRegister = async (e) => {
        e.preventDefault();
        if (field.password !== field.confirmPassword)
            return toast({
                title: 'Pastikan password sama!',
                status: 'warning',
                duration: 9000,
                isClosable: true,
            })

        if (field.password.length < 6)
            return toast({
                title: 'Pastikan password minimal 6 karakter!',
                status: 'warning',
                duration: 9000,
                isClosable: true,
            })
        setLoading(true);
        try {
            const createUser = httpsCallable(functions, 'createUser');
            const result = await createUser({
                ...field,
                type: "tukang",
                createdAt: new Date().toISOString(),
            })
            setLoading(false);
            toast({
                title: 'Akun berhasi dibuat',
                description: "Kami telah buat untuk anda.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        } catch (error) {
            toast({
                title: 'Akun gagal dibuat',
                description: "Kami gagal buat untuk anda.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            setLoading(false);
        }
    }

    return (
        <LayoutAuth pageTitle={'Register Tukang'}>
            <Box>
                <Center>
                    <Text fontFamily={'Poppins'} fontSize='40px' fontWeight={'500'}>Registrasi Tukang</Text>
                </Center>

                <Flex as={"form"} onSubmit={handleRegister} direction={'column'} gap='24px'>
                    <VStack spacing={'10px'} alignItems='baseline'>
                        <Text fontSize={'20px'} fontWeight='500' fontFamily={'Poppins'}>Nama</Text>
                        <Input onChange={(e) => setField(field => ({ ...field, nama: e.target.value }))} placeholder='masukkan nama anda' value={field.nama} size='lg' required />
                    </VStack>

                    <VStack spacing={'10px'} alignItems='baseline'>
                        <Text fontSize={'20px'} fontWeight='500' fontFamily={'Poppins'}>Email Address</Text>
                        <Input type="email" onChange={(e) => setField(field => ({ ...field, email: e.target.value }))} placeholder='masukkan email anda' value={field.email} size='lg' required />
                    </VStack>

                    <VStack spacing={'10px'} alignItems='baseline'>
                        <Text fontSize={'20px'} fontWeight='500' fontFamily={'Poppins'}>Passowrd</Text>
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='masukkan password anda'
                                value={field.password}
                                min={6}
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

                    <VStack spacing={'10px'} alignItems='baseline'>
                        <Text fontSize={'20px'} fontWeight='500' fontFamily={'Poppins'}>Confirm Passowrd</Text>
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='masukkan ulang password anda'
                                value={field.confirmPassword}
                                min={6}
                                required
                                onChange={(e) => setField(field => ({ ...field, confirmPassword: e.target.value }))}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </VStack>

                    <VStack spacing={'10px'} alignItems='baseline'>
                        <Text fontSize={'20px'} fontWeight='500' fontFamily={'Poppins'}>Tanggal Lahir</Text>
                        <Input type="date" placeholder='masukkan tanggal lahir anda' value={field.tanggalLahir} size='lg' required onChange={(e) => setField(field => ({ ...field, tanggalLahir: e.target.value }))} />
                    </VStack>

                    <VStack spacing={'10px'} alignItems='baseline'>
                        <Text fontSize={'20px'} fontWeight='500' fontFamily={'Poppins'}>Nomor Telepon</Text>
                        <Input type="number" required placeholder='masukkan telepon anda' size='lg' value={field.nomorTelepon} onChange={(e) => setField(field => ({ ...field, nomorTelepon: e.target.value }))} />
                    </VStack>

                    <VStack spacing={'10px'} alignItems='baseline'>
                        <Text fontSize={'20px'} fontWeight='500' fontFamily={'Poppins'}>Alamat</Text>
                        <Input required placeholder='masukkan alamat anda' size='lg' value={field.alamat} onChange={(e) => setField(field => ({ ...field, alamat: e.target.value }))} />
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
                        type="submit"
                    >
                        Daftar
                    </Button>

                    <Center>
                        <Stack direction={{ base: 'column', md: 'row' }} spacing={'10px'} mt='24px'>
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

export default RegisterTukang
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Hide, HStack, Link, Show, Stack, Text, useDisclosure } from "@chakra-ui/react"
import Head from "next/head"
import Image from "next/image"
import { useEffect, useRef } from "react"
import Navbar from "../components/navbar"
import { useRouter } from "next/router"
import { authCheck } from "../utils/firebase/auth"
import ErrorPage from 'next/error'


const LayoutDashboardUser = ({ pageTitle, children, bgColor, color }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const router = useRouter();

    const [check, user] = authCheck();
    return (user?.data?.type === 'pengguna') ? (
        <>
            <Head>
                <title>E-Mason App | {pageTitle}</title>
            </Head>

            <Box height={'auto'} bgColor={'#E9E8F9'} pb='40px'>
                <Navbar user={user} />
                <Flex direction={'row'} pr={{ lg: '20px', xl: '89px' }} gap={{ lg: '20px', xl: '89px' }} justifyContent={{ md: 'center', lg: 'normal' }} textAlign='center'>
                    <Box width={{ lg: '280px', xl: '389px' }} height='100vh' bgColor={'#fff'} pt='57px' textAlign={'center'}>
                        <Hide below="md">
                            <Box px={{ lg: '40px', xl: '135px' }}>
                                <Avatar size='xl' name={user?.data?.nama} src={user?.data?.avatar} />
                                <Text my='20px' fontSize={'18px'} fontWeight='600'>{user?.data?.nama}</Text>
                            </Box>
                            <hr />
                            <Box px={{ lg: '40px', xl: '90px' }} py='15px'>
                                <Box py='8px' px='12px' width={'210px'} height='45px' bgColor={bgColor} borderRadius={'5px'}>
                                    <Link style={{ textDecoration: 'none' }} href='/negosiasiUserPage'>
                                        <Stack direction={'row'} spacing='12px'>
                                            <Stack mt='4px'>
                                                <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 3C1 3 2.5 1 6 1C9.5 1 11 3 11 3V17C11 17 9.5 16 6 16C2.5 16 1 17 1 17V3ZM11 3C11 3 12.5 1 16 1C19.5 1 21 3 21 3V17C21 17 19.5 16 16 16C12.5 16 11 17 11 17V3Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </Stack>
                                            <Text color={color} fontSize={'20px'} fontWeight='600'>Negosiasi</Text>
                                        </Stack>
                                    </Link>
                                </Box>
                            </Box>
                            <hr />
                            <Box px={{ lg: '40px', xl: '90px' }} py='15px'>
                                <Box py='8px' px='12px' width={'210px'} height='45px' bgColor={bgColor} borderRadius={'5px'}>
                                    <Link style={{ textDecoration: 'none' }} href='/editProfilePage'>
                                        <Stack direction={'row'} spacing='12px'>
                                            <Stack mt='4px'>
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11 1C5.477 1 1 5.477 1 11C1 16.523 5.477 21 11 21C16.523 21 21 16.523 21 11C21 5.477 16.523 1 11 1Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M3.271 17.346C3.271 17.346 5.5 14.5 11 14.5C16.5 14.5 18.73 17.346 18.73 17.346M11 11C11.7956 11 12.5587 10.6839 13.1213 10.1213C13.6839 9.55871 14 8.79565 14 8C14 7.20435 13.6839 6.44129 13.1213 5.87868C12.5587 5.31607 11.7956 5 11 5C10.2043 5 9.44128 5.31607 8.87868 5.87868C8.31607 6.44129 8 7.20435 8 8C8 8.79565 8.31607 9.55871 8.87868 10.1213C9.44128 10.6839 10.2043 11 11 11V11Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </Stack>
                                            <Text color={color} fontSize={'20px'} fontWeight='600'>Ubah Profile</Text>
                                        </Stack>
                                    </Link>
                                </Box>
                            </Box>
                            <hr />
                        </Hide>
                    </Box>
                    <Box mt='40px' bgColor={'#ffff'} pt='28px' px={{ base: '4px', md: '57px' }} width={{ base: '100%', lg: '700px', xl: '65%', '2xl': '100%' }} height='auto' borderRadius='8px'>
                        <Hide above='lg'>
                            <Button
                                rightIcon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 7H19" stroke="#CCD2E3" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M5 12H19" stroke="#CCD2E3" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M5 17H19" stroke="#CCD2E3" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                }
                                mb='20px'
                                bgColor='#3E38F5'
                                color={'#fff'}
                                ref={btnRef}
                                onClick={onOpen}>
                                Menu
                            </Button>
                        </Hide>
                        <Drawer
                            isOpen={isOpen}
                            placement='left'
                            onClose={onClose}
                            finalFocusRef={btnRef}
                        >
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerCloseButton />
                                <DrawerHeader>Menus</DrawerHeader>

                                <DrawerBody>
                                    <Box px={{ lg: '40px', xl: '135px' }}>
                                        <Avatar size='xl' name={user?.data?.nama} src={user?.data?.avatar} />
                                        <Text my='20px' fontSize={'18px'} fontWeight='600'>{user?.data?.nama}</Text>
                                    </Box>
                                    <hr />
                                    <Box px={{ lg: '40px', xl: '90px' }} py='15px'>
                                        <Box py='8px' px='12px' width={'210px'} height='45px' bgColor={bgColor} borderRadius={'5px'}>
                                            <Link style={{ textDecoration: 'none' }} href='/negosiasiUserPage'>
                                                <Stack direction={'row'} spacing='12px'>
                                                    <Stack mt='4px'>
                                                        <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M1 3C1 3 2.5 1 6 1C9.5 1 11 3 11 3V17C11 17 9.5 16 6 16C2.5 16 1 17 1 17V3ZM11 3C11 3 12.5 1 16 1C19.5 1 21 3 21 3V17C21 17 19.5 16 16 16C12.5 16 11 17 11 17V3Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </Stack>
                                                    <Text color={color} fontSize={'20px'} fontWeight='600'>Negosiasi</Text>
                                                </Stack>
                                            </Link>
                                        </Box>
                                    </Box>
                                    <hr />
                                    <Box px={{ lg: '40px', xl: '90px' }} py='15px'>
                                        <Box py='8px' px='12px' width={'210px'} height='45px' bgColor={bgColor} borderRadius={'5px'}>
                                            <Link style={{ textDecoration: 'none' }} href='/editProfilePage'>
                                                <Stack direction={'row'} spacing='12px'>
                                                    <Stack mt='4px'>
                                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M11 1C5.477 1 1 5.477 1 11C1 16.523 5.477 21 11 21C16.523 21 21 16.523 21 11C21 5.477 16.523 1 11 1Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M3.271 17.346C3.271 17.346 5.5 14.5 11 14.5C16.5 14.5 18.73 17.346 18.73 17.346M11 11C11.7956 11 12.5587 10.6839 13.1213 10.1213C13.6839 9.55871 14 8.79565 14 8C14 7.20435 13.6839 6.44129 13.1213 5.87868C12.5587 5.31607 11.7956 5 11 5C10.2043 5 9.44128 5.31607 8.87868 5.87868C8.31607 6.44129 8 7.20435 8 8C8 8.79565 8.31607 9.55871 8.87868 10.1213C9.44128 10.6839 10.2043 11 11 11V11Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </Stack>
                                                    <Text color={color} fontSize={'20px'} fontWeight='600'>Ubah Profile</Text>
                                                </Stack>
                                            </Link>
                                        </Box>
                                    </Box>
                                    <hr />
                                </DrawerBody>

                                {/* <DrawerFooter>
                            <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                            </Button>
                            <Button colorScheme='blue'>Save</Button>
                        </DrawerFooter> */}
                            </DrawerContent>
                        </Drawer>
                        {children}
                    </Box>
                </Flex>
            </Box>
        </>
    ) : <ErrorPage statusCode={413} />;
}

export default LayoutDashboardUser
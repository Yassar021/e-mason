import { Box, Flex, HStack, Link, Stack, Text } from "@chakra-ui/react"
import Head from "next/head"
import Image from "next/image"
import Navbar from "../components/navbar"

const LayoutDashboardUser = ({pageTitle,children,bgColor,color}) => {
    return(
        <>
        <Head>
            <title>E-Mason App | {pageTitle}</title>
        </Head>

        <Box height={'auto'} bgColor={'#E9E8F9'} pb='40px'>
            <Navbar />
            <Flex direction={'row'} gap={{lg:'20px',xl:'89px'}}>
                <Box width={'389px'} height='100vh' bgColor={'#fff'} pt='57px' textAlign={'center'}>
                    <Box px='135px'>
                        <Image width={'120px'} height='120px' style={{borderRadius:'50%'}} src='/avatar.jpg' alt='Profile Pengguna' />
                        <Text my='20px' fontSize={'18px'} fontWeight='600'>Muhammad Rifki</Text>
                    </Box>
                    <hr />
                    <Box px='90px' py='15px'>
                        <Box py='8px' px='12px' width={'210px'} height='45px' bgColor={bgColor} borderRadius={'5px'}>
                            <Link style={{textDecoration: 'none'}} href='/negosiasiUserPage'>
                                <Stack direction={'row'} spacing='12px'>
                                    <Stack mt='4px'>
                                        <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 3C1 3 2.5 1 6 1C9.5 1 11 3 11 3V17C11 17 9.5 16 6 16C2.5 16 1 17 1 17V3ZM11 3C11 3 12.5 1 16 1C19.5 1 21 3 21 3V17C21 17 19.5 16 16 16C12.5 16 11 17 11 17V3Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </Stack>
                                    <Text color={color} fontSize={'20px'} fontWeight='600'>Negosiasi</Text>
                                </Stack>
                            </Link>
                        </Box>
                    </Box>
                    <hr />
                    <Box px='90px' py='15px'>
                        <Box py='8px' px='12px' width={'210px'} height='45px' bgColor={bgColor}  borderRadius={'5px'}>
                            <Link style={{textDecoration: 'none'}} href='/editProfilePage'>
                            <Stack direction={'row'} spacing='12px'>
                                <Stack mt='4px'>
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11 1C5.477 1 1 5.477 1 11C1 16.523 5.477 21 11 21C16.523 21 21 16.523 21 11C21 5.477 16.523 1 11 1Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M3.271 17.346C3.271 17.346 5.5 14.5 11 14.5C16.5 14.5 18.73 17.346 18.73 17.346M11 11C11.7956 11 12.5587 10.6839 13.1213 10.1213C13.6839 9.55871 14 8.79565 14 8C14 7.20435 13.6839 6.44129 13.1213 5.87868C12.5587 5.31607 11.7956 5 11 5C10.2043 5 9.44128 5.31607 8.87868 5.87868C8.31607 6.44129 8 7.20435 8 8C8 8.79565 8.31607 9.55871 8.87868 10.1213C9.44128 10.6839 10.2043 11 11 11V11Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </Stack>
                                <Text color={color} fontSize={'20px'} fontWeight='600'>Ubah Profile</Text>
                            </Stack>
                            </Link>
                        </Box>
                    </Box>
                    <hr />
                </Box>
                <Box mt='40px' bgColor={'#ffff'} pt='28px' px='57px' width={{lg:'598px',xl:'65%','2xl':'100%'}} height='796px' borderRadius='8px'>
                    {children}
                </Box>
            </Flex>
        </Box>
        </>
    )
}

export default LayoutDashboardUser
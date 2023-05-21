import { Box, Flex, HStack, Image, Link, Text, textDecoration } from "@chakra-ui/react"
import Head from "next/head"
import Navbar from "../components/navbar"
import { authCheck } from "../utils/firebase/auth";
import ErrorPage from 'next/error'


const LayoutHomePage = ({ pageTitle, children }) => {

    const [check, user] = authCheck();
    return (user?.data?.type === 'pengguna') ? (
        <>
            <Head>
                <title>E-Mason App | {pageTitle}</title>
            </Head>

            <Box height={'auto'} bgColor={'#E9E8F9'} pb='40px'>
                <Navbar />
                <Box mt='30px' px={{ base: '2px', md: '20px', lg: '20px', xl: '60px', '2xl': '160px' }} mx={{ base: '10px', md: '40px', lg: '20px', xl: '60px', '2xl': '160px' }}>
                    {children}
                </Box>

            </Box>
        </>
    ) : <ErrorPage statusCode={413} />;
}

export default LayoutHomePage
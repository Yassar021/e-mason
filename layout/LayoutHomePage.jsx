import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react"
import Head from "next/head"

const LayoutHomePage = ({pageTitle, children}) => {
    return(
        <>
        <Head>
            <title>E-Mason App | {pageTitle}</title>
        </Head>

        <Box height={'auto'} bgColor={'#E9E8F9'} pb='40px'>
            <Box height={'113px'} bgColor='#fff' py='26px' px='90px'>
                <Flex direction={'row'} justifyContent='space-between'>
                    <Text fontSize={'40px'} fontWeight='700' fontFamily={'Poppins'} color='#3E38F5'>E-Mason</Text> 

                    <HStack spacing={'24px'}>
                        <Text fontSize={'24px'} fontWeight='700' fontFamily={'Poppins'}>Negosiasi</Text>
                        <Image borderRadius={'50%'} alt='Profile' w='50px' h='50px' src='/pp.jpeg' />
                    </HStack>   
                </Flex>               
            </Box>
            <Box mt='30px' px={{base:'10px',md:'20px',lg:'60px'}} mx={{base:'10px',md:'40px',lg:'60px'}}>
                {children}
            </Box>

        </Box>
        </>
    )
}

export default LayoutHomePage
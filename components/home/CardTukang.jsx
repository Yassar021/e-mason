import { Box, Button, Flex, HStack, Link, Stack, Text } from "@chakra-ui/react"
import Image from "next/image"

const CardTukang = ({name, star, status, image}) => {
    return (
       <Box w='300px' h='300px' py='24px' px='40px' borderRadius={'8px'} bgColor='#fff'>
            <Flex direction="column" mx='auto' textAlign={'center'} alignItems='center'>
                <Image style={{borderRadius:'50%'}} width='110px' height={'110px'} src={image} alt='Profile Tukang'  />
                <Text my='5px' fontSize={'18px'} fontWeight='500' fontFamily={'Poppins'}>{name}</Text>
                <HStack spacing='8px'>
                    <HStack spacing='4px'>
                        <Stack>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.025 7.33329L8.99996 0.666626L6.97496 7.33329H0.666626L5.81663 11.0083L3.85829 17.3333L8.99996 13.425L14.15 17.3333L12.1916 11.0083L17.3333 7.33329H11.025Z" fill="#FFC804"/>
                            </svg>
                        </Stack>
                        <Text fontSize={'14px'} fontWeight='500' fontFamily={'Poppins'}>{star}</Text>
                    </HStack>
                    <Text>| {status}</Text>
                </HStack>
            </Flex>
            <Link href="DetailTukangPage" style={{textDecoration: 'none'}}>
                <Button
                        mt='18px'
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
                        Detail
                    </Button>
            </Link>
       </Box> 
    )
}

export default CardTukang
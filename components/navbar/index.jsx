import { Box, Button, Flex, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
    return(
            <Box height={'113px'} bgColor='#fff' py='26px' px={{base:'12px',md:'90px'}}>
                <Flex direction={'row'} justifyContent='space-between' py='auto'>
                    <Link style={{textDecoration:'none'}} href='/HomePage'>
                        <Text fontSize={{base:'22px',md:'40px'}} fontWeight='700' fontFamily={'Poppins'} color='#3E38F5'>E-Mason</Text> 
                    </Link>
                    <Flex dir='row' gap={{base:'0px',md:'24px'}} my='auto'>
                        <Link style={{textDecoration:'none'}} href='/negosiasiUserPage'>
                            <Text fontSize={{base:'18px',md:'24px'}} fontWeight='700' fontFamily={'Poppins'}>Negosiasi</Text>
                        </Link>

                        <Menu>
                            <MenuButton as={Button} 
                                height='50px'
                                bgColor='transparent' 
                                _hover={{ bg: 'transparent' }}
                                _active={{
                                    bg: 'transparent',
                                }}
                                rightIcon={
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 15L12.7071 15.7071L12 16.4142L11.2929 15.7071L12 15ZM18.7071 9.70711L12.7071 15.7071L11.2929 14.2929L17.2929 8.29289L18.7071 9.70711ZM11.2929 15.7071L5.29289 9.70711L6.70711 8.29289L12.7071 14.2929L11.2929 15.7071Z" fill="#CCD2E3"/>
                                    </svg>
                                }>
                                <Image style={{borderRadius:'50%'}} alt='Profile' width='50px' height='50px' src='/avatar.jpg' />
                            </MenuButton>
                            <MenuList >
                                <MenuItem>Keluar</MenuItem>
                            </MenuList>
                        </Menu>
                        
                    </Flex>  
                </Flex>               
            </Box>

    )
}

export default Navbar
import { Avatar, Box, Button, Flex, HStack, Link, Stack, Text } from "@chakra-ui/react"

const CardTukang = ({ name, image, id }) => {
    return (
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} mt={{ base: '12px', md: '0px' }} w='300px' h='300px' py='24px' px='40px' borderRadius={'8px'} bgColor='#fff'>
            <Flex direction="column" mx='auto' textAlign={'center'} alignItems='center'>
                <Avatar size='xl' name={name} src={image} />
                <Text my='5px' fontSize={'18px'} fontWeight='600' fontFamily={'Poppins'}>{name}</Text>
            </Flex>
            <Link href={`/detailTukang/${id}`} style={{ textDecoration: 'none' }}>
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
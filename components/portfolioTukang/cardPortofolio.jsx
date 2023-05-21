import { Box, Button, Center, Flex, Image, Input } from "@chakra-ui/react"

const CardPortofolio = () => {
    return (
        <Box width={'300px'} height='300px' shadow={'xl'} py='20px' px='40px' borderRadius={'10px'}>
            <Image mx='auto' mb='12px' width='240px' borderRadius={'8px'} height='200px' src='/bangunan2.jpg' alt='Portofolio Tukang' />
            <Flex dir="row" gap='8px' justifyContent={'center'}>
                <Button colorScheme={'blue'}>Info</Button>
                <Button colorScheme={'yellow'}>Edit</Button>
                <Button colorScheme={'red'}>Hapus</Button>
            </Flex>

        </Box>
    )
}

export default CardPortofolio
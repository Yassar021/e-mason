import { Box, Center, Image, Input } from "@chakra-ui/react"

const CardPortofolio = () => {
    return(
        <Box width={'300px'} height='264px' shadow={'xl'} py='20px' px='40px' borderRadius={'10px'}>
            <Image mb='24px' width='150px' height='150px' src='/blank.png' alt='Portofolio Tukang' />
            <Input type='file' />
        </Box>
    )
}

export default CardPortofolio
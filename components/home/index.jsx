import { Box, Flex, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import LayoutHomePage from "../../layout/LayoutHomePage"
import CardTukang from "./CardTukang"

const Home = () => {
    return(
        <LayoutHomePage pageTitle={'Home'}>
            <Flex direction={'column'} gap='40px' textAlign={'left'}>
                <Box height={'450px'} bgImage='/mason.jpg' backgroundSize={'cover'} borderRadius='8px'>
                </Box>

                <Box>
                    <VStack spacing='24px'>
                        <Text fontFamily={'Poppins'} fontSize='24px' fontWeight={'600'}>Tukang Tersedia</Text>
                        <SimpleGrid spacing={{md:'10px',lg:'20px'}} columns={{base:1,md:2,lg:3, xl:4}}>
                            <CardTukang name={'Mas Aji'} star={'5'} status={'Bekerja'} image={'/pp.jpeg'} />
                            <CardTukang name={'Mas Aji'} star={'5'} status={'Bekerja'} image={'/pp.jpeg'} />
                            <CardTukang name={'Mas Aji'} star={'5'} status={'Bekerja'} image={'/pp.jpeg'} />
                            <CardTukang name={'Mas Aji'} star={'5'} status={'Bekerja'} image={'/pp.jpeg'} />
                        </SimpleGrid>
                    </VStack>
                </Box>
            </Flex>
        </LayoutHomePage>
    )
}

export default Home
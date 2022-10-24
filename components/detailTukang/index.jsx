import { Box, Button, Center, Flex, Image, SimpleGrid, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react"
import LayoutHomePage from "../../layout/LayoutHomePage"


const DetailTukang = () => {
    return ( 
        <LayoutHomePage pageTitle={'Detail Tukang'}>
            <Flex direction={{md:'column',lg:'row',xl:'row'}} gap={{lg:'20px',xl:'60px'}}>
                <Image borderRadius={'8px'} border='2px solid #3E38F5' src="/avatar.jpg" width={'auto'} height='253px' alt='Profile Tukang' />
                <Box borderRadius={'8px'} bgColor='#fff' width='auto' height='253px' px='24px' py='12px'>
                    <TableContainer>
                        <Table border={'none'}>
                            <Thead>
                            <Tr>
                                <Td>
                                    <Text fontSize={'18px'} fontWeight='500'>
                                        Nama
                                    </Text>
                                </Td>
                                <Td>
                                    <Text fontSize={'18px'} fontWeight='500'>
                                        Daeng Naba
                                    </Text>
                                </Td>
                            </Tr>
                            </Thead>
                            <Tbody>
                            <Tr>
                                <Td>
                                    <Text fontSize={'18px'} fontWeight='500'>
                                        Usia
                                    </Text>
                                </Td>
                                <Td>
                                    <Text fontSize={'18px'} fontWeight='500'>
                                        32 tahun
                                    </Text>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <Text fontSize={'18px'} fontWeight='500'>
                                        Nomor Telepon
                                    </Text>
                                </Td>
                                <Td>
                                    <Text fontSize={'18px'} fontWeight='500'>
                                        089281782020
                                    </Text>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <Text fontSize={'18px'} fontWeight='500'>
                                        Alamat
                                    </Text>
                                </Td>
                                <Td>
                                    <Text fontSize={'18px'} fontWeight='500'>
                                        Desa Parasurasuoe
                                    </Text>
                                </Td>
                            </Tr>

                            {/* <Tr>
                                <Td>
                                    <Text fontSize={'18px'} fontWeight='600'>
                                        Keahlian Khusus
                                    </Text>
                                </Td>
                                <Td>
                                    <Text fontSize={'18px'} fontWeight='600'>
                                        -
                                    </Text>
                                </Td>
                            </Tr> */}

                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>

                <Box my='auto' borderRadius={'8px'} width={{lg:'220px',xl:'300px'}} height={'auto'} py='18px' px='65px' bgColor='#fff'>
                    <Center>
                        <VStack spacing={'28px'}>
                            <Text fontSize={'24px'} fontWeight='700'>Pesan Jasa</Text>
                            <Button
                                size='md'
                                height='48px'
                                width='200px'
                                bgColor={'#3E38F5'}
                                color='#fff'
                                _hover={{ bg: '#3E38F5' }}
                                _active={{
                                    bg: '#3E38F5',
                                    transform: 'scale(0.98)',
                                }}
                                >
                                Pesan Sekarang
                            </Button>
                        </VStack>
                    </Center>
                </Box>
            </Flex>
            
            <Text mt='60px' fontSize={'24px'} fontWeight='600'>
                Bangunan yang telah dikerjakan
            </Text>
            <SimpleGrid columns={4} spacing='20px' mt='24px'>
                <Image borderRadius={'8px'} width={'auto'} height='274px' src='/bangunan1.jpg' alt='Portfolio Bangunan' />
                <Image borderRadius={'8px'} width={'auto'} height='274px' src='/bangunan2.jpg' alt='Portfolio Bangunan' />
                <Image borderRadius={'8px'} width={'auto'} height='274px' src='/bangunan3.jpg' alt='Portfolio Bangunan' />
                <Image borderRadius={'8px'} width={'auto'} height='274px' src='/bangunan2.jpg' alt='Portfolio Bangunan' />
                <Image borderRadius={'8px'} width={'auto'} height='274px' src='/bangunan1.jpg' alt='Portfolio Bangunan' />
                <Image borderRadius={'8px'} width={'auto'} height='274px' src='/bangunan3.jpg' alt='Portfolio Bangunan' />
                <Image borderRadius={'8px'} width={'auto'} height='274px' src='/bangunan2.jpg' alt='Portfolio Bangunan' />
                <Image borderRadius={'8px'} width={'auto'} height='274px' src='/bangunan1.jpg' alt='Portfolio Bangunan' />
            </SimpleGrid>
        </LayoutHomePage>

    )
}

export default DetailTukang
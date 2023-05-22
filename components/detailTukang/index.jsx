import { Box, Button, Center, Flex, Image, Img, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, useDisclosure } from "@chakra-ui/react"
import LayoutHomePage from "../../layout/LayoutHomePage"


const DetailTukang = ({ user }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    console.log(user)
    return (
        <>
            <Modal isOpen={isOpen} size='xl' onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Detail Proyek</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex direction={'column'} gap='20px'>
                            <Image mx='auto' mb='12px' width='100%' borderRadius={'8px'} height='auto' src={'/bangunan1.jpg'} alt='Portofolio Tukang' />
                            <Text>Luas Bangunan : </Text>
                            <Text>Type Bangunan : </Text>
                            <Text>Kisaran Harga : Rp.</Text>
                            <Text>Estimasi Waktu (hari) : </Text>
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Tutup
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <LayoutHomePage pageTitle={'Detail Tukang'}>
                <Flex direction={{ base: 'column', md: 'column', lg: 'row', xl: 'row' }} gap={{ lg: '20px', xl: '60px' }}>
                    <Img borderRadius={'8px'} border='2px solid #3E38F5' src={user?.avatar} width={'auto'} height='253px' alt='Profile Tukang' />
                    <Box borderRadius={'8px'} bgColor='#fff' width='auto' height='278px' px='24px' py='12px'>
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
                                                {user?.nama}
                                            </Text>
                                        </Td>
                                    </Tr>
                                </Thead>
                                <Tbody padding={'8px'}>
                                    <Tr>
                                        <Td>
                                            <Text fontSize={'18px'} fontWeight='500'>
                                                Usia
                                            </Text>
                                        </Td>
                                        <Td>
                                            <Text fontSize={'18px'} fontWeight='500'>
                                                {new Date().getFullYear() - new Date(user?.tanggalLahir).getFullYear()} tahun
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
                                                {user?.nomorTelepon}
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
                                                {user?.alamat}
                                            </Text>
                                        </Td>
                                    </Tr>

                                    <Tr>
                                        <Td>
                                            <Text fontSize={'18px'} fontWeight='600'>
                                                Keahlian Khusus
                                            </Text>
                                        </Td>
                                        <Td>
                                            <Text fontSize={'18px'} fontWeight='600'>
                                                {user?.keahlian}
                                            </Text>
                                        </Td>
                                    </Tr>

                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>

                    <Box my='auto' borderRadius={'8px'} width={{ lg: '220px', xl: '300px' }} height={'auto'} py='18px' px='65px' bgColor='#fff'>
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
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing='20px' mt='24px'>
                    <Image onClick={onOpen} borderRadius={'8px'} width={'auto'} height='274px' src='/bangunan1.jpg' alt='Portfolio Bangunan' />
                </SimpleGrid>
            </LayoutHomePage>
        </>

    )
}

export default DetailTukang
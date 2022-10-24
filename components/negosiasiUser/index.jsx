import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Tab, Table, TableCaption, TableContainer, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import LayoutDashboardUser from "../../layout/LayoutDashboardUser"

const NegosiasiUser = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <LayoutDashboardUser pageTitle={'Negosiasi'}>
            <Box>
                <Tabs mt='30px' variant='soft-rounded' colorScheme='green'>
                    <TabList>
                        <Tab>Pemesanan</Tab>
                        <Tab>Selesai</Tab>
                        <Tab>Dibatalkan</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <TableContainer>
                                <Table variant='simple'>
                                    <Thead>
                                        <Tr>
                                            <Th>Nama Tukang</Th>
                                            <Th>Usia</Th>
                                            <Th>Telp</Th>
                                            <Th>Alamat</Th>
                                            <Th>Keahlian</Th>
                                            <Th>Tanggal</Th>
                                            <Th>Action</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr>
                                            <Td>Daeng Naba</Td>
                                            <Td>32 tahun</Td>
                                            <Td>0902900032</Td>
                                            <Td>Jeneponto</Td>
                                            <Td>-</Td>
                                            <Td>December, 03 Agustus 2022</Td>
                                            <Td>
                                                <Button  
                                                    bgColor={'#3E38F5'} 
                                                    color='#fff' 
                                                    onClick={onOpen}
                                                    _hover={{ bg: '#3E38F5' }}
                                                    _active={{
                                                      bg: '#3E38F5',
                                                      transform: 'scale(0.98)',
                                                    }}
                                                    >
                                                        Info Pemesanan
                                                </Button>
                                                <Modal onClose={onClose} isOpen={isOpen} isCentered>
                                                <ModalOverlay />
                                                <ModalContent>
                                                    <ModalHeader>Info Pemesanan Anda</ModalHeader>
                                                    <ModalCloseButton />
                                                    <ModalBody>
                                                        <Stack direction={'column'} spacing='14px'>
                                                        <FormControl isRequired>
                                                            <FormLabel>Nama</FormLabel>
                                                            <Input placeholder='Nama' />
                                                        </FormControl>
                                                        <FormControl isRequired>
                                                            <FormLabel>Usia</FormLabel>
                                                            <Input type='number' placeholder='Usia' />
                                                        </FormControl>
                                                        <FormControl isRequired>
                                                            <FormLabel>No Telepon</FormLabel>
                                                            <Input type={'number'} placeholder='No Telepon' />
                                                        </FormControl>
                                                        <FormControl isRequired>
                                                            <FormLabel>Alamat</FormLabel>
                                                            <Input placeholder='Alamat' />
                                                        </FormControl>
                                                        <FormControl isRequired>
                                                            <FormLabel>Keahlian</FormLabel>
                                                            <Input placeholder='Keahlian' />
                                                        </FormControl>
                                                        <FormControl isRequired>
                                                            <FormLabel>Tanggal Pemesanan</FormLabel>
                                                            <Input type={'date'} />
                                                        </FormControl>
                                                        </Stack>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button color='#fff' bgColor={'red'}>Batalkan Pemesanan</Button>
                                                    </ModalFooter>
                                                </ModalContent>
                                                </Modal>
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                        <TabPanel>
                            <TableContainer>
                                <Table variant='simple'>
                                    <Thead>
                                        <Tr>
                                            <Th>Nama Tukang</Th>
                                            <Th>Usia</Th>
                                            <Th>Telp</Th>
                                            <Th>Alamat</Th>
                                            <Th>Keahlian</Th>
                                            <Th>Tanggal</Th>
                                            <Th>Action</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr>
                                            <Td>Daeng Naba</Td>
                                            <Td>32 tahun</Td>
                                            <Td>0902900032</Td>
                                            <Td>Jeneponto</Td>
                                            <Td>-</Td>
                                            <Td>December, 03 Agustus 2022</Td>
                                            <Td>
                                                <Button 
                                                    bgColor={'#3E38F5'} 
                                                    color='#fff' 
                                                    onClick={onOpen}
                                                    _hover={{ bg: '#3E38F5' }}
                                                    _active={{
                                                      bg: '#3E38F5',
                                                      transform: 'scale(0.98)',
                                                    }}
                                                    >
                                                        Info Pemesanan
                                                    </Button>
                                                <Modal onClose={onClose} isOpen={isOpen} isCentered>
                                                <ModalOverlay />
                                                <ModalContent>
                                                    <ModalHeader>Info Pemesanan Anda</ModalHeader>
                                                    <ModalCloseButton />
                                                    <ModalBody>
                                                        <Stack direction={'column'} spacing='14px'>
                                                        <FormControl isRequired>
                                                            <FormLabel>Nama</FormLabel>
                                                            <Input placeholder='Nama' />
                                                        </FormControl>
                                                        <FormControl isRequired>
                                                            <FormLabel>Usia</FormLabel>
                                                            <Input type='number' placeholder='Usia' />
                                                        </FormControl>
                                                        <FormControl isRequired>
                                                            <FormLabel>No Telepon</FormLabel>
                                                            <Input type={'number'} placeholder='No Telepon' />
                                                        </FormControl>
                                                        <FormControl isRequired>
                                                            <FormLabel>Alamat</FormLabel>
                                                            <Input placeholder='Alamat' />
                                                        </FormControl>
                                                        <FormControl isRequired>
                                                            <FormLabel>Keahlian</FormLabel>
                                                            <Input placeholder='Keahlian' />
                                                        </FormControl>
                                                        <FormControl isRequired>
                                                            <FormLabel>Tanggal Pemesanan</FormLabel>
                                                            <Input type={'date'} />
                                                        </FormControl>
                                                        </Stack>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button color='#fff' bgColor={'red'}>Batalkan Pemesanan</Button>
                                                    </ModalFooter>
                                                </ModalContent>
                                                </Modal>
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                        <TabPanel>
                            <TableContainer>
                                <Table variant='simple'>
                                    <Thead>
                                        <Tr>
                                            <Th>Nama Tukang</Th>
                                            <Th>Usia</Th>
                                            <Th>Telp</Th>
                                            <Th>Alamat</Th>
                                            <Th>Keahlian</Th>
                                            <Th>Tanggal</Th>
                                            <Th>Action</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr>
                                            <Td>Daeng Naba</Td>
                                            <Td>32 tahun</Td>
                                            <Td>0902900032</Td>
                                            <Td>Jeneponto</Td>
                                            <Td>-</Td>
                                            <Td>December, 03 Agustus 2022</Td>
                                            <Td>
                                                <Button 
                                                    bgColor={'#3E38F5'} 
                                                    color='#fff' 
                                                    onClick={onOpen}
                                                    _hover={{ bg: '#3E38F5' }}
                                                    _active={{
                                                      bg: '#3E38F5',
                                                      transform: 'scale(0.98)',
                                                    }}
                                                    >
                                                        Info Pemesanan
                                                    </Button>
                                                <Modal onClose={onClose} isOpen={isOpen} isCentered>
                                                <ModalOverlay />
                                                <ModalContent>
                                                    <ModalHeader>Info Pemesanan Anda</ModalHeader>
                                                    <ModalCloseButton />
                                                    <ModalBody>
                                                        <Stack direction={'column'} spacing='14px'>
                                                        <FormControl isRequired>
                                                            <FormLabel>Nama</FormLabel>
                                                            <Input placeholder='Nama' />
                                                        </FormControl>
                                                        <FormControl isRequired>
                                                            <FormLabel>Usia</FormLabel>
                                                            <Input type='number' placeholder='Usia' />
                                                        </FormControl>
                                                        <FormControl isRequired>
                                                            <FormLabel>No Telepon</FormLabel>
                                                            <Input type={'number'} placeholder='No Telepon' />
                                                        </FormControl>
                                                        <FormControl isRequired>
                                                            <FormLabel>Alamat</FormLabel>
                                                            <Input placeholder='Alamat' />
                                                        </FormControl>
                                                        <FormControl isRequired>
                                                            <FormLabel>Keahlian</FormLabel>
                                                            <Input placeholder='Keahlian' />
                                                        </FormControl>
                                                        <FormControl isRequired>
                                                            <FormLabel>Tanggal Pemesanan</FormLabel>
                                                            <Input type={'date'} />
                                                        </FormControl>
                                                        </Stack>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button color='#fff' bgColor={'red'}>Batalkan Pemesanan</Button>
                                                    </ModalFooter>
                                                </ModalContent>
                                                </Modal>
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </LayoutDashboardUser>
    )
}

export default NegosiasiUser
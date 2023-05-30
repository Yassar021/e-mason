import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Tab, Table, TableCaption, TableContainer, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react"
import LayoutDashboardUser from "../../layout/LayoutDashboardUser"
import { useEffect, useRef, useState } from "react";
import { httpsCallable } from "firebase/functions";
import functions from "../../utils/firebase/function";
import { authCheck } from "../../utils/firebase/auth";

const NegosiasiUser = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    // set fetch portofolio
    const [_, user] = authCheck();
    const [key, setKey] = useState(0);
    const toast = useToast();
    const [orders, setOrders] = useState([]);
    const [currPage, setCurrPage] = useState(1); // storing current page number
    const [prevPage, setPrevPage] = useState(0); // storing prev page number
    const [wasLastList, setWasLastList] = useState(false);
    const listInnerRef = useRef();
    const onScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                setCurrPage(currPage + 1);
            }
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            const getOrders = httpsCallable(functions, 'getOrders')
            const response = await getOrders({
                page: currPage,
                limit: 10,
                penggunaId: user?.data?.id,
            })
            if (!response.data.data.length) {
                setWasLastList(true);
                return;
            }
            setPrevPage(currPage);
            setOrders([...orders, ...response.data.data]);
        };
        if (!wasLastList && prevPage !== currPage) {
            fetchData();
        }
    }, [currPage, wasLastList, prevPage, orders, user]);

    useEffect(() => {
        function watchScroll() {
            window.addEventListener('scroll', onScroll);
        }
        watchScroll();
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [])

    return (
        <>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalContent>
                    <ModalHeader>Info Pemesanan Anda</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack direction={'column'} spacing='14px'>
                            <FormControl isRequired>
                                <FormLabel>Nama</FormLabel>
                                <Input value={orders[key]?.tukang?.nama} isDisabled />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Usia</FormLabel>
                                <Input value={new Date().getFullYear() - new Date(orders[key]?.tukang?.tanggalLahir).getFullYear()} tahun isDisabled />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>No Telepon</FormLabel>
                                <Input value={orders[key]?.tukang?.nomorTelepon} isDisabled />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Alamat</FormLabel>
                                <Input value={orders[key]?.tukang?.alamat} isDisabled />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Keahlian</FormLabel>
                                <Input value={orders[key]?.tukang?.keahlian} isDisabled />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Tanggal Pemesanan</FormLabel>
                                <Input value={orders[key]?.createdAt} isDisabled />
                            </FormControl>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='#fff' bgColor={'red'}>Batalkan Pemesanan</Button>
                        <Button ml='4px' onClick={onClose} colorScheme="blue">Tutup</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <LayoutDashboardUser pageTitle={'Negosiasi'}>
                <Box>
                    <Tabs mt='30px' variant='soft-rounded' colorScheme='green'>
                        <TabList flexDirection={{ base: 'column', md: 'row' }}>
                            <Tab>Daftar Pesanan</Tab>
                            <Tab>DiProses</Tab>
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
                                            {
                                                orders.map((order, i) =>
                                                    <Tr key={order.id}>
                                                        <Td>{order?.tukang?.nama}</Td>
                                                        <Td>{new Date().getFullYear() - new Date(order?.tukang?.tanggalLahir).getFullYear()} tahun</Td>
                                                        <Td>{order?.tukang?.nomorTelepon}</Td>
                                                        <Td>{order?.tukang?.alamat}</Td>
                                                        <Td>{order?.tukang?.keahlian}</Td>
                                                        <Td>{order?.createdAt}</Td>
                                                        <Td>
                                                            <Button
                                                                bgColor={'#3E38F5'}
                                                                color='#fff'
                                                                onClick={() => {
                                                                    onOpen()
                                                                    setKey(i)
                                                                }}

                                                                _hover={{ bg: '#3E38F5' }}
                                                                _active={{
                                                                    bg: '#3E38F5',
                                                                    transform: 'scale(0.98)',
                                                                }}
                                                            >
                                                                Detail
                                                            </Button>
                                                        </Td>
                                                    </Tr>)
                                            }
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
        </>

    )
}

export default NegosiasiUser
import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Tab, Table, TableContainer, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react"
import LayoutDashboardTukang from "../../layout/LayoutDashboardTukang"
import { authCheck } from "../../utils/firebase/auth";
import { useEffect, useRef, useState } from "react";
import { httpsCallable } from "firebase/functions";
import functions from "../../utils/firebase/function";

const DashboardTukang = () => {
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
                tukangId: user?.data?.id,
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
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Info Pemesanan Anda</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack direction={'column'} spacing='14px'>
                            <FormControl isRequired>
                                <FormLabel>Nama</FormLabel>
                                <Input value={orders[key]?.pengguna?.nama} isDisabled />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Usia</FormLabel>
                                <Input value={new Date().getFullYear() - new Date(orders[key]?.pengguna?.tanggalLahir).getFullYear()} tahun isDisabled />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>No Telepon</FormLabel>
                                <Input value={orders[key]?.pengguna?.nomorTelepon} isDisabled />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Alamat</FormLabel>
                                <Input value={orders[key]?.pengguna?.alamat} isDisabled />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Tanggal Pemesanan</FormLabel>
                                <Input value={orders[key]?.createdAt} isDisabled />
                            </FormControl>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red">Tolak</Button>
                        <Button mx='4px' colorScheme="green">Terima</Button>
                        <Button colorScheme="blue">Tutup</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <LayoutDashboardTukang pageTitle={'Dashboard Tukang'}>
                <Box>
                    <Tabs mt='30px' variant='soft-rounded' colorScheme='green'>
                        <TabList flexDirection={{ base: 'column', md: 'row' }}>
                            <Tab>Daftar Pemesanan</Tab>
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
                                                <Th>Tanggal</Th>
                                                <Th>Action</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {
                                                orders.map((order, i) =>
                                                    <Tr key={order.id}>
                                                        <Td>{order?.pengguna?.nama}</Td>
                                                        <Td>{new Date().getFullYear() - new Date(order?.pengguna?.tanggalLahir).getFullYear()} tahun</Td>
                                                        <Td>{order?.pengguna?.nomorTelepon}</Td>
                                                        <Td>{order?.pengguna?.alamat}</Td>
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
            </LayoutDashboardTukang>
        </>
    )
}

export default DashboardTukang
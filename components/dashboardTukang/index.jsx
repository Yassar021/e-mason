import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import LayoutDashboardTukang from "../../layout/LayoutDashboardTukang";
import { authCheck } from "../../utils/firebase/auth";
import { useEffect, useRef, useState } from "react";
import { httpsCallable } from "firebase/functions";
import functions from "../../utils/firebase/function";
import { useRouter } from "next/router";
import moment from "moment/moment";

const DashboardTukang = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // set handle tolak dan terima
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const [status, setStatus] = useState("");

  // set fetch orders
  const [_, user] = authCheck();
  const [key, setKey] = useState(0);
  const [orders, setOrders] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [currPage, setCurrPage] = useState(1); // storing current page number
  const [prevPage, setPrevPage] = useState(0); // storing prev page number
  const [wasLastList, setWasLastList] = useState(false);
  const listInnerRef = useRef();

  // logic fetch orders
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
      const getOrders = httpsCallable(functions, "getOrders");
      const response = await getOrders({
        page: currPage,
        limit: 10,
        tukangId: user?.data?.id,
        status,
      });
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
  }, [currPage, wasLastList, prevPage, orders, user, status]);

  useEffect(() => {
    setCurrPage(1);
    setWasLastList(false);
    setOrders([]);
    setCurrPage(1);
    setPrevPage(0);

    if (tabIndex === 0) {
      setStatus("");
    }
    if (tabIndex === 1) {
      setStatus("Diproses");
    }
    if (tabIndex === 2) {
      setStatus("Selesai");
    }
    if (tabIndex === 3) {
      setStatus("Dibatalkan");
    }
  }, [tabIndex]);

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", onScroll);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // logic update orders
  const handleUpdate = async (id, status) => {
    setLoading(true);
    try {
      const updateOrder = httpsCallable(functions, "updateOrder");
      await updateOrder({
        id: id,
        status: status,
        progress: {},
      });
      setLoading(false);
      toast({
        title: "Order berhasil diupdate",
        description: "Kami telah buat untuk anda.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onClose();
      router.reload();
    } catch (error) {
      toast({
        title: "Order gagal diupdate",
        description: "Kami gagal buat untuk anda.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Info Pemesanan Anda</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction={"column"} spacing="14px">
              <FormControl isRequired>
                <FormLabel>Nama</FormLabel>
                <Input value={orders[key]?.pengguna?.nama} isDisabled />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Detail Kerjaan</FormLabel>
                <Input value={orders[key]?.detailKerjaan} isDisabled />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Usia</FormLabel>
                <Input
                  value={
                    new Date().getFullYear() -
                    new Date(orders[key]?.pengguna?.tanggalLahir).getFullYear()
                  }
                  isDisabled
                />
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
                <Input
                  value={moment(orders[key]?.createdAt).format("DD-MMMM-YYYY")}
                  isDisabled
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            {status === "" && (
              <>
                <Button
                  isDisabled={loading}
                  onClick={() => handleUpdate(orders[key]?.id, "Dibatalkan")}
                  colorScheme="red"
                >
                  Tolak
                </Button>
                <Button
                  isDisabled={loading}
                  onClick={() => handleUpdate(orders[key]?.id, "Diproses")}
                  mx="4px"
                  colorScheme="green"
                >
                  Terima
                </Button>
              </>
            )}
            {status === "Diproses" && (
              <>
                <Button
                  isDisabled={loading}
                  onClick={() => handleUpdate(orders[key]?.id, "Selesai")}
                  mx="4px"
                  colorScheme="green"
                >
                  Selesai
                </Button>
              </>
            )}
            <Button
              as={"a"}
              href={`https://wa.me/+62${orders[key]?.pengguna?.nomorTelepon}`}
              target="_blank"
              mx="4px"
              colorScheme="teal"
            >
              Hubungi
            </Button>
            <Button onClick={onClose} colorScheme="blue">
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <LayoutDashboardTukang pageTitle={"Dashboard Tukang"}>
        <Stack direction={"column"} spacing={"10px"}>
          <HStack spacing="20px">
            <Text fontSize={"16px"} fontWeight={"600"}>
              Nama :
            </Text>
            <Text>{user?.data?.nama}</Text>
          </HStack>
          <HStack spacing="20px">
            <Text fontSize={"16px"} fontWeight={"600"}>
              Kategori Keahlian :
            </Text>
            <Flex gap="6px">
              {user?.data?.kategoriKeahlian?.map((item, i) => (
                <Checkbox isChecked isDisabled key={i}>
                  {item}
                </Checkbox>
              ))}
            </Flex>
          </HStack>
          <HStack spacing="20px">
            <Text fontSize={"16px"} fontWeight={"600"}>
              Detail Keahlian :
            </Text>
            <Text>{user?.data?.keahlian}</Text>
          </HStack>
        </Stack>
        <Box>
          <Tabs
            isLazy
            onChange={(index) => setTabIndex(index)}
            mt="30px"
            variant="soft-rounded"
            colorScheme="green"
          >
            <TabList flexDirection={{ base: "column", md: "row" }}>
              <Tab>Daftar Pemesanan</Tab>
              <Tab>Diproses</Tab>
              <Tab>Selesai</Tab>
              <Tab>Dibatalkan</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Nama Pengguna</Th>
                        <Th>Usia</Th>
                        <Th>Telp</Th>
                        <Th>Alamat</Th>
                        <Th>Tanggal</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {orders.map((order, i) => (
                        <Tr key={order.id}>
                          <Td>{order?.pengguna?.nama}</Td>
                          <Td>
                            {new Date().getFullYear() -
                              new Date(
                                order?.pengguna?.tanggalLahir
                              ).getFullYear()}{" "}
                            tahun
                          </Td>
                          <Td>{order?.pengguna?.nomorTelepon}</Td>
                          <Td>{order?.pengguna?.alamat}</Td>
                          <Td>
                            {moment(order?.createdAt).format("DD-MMMM-YYYY")}
                          </Td>
                          <Td>
                            <Button
                              bgColor={"#3E38F5"}
                              color="#fff"
                              onClick={() => {
                                onOpen();
                                setKey(i);
                              }}
                              _hover={{ bg: "#3E38F5" }}
                              _active={{
                                bg: "#3E38F5",
                                transform: "scale(0.98)",
                              }}
                            >
                              Detail
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Nama Pengguna</Th>
                        <Th>Usia</Th>
                        <Th>Telp</Th>
                        <Th>Alamat</Th>
                        <Th>Tanggal</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {orders.map((order, i) => (
                        <Tr key={order.id}>
                          <Td>{order?.pengguna?.nama}</Td>
                          <Td>
                            {new Date().getFullYear() -
                              new Date(
                                order?.pengguna?.tanggalLahir
                              ).getFullYear()}{" "}
                            tahun
                          </Td>
                          <Td>{order?.pengguna?.nomorTelepon}</Td>
                          <Td>{order?.pengguna?.alamat}</Td>
                          <Td>
                            {moment(order?.createdAt).format("DD-MMMM-YYYY")}
                          </Td>
                          <Td>
                            <Button
                              bgColor={"#3E38F5"}
                              color="#fff"
                              onClick={() => {
                                onOpen();
                                setKey(i);
                              }}
                              _hover={{ bg: "#3E38F5" }}
                              _active={{
                                bg: "#3E38F5",
                                transform: "scale(0.98)",
                              }}
                            >
                              Detail
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Nama Pengguna</Th>
                        <Th>Usia</Th>
                        <Th>Telp</Th>
                        <Th>Alamat</Th>
                        <Th>Tanggal</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {orders.map((order, i) => (
                        <Tr key={order.id}>
                          <Td>{order?.pengguna?.nama}</Td>
                          <Td>
                            {new Date().getFullYear() -
                              new Date(
                                order?.pengguna?.tanggalLahir
                              ).getFullYear()}{" "}
                            tahun
                          </Td>
                          <Td>{order?.pengguna?.nomorTelepon}</Td>
                          <Td>{order?.pengguna?.alamat}</Td>
                          <Td>
                            {moment(order?.createdAt).format("DD-MMMM-YYYY")}
                          </Td>
                          <Td>
                            <Button
                              bgColor={"#3E38F5"}
                              color="#fff"
                              onClick={() => {
                                onOpen();
                                setKey(i);
                              }}
                              _hover={{ bg: "#3E38F5" }}
                              _active={{
                                bg: "#3E38F5",
                                transform: "scale(0.98)",
                              }}
                            >
                              Detail
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Nama Pengguna</Th>
                        <Th>Usia</Th>
                        <Th>Telp</Th>
                        <Th>Alamat</Th>
                        <Th>Tanggal</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {orders.map((order, i) => (
                        <Tr key={order.id}>
                          <Td>{order?.pengguna?.nama}</Td>
                          <Td>
                            {new Date().getFullYear() -
                              new Date(
                                order?.pengguna?.tanggalLahir
                              ).getFullYear()}{" "}
                            tahun
                          </Td>
                          <Td>{order?.pengguna?.nomorTelepon}</Td>
                          <Td>{order?.pengguna?.alamat}</Td>
                          <Td>
                            {moment(order?.createdAt).format("DD-MMMM-YYYY")}
                          </Td>
                          <Td>
                            <Button
                              bgColor={"#3E38F5"}
                              color="#fff"
                              onClick={() => {
                                onOpen();
                                setKey(i);
                              }}
                              _hover={{ bg: "#3E38F5" }}
                              _active={{
                                bg: "#3E38F5",
                                transform: "scale(0.98)",
                              }}
                            >
                              Detail
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </LayoutDashboardTukang>
    </>
  );
};

export default DashboardTukang;

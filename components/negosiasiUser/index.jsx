/* eslint-disable react/no-children-prop */
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Img,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
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
import LayoutDashboardUser from "../../layout/LayoutDashboardUser";
import { useEffect, useRef, useState } from "react";
import { httpsCallable } from "firebase/functions";
import functions from "../../utils/firebase/function";
import { authCheck } from "../../utils/firebase/auth";
import { useRouter } from "next/router";
import { uploadFile } from "../../utils/firebase/storage";
import moment from "moment/moment";

const NegosiasiUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // set handle tolak dan terima
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);
  const [status, setStatus] = useState("");
  const [field, setField] = useState({});

  // set fetch orders
  const [_, user] = authCheck();
  const [key, setKey] = useState(0);
  const [orders, setOrders] = useState([]);
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
        penggunaId: user?.data?.id,
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
        progress: {
          uangMuka: field.uangMuka,
          gambar: field.gambar,
        },
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

  const handleFile = async (e) => {
    setLoading(true);
    try {
      const result = await uploadFile(e.target.files[0]);
      setLoading(false);
      setField((field) => ({
        ...field,
        gambar: `https://firebasestorage.googleapis.com/v0/b/emason-c2ba1.appspot.com/o/${result.metadata.name}?alt=media&token=bbec618f-de0c-40cb-ac94-91456bafe111`,
      }));
      toast({
        title: "bukti uang muka berhasil diupload",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "bukti uang muka gagal diupload",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalContent>
          <ModalHeader>Info Pemesanan Anda</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction={"column"} spacing="14px">
              <FormControl isRequired>
                <FormLabel>Nama</FormLabel>
                <Input value={orders[key]?.tukang?.nama} isDisabled />
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
                    new Date(orders[key]?.tukang?.tanggalLahir).getFullYear()
                  }
                  isDisabled
                />
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
                <Input
                  value={moment(orders[key]?.createdAt).format("DD-MMMM-YYYY")}
                  isDisabled
                />
              </FormControl>
              {status === "Diproses" && (
                <>
                  <FormControl isRequired>
                    <FormLabel>Upload Bukti Transfer Uang Muka (DP)</FormLabel>
                    <Text fontWeight={"600"}>
                      Nomor Rekening BRI a.n {orders[key]?.tukang?.namaRekening}{" "}
                      : {orders[key]?.tukang?.noRekening}
                    </Text>
                    <Input
                      p={1}
                      onChange={handleFile}
                      type="file"
                      accept="image/*"
                      placeholder="bukti-transfer-uang-muka"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Jumlah uang muka yang ditransfer</FormLabel>
                    <InputGroup>
                      <InputLeftAddon children={"Rp."} />
                      <Input
                        isRequired
                        value={orders[key]?.progress?.uangMuka}
                        type="number"
                        onChange={(e) =>
                          setField((field) => ({
                            ...field,
                            uangMuka: e.target.value,
                          }))
                        }
                      />
                    </InputGroup>
                  </FormControl>
                </>
              )}

              {status === "Selesai" && (
                <>
                  <FormControl isRequired>
                    <FormLabel>
                      Jumlah uang muka yang telah ditransfer
                    </FormLabel>
                    <InputGroup>
                      <InputLeftAddon children={"Rp."} />
                      <Input
                        isDisabled
                        defaultValue={orders[key]?.progress?.uangMuka}
                        type="number"
                      />
                    </InputGroup>
                  </FormControl>
                </>
              )}
            </Stack>
          </ModalBody>
          <ModalFooter>
            {status === "Diproses" && (
              <>
                {/* <Button
                  isDisabled={loading}
                  onClick={() => handleUpdate(orders[key]?.id, "Dibatalkan")}
                  colorScheme="red"
                >
                  Batalkan
                </Button> */}

                <Button
                  ml="4px"
                  isDisabled={loading}
                  onClick={() => handleUpdate(orders[key]?.id, "Diproses")}
                  colorScheme="green"
                >
                  Update
                </Button>
              </>
            )}
            <Button
              as={"a"}
              href={`https://wa.me/+62${orders[key]?.tukang?.nomorTelepon}`}
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

      <LayoutDashboardUser pageTitle={"Negosiasi"}>
        <Box>
          <Tabs
            onChange={(index) => setTabIndex(index)}
            mt="30px"
            variant="soft-rounded"
            colorScheme="green"
          >
            <TabList flexDirection={{ base: "column", md: "row" }}>
              <Tab>Daftar Pesanan</Tab>
              <Tab>Diproses</Tab>
              <Tab>Selesai</Tab>
              <Tab>Dibatalkan</Tab>
            </TabList>
            <TabPanels>
              {/* Daftar Pemesanan */}
              <TabPanel>
                <TableContainer>
                  <Table variant="simple">
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
                      {orders.map((order, i) => (
                        <Tr key={order.id}>
                          <Td>{order?.tukang?.nama}</Td>
                          <Td>
                            {new Date().getFullYear() -
                              new Date(
                                order?.tukang?.tanggalLahir
                              ).getFullYear()}{" "}
                            tahun
                          </Td>
                          <Td>{order?.tukang?.nomorTelepon}</Td>
                          <Td>{order?.tukang?.alamat}</Td>
                          <Td>{order?.tukang?.keahlian}</Td>
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
              {/* Diproses */}
              <TabPanel>
                <TableContainer>
                  <Table variant="simple">
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
                      {orders.map((order, i) => (
                        <Tr key={order.id}>
                          <Td>{order?.tukang?.nama}</Td>
                          <Td>
                            {new Date().getFullYear() -
                              new Date(
                                order?.tukang?.tanggalLahir
                              ).getFullYear()}{" "}
                            tahun
                          </Td>
                          <Td>{order?.tukang?.nomorTelepon}</Td>
                          <Td>{order?.tukang?.alamat}</Td>
                          <Td>{order?.tukang?.keahlian}</Td>
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
              {/* Selesai */}
              <TabPanel>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Nama Tukang</Th>
                        <Th>Usia</Th>
                        <Th>Telp</Th>
                        <Th>Tanggal</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {orders.map((order, i) => (
                        <Tr key={order.id}>
                          <Td>{order?.tukang?.nama}</Td>
                          <Td>
                            {new Date().getFullYear() -
                              new Date(
                                order?.tukang?.tanggalLahir
                              ).getFullYear()}{" "}
                            tahun
                          </Td>
                          <Td>{order?.tukang?.nomorTelepon}</Td>
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
              {/* Dibatalkan */}
              <TabPanel>
                <TableContainer>
                  <Table variant="simple">
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
                      {orders.map((order, i) => (
                        <Tr key={order.id}>
                          <Td>{order?.tukang?.nama}</Td>
                          <Td>
                            {new Date().getFullYear() -
                              new Date(
                                order?.tukang?.tanggalLahir
                              ).getFullYear()}{" "}
                            tahun
                          </Td>
                          <Td>{order?.tukang?.nomorTelepon}</Td>
                          <Td>{order?.tukang?.alamat}</Td>
                          <Td>{order?.tukang?.keahlian}</Td>
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
      </LayoutDashboardUser>
    </>
  );
};

export default NegosiasiUser;

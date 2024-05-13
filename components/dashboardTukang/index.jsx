/* eslint-disable react/no-children-prop */
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
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
import { uploadFile } from "../../utils/firebase/storage";
import { useRouter } from "next/router";
import moment from "moment/moment";

const DashboardTukang = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();

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
        progress: {
          gambar: orders[key]?.progress?.gambar,
          uangMuka: orders[key]?.progress?.uangMuka,
        },
      });
      setLoading(false);
      toast({
        title: "Order berhasil diupdate",
        description: "Kami telah buat untuk anda.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Order gagal diupdate",
        description: "Kami gagal buat untuk anda.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const [field, setField] = useState({
    luasBangunan: "",
    typeBangunan: "",
    harga: 0,
    estimasi: "",
    fotoBangunan: "",
  });

  const handleFile = async (e) => {
    setLoading(true);
    try {
      const result = await uploadFile(e.target.files[0]);
      setLoading(false);
      setField((field) => ({
        ...field,
        fotoBangunan: `https://firebasestorage.googleapis.com/v0/b/emason-c2ba1.appspot.com/o/${result.metadata.name}?alt=media&token=bbec618f-de0c-40cb-ac94-91456bafe111`,
      }));
      toast({
        title: "gambar berhasil diupload",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "gambar gagal diupload",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const createProject = httpsCallable(functions, "createProject");
      await createProject({
        ...field,
        userId: user?.data?.id,
        createdAt: new Date().toISOString(),
      });
      setLoading(false);
      toast({
        title: "Berhasil tambah data",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      onClose2();
      setProjects([
        ...projects,
        {
          ...field,
          id: true,
          userId: user?.data?.id,
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch (error) {
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

              {status === "Diproses" && (
                <>
                  <FormControl isRequired>
                    <FormLabel>Jumlah uang muka telah ditransfer</FormLabel>
                    <InputGroup>
                      {/* <InputLeftAddon children={"Rp."} /> */}
                      <Input
                        fontWeight={"600"}
                        isDisabled
                        defaultValue={rupiah(orders[key]?.progress?.uangMuka)}
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
                      {/* <InputLeftAddon children={"Rp."} /> */}
                      <Input
                        fontWeight={"600"}
                        isDisabled
                        defaultValue={rupiah(orders[key]?.progress?.uangMuka)}
                      />
                    </InputGroup>
                  </FormControl>
                </>
              )}
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

      {/* Portfolio */}
      <Modal isOpen={isOpen2} onClose={onClose2}>
          <ModalOverlay />
          <ModalContent as={"form"} onSubmit={handleSubmit}>
            <ModalHeader>Tambah Portofolio</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Jenis Pekerjaan</FormLabel>
                <Input
                  required
                  placeholder="contoh: Pengerjaan Pengecatan 
                  "
                  onChange={(e) =>
                    setField((field) => ({
                      ...field,
                      jenisKerjaan: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Luas Bangunan</FormLabel>
                <Input
                  required
                  onChange={(e) =>
                    setField((field) => ({
                      ...field,
                      luasBangunan: e.target.value,
                    }))
                  }
                  placeholder="masukkan luas bangunan"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Tipe Bangunan</FormLabel>
                <Select
                  placeholder="masukkan type bangunan"
                  required
                  onChange={(e) =>
                    setField((field) => ({
                      ...field,
                      typeBangunan: e.target.value,
                    }))
                  }
                >
                  <option value="type 21/24">type 21/24</option>
                  <option value="type 36">type 36 </option>
                  <option value="type 45">type 45</option>
                  <option value="type 54">type 54</option>
                  <option value="type 60">type 60</option>
                  <option value="type 70">type 70</option>
                  <option value="type 90">type 90</option>
                  <option value="type 120">type 120</option>
                  <option value="type 140/200">type 140/200</option>
                </Select>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Detail Bangunan</FormLabel>
                <Input
                  required
                  placeholder="rumah tinggal, 
                  ruko, perkantoran, dll"
                  onChange={(e) =>
                    setField((field) => ({
                      ...field,
                      detailBangunan: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Masukkan kisaran harga</FormLabel>
                <Input
                  type="number"
                  placeholder="masukkan kisaran harga"
                  required
                  onChange={(e) =>
                    setField((field) => ({ ...field, harga: e.target.value }))
                  }
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Estimasi Pengerjaan (hari)</FormLabel>
                <Input
                  placeholder="masukkan estimasi waktu pengerjaan"
                  required
                  onChange={(e) =>
                    setField((field) => ({
                      ...field,
                      estimasi: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Foto Bangunan</FormLabel>
                <Input
                  accept="image/*"
                  onChange={handleFile}
                  pt="4px"
                  placeholder="foto bangunan"
                  type="file"
                  required
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                isLoading={loading}
                colorScheme="blue"
                type="submit"
                mr={3}
              >
                Simpan
              </Button>
              <Button onClick={onClose2}>Batal</Button>
            </ModalFooter>
          </ModalContent>
      </Modal>

      <LayoutDashboardTukang pageTitle={"Dashboard Tukang"}>
        <TableContainer>
          <Table variant="striped" colorScheme="blue">
            <Tbody>
              <Tr>
                <Td>Nama</Td>
                <Td>{user?.data?.nama}</Td>
              </Tr>
              <Tr>
                <Td>Kategori Keahlian</Td>
                <Td>
                  <Flex gap="6px">
                    {user?.data?.kategoriKeahlian?.map((item, i) => (
                      <Checkbox isChecked isDisabled key={i}>
                        {item}
                      </Checkbox>
                    ))}
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td>Detail Keahlian</Td>
                <Td>{user?.data?.keahlian}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
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
                        <Th>Bukti Transfer Uang Muka</Th>
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
                          <Td>
                            <Avatar
                              borderRadius="none"
                              height="100%"
                              width="120px"
                              name="uang-dp"
                              src={orders[key]?.progress?.gambar}
                            />
                          </Td>
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
                        <Th>Bukti Transfer Uang Muka</Th>
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
                          <Td>
                            <Avatar
                              borderRadius="none"
                              height="100%"
                              width="120px"
                              name="uang-dp"
                              src={orders[key]?.progress?.gambar}
                            />
                          </Td>
                          <Td>
                            {moment(order?.createdAt).format("DD-MMMM-YYYY")}
                          </Td>
                          <Td>
                            <Button mr='4px'
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
                            <Button
                              colorScheme={"blue"}
                              onClick={onOpen2}
                            >
                              Tambah Portofolio
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

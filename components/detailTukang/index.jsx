import {
  Badge,
  Box,
  Button,
  Center,
  Checkbox,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useCheckboxGroup,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import LayoutHomePage from "../../layout/LayoutHomePage";
import CardProjects from "./cardProjects";
import { useEffect, useRef, useState } from "react";
import { httpsCallable } from "firebase/functions";
import functions from "../../utils/firebase/function";
import { authCheck } from "../../utils/firebase/auth";

const DetailTukang = ({ user }) => {
  // set send pesanan to firebase
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [_, userLogin] = authCheck();

  // set fetch portofolio
  const [projects, setProjects] = useState([]);
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
      const getProjects = httpsCallable(functions, "getProjects");
      const response = await getProjects({
        page: currPage,
        limit: 4,
        userId: user?.id,
      });
      if (!response.data.data.length) {
        setWasLastList(true);
        return;
      }
      setPrevPage(currPage);
      setProjects([...projects, ...response.data.data]);
    };
    if (!wasLastList && prevPage !== currPage) {
      fetchData();
    }
  }, [currPage, wasLastList, prevPage, projects, user]);

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", onScroll);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  // console.log(projects)

  // send Pesanan
  const [detailKerjaan, setDetailKerjaan] = useState("");

  const handlePesanan = async () => {
    setLoading(true);
    try {
      const createOrder = httpsCallable(functions, "createOrder");
      const result = await createOrder({
        penggunaId: userLogin?.data?.id,
        tukangId: user?.id,
        detailKerjaan: detailKerjaan,
        createdAt: new Date().toISOString(),
      });
      setLoading(false);
      toast({
        title: "Pesanan berhasil dibuat",
        description: "Kami telah buat untuk anda.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Pesanan gagal dibuat",
        description: "Kami gagal buat untuk anda.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return !user ? (
    <Center mt="250px">
      <CircularProgress isIndeterminate color="blue.300" />
    </Center>
  ) : (
    <>
      <LayoutHomePage pageTitle={"Detail Tukang"} onScroll={onScroll}>
        <Flex
          direction={{ base: "column", md: "column", lg: "row", xl: "row" }}
          gap={{ base: "20px", lg: "20px", xl: "60px" }}
        >
          <Img
            borderRadius={"8px"}
            border="2px solid #3E38F5"
            src={user?.avatar}
            width={"100%"}
            height="253px"
            alt="Profile Tukang"
          />
          <Box
            borderRadius={"8px"}
            bgColor="#fff"
            width={{ base: "100%", lg: "50%" }}
            height="336px"
            px="24px"
            py="12px"
          >
            <TableContainer>
              <Table border={"none"}>
                <Thead>
                  <Tr>
                    <Td>
                      <Text fontSize={"18px"} fontWeight="500">
                        Nama
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize={"18px"} fontWeight="500">
                        {user?.nama}
                      </Text>
                    </Td>
                  </Tr>
                </Thead>
                <Tbody padding={"8px"}>
                  <Tr>
                    <Td>
                      <Text fontSize={"18px"} fontWeight="500">
                        Usia
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize={"18px"} fontWeight="500">
                        {new Date().getFullYear() -
                          new Date(user?.tanggalLahir).getFullYear()}{" "}
                        tahun
                      </Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text fontSize={"18px"} fontWeight="500">
                        Nomor Telepon
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize={"18px"} fontWeight="500">
                        {user?.nomorTelepon}
                      </Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text fontSize={"18px"} fontWeight="500">
                        Alamat
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize={"18px"} fontWeight="500">
                        {user?.alamat}
                      </Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text fontSize={"18px"} fontWeight="600">
                        Kategori Keahlian
                      </Text>
                    </Td>
                    <Td>
                      <Flex gap="4px">
                        {user?.kategoriKeahlian?.map((item, i) => (
                          <Badge key={i} colorScheme="blue">
                            {item}
                          </Badge>
                        ))}
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text fontSize={"18px"} fontWeight="600">
                        Detail Keahlian
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize={"18px"} fontWeight="600">
                        {user?.keahlian}
                      </Text>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>

          <Box
            my="auto"
            borderRadius={"8px"}
            width={{ lg: "220px", xl: "300px" }}
            height={"auto"}
            py="18px"
            px="65px"
            bgColor="#fff"
          >
            <Center>
              <VStack spacing={"28px"}>
                <Text fontSize={"24px"} fontWeight="700">
                  Pesan Jasa
                </Text>
                <Button
                  onClick={onOpen}
                  size="md"
                  height="48px"
                  width="200px"
                  bgColor={"#3E38F5"}
                  color="#fff"
                  _hover={{ bg: "#3E38F5" }}
                  _active={{
                    bg: "#3E38F5",
                    transform: "scale(0.98)",
                  }}
                >
                  Pesan Sekarang
                </Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Form Buat Pesanan</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <FormControl>
                        <FormLabel
                          fontSize={"16"}
                          fontWeight="500"
                          fontFamily={"Poppins"}
                        >
                          Nama Tukang
                        </FormLabel>
                        <Input
                          required
                          value={user?.nama}
                          isDisabled
                          size="lg"
                        />
                      </FormControl>

                      <FormControl my="12px">
                        <FormLabel
                          fontSize={"16"}
                          fontWeight="500"
                          fontFamily={"Poppins"}
                        >
                          Usia
                        </FormLabel>
                        <Input
                          required
                          value={
                            new Date().getFullYear() -
                            new Date(user?.tanggalLahir).getFullYear()
                          }
                          tahun
                          isDisabled
                          size="lg"
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel
                          fontSize={"16"}
                          fontWeight="500"
                          fontFamily={"Poppins"}
                        >
                          Nomor Telepon
                        </FormLabel>
                        <Input
                          required
                          value={user?.nomorTelepon}
                          isDisabled
                          size="lg"
                        />
                      </FormControl>

                      <FormControl my="12px">
                        <FormLabel
                          fontSize={"16"}
                          fontWeight="500"
                          fontFamily={"Poppins"}
                        >
                          Keahlian
                        </FormLabel>
                        <Input
                          required
                          value={user?.keahlian}
                          isDisabled
                          size="lg"
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel
                          fontSize={"16"}
                          fontWeight="500"
                          fontFamily={"Poppins"}
                        >
                          Tanggal Pesanan
                        </FormLabel>
                        <Input
                          required
                          value={new Date().toISOString()}
                          isDisabled
                          size="lg"
                        />
                      </FormControl>

                      <FormControl my={6}>
                        <FormLabel
                          fontSize={"16"}
                          fontWeight="500"
                          fontFamily={"Poppins"}
                        >
                          Pilih Jenis Keahlian yang anda butuhkan!
                        </FormLabel>
                        <Stack
                          spacing={5}
                          direction={{ base: "column", xl: "row" }}
                        >
                          {user?.kategoriKeahlian?.map((item, i) => (
                            <Checkbox isChecked isDisabled key={i}>
                              {item}
                            </Checkbox>
                          ))}
                        </Stack>
                      </FormControl>
                      <FormControl>
                        <FormLabel
                          fontSize={"16"}
                          fontWeight="500"
                          fontFamily={"Poppins"}
                        >
                          Detail Kerjaan
                        </FormLabel>
                        <Input
                          onChange={(e) => setDetailKerjaan(e.target.value)}
                          required
                          placeholder="Pengecatan kamar 2x3 meter"
                          size="lg"
                        />
                      </FormControl>
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        onClick={handlePesanan}
                        colorScheme="blue"
                        mr={3}
                        isLoading={loading}
                        type="submit"
                      >
                        Buat Pesanan
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </VStack>
            </Center>
          </Box>
        </Flex>

        <Text mt="60px" fontSize={"24px"} fontWeight="600">
          Bangunan yang telah dikerjakan
        </Text>
        <SimpleGrid
          ref={listInnerRef}
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing="20px"
          mt="24px"
        >
          {projects.map((project) => (
            <CardProjects
              key={project.id}
              image={project?.fotoBangunan}
              project={project}
            />
          ))}
        </SimpleGrid>
      </LayoutHomePage>
    </>
  );
};

export default DetailTukang;

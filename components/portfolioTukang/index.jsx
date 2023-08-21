import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Text,
  filter,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import LayoutDashboardTukang from "../../layout/LayoutDashboardTukang";
import CardPortofolio from "./cardPortofolio";
import { useEffect, useRef, useState } from "react";
import { uploadFile } from "../../utils/firebase/storage";
import { authCheck } from "../../utils/firebase/auth";
import { httpsCallable } from "firebase/functions";
import functions from "../../utils/firebase/function";

const PortofolioTukang = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [projects, setProjects] = useState([]);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [check, user] = authCheck();
  const [currPage, setCurrPage] = useState(1); // storing current page number
  const [prevPage, setPrevPage] = useState(0); // storing prev page number
  const [wasLastList, setWasLastList] = useState(false);
  const listInnerRef = useRef();
  const [checkDelete, setCheckDelete] = useState();

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
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "gambar gagal diupload",
        status: "error",
        duration: 9000,
        isClosable: true,
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
      });
      onClose();
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
      toast({
        title: "Gagal tambah data",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id) => {
    setCheckDelete(id);
    try {
      const deleteProject = httpsCallable(functions, "deleteProject");
      await deleteProject(id);
      setCheckDelete();
      toast({
        title: "Berhasil hapus data",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      const data = projects.filter((project) => project.id !== id);
      setProjects(data);
    } catch (error) {
      setCheckDelete();
      toast({
        title: "Gagal hapus data",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      // console.log(scrollTop + clientHeight === scrollHeight);
      // console.log(scrollTop, scrollHeight, clientHeight);
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
        limit: 6,
        userId: user?.data?.id,
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
  }, [currPage, wasLastList, prevPage, user, projects]);

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", onScroll);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <LayoutDashboardTukang onScroll={onScroll} pageTitle={"Portfolio"}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent={"space-between"}
      >
        <Text
          mb={{ base: "20px", md: "0px" }}
          fontSize={"24px"}
          fontWeight="600"
        >
          Riwayat Bangunan Yang Dikerjakan
        </Text>
        <Button
          colorScheme={"blue"}
          onClick={onOpen}
          rightIcon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 6L12 18"
                stroke="#CCD2E3"
                stroke-width="2"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
              <path
                d="M18 12L6 12"
                stroke="#CCD2E3"
                stroke-width="2"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>
          }
        >
          Tambah Portofolio
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
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
              <Button onClick={onClose}>Batal</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      <SimpleGrid
        ref={listInnerRef}
        mt="40px"
        columns={{ base: 1, md: 2, lg: 2, xl: 3 }}
        spacing="20px"
      >
        {projects.map((project) => (
          <CardPortofolio
            key={project.id}
            image={project?.fotoBangunan}
            project={project}
            handleDelete={handleDelete}
            checkDelete={checkDelete}
          />
        ))}
      </SimpleGrid>
    </LayoutDashboardTukang>
  );
};

export default PortofolioTukang;

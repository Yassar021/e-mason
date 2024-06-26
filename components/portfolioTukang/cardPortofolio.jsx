import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { uploadFile } from "../../utils/firebase/storage";
import { httpsCallable } from "firebase/functions";
import functions from "../../utils/firebase/function";
import { authCheck } from "../../utils/firebase/auth";

const CardPortofolio = ({ image, project, handleDelete, checkDelete, setProjects }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpen2, onOpen: onOpen2, onClose:onClose2 } = useDisclosure();
  const [check, user] = authCheck();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const [field, setField] = useState({
    luasBangunan: "",
    typeBangunan: "",
    harga: 0,
    estimasi: "",
    fotoBangunan: "",
  });

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const deleteProject = httpsCallable(functions, "deleteProject");
      await deleteProject(project?.id);
      const createProject = httpsCallable(functions, "createProject");
      await createProject({
        ...field,
        jenisKerjaan: project?.jenisKerjaan,
        userId: user?.data?.id,
        createdAt: new Date().toISOString(),
      });
      setLoading(false);
      toast({
        title: "Berhasil edit data",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      setProjects(projects => {
        const data = projects.filter((item) => item?.id !== project?.id)
        return [
          ...data,
          {
            ...field,
            id: true,
            jenisKerjaan: project?.jenisKerjaan,
            userId: user?.data?.id,
            createdAt: new Date().toISOString(),
          },
        ]
      });
      onClose2();
    } catch (error) {
      console.log(error)
      setLoading(false);
      toast({
        title: "Gagal edit data",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

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

  return (
    <>
      {/* Info Portfolio */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detail Proyek</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={"column"} gap="10px">
              <Text>Luas Bangunan : {project?.luasBangunan}</Text>
              <Text>Detail Bangunan : {project?.detailBangunan}</Text>
              <Text>Jenis Kerjaan : {project?.jenisKerjaan}</Text>
              <Text>Type Bangunan : {project?.typeBangunan}</Text>
              <Text>Kisaran Harga : {rupiah(project?.harga)}</Text>
              <Text>Estimasi Waktu (hari) : {project?.estimasi}</Text>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Portfolio */}
      <Modal isOpen={isOpen2} onClose={onClose2}>
          <ModalOverlay />
          <ModalContent as={"form"} onSubmit={handleEdit}>
            <ModalHeader>Edit Portofolio</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Jenis Pekerjaan</FormLabel>
                <Input
                  required
                  value={project?.jenisKerjaan}
                  disabled
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

      <Box
        width={{ lg: "300px", xl: "auto" }}
        height="320px"
        shadow={"lg"}
        py="20px"
        px="40px"
        borderRadius={"10px"}
      >
        <Center mb="10px" fontWeight={"600"}>
          <Text>{project?.jenisKerjaan}</Text>
        </Center>
        <Image
          mx="auto"
          mb="12px"
          width="240px"
          borderRadius={"8px"}
          height="200px"
          src={image}
          alt="Portofolio Tukang"
        />
        <Flex dir="row" gap="8px" justifyContent={"center"}>
          <Button onClick={onOpen2} colorScheme={"yellow"} color="#fff">
            Edit
          </Button>
          <Button onClick={onOpen} colorScheme={"blue"}>
            Info
          </Button>
          {/* <Button colorScheme={'yellow'} color={'#fff'}>Edit</Button> */}
          <Button
            onClick={() => handleDelete(project?.id)}
            isLoading={checkDelete === project?.id}
            colorScheme={"red"}
          >
            Hapus
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default CardPortofolio;

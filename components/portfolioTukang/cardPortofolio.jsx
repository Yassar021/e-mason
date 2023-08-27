import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

const CardPortofolio = ({ image, project, handleDelete, checkDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };
  return (
    <>
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
      <Box
        width={{ lg: "300px", xl: "auto" }}
        height="320px"
        shadow={"xl"}
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

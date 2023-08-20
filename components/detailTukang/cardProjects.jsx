import {
  Box,
  Button,
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
  useDisclosure,
} from "@chakra-ui/react";

const CardProjects = ({ image, project }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} size="xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detail Proyek</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={"column"} gap="20px">
              <Image
                borderRadius={"8px"}
                width={"100%"}
                height="274px"
                src={image}
                alt="Portfolio Bangunan"
              />
              <Text>Tipe Bangunan : Ruko</Text>
              <Text>Detail Pengerjaan : Pengecatan</Text>
              <Text>Luas Bangunan : {project?.luasBangunan}</Text>
              <Text>Type Bangunan : {project?.typeBangunan}</Text>
              <Text>Kisaran Harga : Rp.{project?.harga}</Text>
              <Text>Estimasi Waktu (hari) : {project?.estimasi}</Text>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box p={2} bgColor={"#fff"} borderRadius={"8px"}>
        <Image
          onClick={onOpen}
          borderRadius={"8px"}
          width={"100%"}
          height="274px"
          src={image}
          alt="Portfolio Bangunan"
        />
        <Button
          mt="2"
          onClick={onOpen}
          size="md"
          height="48px"
          width="100%"
          bgColor={"#3E38F5"}
          color="#fff"
          _hover={{ bg: "#3E38F5" }}
          _active={{
            bg: "#3E38F5",
            transform: "scale(0.98)",
          }}
        >
          Detail
        </Button>
      </Box>
    </>
  );
};

export default CardProjects;

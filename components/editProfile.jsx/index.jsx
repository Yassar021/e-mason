import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import LayoutDashboardUser from "../../layout/LayoutDashboardUser";
import { useRef, useState } from "react";
import { authCheck } from "../../utils/firebase/auth";
import { httpsCallable } from "firebase/functions";
import functions from "../../utils/firebase/function";
import { uploadFile } from "../../utils/firebase/storage";

const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const ref = useRef();
  const [check, user] = authCheck();
  const [field, setField] = useState({
    keahlian: "",
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updateUser = httpsCallable(functions, "updateUser");
      await updateUser({
        ...field,
        id: user?.data?.id,
      });
      setLoading(false);
      toast({
        title: "Data berhasil diupdate",
        description: "Kami telah buat untuk anda.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Data gagal diupdate",
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
        avatar: `https://firebasestorage.googleapis.com/v0/b/emason-c2ba1.appspot.com/o/${result.metadata.name}?alt=media&token=bbec618f-de0c-40cb-ac94-91456bafe111`,
      }));
      toast({
        title: "avatar berhasil diupload",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "avatar gagal diupload",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <LayoutDashboardUser pageTitle={"Edit Profile"}>
      <Box
        as="form"
        onSubmit={handleUpdate}
        justifyContent={{ md: "center", lg: "right" }}
      >
        <Text fontSize={"24px"} fontWeight="600">
          Ubah Profile Pengguna
        </Text>
        <Center>
          <VStack spacing={"14px"}>
            <Avatar
              size="xl"
              name={user?.data?.nama}
              src={user?.data?.avatar}
            />
            <Input
              accept="image/*"
              display={"none"}
              onChange={handleFile}
              pt="4px"
              placeholder="foto bangunan"
              ref={ref}
              type="file"
            />
            <Button
              mt="18px"
              size="md"
              onClick={() => ref.current.click()}
              height="35px"
              width={"100%"}
              color={"#fff"}
              bgColor="#3E38F5"
              borderRadius={"6px"}
              _hover={{ bg: "#3E38F5" }}
              _active={{
                bg: "#3E38F5",
                transform: "scale(0.98)",
              }}
            >
              Pilih Foto
            </Button>
          </VStack>
        </Center>

        <VStack spacing="15px" mt="34px">
          <FormControl>
            <FormLabel>Nama</FormLabel>
            <Input
              defaultValue={user?.data?.nama}
              required
              onChange={(e) =>
                setField((field) => ({ ...field, nama: e.target.value }))
              }
              placeholder="Nama"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              defaultValue={user?.data?.email}
              required
              onChange={(e) =>
                setField((field) => ({ ...field, email: e.target.value }))
              }
              type="email"
              placeholder="email"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Alamat</FormLabel>
            <Input
              defaultValue={user?.data?.alamat}
              required
              onChange={(e) =>
                setField((field) => ({ ...field, alamat: e.target.value }))
              }
              placeholder="Alamat"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Tanggal Lahir</FormLabel>
            <Input
              type="date"
              defaultValue={user?.data?.tanggalLahir}
              required
              onChange={(e) =>
                setField((field) => ({
                  ...field,
                  tanggalLahir: e.target.value,
                }))
              }
              placeholder="Tanggal Lahir"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Nomor Telepon</FormLabel>
            <Input
              type="number"
              defaultValue={user?.data?.nomorTelepon}
              required
              onChange={(e) =>
                setField((field) => ({
                  ...field,
                  nomorTelepon: e.target.value,
                }))
              }
              placeholder="Nomor Telepon"
            />
          </FormControl>
        </VStack>

        <Flex
          direction={{ base: "column", md: "row" }}
          justify={"right"}
          mr="20px"
          mt="56px"
        >
          <Stack direction={{ base: "column", md: "row" }} spacing={"40px"}>
            <Button
              size="md"
              isLoading={loading}
              type="submit"
              height="35px"
              width={"100%"}
              color={"#fff"}
              bgColor="#3E38F5"
              borderRadius={"6px"}
              _hover={{ bg: "#3E38F5" }}
              _active={{
                bg: "#3E38F5",
                transform: "scale(0.98)",
              }}
            >
              Simpan
            </Button>
          </Stack>
        </Flex>
      </Box>
    </LayoutDashboardUser>
  );
};

export default EditProfile;

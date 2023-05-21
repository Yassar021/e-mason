import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, SimpleGrid, Text, useDisclosure, useToast } from "@chakra-ui/react"
import LayoutDashboardTukang from "../../layout/LayoutDashboardTukang"
import CardPortofolio from "./cardPortofolio"
import { useState } from "react"
import { uploadFile } from "../../utils/firebase/storage"
import { authCheck } from "../../utils/firebase/auth"
import { httpsCallable } from "firebase/functions"
import functions from "../../utils/firebase/function"

const PortofolioTukang = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [check, user] = authCheck();
    const [field, setField] = useState({
        luasBangunan: "",
        typeBangunan: "",
        harga: 0,
        estimasi: "",
        fotoBangunan: "",
    })

    const handleFile = async (e) => {
        setLoading(true);
        try {
            const result = await uploadFile(e.target.files[0]);
            setLoading(false);
            setField(field => ({ ...field, fotoBangunan: result.metadata.name }));
            toast({
                title: 'gambar berhasil diupload',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        } catch (error) {
            setLoading(false);
            toast({
                title: 'gambar gagal diupload',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const createProject = httpsCallable(functions, 'createProject');
            await createProject({
                ...field,
                userId: user?.data?.id
            });
            setLoading(false);
            toast({
                title: 'Berhasi tambah data',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            onClose();
        } catch (error) {
            setLoading(false);
            toast({
                title: 'Gagal tambah data',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    return (
        <LayoutDashboardTukang pageTitle={'Portfolio'}>
            <Flex dir="row" justifyContent={'space-between'}>
                <Text fontSize={'24px'} fontWeight='600'>Riwayat Bangunan Yang Dikerjakan</Text>
                <Button colorScheme={'blue'} onClick={onOpen}>Tambah Portofolio</Button>
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent as={'form'} onSubmit={handleSubmit}>
                        <ModalHeader>Tambah Portofolio</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Luas Bangunan</FormLabel>
                                <Input required onChange={(e) => setField(field => ({ ...field, luasBangunan: e.target.value }))} placeholder='masukkan luas bangunan' />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Type Bangunan</FormLabel>
                                <Select placeholder='masukkan type bangunan' required onChange={(e) => setField(field => ({ ...field, typeBangunan: e.target.value }))}>
                                    <option value='type 21/24'>type 21/24</option>
                                    <option value='type 36'>type 36 </option>
                                    <option value='type 45'>type 45</option>
                                    <option value='type 54'>type 54</option>
                                    <option value='type 60'>type 60</option>
                                    <option value='type 70'>type 70</option>
                                    <option value='type 90'>type 90</option>
                                    <option value='type 120'>type 120</option>
                                    <option value='type 140/200'>type 140/200</option>
                                </Select>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Masukkan kisaran harga</FormLabel>
                                <Input type="number" placeholder='masukkan kisaran harga' required onChange={(e) => setField(field => ({ ...field, harga: e.target.value }))} />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Estimasi Pengerjaan (hari)</FormLabel>
                                <Input placeholder='masukkan estimasi waktu pengerjaan' required onChange={(e) => setField(field => ({ ...field, estimasi: e.target.value }))} />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Foto Bangunan</FormLabel>
                                <Input onChange={handleFile} pt='4px' placeholder='foto bangunan' type='file' required />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button isLoading={loading} colorScheme='blue' type="submit" mr={3}>
                                Simpan
                            </Button>
                            <Button onClick={onClose}>Batal</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Flex>
            <SimpleGrid mt='40px' columns={3} spacing='20px'>
                <CardPortofolio />
            </SimpleGrid>
        </LayoutDashboardTukang>
    )
}

export default PortofolioTukang
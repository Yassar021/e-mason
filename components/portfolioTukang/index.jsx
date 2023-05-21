import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react"
import LayoutDashboardTukang from "../../layout/LayoutDashboardTukang"
import CardPortofolio from "./cardPortofolio"
import { useRef } from "react"

const PortofolioTukang = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = useRef(null);
    return (
        <LayoutDashboardTukang pageTitle={'Portfolio'}>
            <Flex dir="row" justifyContent={'space-between'}>
                <Text fontSize={'24px'} fontWeight='600'>Riwayat Bangunan Yang Dikerjakan</Text>
                <Button colorScheme={'blue'} onClick={onOpen}>Tambah Portofolio</Button>
                <Modal
                    initialFocusRef={initialRef}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Tambah Portofolio</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Luas Bangunan</FormLabel>
                                <Input ref={initialRef} placeholder='masukkan luas bangunan' />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Type Bangunan</FormLabel>
                                <Select placeholder='masukkan type bangunan'>
                                    <option value='option1'>type 21/24</option>
                                    <option value='option2'>type 36 </option>
                                    <option value='option3'>type 45</option>
                                    <option value='option1'>type 54</option>
                                    <option value='option2'>type 60</option>
                                    <option value='option3'>type 70</option>
                                    <option value='option1'>type 90</option>
                                    <option value='option2'>type 120</option>
                                    <option value='option3'>type 140/200</option>
                                </Select>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Masukkan kisaran harga</FormLabel>
                                <Input placeholder='masukkan kisaran harga' />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Estimasi Pengerjaan</FormLabel>
                                <Input placeholder='masukkan estimasi waktu pengerjaan' />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Foto Bangunan</FormLabel>
                                <Input pt='4px' placeholder='foto bangunan' type='file' />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3}>
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
import { Button, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"

const CardProjects = ({ image, project }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Modal isOpen={isOpen} size='xl' onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Detail Proyek</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex direction={'column'} gap='20px'>
                            <Text>Luas Bangunan : {project?.luasBangunan}</Text>
                            <Text>Type Bangunan : {project?.typeBangunan}</Text>
                            <Text>Kisaran Harga : Rp.{project?.harga}</Text>
                            <Text>Estimasi Waktu (hari) : {project?.estimasi}</Text>
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Tutup
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Image onClick={onOpen} borderRadius={'8px'} width={'100%'} height='274px' src={image} alt='Portfolio Bangunan' />
        </>
    )
}

export default CardProjects
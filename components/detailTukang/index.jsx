import { Box, Button, Center, CircularProgress, Flex, Image, Img, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, useDisclosure } from "@chakra-ui/react"
import LayoutHomePage from "../../layout/LayoutHomePage"
import CardProjects from "./cardProjects"
import { useEffect, useRef, useState } from "react";
import { httpsCallable } from "firebase/functions";
import functions from "../../utils/firebase/function";


const DetailTukang = ({ user }) => {
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
            const getProjects = httpsCallable(functions, 'getProjects')
            const response = await getProjects({
                page: currPage,
                limit: 6,
                userId: user?.id,
            })
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
            window.addEventListener('scroll', onScroll);
        }
        watchScroll();
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [])
    console.log(projects)

    return !user ? <Center><CircularProgress /></Center> : (
        <>
            <LayoutHomePage pageTitle={'Detail Tukang'} onScroll={onScroll}>
                <Flex direction={{ base: 'column', md: 'column', lg: 'row', xl: 'row' }} gap={{ lg: '20px', xl: '60px' }}>
                    <Img borderRadius={'8px'} border='2px solid #3E38F5' src={user?.avatar} width={'auto'} height='253px' alt='Profile Tukang' />
                    <Box borderRadius={'8px'} bgColor='#fff' width='auto' height='278px' px='24px' py='12px'>
                        <TableContainer>
                            <Table border={'none'}>
                                <Thead>
                                    <Tr>
                                        <Td>
                                            <Text fontSize={'18px'} fontWeight='500'>
                                                Nama
                                            </Text>
                                        </Td>
                                        <Td>
                                            <Text fontSize={'18px'} fontWeight='500'>
                                                {user?.nama}
                                            </Text>
                                        </Td>
                                    </Tr>
                                </Thead>
                                <Tbody padding={'8px'}>
                                    <Tr>
                                        <Td>
                                            <Text fontSize={'18px'} fontWeight='500'>
                                                Usia
                                            </Text>
                                        </Td>
                                        <Td>
                                            <Text fontSize={'18px'} fontWeight='500'>
                                                {new Date().getFullYear() - new Date(user?.tanggalLahir).getFullYear()} tahun
                                            </Text>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td>
                                            <Text fontSize={'18px'} fontWeight='500'>
                                                Nomor Telepon
                                            </Text>
                                        </Td>
                                        <Td>
                                            <Text fontSize={'18px'} fontWeight='500'>
                                                {user?.nomorTelepon}
                                            </Text>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td>
                                            <Text fontSize={'18px'} fontWeight='500'>
                                                Alamat
                                            </Text>
                                        </Td>
                                        <Td>
                                            <Text fontSize={'18px'} fontWeight='500'>
                                                {user?.alamat}
                                            </Text>
                                        </Td>
                                    </Tr>

                                    <Tr>
                                        <Td>
                                            <Text fontSize={'18px'} fontWeight='600'>
                                                Keahlian Khusus
                                            </Text>
                                        </Td>
                                        <Td>
                                            <Text fontSize={'18px'} fontWeight='600'>
                                                {user?.keahlian}
                                            </Text>
                                        </Td>
                                    </Tr>

                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>

                    <Box my='auto' borderRadius={'8px'} width={{ lg: '220px', xl: '300px' }} height={'auto'} py='18px' px='65px' bgColor='#fff'>
                        <Center>
                            <VStack spacing={'28px'}>
                                <Text fontSize={'24px'} fontWeight='700'>Pesan Jasa</Text>
                                <Button
                                    size='md'
                                    height='48px'
                                    width='200px'
                                    bgColor={'#3E38F5'}
                                    color='#fff'
                                    _hover={{ bg: '#3E38F5' }}
                                    _active={{
                                        bg: '#3E38F5',
                                        transform: 'scale(0.98)',
                                    }}
                                >
                                    Pesan Sekarang
                                </Button>
                            </VStack>
                        </Center>
                    </Box>
                </Flex>

                <Text mt='60px' fontSize={'24px'} fontWeight='600'>
                    Bangunan yang telah dikerjakan
                </Text>
                <SimpleGrid ref={listInnerRef} columns={{ base: 1, md: 2, lg: 4 }} spacing='20px' mt='24px'>
                    {
                        projects.map(project => <CardProjects key={project.id} image={project?.fotoBangunan} project={project} />)
                    }
                </SimpleGrid>
            </LayoutHomePage>
        </>

    )
}

export default DetailTukang
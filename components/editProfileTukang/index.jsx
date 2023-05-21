import { Box, Button, Center, Flex, FormControl, Image, Input, Stack, Text, VStack } from "@chakra-ui/react"
import LayoutDashboardTukang from "../../layout/LayoutDashboardTukang"

const EditProfileTukang = () => {
    return (
        <LayoutDashboardTukang pageTitle={'Edit Tukang'}>
            <Box justifyContent={{ md: 'center', lg: 'right' }}>
                <Text fontSize={'24px'} fontWeight='600'>Ubah Profile Tukang</Text>
                <Center>
                    <VStack spacing={'14px'}>
                        <Image width={'123px'} height='123px' style={{ borderRadius: '50%' }} src='/avatar.jpg' alt='Profile Pengguna' />
                        <Button
                            mt='18px'
                            size='md'
                            height='35px'
                            width={'100%'}
                            color={'#fff'}
                            bgColor='#3E38F5'
                            borderRadius={'6px'}
                            _hover={{ bg: '#3E38F5' }}
                            _active={{
                                bg: '#3E38F5',
                                transform: 'scale(0.98)',
                            }}
                        >
                            Pilih Foto
                        </Button>
                    </VStack>
                </Center>

                <VStack spacing='15px' mt='34px'>
                    <FormControl>
                        <Input type='nama' placeholder="Nama" />
                    </FormControl>
                    <FormControl>
                        <Input type='tanggalLahir' placeholder="Tanggal Lahir" />
                    </FormControl>
                    <FormControl>
                        <Input type='nomorTelepon' placeholder="Nomor Telepon" />
                    </FormControl>
                    <FormControl>
                        <Input type='alamat' placeholder="Alamat" />
                    </FormControl>
                </VStack>

                <Flex direction={{ base: 'column', md: 'row' }} justify={'right'} mr='20px' mt='56px'>
                    {/* <Button
                            leftIcon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.167 3.99996H17.3337V5.66663H15.667V16.5C15.667 16.721 15.5792 16.9329 15.4229 17.0892C15.2666 17.2455 15.0547 17.3333 14.8337 17.3333H3.16699C2.94598 17.3333 2.73402 17.2455 2.57774 17.0892C2.42146 16.9329 2.33366 16.721 2.33366 16.5V5.66663H0.666992V3.99996H4.83366V1.49996C4.83366 1.27895 4.92146 1.06698 5.07774 0.910704C5.23402 0.754423 5.44598 0.666626 5.66699 0.666626H12.3337C12.5547 0.666626 12.7666 0.754423 12.9229 0.910704C13.0792 1.06698 13.167 1.27895 13.167 1.49996V3.99996ZM14.0003 5.66663H4.00033V15.6666H14.0003V5.66663ZM6.50033 2.33329V3.99996H11.5003V2.33329H6.50033Z" fill="white"/>
                            </svg>
                            }
                            size='md'
                            height='40px'
                            width={'107px'}
                            color={'#fff'}
                            bgColor='#C80808'
                            borderRadius={'6px'}
                            _hover={{ bg: '#C80808' }}
                            _active={{
                            bg: '#C80808',
                            transform: 'scale(0.98)',
                        }}
                        >   
                            Hapus
                    </Button> */}
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={'40px'}>
                        <Button
                            leftIcon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.167 3.99996H17.3337V5.66663H15.667V16.5C15.667 16.721 15.5792 16.9329 15.4229 17.0892C15.2666 17.2455 15.0547 17.3333 14.8337 17.3333H3.16699C2.94598 17.3333 2.73402 17.2455 2.57774 17.0892C2.42146 16.9329 2.33366 16.721 2.33366 16.5V5.66663H0.666992V3.99996H4.83366V1.49996C4.83366 1.27895 4.92146 1.06698 5.07774 0.910704C5.23402 0.754423 5.44598 0.666626 5.66699 0.666626H12.3337C12.5547 0.666626 12.7666 0.754423 12.9229 0.910704C13.0792 1.06698 13.167 1.27895 13.167 1.49996V3.99996ZM14.0003 5.66663H4.00033V15.6666H14.0003V5.66663ZM6.50033 2.33329V3.99996H11.5003V2.33329H6.50033Z" fill="white" />
                            </svg>
                            }
                            size='md'
                            height='35px'
                            width={'100%'}
                            color={'#1E1E1E'}
                            bgColor='transparent'
                            borderRadius={'6px'}
                            _hover={{ bg: 'transparent' }}
                            _active={{
                                bg: 'transparent',
                                transform: 'scale(0.98)',
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            size='md'
                            height='35px'
                            width={'100%'}
                            color={'#fff'}
                            bgColor='#3E38F5'
                            borderRadius={'6px'}
                            _hover={{ bg: '#3E38F5' }}
                            _active={{
                                bg: '#3E38F5',
                                transform: 'scale(0.98)',
                            }}
                        >
                            Simpan
                        </Button>
                    </Stack>
                </Flex>
            </Box>
        </LayoutDashboardTukang>
    )
}

export default EditProfileTukang
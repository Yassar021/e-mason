import { Box, Center, Container, Text } from "@chakra-ui/react";
import Head from "next/head";

const LayoutAuth = ({ pageTitle, children }) => {
  return (
    <>
      <Head>
        <title>{`E-Mason App | ${pageTitle}`}</title>
      </Head>

      <Box height={"140vh"} bgColor={"#E9E8F9"}>
        <Box height={"113px"} bgColor="#fff" py="26px">
          <Center>
            <Text
              fontSize={"40px"}
              fontWeight="700"
              fontFamily={"Poppins"}
              color="#3E38F5"
            >
              E-MASON
            </Text>
          </Center>
        </Box>
        <Container maxW={"6xl"}>
          <Box
            my="84px"
            borderRadius={"20px"}
            pt="40px"
            pb="60px"
            px={{ base: "10px", md: "20px", lg: "120px" }}
            mx={{ base: "10px", md: "40px", lg: "120px" }}
            bgColor="#fff"
          >
            {children}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default LayoutAuth;

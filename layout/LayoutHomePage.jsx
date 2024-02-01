import {
  Box,
  CircularProgress,
  Flex,
  HStack,
  Image,
  Link,
  Text,
  textDecoration,
} from "@chakra-ui/react";
import Head from "next/head";
import Navbar from "../components/navbar";
import { authCheck } from "../utils/firebase/auth";

const LayoutHomePage = ({ pageTitle, children }) => {
  const [check, user] = authCheck();
  return user?.data?.type === "pengguna" ? (
    <>
      <Head>
        <title>{`E-Mason App | ${pageTitle}`}</title>
      </Head>

      <Box height={"auto"} bgColor={"#E9E8F9"} pb="200px">
        <Navbar user={user} />
        <Box
          mt="30px"
          px={{
            base: "2px",
            md: "20px",
            lg: "20px",
            xl: "60px",
            "2xl": "160px",
          }}
          mx={{
            base: "10px",
            md: "40px",
            lg: "20px",
            xl: "60px",
            "2xl": "160px",
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  ) : (
    <Flex align="center" h="100vh" justify="center" w="full">
      <CircularProgress color="black" />
    </Flex>
  );
};

export default LayoutHomePage;

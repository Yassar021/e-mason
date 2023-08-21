import {
  Badge,
  Box,
  Checkbox,
  Flex,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import LayoutHomePage from "../../layout/LayoutHomePage";
import CardTukang from "./CardTukang";
import { useEffect, useRef, useState } from "react";
import { httpsCallable } from "firebase/functions";
import functions from "../../utils/firebase/function";

const Home = () => {
  const [users, setUsers] = useState([]);
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
      const getUsers = httpsCallable(functions, "getUsers");
      const response = await getUsers({
        page: currPage,
        limit: 4,
      });
      if (!response.data.data.length) {
        setWasLastList(true);
        return;
      }
      setPrevPage(currPage);
      setUsers([...users, ...response.data.data]);
    };
    if (!wasLastList && prevPage !== currPage) {
      fetchData();
    }
  }, [currPage, wasLastList, prevPage, users]);

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", onScroll);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <LayoutHomePage pageTitle={"Home"}>
      <Flex direction={"column"} gap="40px" textAlign={"left"}>
        <Box
          height={"450px"}
          bgImage="/mason.jpg"
          backgroundSize={"cover"}
          borderRadius="8px"
        ></Box>

        <Box onScroll={onScroll}>
          <VStack spacing="24px">
            <Text fontFamily={"Poppins"} fontSize="24px" fontWeight={"600"}>
              Yuk, Cari Tukang sesuai Keahliannya!
            </Text>
            <Box
              textAlign={"center"}
              borderRadius={"12px"}
              p={4}
              bgColor={"#fff"}
            >
              <Text
                mb="12px"
                fontFamily={"Poppins"}
                fontSize="16px"
                fontWeight={"600"}
              >
                Filter Pencarian Tukang
              </Text>
              <Stack spacing={5} direction="row">
                <Checkbox>
                  <Badge colorScheme="blue">Tukang Batu</Badge>
                </Checkbox>
                <Checkbox>
                  <Badge colorScheme="blue">Tukang Kayu</Badge>
                </Checkbox>
                <Checkbox>
                  <Badge colorScheme="blue">Tukang Cat</Badge>
                </Checkbox>
              </Stack>
            </Box>
            <SimpleGrid
              ref={listInnerRef}
              spacing={{ md: "10px", lg: "20px" }}
              columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
            >
              {users.map((user) => (
                <CardTukang
                  key={user?.id}
                  id={user?.uid}
                  name={user?.nama}
                  image={user?.avatar}
                />
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </Flex>
    </LayoutHomePage>
  );
};

export default Home;

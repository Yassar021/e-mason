import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Img,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";

const CardTukang = ({ name, image, id, rating }) => {

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      mt={{ base: "12px", md: "0px" }}
      w="300px"
      h="300px"
      py="24px"
      px="40px"
      borderRadius={"8px"}
      bgColor="#fff"
    >
      <Flex
        direction="column"
        mx="auto"
        textAlign={"center"}
        alignItems="center"
      >
        <Avatar size="xl" name={name} src={image} />
        <Text
          my="5px"
          fontSize={"18px"}
          fontWeight="600"
          fontFamily={"Poppins"}
        >
          {name}
        </Text>
        <Box display='flex' gap='5px'>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.025 7.33329L8.99996 0.666626L6.97496 7.33329H0.666626L5.81663 11.0083L3.85829 17.3333L8.99996 13.425L14.15 17.3333L12.1916 11.0083L17.3333 7.33329H11.025Z" fill="#FFC804"/>
          </svg>
          {rating?.toFixed(1)}
        </Box>
      </Flex>
      <Link href={`/detailTukang/${id}`} style={{ textDecoration: "none" }}>
        <Button
          mt="18px"
          size="md"
          height="60px"
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
          Detail
        </Button>
      </Link>
    </Box>
  );
};

export default CardTukang;

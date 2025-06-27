import {
  Box,
  Container, IconButton, Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import BlogLogo from "@assets/logo/blog_logo.png";
const Navigation = () => {
  return (
    <>
      <Box w="100%"
           h="70px"
           bg="white"
           p="4"
           style={{borderBottom: "1px solid #e2e8f0"}}
           display="flex"
           alignItems="center"
      >
        <Container maxW="1500px" display={"flex"} alignItems={"center"} justifyContent={'center'}>
          <Image boxSize='130px'
                 src={BlogLogo}
                 alt="logo"
                 style={{cursor: "pointer", width: "180px"}}
                 onClick={() => {
                   window.location.href = "/";
                 }}
          />
          <Box w={'100%'} display={"flex"} alignItems={"center"} justifyContent={'end'}>
            <InputGroup size="md" width="300px">
              <Input type={"text"}/>
              <InputRightElement >
                <IconButton aria-label='Search database'
                            icon={<SearchIcon />}
                            variant={'outline'}
                            size={'sm'}
                />
              </InputRightElement>
            </InputGroup>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Navigation;

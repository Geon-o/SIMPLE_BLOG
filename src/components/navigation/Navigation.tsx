import {
  Box,
  Container, IconButton, Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import logoImg from "@/assets/logo/blog_logo.png";
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
        <Container maxW="1500px">
          <Stack direction="row" spacing={4}>
            <img src='/blog_logo.png' alt="logo"/>

            <Container maxW={'container.sm'} display={"flex"} alignItems={"center"} justifyContent={'center'}>
              <InputGroup size="md" width="100%">
                <Input type={"text"}/>
                <InputRightElement>
                  <IconButton aria-label='Search database'
                              icon={<SearchIcon />}
                              variant={'outline'}
                              size={'sm'}
                  />
                </InputRightElement>
              </InputGroup>
            </Container>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Navigation;

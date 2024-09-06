import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

interface FormData {
  username: string;
  link: string;
}

const SocialForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ username: '', link: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      alert(`X Handle: ${formData.username}, X post url: ${formData.link}`);
    };


  return (
    <Box
      display="flex"
      width="100vw"
      height="100vh"
      bg="transparent"
      justifyContent="center"
      alignItems="center"
      px={2}
    >
      <Box bg="white" width="560px" p={7} border={'5px solid black'} borderRadius={'20px'}>
        <form onSubmit={handleSubmit}>
          <FormControl id="username" isRequired>
            <FormLabel>X Handle</FormLabel>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="@Mongrel_btc"
              bg="white"
              h={16}
              border={'2px solid black'}
              borderRadius={'15px'}
            />
          </FormControl>

          <FormControl id="link" isRequired mt={4}>
            <FormLabel>X post url</FormLabel>
            <Input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="your post url...."
              bg="white"
              h={16}
              border={'2px solid black'}
              borderRadius={'15px'}
            />
          </FormControl>

          <Button
            bg={'black'}
            mt={6}
            type="submit"
            w={'100%'}
            h={14}
            color={'white'}
            borderRadius={'15px'}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default SocialForm;

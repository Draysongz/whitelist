import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack
} from "@chakra-ui/react";

interface FormData {
  name: string;
  wallet: string;
}

const FormPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    wallet: '',
  });
  const [isTwitterTaskComplete, setIsTwitterTaskComplete] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTwitterTaskChange = (value: string) => {
    setValue(value);
    setIsTwitterTaskComplete(value === 'Yes');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isTwitterTaskComplete) {
      alert("Please complete the Twitter task before submitting.");
      return;
    }
    console.log('Form submitted:', formData);
    // Add your form submission logic here
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
          <FormControl id="name" isRequired>
            <FormLabel>What is your X username?</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="@Mongrel_btc"
              bg="white"
              h={16}
              border={'2px solid black'}
              borderRadius={'15px'}
            />
          </FormControl>

          <FormControl id="wallet" isRequired mt={4}>
            <FormLabel>What is your Taproot wallet address?</FormLabel>
            <Input
              type="text"
              name="wallet"
              value={formData.wallet}
              onChange={handleChange}
              placeholder="bcp....."
              bg="white"
              h={16}
              border={'2px solid black'}
              borderRadius={'15px'}
            />
          </FormControl>

          <FormControl id="subscribe" isRequired mt={4}>
            <FormLabel>
              Have you followed{" "}
              <a
                href="https://x.com/mongrel_btc?s=21&t=b8FPrLo4XS9IvogfmKElfw"
                target="_blank"
                rel="noopener noreferrer"
                color="red"
              >
                @Mongrel_btc
              </a>?*{" "}
              (<a
                href="https://x.com/mongrel_btc?s=21&t=b8FPrLo4XS9IvogfmKElfw"
                target="_blank"
                rel="noopener noreferrer"
                color="red"
              >
                LIKE+RT THIS TWEET
              </a>)
            </FormLabel>
            <RadioGroup onChange={handleTwitterTaskChange} value={value}>
              <Stack direction="row">
                <Radio value="Yes">Yes</Radio>
                <Radio value="No">No</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          <Button
            bg={'black'}
            mt={6}
            type="submit"
            isDisabled={!isTwitterTaskComplete}
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

export default FormPage;

import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast
} from "@chakra-ui/react";
import { Task } from "../App";

interface FormData {
  name: string;
  wallet: string;
  retweetUrl: string;
}

interface FormPageProps {
  tasks: Task[]; // Expect an array of Task
}

const scriptUrl = "https://script.google.com/macros/s/AKfycbz6yPuqPdpX1ZKi9sIrXHeM0jamx-nQBJ4_HjbjRIBPcsKmYdquKsDDtmI0mcAiLSQ4YQ/exec"

const FormPage: React.FC<FormPageProps> = ({ tasks }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    wallet: '',
    retweetUrl: '',
  });

  const [isRetweetUrlValid, setIsRetweetUrlValid] = useState<boolean>(false);
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'retweetUrl') {
      // Validate URL format (a basic check)
      const urlPattern = /^(https?:\/\/)?(www\.)?twitter\.com\/\w+\/status\/\d+$/;
      setIsRetweetUrlValid(urlPattern.test(value));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        alert(data.msg);
      })
      .catch(err => console.log(err));
    
    setFormData({
      name: '',
      wallet: '',
      retweetUrl: ''
    });

    toast({
      title: 'Details submitted.',
      description: "We've received your response.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    console.log('Form submitted:', formData);
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

          <FormControl id="retweetUrl" isRequired mt={4}>
            <FormLabel>
              Have you followed 
              <a className="text-green-500 text-[15px]" href={tasks[0].twitter} target="_blank"> @Mongrel_btc</a>?
              (<a className="text-green-500 text-[15px]" href={tasks[0].postUrl} target="_blank">LIKE + RT "THIS TWEET </a>)
            </FormLabel>
            <FormLabel>
              Retweet URL
            </FormLabel>
            <Input
              type="url"
              name="retweetUrl"
              value={formData.retweetUrl}
              onChange={handleChange}
              placeholder="https://twitter.com/..."
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
            isDisabled={!isRetweetUrlValid}
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

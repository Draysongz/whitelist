import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  useToast
} from "@chakra-ui/react";
import { Task } from "../App";



interface FormData {
  name: string;
  wallet: string;
}

interface FormPageProps {
  tasks: Task[]; // Expect an array of Task
}


const scriptUrl = "https://script.google.com/macros/s/AKfycbz6yPuqPdpX1ZKi9sIrXHeM0jamx-nQBJ4_HjbjRIBPcsKmYdquKsDDtmI0mcAiLSQ4YQ/exec"

const FormPage: React.FC<FormPageProps> = ({tasks}) => {
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

  console.log(tasks)

  const toast = useToast()

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
     fetch(scriptUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),  // Stringify the form data
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      alert(data.msg);
    })
    .catch(err => console.log(err));
    setFormData({
      name: '',
      wallet: ''
    })
    toast({
      title: 'Details submitted.',
          description: "We've receieved your response",
          status: 'success',
          duration: 3000,
          isClosable: true,
    })
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
                href={tasks[0]?.twitter}
                target="_blank"
                rel="noopener noreferrer"
                color="red"
              >
                @Mongrel_btc
              </a>?*{" "}
              (<a
                href={tasks[0]?.postUrl}
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

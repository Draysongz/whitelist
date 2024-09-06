import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

interface FormData {
  username: string;
  link: string;
}



const SocialForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ username: '', link: '' });
    const toast = useToast()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // Replace 'collectionName' with your actual Firestore collection name
      const docRef = doc(db, "Tasks", "8oTsV2OwNOE6uL629vz1"); 
      await updateDoc(docRef, {
        twitter: formData.username,
        postUrl: formData.link
      });
      
      toast({
        title: 'Task uploaded.',
        description: "Your data has been successfully updated.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setFormData({ username: '', link: '' }); // Clear form after submission
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Submission failed.',
        description: "There was an error submitting your data.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
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

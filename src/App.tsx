import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
// import WebApp from "@twa-dev/sdk";
import './index.css'
import MainPage from './Pages/MainPage'
import FormPage from './Pages/Form'
import SocialForm from "./Pages/SocialForm";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/firebase";
import { useEffect, useState } from "react";

export type Task={
  id: string
  twitter: string
  postUrl: string
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
useEffect(() => {
  const fetchTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Tasks')) // Ensure the collection name matches
      console.log(querySnapshot); // Good for debugging
      
      const tasksList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      
      setTasks(tasksList);
    } catch (error) {
      console.error('Error fetching tasks:', error); // Error handling
    }
  };

  fetchTasks();
}, []);


console.log(tasks)
  return (
    <Flex align={"center"} justify={"center"} minH={"100vh"} bgImage={'/bg.jpg'} bgRepeat={'no-repeat'} bgPosition={'center'} bgSize={'cover'} w={'100vw'}>
      <Box>
        <Router>
          <Routes>
            <Route index element={<MainPage />} />
            <Route path="register" element={<FormPage tasks={tasks} />} />
            <Route path="/admin" element={<SocialForm />} />
 
          </Routes>
        </Router>
      </Box>
    </Flex>
  );
}


export default App

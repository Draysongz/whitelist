import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
// import WebApp from "@twa-dev/sdk";
import './index.css'
import MainPage from './Pages/MainPage'
import FormPage from './Pages/Form'
import SocialForm from "./Pages/SocialForm";

function App() {
  // const BackButton = WebApp.BackButton;

  // BackButton.show();
  // BackButton.onClick(() => window.history.back());
  return (
    <Flex align={"center"} justify={"center"} minH={"100vh"} bgImage={'/bg.jpg'} bgRepeat={'no-repeat'} bgPosition={'center'} bgSize={'cover'} w={'100vw'}>
      <Box>
        <BrowserRouter>
          <Routes>
            <Route index element={<MainPage />} />
            <Route path="register" element={<FormPage />} />
            <Route path="socials" element={<SocialForm />} />

          </Routes>
        </BrowserRouter>
      </Box>
    </Flex>
  );
}


export default App

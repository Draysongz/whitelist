import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export default function MainPage() {
    return(
        <Box
        display={'flex'}
        width={'100vw'}
        height={'100vh'}
        bg={'transparent'}
        justifyContent={'center'}
        alignItems={'center'}
        >
            <Link to={'/register'}>            
            <Button 
            w={'300px'} 
            h={'77px'} 
            bgColor={'yellow'} 
            color={'green'} 
            fontSize={'24px'}
            boxShadow=" 0px 4px 6px rgba(0, 0, 0, 0.6)"
            transition="transform 0.3s ease"
            _hover={{
                bg: "limegreen",
                border: "2px solid gold",
                color: "black",
                transform: 'scale(1.2)'
            }}>
                Apply for Whitelist
            </Button>
            </Link>
        </Box>
    )
}
import { Box, Button, Flex, Icon, Text, useBreakpointValue } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FaDiscord } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
export default function MainPage() {
    const navigate= useNavigate()
    return (
      <Box
        display={"flex"}
        width={"100vw"}
        height={"100vh"}
        bg={"transparent"}
        justifyContent={useBreakpointValue({ base: "none", md: "space-between", lg: "space-between" })}
        alignItems={"start"}
        flexDirection={useBreakpointValue({
          base: "column",
          md: "row",
          lg: "row",
        })}
        p={10}
        border={"2px solid red"}
      >
        <Flex alignItems={"center"} justifyContent={"center"} gap={5}>
          <Icon as={FaDiscord} boxSize={6} />
          <Link to={"https://x.com/aukstract?s=21&t=b8FPrLo4XS9IvogfmKElfw"} target="_blank">
            <Icon as={BsTwitterX} boxSize={4} />
          </Link>
        </Flex>

        <Link to={"/register"}>
          <Text
            w={"300px"}
            h={"77px"}
            bgColor={"transparent"}
            color={"black"}
            fontSize={"20px"}
            // boxShadow=" 0px 4px 6px rgba(0, 0, 0, 0.6)"
            // transition="transform 0.3s ease"

            // _hover={{
            //     bg: "limegreen",
            //     border: "2px solid gold",
            //     color: "black",
            //     transform: 'scale(1.2)'
            // }}
          >
            Apply for Guaranteed Freemint
          </Text>
        </Link>
      </Box>
    );
}
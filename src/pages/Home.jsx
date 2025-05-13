import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";
import { grayColor, greenDark } from "../constants/color";

const Home = () => {
  return (
    <Box  height={"100%"} sx={{display:'flex',justifyContent:'center',alignItems:'center',}}>
      <Typography p={"1rem"} fontSize={'1.3rem'} fontFamily={'Readex Pro'}  textAlign={"center"} sx={{color:"#fff", backgroundColor:greenDark, borderRadius:'3rem'}}>
        Select a friend to chat
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);
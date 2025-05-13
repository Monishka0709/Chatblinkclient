<<<<<<< HEAD
import {
    Close as CloseIcon,
    Dashboard as DashboardIcon,
    ExitToApp as ExitToAppIcon,
    Groups as GroupsIcon,
    ManageAccounts as ManageAccountsIcon,
    Menu as MenuIcon,
    Message as MessageIcon,
  } from "@mui/icons-material";
  import {
    Box,
    Drawer,
    IconButton,
    Stack,
    Typography,
    styled,
  } from "@mui/material";
  import './Loaders.css'
  import Grid from '@mui/material/Grid2'
  import React, { useState } from "react";
  import { Link as LinkComponent, Navigate, useLocation } from "react-router-dom";
  import { grayColor, grayColorDark, green, greenDark, matBlack } from "../../constants/color";
  import { useDispatch, useSelector } from "react-redux";
  import { adminLogout } from "../../redux/thunks/admin";
  
  const Link = styled(LinkComponent)`
    text-decoration: none;
    font-family: Readex Pro;
    border-radius: 2rem;
    padding: 1rem 2rem;
    color: #ebf9fe;
    &:hover {
      color: rgba(0, 0, 0, 0.54);
    }
  `;
  
  const adminTabs = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <DashboardIcon />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <ManageAccountsIcon />,
    },
    {
      name: "Chats",
      path: "/admin/chats",
      icon: <GroupsIcon />,
    },
    {
      name: "Messages",
      path: "/admin/messages",
      icon: <MessageIcon />,
    },
  ];
  
  const Sidebar = ({ w = "100%" }) => {
    const location = useLocation();
    const dispatch = useDispatch();
  
    const logoutHandler = () => {
      dispatch(adminLogout());
    console.log('logout')
    };
  
    return (
      <Stack width={w} direction={"column"} p={"3rem 0 3rem 3rem"} spacing={"3rem"} sx={{
        // bgcolor: {xs: '#444141', md: green , lg: 'unset', },
        // width: {md: '300px'}
        
      }}>
            <Typography variant='h6' sx={{
                      display: { xs: "none", sm: "block"},
                      fontFamily: "Readex Pro",
                      fontWeight: "600",
                      color:"white"
                      
                    }}>
                      ChatBlink
                    </Typography>
  
        <Stack spacing={"1rem"}>
          {adminTabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              sx={
                location.pathname === tab.path && {
                  bgcolor: '#ebf9fe',
                  color: '#444141',
                  ":hover": { color: matBlack },
                }
                
              }
            >
              <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                {tab.icon}
  
                <Typography fontFamily={'Readex Pro'}>{tab.name}</Typography>
              </Stack>
            </Link>
          ))}
  
          <Link onClick={logoutHandler}>
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              <ExitToAppIcon />
  
              <Typography sx={{fontFamily:'Readex Pro'}}>Logout</Typography>
            </Stack>
          </Link>
        </Stack>
      </Stack>
    );
  };
  
  const AdminLayout = ({ children }) => {
    const { isAdmin } = useSelector((state) => state.auth);
    // const isAdmin = true;
  
    const [isMobile, setIsMobile] = useState(false);
  
    const handleMobile = () => setIsMobile(!isMobile);
  
    const handleClose = () => setIsMobile(false);
  
    if (!isAdmin) return <Navigate to="/admin" />;
  
    return (
      <Grid container minHeight={"100vh"} sx={{bgcolor:'#ebf9fe', justifyContent:{xs:'center', md:'unset'}}} >
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            position: "fixed",
            right: "1rem",
            top: "0.8rem",
          }}
        >
          <IconButton onClick={handleMobile} >
            {isMobile ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
  
        <Grid item md={4} lg={3} sx={{ display: { xs: "none", md: "block" }, minHeight:'100vh',
    bgcolor:green }}>
          <Sidebar />
        </Grid>
  
        <Grid
          maxwidth={'100%'}
          className='containerGrid'
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}

          item
          xs={12}
          md={8}
          lg={6}
          sx={{
            // overflow:'scroll'
            // bgcolor: grayColor,
          }}
        >
          {children}
        </Grid>
  
        <Drawer open={isMobile} onClose={handleClose} >
        <Box
          sx={{ bgcolor:'#287c8b', height:'100%', width:'350px', overflow:'hidden' }}
          role="presentation"
        >
             <Sidebar w="45vw" />
        </Box>
         
        </Drawer>
      </Grid>
    );
  };
  
=======
import {
    Close as CloseIcon,
    Dashboard as DashboardIcon,
    ExitToApp as ExitToAppIcon,
    Groups as GroupsIcon,
    ManageAccounts as ManageAccountsIcon,
    Menu as MenuIcon,
    Message as MessageIcon,
  } from "@mui/icons-material";
  import {
    Box,
    Drawer,
    IconButton,
    Stack,
    Typography,
    styled,
  } from "@mui/material";
  import './Loaders.css'
  import Grid from '@mui/material/Grid2'
  import React, { useState } from "react";
  import { Link as LinkComponent, Navigate, useLocation } from "react-router-dom";
  import { grayColor, grayColorDark, green, greenDark, matBlack } from "../../constants/color";
  import { useDispatch, useSelector } from "react-redux";
  import { adminLogout } from "../../redux/thunks/admin";
  
  const Link = styled(LinkComponent)`
    text-decoration: none;
    font-family: Readex Pro;
    border-radius: 2rem;
    padding: 1rem 2rem;
    color: #ebf9fe;
    &:hover {
      color: rgba(0, 0, 0, 0.54);
    }
  `;
  
  const adminTabs = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <DashboardIcon />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <ManageAccountsIcon />,
    },
    {
      name: "Chats",
      path: "/admin/chats",
      icon: <GroupsIcon />,
    },
    {
      name: "Messages",
      path: "/admin/messages",
      icon: <MessageIcon />,
    },
  ];
  
  const Sidebar = ({ w = "100%" }) => {
    const location = useLocation();
    const dispatch = useDispatch();
  
    const logoutHandler = () => {
      dispatch(adminLogout());
    console.log('logout')
    };
  
    return (
      <Stack width={w} direction={"column"} p={"3rem 0 3rem 3rem"} spacing={"3rem"} sx={{
        // bgcolor: {xs: '#444141', md: green , lg: 'unset', },
        // width: {md: '300px'}
        
      }}>
            <Typography variant='h6' sx={{
                      display: { xs: "none", sm: "block"},
                      fontFamily: "Readex Pro",
                      fontWeight: "600",
                      color:"white"
                      
                    }}>
                      ChatBlink
                    </Typography>
  
        <Stack spacing={"1rem"}>
          {adminTabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              sx={
                location.pathname === tab.path && {
                  bgcolor: '#ebf9fe',
                  color: '#444141',
                  ":hover": { color: matBlack },
                }
                
              }
            >
              <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                {tab.icon}
  
                <Typography fontFamily={'Readex Pro'}>{tab.name}</Typography>
              </Stack>
            </Link>
          ))}
  
          <Link onClick={logoutHandler}>
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              <ExitToAppIcon />
  
              <Typography sx={{fontFamily:'Readex Pro'}}>Logout</Typography>
            </Stack>
          </Link>
        </Stack>
      </Stack>
    );
  };
  
  const AdminLayout = ({ children }) => {
    const { isAdmin } = useSelector((state) => state.auth);
    // const isAdmin = true;
  
    const [isMobile, setIsMobile] = useState(false);
  
    const handleMobile = () => setIsMobile(!isMobile);
  
    const handleClose = () => setIsMobile(false);
  
    if (!isAdmin) return <Navigate to="/admin" />;
  
    return (
      <Grid container minHeight={"100vh"} sx={{bgcolor:'#ebf9fe', justifyContent:{xs:'center', md:'unset'}}} >
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            position: "fixed",
            right: "1rem",
            top: "0.8rem",
          }}
        >
          <IconButton onClick={handleMobile} >
            {isMobile ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
  
        <Grid item md={4} lg={3} sx={{ display: { xs: "none", md: "block" }, minHeight:'100vh',
    bgcolor:green }}>
          <Sidebar />
        </Grid>
  
        <Grid
          maxwidth={'100%'}
          className='containerGrid'
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}

          item
          xs={12}
          md={8}
          lg={6}
          sx={{
            // overflow:'scroll'
            // bgcolor: grayColor,
          }}
        >
          {children}
        </Grid>
  
        <Drawer open={isMobile} onClose={handleClose} >
        <Box
          sx={{ bgcolor:'#287c8b', height:'100%', width:'350px', overflow:'hidden' }}
          role="presentation"
        >
             <Sidebar w="45vw" />
        </Box>
         
        </Drawer>
      </Grid>
    );
  };
  
>>>>>>> b8a3feb (first commit)
  export default AdminLayout;
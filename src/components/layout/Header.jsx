import React, { useState, lazy, Suspense } from 'react'
import Fade from '@mui/material/Fade';
import { green, orange } from '../../constants/color'
import { AppBar, Backdrop, Badge, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, useMediaQuery } from '@mui/material'
import { Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon, Menu as MenuIcon, MoreVert, Notifications as NotificationsIcon, Search, Search as SearchIcon, SearchOffOutlined } from '@mui/icons-material'
import LightModeIcon from '@mui/icons-material/LightMode';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from "../../constants/config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/misc";
import { resetNotificationCount } from "../../redux/reducers/chat";

const SearchDialog = React.lazy(() => import('../specific/SearchDialog'))
const NotificationDialog = React.lazy(() => import('../specific/NotificationDialog'))
const NewGroupDialog = React.lazy(() => import('../specific/NewGroupDialog'))


const IconBtn = ({ title, icon, onClick}) => {
  return (
    <Tooltip title={title}
    slots={{ transition: Fade, }} slotProps={{ transition: { timeout: 400 }, }}>
      <IconButton color="inherit" sx={{padding:"7px", margin:"5px", borderRadius:"50%"}} size="large" onClick={onClick}>
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          {icon}
        )} 
      </IconButton>
    </Tooltip>
  )
}

const Header = ({toggleState, onToggleChange}) => {

 
  const [isDarkTheme, setIsDarkTheme] = useState(toggleState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );
  const { notificationCount } = useSelector((state) => state.chat);

  const handleMobile = () => dispatch(setIsMobile(true));

  const openSearch = () => dispatch(setIsSearch(true));

  const isMobileDevice = useMediaQuery('(max-width:600px)');

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };

  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  };

  const handleToggleClick = () => {

    setIsDarkTheme(!isDarkTheme);

    onToggleChange(!isDarkTheme); // Update parent state

  };

  
  const navigateToGroup = () => navigate("/groups",);

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };


 
  const menuItems = [
    { title: 'Search', icon: <SearchIcon />, onClick: openSearch },
    { title: 'New Group', icon: <AddIcon />, onClick: openNewGroup },
    { title: 'Manage Groups', icon: <GroupIcon />, onClick: navigateToGroup },
    { title: 'Notifications', icon: <NotificationsIcon />, onClick: openNotification },
    {
      title: 'Theme',
      icon: isDarkTheme ? <BedtimeIcon /> : <LightModeIcon />,
      onClick: handleToggleClick
    },
    { title: 'LogOut', icon: <LogoutIcon />, onClick: logoutHandler }
  ];


 



  return (
    <>
      <Box sx= {{flexGrow:1, zIndex:5,height: {
          md:'3.8rem'
        }}} >
        <AppBar position="static" sx={{
          bgcolor:green,
          paddingLeft:"2rem",
          paddingRight:"0.5rem",
          zIndex:5,
          boxShadow: "0px 0px 22px -11px rgba(0,0,0,0.48) inset",
          }}
        >
          <Toolbar sx={{minHeight:'59px', justifyContent:"space-between"}}>
          <Box sx={{
              display: { xs: "block", sm: "none"},
              fontFamily: "Readex Pro",
              fontWeight: "600",
              
            }}>
              <IconButton color='inherit' onClick={handleMobile}>
                <MenuIcon/>
              </IconButton>
            </Box>
            <Typography variant='h6' sx={{
              // display: { xs: "none", sm: "block"},
              fontFamily: "Readex Pro",
              fontWeight: "600",
             
              
            }}>
              ChatBlink
            </Typography>
           
            <Box sx={{
              flexGrow: 1,
              display: isMobileDevice ? "none" : "block",

            }}/>
           <Box>
      {isMobileDevice ? (
        <>
          <IconButton onClick={handleMoreClick}>
            <MoreVert sx={{ color: "white" }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {menuItems.map(({ title, icon, onClick }) => (
              <MenuItem
                key={title}
                onClick={() => {
                  onClick();
                  handleClose();
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  {icon}
                  {title}
                </Box>
              </MenuItem>
            ))}
          </Menu>
        </>
      ) : (
        <Box display="flex" gap={1}>
          {menuItems.map(({ title, icon, onClick }) => (
            <>
            <Tooltip title={title} slots={{ transition: Fade, }} slotProps={{ transition: { timeout: 400 }, }} >
            <IconButton key={title}  onClick={onClick}  style={{ color: "white" }} >
              {title === "Notifications" ? (
                <Badge badgeContent={notificationCount} color="error">
                   {icon}
                </Badge>
              ) : (
                icon  
              )}
             
            </IconButton>
            </Tooltip>
            </>
          ))}
        </Box>
      )}
    </Box>
            

          </Toolbar>

        </AppBar>
      </Box>

      {
        isSearch && (
          <Suspense fallback={< Backdrop open/>}>
            <SearchDialog/>
          </Suspense>
            
        )}


      {
        isNotification && (
          <Suspense fallback={< Backdrop open/>}>
            <NotificationDialog/>
           </Suspense>
            
        )}


        {isNewGroup && (
          <Suspense fallback={< Backdrop open />}>
            <NewGroupDialog/>
          </Suspense>
            
        )}

        

        
  </>
  );
};



export default Header

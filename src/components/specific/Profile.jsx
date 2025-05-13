import React from "react";
import { Avatar, Stack, Typography } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import ProfilePic from '../../assets/react.svg'
import moment from "moment";
import { transformImage } from "../../lib/features";
import { grayColor, greenDark } from "../../constants/color";


const Profile = ({ user, theme  }) => {
  console.log(user);
  return (
    <Stack spacing={"1.5rem"} direction={"column"} alignItems={"center"} sx={{margin:'0 1rem 1rem 1rem',paddingTop:'1rem',border:'2px solid #2d383b',background: theme?'#d3e0e4':'#282c2d',height:'98.8%', borderRadius:'10px'}}>
      <ProfileCard
        
        text={user?.username}
        Icon={<UserNameIcon sx={{color:theme?"#282c2d":"#eee"}} />}
        theme={theme}
      />
      <Avatar
        src={transformImage(user?.avatar?.url)}
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: theme? "5px solid darkgrey" : "5px solid white",
        }}
      />

<ProfileCard heading={"Name"} 
      text={user?.name} 
      // text={'Monishka Rajput'}
      Icon={<FaceIcon sx={{color:theme?"#282c2d":"#eee"}}/>} 
      theme={theme}/>
      
      <ProfileCard heading={"Bio"} 
      text={user?.bio}
      theme={theme}
       />
      
      
      <ProfileCard
        heading={"Joined"}
        text={moment(user?.createdAt).fromNow()}
        Icon={<CalendarIcon sx={{color:theme?"#282c2d":"#eee"}} />}
        theme={theme}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading, theme}) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"0.5rem"}
    sx={{color:theme?'#282c2d':'gray'}}
    textAlign={"center"}
  >
    {Icon && Icon}

    <Typography sx={{color:theme?'#282c2d':'#eee'}}  variant="caption" textAlign={'center'} fontFamily={'Readex Pro'}>
        {heading}
      </Typography>

    <Stack >
      <Typography variant="body1" sx={{color:theme?'#282c2d':'#eee'}} fontFamily={'Readex Pro'}>{text}</Typography>
      
    </Stack>
    
  </Stack>
);

export default Profile;
import React from 'react' 
import { Stack } from '@mui/material'
import ChatItem from '../shared/ChatItem'

const ChatList = ({ 
    w = "100%",
    chats = [],
    chatId,
    onlineUsers = [],
    newMessagesAlert = [{
    chatId:"",
    count: 0,
}],
theme,
handleDeleteChat}) => {
  return (
    <Stack width={w} direction={'column'}  sx={{marginTop:'2.2rem', overflow:'auto', height:'calc(100% - 2.8rem)', '::-webkit-scrollbar': {
      display: 'none'
    }}}>
      
      {
        chats?.map((data,index) => {
            const {avatar,_id,name,groupChat,members} = data;

            const newMessageAlert = newMessagesAlert.find(
                ({chatId}) => chatId === _id
            );

            const isOnline = members?.some((member) => onlineUsers.includes(member));
            // console.log(chatId);
            // console.log(_id);
            

            return <ChatItem theme={theme} index={index} newMessageAlert={newMessageAlert} isOnline={isOnline} avatar={avatar} name={name} _id={_id} key={_id} groupChat={groupChat} sameSender={chatId === _id} handleDeleteChat={handleDeleteChat} />
          
        })
      }
    </Stack>
  )
}

export default ChatList

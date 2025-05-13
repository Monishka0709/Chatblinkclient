import React, {useEffect, useState, useRef, useCallback} from 'react'
import Header from "./Header"
import Title from '../shared/Title'
import { ThemeContext } from '../../ThemeContext'
import Grid  from '@mui/material/Grid2'
import ChatList from '../specific/ChatList'
import Background from '../../assets/chat_background2.png'
import Profile from '../specific/Profile'
import { useMyChatsQuery } from '../../redux/api/api'
import { Drawer, Skeleton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { BouncingSkeleton } from '../styles/StyledComponents'
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../../constants/events";
import { useErrors, useSocketEvents } from "../../hooks/hook";
import { getOrSaveFromStorage } from "../../lib/features";
import {
  incrementNotification,
  setNewMessagesAlert,
} from "../../redux/reducers/chat";
import {
  setIsDeleteMenu,
  setIsMobile,
  setSelectedDeleteChat,
} from "../../redux/reducers/misc";
import { getSocket } from "../../socket";
import DeleteChatMenu from '../dialogs/DeleteChatMenu'
import { useNavigate, useParams } from 'react-router-dom';
const AppLayout = () => (WrappedComponent) => {
  return (props) => {

    const [isToggled, setIsToggled] = useState(false);



    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const socket = getSocket();
    

    console.log(params);
    const chatId = params.chatId;
    const deleteMenuAnchor = useRef(null);

    const [onlineUsers, setOnlineUsers] = useState([]);

    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);

    const handleToggleChange = () => {
      setIsToggled(!isToggled);
    };

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
    }, [newMessagesAlert]);

    const handleDeleteChat = (e, chatId, groupChat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ chatId, groupChat }));
      deleteMenuAnchor.current = e.currentTarget;
    };

    const handleMobileClose = () => dispatch(setIsMobile(false));

    const newMessageAlertListener = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chatId]
    );

    const newRequestListener = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const refetchListener = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const onlineUsersListener = useCallback((data) => {
      setOnlineUsers(data);
    }, []);

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlertListener,
      [NEW_REQUEST]: newRequestListener,
      [REFETCH_CHATS]: refetchListener,
      [ONLINE_USERS]: onlineUsersListener,
    };

    useSocketEvents(socket, eventHandlers);  



    return (
    <>
      <Title title={'ChatBlink'} description={"this is a chat application"}/>
      <Header toggleState={isToggled} 
      onToggleChange={handleToggleChange}
      />
      <DeleteChatMenu
          dispatch={dispatch}
          deleteMenuAnchor={deleteMenuAnchor}
        />
      {
        isLoading ? (
          <BouncingSkeleton/> 
        ):
        (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList 
              w={"70vw"} 
              theme={isToggled} 
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
              onlineUsers={onlineUsers}/>
          </Drawer> 
        )
      }
      <Grid container height={"calc(100vh - 3.8rem)"} sx={{ borderTop: isToggled ? "10px solid #ebf9fe":" 10px solid #444141", backgroundColor: isToggled ? "#ebf9fe":"#444141" }} >
          <Grid item size={{sm:4,
            md:3
            }}
            sx={{
              display: { xs: "none", sm: "block" },
              backgroundColor: isToggled ? "#ebf9fe":"#444141"  ,
              paddingLeft:"0.5rem"

            }}
            height={"100%"}
          > {
            isLoading ? (
              <Skeleton/>
            ):
            (
              <ChatList 
                theme={isToggled} 
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
                onlineUsers={onlineUsers}/> 
            )
          }</Grid>
            <Grid item size={{xs:12, sm:8, md:5, lg:6}} height={"100%"}
            sx={{
              
              background:`url(${Background})`,
              backgroundColor: isToggled ? "#ebf9fe":"#444141",
              border: isToggled ? '5px solid #62686a': '5px solid #ebf9fe',
              borderRadius:"10px",
              
            }}>
              
              <WrappedComponent {...props} chatId={chatId} user={user} />
            
          </Grid>

          <Grid item
            size={{md:4,lg:3}}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              margin: 'auto 0',
              padding: "0",
              bgcolor: isToggled?"#ebf9fe":"#444141",
            }}
          ><Profile user={user} theme={isToggled}/></Grid>
      
      </Grid>
      
    </>
  )
 }
}

export default AppLayout

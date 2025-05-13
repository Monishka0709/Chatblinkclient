<<<<<<< HEAD
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
  Bedtime as DarkModeIcon
} from "@mui/icons-material";
import LightModeIcon from '@mui/icons-material/LightMode';
import {
  AppBar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Toolbar,
  Typography,
  Container,
  ButtonGroup,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { Suspense, lazy, memo, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { LayoutLoader } from "../components/layout/Loaders";
import AvatarCard from "../components/shared/AvatarCard";
import { Link } from "../components/styles/StyledComponents";
import { bgGradient, grayColor, grayColorDark, green, greenDark, greenLight, lightBlue, matBlack, red } from "../constants/color";
import { samepleChats, sampleUsers } from "../constants/sampleData";
import { useDispatch, useSelector } from "react-redux";
import UserItem from "../components/shared/UserItem";
import '../components/layout/Loaders.css'
import { useAsyncMutation, useErrors } from "../hooks/hook";
import {
  useChatDetailsQuery,
  useDeleteChatMutation,
  useMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from "../redux/api/api";
import { setIsAddMember } from "../redux/reducers/misc";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);
const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
 
  // console.log(chatId)
  const [theme, setTheme] = useState(false);
  const navigate = useNavigate();

  const handleTheme=() =>{setTheme(!theme)}
  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);

  const myGroups = useMyGroupsQuery("");

  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );

  const [updateGroup, isLoadingGroupName] = useAsyncMutation(
    useRenameGroupMutation
  );

  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(
    useRemoveGroupMemberMutation
  );

  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(
    useDeleteChatMutation
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");

  const [members, setMembers] = useState([]);
const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ];

  useErrors(errors);

  useEffect(() => {
    const groupData = groupDetails.data;
    if (groupData) {
      setGroupName(groupData.chat.name);
      setGroupNameUpdatedValue(groupData.chat.name);
      setMembers(groupData.chat.members);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    };
  }, [groupDetails.data]);

  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const updateGroupName = () => {
    setIsEdit(false);
    updateGroup("Updating Group Name...", {
      chatId,
      name: groupNameUpdatedValue,
    });
  };

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));
  };

  const deleteHandler = () => {
    deleteGroup("Deleting Group...", chatId);
    closeConfirmDeleteHandler();
    navigate("/groups");
  };

  const removeMemberHandler = (userId) => {
    removeMember("Removing Member...", { chatId, userId });
  };

  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);

  const ButtonGroup =<Stack direction={{
    sm:'row',
    xs: 'column-reverse'
  }}
    spacing={'1rem'}
    p={{
      sm:'1rem',
      xs:'0',
      md: '1rem 4rem'
    }}
    >
      <Button size='large' sx={{bgcolor:'transparent', outline:'2px solid', outlineColor:red , color:red, ":hover" : {bgcolor:red, color:'white'}}} startIcon={<DeleteIcon/>} onClick={openConfirmDeleteHandler}>Delete Group</Button>
      <Button size='large' sx={{bgcolor:green, color:'white', outline:'2px solid', outlineColor:green }}  startIcon={<AddIcon/>} onClick={openAddMemberHandler}>Add Member</Button>

    </Stack>

  const IconBtns = (
    <>
      {/* <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <IconButton
         onClick={handleMobile}
         >
          <MenuIcon />
        </IconButton>
      </Box>
      <div w={'100%'}>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "1.8rem",
            left: "2rem",
            bgcolor: greenDark,
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
      </div> */}


      <Box sx= {{flexGrow:1, zIndex:5, borderBottom:'2px solid #444141', height:{ md:'3.8rem'}}}  >
        <AppBar position="static" sx={{
          bgcolor:green,
          paddingLeft:"2rem",
          paddingRight:"0.5rem",
        }}
        >
          <Toolbar sx={{minHeight:'59px', display:'flex', justifyContent:'space-between'}}>
            
          <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
          },
        }}
      >
        <IconButton sx={{color:"white", borderRadius:'10px', ":hover":{bgcolor:greenDark,} }}
         onClick={handleMobile}
         >
          <MenuIcon />
        </IconButton>
        
      </Box>
      <Tooltip title="Back">
        <IconButton
          sx={{
            borderRadius:'10px',
            position: "absolute",
            color: "white",
            ":hover": {
              bgcolor: greenDark,
              boxShadow:"1px 1px 5px rgba(0,0,0,0.4),inset 0 0 1px rgba(0,0,0,0.2)"
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
          <Tooltip title="Theme">
      <IconButton sx={{color:"white", borderRadius:'10px',position:'absolute',right:'3.5rem', boxShadow:'1px 1px 5px rgba(0,0,0,0.4),inset 0 0 1px rgba(0,0,0,0.2)', ":hover":{bgcolor:greenDark}, }}
         onClick={handleTheme}
         >
          {theme ? <DarkModeIcon/>:<LightModeIcon/>}
        </IconButton>
        </Tooltip>
      
          </Toolbar>

        </AppBar>
      </Box>

    </>
  );





  const GroupName = (
  <Stack  direction={'row'}  spacing={'1rem'} >
    {
      isEdit ? (
      <>
        <TextField 
        value={groupNameUpdatedValue} 
        onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
        />
        <IconButton 
        sx={{height:'2rem', width: '2rem', padding:'1.2rem', color:matBlack,":hover" :{bgcolor:'transparent', } }} 
        onClick={updateGroupName} disabled={isLoadingGroupName}>
        <DoneIcon/>
        </IconButton>
      </>
      ) : (
      <>
      <Typography fontSize={'1.5rem'} fontFamily={'Readex Pro'}>{groupName}</Typography>
      <Tooltip title='Edit'><IconButton sx={{height:'2rem', width: '2rem', padding:'1.2rem', color:matBlack,":hover" :{bgcolor:'transparent', } }}
            disabled={isLoadingGroupName} onClick={() => setIsEdit(true)}> <EditIcon></EditIcon></IconButton></Tooltip>
      </>)
    }
     
  </Stack>);

const GroupsList = ({w='100%', myGroups =[],chatId}) => (
  <Stack w={w} direction={'column'}  sx={{marginTop:'2.2rem',}}>
   {
   myGroups.length > 0 ? (
     myGroups.map((group) => <GroupsListItem group={group} chatId={chatId} />)

   ) : (
     <Typography textAlign={'center'} padding={'1rem'}>
       No Groups
     </Typography>
   )
}
 </Stack>
);


const GroupsListItem = memo(({group,chatId,}) => {
 const { name, avatar,_id } = group;

 const handleClick = (e) =>{
   if(chatId===_id)
   
     e.preventDefault();
   
 }

 return (<Link to={`?group=${_id}`} onClick={handleClick}>
 <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
   <AvatarCard avatar = {avatar}/>
     <Typography fontFamily={'Readex Pro'} sx={{color: theme ? "#555" : "#ebf9fe"}}>{name}</Typography>
 
 </Stack>
 </Link>
 );
});



  return myGroups.isLoading ? (
      <LayoutLoader />
    ) : (
    <>
    {IconBtns}

    <Grid container height={"calc(100vh - 3.8rem)"} sx={{backgroundColor: theme? '#ebf9fe' :'#444141'}}>
       <Grid
         item
         size={{sm:4,
          }}
         sx={{
           display: {
             xs: "none",
             sm: "block",
            //  md:'3'
           },
           paddingLeft:'0.5rem',
          //  background:'#444141',
           height:'100%'
         }}
        
       >
        
         <GroupsList 
         myGroups={myGroups?.data?.groups} 
        // myGroups={}
         chatId={chatId} />
       </Grid>

       {<Grid
         item
         size={{xs:12, sm:8, }}
         height={"100%"}
         sx={{
           display: "flex",
           flexDirection: "column",
          
          //  alignItems: "center",
           position: "relative",
           padding: "1.5rem 3rem 1rem 3rem",
            
              backgroundColor: theme ? groupName==""? '#dfdfdf' :grayColor : groupName==""? '#ebf9fe' : grayColor,
              border: theme? '7px solid #ddd' : '7px solid #444141',
              borderRadius:"15px",
              
         }}
      >
        
        
        { 
          groupName ?  <>{GroupName}
          <Typography fontSize={'1.2rem'} fontFamily={"Readex Pro"} margin={"1.5rem 0 "} alignSelf={"flex-start"} variant="body1">Members</Typography> 
          <Stack 
            maxWidth={'45rem'} 
            width={'100%'} 
            boxSizing={'border-box'}
            padding={{
              sm:"1rem",
              xs:"1rem",
              md:"1rem 4rem"
            }}
            spacing={"0.2rem"}
            // bgcolor={grayColorDark}
            height={"49vh"}
            marginBottom={'1rem'}
            borderRadius={'10px'}
            overflow={"auto"}
            >

              {
                isLoadingRemoveMember ? (
                                <CircularProgress />
                              ) :
                members.map((i) => (
                  <UserItem user={i} key={i._id} isAdded 
                  styling={{
                    boxShadow:'0 0 0.5rem rgba(0,0,0,0.2)', 
                    padding:'1rem 2rem',
                    borderRadius:'1rem',
                    bgcolor:grayColor}} 
                  handler={removeMemberHandler}/>
                ))
              }

            </Stack>

            {ButtonGroup}
          </>: <div style={{margin:'auto',fontSize: '1.8rem', color:'#444141'}}>
          Select a Group
          </div>
        }
        
  </Grid>}

{isAddMember && <Suspense fallback={<Backdrop open/>}><AddMemberDialog/></Suspense>}


        {confirmDeleteDialog && <Suspense fallback={<Backdrop open/>}>
        <ConfirmDeleteDialog 
        open={confirmDeleteDialog}
        handleClose={closeConfirmDeleteHandler}
        deleteHandler={deleteHandler}
        />
        </Suspense>}

     <Drawer
      sx={{
        display: {
          xs: "block",
          sm: "none",
        },
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileClose}
    >
      <GroupsList
        w={"50vw"}
        myGroups={myGroups?.data?.groups}
        chatId={chatId}
      />
    </Drawer>
    </Grid>
    </>
  );
  
  
};



=======
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
  Bedtime as DarkModeIcon
} from "@mui/icons-material";
import LightModeIcon from '@mui/icons-material/LightMode';
import {
  AppBar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Toolbar,
  Typography,
  Container,
  ButtonGroup,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { Suspense, lazy, memo, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { LayoutLoader } from "../components/layout/Loaders";
import AvatarCard from "../components/shared/AvatarCard";
import { Link } from "../components/styles/StyledComponents";
import { bgGradient, grayColor, grayColorDark, green, greenDark, greenLight, lightBlue, matBlack, red } from "../constants/color";
import { samepleChats, sampleUsers } from "../constants/sampleData";
import { useDispatch, useSelector } from "react-redux";
import UserItem from "../components/shared/UserItem";
import '../components/layout/Loaders.css'
import { useAsyncMutation, useErrors } from "../hooks/hook";
import {
  useChatDetailsQuery,
  useDeleteChatMutation,
  useMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from "../redux/api/api";
import { setIsAddMember } from "../redux/reducers/misc";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);
const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
 
  // console.log(chatId)
  const [theme, setTheme] = useState(false);
  const navigate = useNavigate();

  const handleTheme=() =>{setTheme(!theme)}
  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);

  const myGroups = useMyGroupsQuery("");

  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );

  const [updateGroup, isLoadingGroupName] = useAsyncMutation(
    useRenameGroupMutation
  );

  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(
    useRemoveGroupMemberMutation
  );

  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(
    useDeleteChatMutation
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");

  const [members, setMembers] = useState([]);
const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ];

  useErrors(errors);

  useEffect(() => {
    const groupData = groupDetails.data;
    if (groupData) {
      setGroupName(groupData.chat.name);
      setGroupNameUpdatedValue(groupData.chat.name);
      setMembers(groupData.chat.members);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    };
  }, [groupDetails.data]);

  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const updateGroupName = () => {
    setIsEdit(false);
    updateGroup("Updating Group Name...", {
      chatId,
      name: groupNameUpdatedValue,
    });
  };

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));
  };

  const deleteHandler = () => {
    deleteGroup("Deleting Group...", chatId);
    closeConfirmDeleteHandler();
    navigate("/groups");
  };

  const removeMemberHandler = (userId) => {
    removeMember("Removing Member...", { chatId, userId });
  };

  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);

  const ButtonGroup =<Stack direction={{
    sm:'row',
    xs: 'column-reverse'
  }}
    spacing={'1rem'}
    p={{
      sm:'1rem',
      xs:'0',
      md: '1rem 4rem'
    }}
    >
      <Button size='large' sx={{bgcolor:'transparent', outline:'2px solid', outlineColor:red , color:red, ":hover" : {bgcolor:red, color:'white'}}} startIcon={<DeleteIcon/>} onClick={openConfirmDeleteHandler}>Delete Group</Button>
      <Button size='large' sx={{bgcolor:green, color:'white', outline:'2px solid', outlineColor:green }}  startIcon={<AddIcon/>} onClick={openAddMemberHandler}>Add Member</Button>

    </Stack>

  const IconBtns = (
    <>
      {/* <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <IconButton
         onClick={handleMobile}
         >
          <MenuIcon />
        </IconButton>
      </Box>
      <div w={'100%'}>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "1.8rem",
            left: "2rem",
            bgcolor: greenDark,
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
      </div> */}


      <Box sx= {{flexGrow:1, zIndex:5, borderBottom:'2px solid #444141', height:{ md:'3.8rem'}}}  >
        <AppBar position="static" sx={{
          bgcolor:green,
          paddingLeft:"2rem",
          paddingRight:"0.5rem",
        }}
        >
          <Toolbar sx={{minHeight:'59px', display:'flex', justifyContent:'space-between'}}>
            
          <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
          },
        }}
      >
        <IconButton sx={{color:"white", borderRadius:'10px', ":hover":{bgcolor:greenDark,} }}
         onClick={handleMobile}
         >
          <MenuIcon />
        </IconButton>
        
      </Box>
      <Tooltip title="Back">
        <IconButton
          sx={{
            borderRadius:'10px',
            position: "absolute",
            color: "white",
            ":hover": {
              bgcolor: greenDark,
              boxShadow:"1px 1px 5px rgba(0,0,0,0.4),inset 0 0 1px rgba(0,0,0,0.2)"
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
          <Tooltip title="Theme">
      <IconButton sx={{color:"white", borderRadius:'10px',position:'absolute',right:'3.5rem', boxShadow:'1px 1px 5px rgba(0,0,0,0.4),inset 0 0 1px rgba(0,0,0,0.2)', ":hover":{bgcolor:greenDark}, }}
         onClick={handleTheme}
         >
          {theme ? <DarkModeIcon/>:<LightModeIcon/>}
        </IconButton>
        </Tooltip>
      
          </Toolbar>

        </AppBar>
      </Box>

    </>
  );





  const GroupName = (
  <Stack  direction={'row'}  spacing={'1rem'} >
    {
      isEdit ? (
      <>
        <TextField 
        value={groupNameUpdatedValue} 
        onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
        />
        <IconButton 
        sx={{height:'2rem', width: '2rem', padding:'1.2rem', color:matBlack,":hover" :{bgcolor:'transparent', } }} 
        onClick={updateGroupName} disabled={isLoadingGroupName}>
        <DoneIcon/>
        </IconButton>
      </>
      ) : (
      <>
      <Typography fontSize={'1.5rem'} fontFamily={'Readex Pro'}>{groupName}</Typography>
      <Tooltip title='Edit'><IconButton sx={{height:'2rem', width: '2rem', padding:'1.2rem', color:matBlack,":hover" :{bgcolor:'transparent', } }}
            disabled={isLoadingGroupName} onClick={() => setIsEdit(true)}> <EditIcon></EditIcon></IconButton></Tooltip>
      </>)
    }
     
  </Stack>);

const GroupsList = ({w='100%', myGroups =[],chatId}) => (
  <Stack w={w} direction={'column'}  sx={{marginTop:'2.2rem',}}>
   {
   myGroups.length > 0 ? (
     myGroups.map((group) => <GroupsListItem group={group} chatId={chatId} />)

   ) : (
     <Typography textAlign={'center'} padding={'1rem'}>
       No Groups
     </Typography>
   )
}
 </Stack>
);


const GroupsListItem = memo(({group,chatId,}) => {
 const { name, avatar,_id } = group;

 const handleClick = (e) =>{
   if(chatId===_id)
   
     e.preventDefault();
   
 }

 return (<Link to={`?group=${_id}`} onClick={handleClick}>
 <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
   <AvatarCard avatar = {avatar}/>
     <Typography fontFamily={'Readex Pro'} sx={{color: theme ? "#555" : "#ebf9fe"}}>{name}</Typography>
 
 </Stack>
 </Link>
 );
});



  return myGroups.isLoading ? (
      <LayoutLoader />
    ) : (
    <>
    {IconBtns}

    <Grid container height={"calc(100vh - 3.8rem)"} sx={{backgroundColor: theme? '#ebf9fe' :'#444141'}}>
       <Grid
         item
         size={{sm:4,
          }}
         sx={{
           display: {
             xs: "none",
             sm: "block",
            //  md:'3'
           },
           paddingLeft:'0.5rem',
          //  background:'#444141',
           height:'100%'
         }}
        
       >
        
         <GroupsList 
         myGroups={myGroups?.data?.groups} 
        // myGroups={}
         chatId={chatId} />
       </Grid>

       {<Grid
         item
         size={{xs:12, sm:8, }}
         height={"100%"}
         sx={{
           display: "flex",
           flexDirection: "column",
          
          //  alignItems: "center",
           position: "relative",
           padding: "1.5rem 3rem 1rem 3rem",
            
              backgroundColor: theme ? groupName==""? '#dfdfdf' :grayColor : groupName==""? '#ebf9fe' : grayColor,
              border: theme? '7px solid #ddd' : '7px solid #444141',
              borderRadius:"15px",
              
         }}
      >
        
        
        { 
          groupName ?  <>{GroupName}
          <Typography fontSize={'1.2rem'} fontFamily={"Readex Pro"} margin={"1.5rem 0 "} alignSelf={"flex-start"} variant="body1">Members</Typography> 
          <Stack 
            maxWidth={'45rem'} 
            width={'100%'} 
            boxSizing={'border-box'}
            padding={{
              sm:"1rem",
              xs:"1rem",
              md:"1rem 4rem"
            }}
            spacing={"0.2rem"}
            // bgcolor={grayColorDark}
            height={"49vh"}
            marginBottom={'1rem'}
            borderRadius={'10px'}
            overflow={"auto"}
            >

              {
                isLoadingRemoveMember ? (
                                <CircularProgress />
                              ) :
                members.map((i) => (
                  <UserItem user={i} key={i._id} isAdded 
                  styling={{
                    boxShadow:'0 0 0.5rem rgba(0,0,0,0.2)', 
                    padding:'1rem 2rem',
                    borderRadius:'1rem',
                    bgcolor:grayColor}} 
                  handler={removeMemberHandler}/>
                ))
              }

            </Stack>

            {ButtonGroup}
          </>: <div style={{margin:'auto',fontSize: '1.8rem', color:'#444141'}}>
          Select a Group
          </div>
        }
        
  </Grid>}

{isAddMember && <Suspense fallback={<Backdrop open/>}><AddMemberDialog/></Suspense>}


        {confirmDeleteDialog && <Suspense fallback={<Backdrop open/>}>
        <ConfirmDeleteDialog 
        open={confirmDeleteDialog}
        handleClose={closeConfirmDeleteHandler}
        deleteHandler={deleteHandler}
        />
        </Suspense>}

     <Drawer
      sx={{
        display: {
          xs: "block",
          sm: "none",
        },
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileClose}
    >
      <GroupsList
        w={"50vw"}
        myGroups={myGroups?.data?.groups}
        chatId={chatId}
      />
    </Drawer>
    </Grid>
    </>
  );
  
  
};



>>>>>>> b8a3feb (first commit)
export default Groups;
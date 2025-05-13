import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { grayColor, grayColorDark, green, red } from "../../constants/color";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useDispatch, useSelector } from "react-redux";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { setIsNewGroup } from "../../redux/reducers/misc";
import toast from "react-hot-toast";

const NewGroupDialog = () => {
  const { isNewGroup } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const groupName = useInputValidation("");

  const [selectedMembers, setSelectedMembers] = useState([]);

  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
 
  };

  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");

    if (selectedMembers.length < 2)
      return toast.error("Please Select Atleast 3 Members");

    newGroup("Creating New Group...", {
      name: groupName.value,
      members: selectedMembers,
    });

    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  return (
    <Dialog open={isNewGroup} onClose={closeHandler} >
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"1.5rem"} sx={{overflow:'auto'}} maxWidth={'75vw'}>
        <DialogTitle textAlign={"center"} fontSize={'1.7rem'} fontFamily={"Readex Pro"}>
          New Group
        </DialogTitle>

        <TextField
          label="Group Name"
          fontFamily="Readex Pro"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />

        <Typography fontFamily={"Readex Pro"} variant="body1">Members</Typography>

        <Stack sx={{backgroundColor:grayColorDark, borderRadius:'10px', maxHeight:'14.3rem', overflowY:'auto',  }}>
          {
          isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            )
          )
          )
          }
        </Stack>

        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button
            variant="contained"
            
            color="error"
            size="large"
            sx={{
              background:'transparent',
              color:'red',
              outline:'2px solid',
              outlineColor:red,
              ":hover" : {
                background:red,
                color:'white'
              }
            }}
            onClick={closeHandler}
          >
            Cancel
          </Button>
          <Button
            sx={{background:green,
              outline: '2px solid',
                outlineColor:green, 
                        color:'white',
                        borderRadius:'0.4rem',
                      }}
            variant="contained"
            size="large"
            onClick={submitHandler}
            disabled={isLoadingNewGroup}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroupDialog;
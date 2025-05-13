import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useAsyncMutation } from "../../hooks/hook";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  // useSendFriendRequestMutation,
} from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../../constants/sampleData";
import { grayColor, grayColorDark } from "../../constants/color";
import { useAsyncMutation } from "../../hooks/hook";

const SearchDialog = () => {
  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery();

  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  );

  const dispatch = useDispatch();

  // let isLoadingSendFriendRequest = false;

  const search = useInputValidation("");

  const [users, setUsers] = useState(sampleUsers);

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend request...", { userId: id });
  console.log(id);
  };

  const searchCloseHandler = () => dispatch(setIsSearch(false));

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e));
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack  p={"2rem"} direction={"column"} width={"25rem"} maxWidth={'75vw'}>
         <DialogTitle fontSize={'1.7rem'} fontFamily={"Readex Pro"} textAlign={"center"}>Add Friends</DialogTitle>
         <TextField
         fontFamily="Readex Pro"
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment:(
              <InputAdornment position="start">
              <SearchIcon/>
              </InputAdornment>
            )
          }}/>

          <List  sx={{backgroundColor:grayColorDark, borderRadius:'10px', marginTop:'0.5rem', maxHeight:'20rem', overflowY:'scroll'}}>
          {
            users.map((i) =>(
              <UserItem
              user={i}
              key={i._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
            ))
          }
          
          </List>
          
      </Stack>
    </Dialog>

  
  );
};

export default SearchDialog;
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { green, red, grayColorDark } from "../../constants/color";
import { sampleNotifications } from "../../constants/sampleData";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { setIsNotification } from "../../redux/reducers/misc";

const NotificationDialog = () => {
  const { isNotification } = useSelector((state) => state.misc);

  const dispatch = useDispatch();

  const { isLoading, data, error, isError } = useGetNotificationsQuery();

  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    await acceptRequest("Accepting...", { requestId: _id, accept });
    console.log(_id)
  };

  const closeHandler = () => dispatch(setIsNotification(false));

  useErrors([{ error, isError }]);

  return (

    <Dialog open={isNotification} onClose={closeHandler} >
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"} >
        <DialogTitle fontFamily={"Readex Pro"} fontSize={'1.7rem'} textAlign={'center'}>Friend Requests</DialogTitle>

        {isLoading ? (
          <Skeleton />
        ) : (
          <List sx={{ backgroundColor: grayColorDark, borderRadius: '10px', marginTop: '0.5rem' }}>
            {data?.allRequests.length > 0 ? (
              data?.allRequests.map(({ sender, _id }) => (
                <NotificationItem
                  sender={sender}
                  _id={_id}
                  handler={friendRequestHandler}
                  key={_id}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>0 notifications</Typography>
            )}
          </List>

        )
          
        }
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem sx={{ display: 'flex', }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        maxWidth={'75vw'}
      // display={'flex'}
      // justifyContent={'space-between'}
      >
        <Avatar />

        <Typography
          variant="body1"
          sx={{
            flexGlow: 1,
            fontFamily: 'Readex pro',
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
            paddingRight: '3.5rem'
          }}
        >
          {`${name} `}
        </Typography>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button sx={{
            background: green,
            color: 'white',
            borderRadius: '3rem',
            width: '4.7rem',
            marginRight: '0.2rem'

          }} onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" sx={{
            background: red,
            color: 'white',
            borderRadius: '3rem',
            width: '4.7rem',
            marginLeft: '0.2rem'

          }} onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default NotificationDialog;
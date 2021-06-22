import React, { useContext } from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import AddIcon from "@material-ui/icons/Add";
import Avatar from "@material-ui/core/Avatar";

import { SocketContext } from "../../helpers/socket";
import { GetAllChats, setChat } from "../../store/chats/ChatActions";

const drawerWidth = 270;
const marginTop = 64;
const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: drawerWidth,
    marginTop: marginTop,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  content: {
    display: "grid",
    gridTemplateColumns: "20% 80%",
    minHeight: "93vh",
    overflow: "auto",
    maxHeight: "93vh",
  },
  leftSide: {
    background: theme.palette.secondary.dark,
    overflow: "auto",
    maxHeight: "93vh",
  },
  createChat: {
    display: "flex",
    padding: theme.spacing(1, 2),
    // justifyContent: 'center',
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.main,
      background: theme.palette.secondary.main,
    },
  },
  chats: {
    margin: theme.spacing(2, 0.5),
  },
  chat: {
    display: "flex",
    padding: theme.spacing(1, 0.5),
    background: theme.palette.secondary.dark,
    cursor: "pointer",
    borderRadius: 2,
    "&:hover": {
      color: theme.palette.primary.main,
      background: theme.palette.secondary.main,
    },
  },
  selected: {
    background: theme.palette.secondary.main,
    color: theme.palette.primary.main,
  },

  mainChat: {
    // display: "grid",
    // gridTemplateColumns: "10% 90%",
  },
  chatInfo: {
    display: "flex",
    padding: theme.spacing(1, 0.5),
    justifyContent: "space-around",
    alignItems: "center",
  },
  usersInfo: {
    display: "flex",
    padding: theme.spacing(1, 2),
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(0, 2),
    alignItems: "center",
  },
  chatPlaceholder: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Chats = (_) => {
  const classes = useStyles();
  const state = useSelector((state) => ({
    privateGroups: state.userChats.privateGroups,
    publicGroupsWithUser: state.userChats.publicGroupsWithUser,
    publicGroups: state.userChats.publicGroups,
    selectedChat: state.userChat.selectedChat,
  }));
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const createGroup = (e) => {
    console.log("chat socket", socket);
    e.preventDefault();
    console.log("click");
    const data = {
      title: "New Group",
      description: "Some Description",
      private: true,
      users: ["nikittest"],
    };
    socket.emit("groupCreated", data);
    dispatch(GetAllChats());
  };
  const setUserChat = (chat) => {
    dispatch(setChat(chat));
  };
  return (
    <>
      <div className={classes.root}>
        <div className={classes.content}>
          <div className={classes.leftSide}>
            <div className={classes.createChat} onClick={createGroup}>
              <AddIcon color="primary" />
              <Typography variant="overline">Create Chat</Typography>
            </div>
            <div className={classes.createChat}>
              <EmojiPeopleIcon color="primary" />
              <Typography variant="overline">Friends</Typography>
            </div>
            {state.privateGroups.length > 0 && (
              <div className={classes.chats}>
                <Typography variant="overline">Private Chats:</Typography>
                {state.privateGroups.map((chat) => (
                  <div
                    className={clsx(classes.chat, {
                      [classes.selected]: state.selectedChat?.uuid === chat.uuid,
                    })}
                    onClick={() => setUserChat(chat)}
                  >
                    {chat.title} - {chat.users.length} - users
                  </div>
                ))}
              </div>
            )}
            {state.publicGroupsWithUser.length > 0 && (
              <div className={classes.chats}>
                <Typography variant="overline"> My Public Chats:</Typography>
                {state.publicGroupsWithUser.map((chat) => (
                  <div
                    className={clsx(classes.chat, {
                      [classes.selected]: state.selectedChat?.uuid === chat.uuid,
                    })}
                    onClick={() => setUserChat(chat)}
                  >
                    {chat.title} - {chat.users.length} - users
                  </div>
                ))}
              </div>
            )}
            {state.publicGroups.length > 0 && (
              <div className={classes.chats}>
                <Typography variant="overline">Public Chats:</Typography>
                {state.publicGroups.map((chat) => (
                  <div
                    className={clsx(classes.chat, {
                      [classes.selected]: state.selectedChat?.uuid === chat.uuid,
                    })}
                    onClick={() => setUserChat(chat)}
                  >
                    {chat.title} - {chat.users.length} - users
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            {state.selectedChat !== undefined ? (
              <div className={classes.mainChat}>
                <div className={classes.chatInfo}>
                  {state.selectedChat.private && (
                    <Typography variant="overline">Private</Typography>
                  )}
                  <div className={classes.usersInfo}>
                    {state.selectedChat.users.map((user) => (
                      <div className={classes.userInfo}>
                        <Avatar alt="Profile Picture" src={user.icon} />
                        {user.username}
                      </div>
                    ))}
                  </div>
                  <Typography variant="subtitle2">
                    {state.selectedChat.description}
                  </Typography>
                </div>
                <Divider />
              </div>
            ) : (
              <Typography variant="h2" className={classes.chatPlaceholder}>
                No Selected Chat
              </Typography>
            )}
          </div>
        </div>
      </div>
    </>
  );
};


export default Chats;

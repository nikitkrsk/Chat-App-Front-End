import React, {useContext} from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AddIcon from '@material-ui/icons/Add';
import { SocketContext } from "../../helpers/socket";
import { GetAllChats } from "../../store/chats/ChatActions";

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
  leftSide:{
      background: theme.palette.secondary.dark,
      overflow: "auto",
      maxHeight: "93vh",
  },
  createChat:{
    display: 'flex',
    padding: theme.spacing(1,2),
    // justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
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
  chatPlaceholder: {
    // border: "1px solid white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Chats = (_, context) => {
  const classes = useStyles();
  const state = useSelector((state) => ({
    privateGroups: state.userChats.privateGroups,
    publicGroupsWithUser: state.userChats.publicGroupsWithUser,
    publicGroups: state.userChats.publicGroups,
  }));
  const socket = useContext(SocketContext);
  const dispatch = useDispatch()
  const createGroup = (e) => {
      console.log('chat socket', socket)
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
  return (
    <>
      <div className={classes.root}>
        <div className={classes.content}>
          <div className={classes.leftSide}>
            <div className={classes.createChat} onClick={createGroup}><AddIcon color="primary"/><Typography variant="overline">Create Chat</Typography></div>
            <div className={classes.createChat} ><EmojiPeopleIcon color="primary"/><Typography variant="overline">Friends</Typography></div>
            {state.privateGroups.length > 0 && (
              <div className={classes.chats}>
                <Typography variant="overline">Private Chats:</Typography>
                {state.privateGroups.map((chat) => (
                  <div className={classes.chat}>
                    {chat.title} - {chat.users.length} - users
                  </div>
                ))}
              </div>
            )}
            {state.publicGroupsWithUser.length > 0 && (
              <div className={classes.chats}>
                <Typography variant="overline"> My Public Chats:</Typography>
                {state.publicGroupsWithUser.map((chat) => (
                  <div className={classes.chat}>
                    {chat.title} - {chat.users.length} - users
                  </div>
                ))}
              </div>
            )}
            {state.publicGroups.length > 0 && (
              <div className={classes.chats}>
                <Typography variant="overline">Public Chats:</Typography>
                {state.publicGroups.map((chat) => (
                  <div className={classes.chat}>
                    {chat.title} - {chat.users.length} users
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={classes.chatPlaceholder}>
            <Typography variant="h2">No Selected Chat</Typography>
          </div>
        </div>
      </div>
    </>
  );
};

Chats.contextTypes = {
  t: PropTypes.func.isRequired,
};
export default Chats;

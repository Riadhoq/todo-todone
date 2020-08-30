import React from "react";
import { useStore } from "../../store/StoreProvider";
import CreateTask from "../CreateTask/CreateTask";
import Task from "../Task/Task";
import "./MainApp.css";
import Button from '@material-ui/core/Button';
import MeetingRoomTwoToneIcon from '@material-ui/icons/MeetingRoomTwoTone';

export default function MainApp({ logout }) {
  const [{ user }] = useStore();

  return (
    <div className="main-app">
      <div className="user-container">
        <div className="user-details">
          <img className="user-details_image" src={user?.photoURL} alt="" />
          <h2 className="user-details_title">{user?.displayName}</h2>
        </div>
        <Button variant="outlined" color="secondary" className="logout_button" onClick={logout} startIcon={<MeetingRoomTwoToneIcon />}>Logout</Button>
      </div>
      <div className="task-container">
        <h1>Tasks</h1>
        <CreateTask />
        <Task />
      </div>
    </div>
  );
}

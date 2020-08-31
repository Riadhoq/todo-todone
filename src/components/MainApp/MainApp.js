import React, { useEffect, useState } from "react";
import { useStore } from "../../store/StoreProvider";
import CreateTask from "../CreateTask/CreateTask";
import Task from "../Task/Task";
import "./MainApp.css";
import Button from "@material-ui/core/Button";
import MeetingRoomTwoToneIcon from "@material-ui/icons/MeetingRoomTwoTone";
import db from "../../firebase";

export default function MainApp({ logout }) {
  const [{ user }] = useStore();
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.email)
        .collection("tasks")
        .onSnapshot((snapshot) => {
          setTasks(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              name: doc.data().name,
              create_date: doc.data().create_date,
              is_done: doc.data().is_done,
            }))
          );
        });
    }
  }, [user]);

  return (
    <div className="main-app">
      <div className="user-container">
        <div className="user-details">
          <img className="user-details_image" src={user?.photoURL} alt="" />
          <h2 className="user-details_title">{user?.displayName}</h2>
        </div>
        <Button
          variant="outlined"
          color="secondary"
          className="logout_button"
          onClick={logout}
          startIcon={<MeetingRoomTwoToneIcon />}
        >
          Logout
        </Button>
      </div>
      <div className="task-container">
        <h1>Tasks</h1>
        <CreateTask />
        {tasks &&
          tasks.map((task) => (
            <Task
              key={task.id}
              name={task.name}
              id={task.id}
              is_done={task.is_done}
              create_date={task.create_date}
            />
          ))}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import Add from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import db from "../../firebase";
import firebase from "firebase";
import { useStore } from "../../store/StoreProvider";
import "./CreateTask.css";

export default function CreateTask() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({ hasError: false, message: "" });
  const [task, setTasks] = useState("");
  const [{ user }] = useStore();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setTasks("");
    handleClose();
  };

  const handleAdd = () => {
    if (task) {
      db.collection("users").doc(user.email)
        .collection("tasks")
        .add({
          name: task,
          create_date: firebase.firestore.Timestamp.fromDate(new Date()),
          is_done: false,
        })
        .then(function () {
          setTasks("");
          handleClose();
        })
        .catch(function (error) {
          setError({ hasError: true, message: error.message });
        });
    } else {
      setError({ hasError: true, message: "Task name is not valid" });
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setError({ hasError: false, message: "" });
    setTasks(e.target.value);
  };

  return (
    <div className="create-task-container">
      <Button onClick={handleClickOpen} variant="contained">
        <Add /> Create a Task
      </Button>
      <Dialog
        open={open}
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create a Task To Do</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              autoFocus
              fullWidth
              id="task-name"
              label="Task Name"
              onChange={handleChange}
              value={task}
            />
            <p className="error-message">{error.hasError && error.message}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            onClick={handleAdd}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

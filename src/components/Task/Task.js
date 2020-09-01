import React from "react";
import { Checkbox, Button } from "@material-ui/core";
import db from "../../firebase";
import { useStore } from "../../store/StoreProvider";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import "./Task.css";
export default function Task({ id, name, create_date, is_done }) {
  const [{ user }] = useStore();
  function toggleTask(e) {
    var ref = db
      .collection("users")
      .doc(user.email)
      .collection("tasks")
      .doc(e.target.name);
    return ref
      .update({
        is_done: e.target.checked,
      })
      .then(function () {})
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error(error);
      });
  }
  function deleteTask(e) {
    db.collection("users")
      .doc(user.email)
      .collection("tasks")
      .doc(e.currentTarget.name)
      .delete()
      .then(function () {})
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error(error);
      });
  }
  return (
    <div className="task-details">
      <Checkbox name={id} checked={is_done} onChange={toggleTask} />
      <span className={`task-title ${is_done ? "scratched" : null}`}>
        {name}
      </span>
      <Button
        name={id}
        color="secondary"
        size="small"
        startIcon={<DeleteIcon />}
        onClick={deleteTask}
        variant="outlined"
      >
        {" "}
        Delete
      </Button>
    </div>
  );
}

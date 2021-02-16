import React, { useState } from "react";
import { Card, IconButton, TextField, Button } from "@material-ui/core";
import { Delete, Create, CancelScheduleSend } from "@material-ui/icons";
import styles from "../../../styles/Home.module.css";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const Task = ({ task, deleteFunc, updateFunc }) => {
  const [title, setTitle] = useState(task.name);
  const [content, setContent] = useState(new Date(task.content));
  const [showEditor, setShowEditor] = useState(false);
  function onSubmit(e) {
    e.preventDefault();
    updateFunc(e.target.title.value, e.target.date.value);
  }
  return (
    <>
      {showEditor ? (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Card className={styles.card}>
            <form onSubmit={onSubmit}>
              <KeyboardDatePicker
                variant="inline"
                required
                value={content}
                onChange={setContent}
                id="date-picker-inline"
                style={{ width: "100%" }}
                label="When"
                format="MM/dd/yyyy"
                name="date"
                minDate={new Date()}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <TextField
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ marginTop: "10px", width: "100%" }}
                label="Title"
                variant="outlined"
                name="title"
              />
              <IconButton onClick={() => setShowEditor(!showEditor)}>
                <CancelScheduleSend />
              </IconButton>
              <Button
                aria-label="Submit"
                style={{ float: "right", marginTop: "10px" }}
                variant="outlined"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Card>
        </MuiPickersUtilsProvider>
      ) : (
        <Card className={styles.card}>
          <IconButton onClick={deleteFunc} style={{ float: "right" }}>
            <Delete />
          </IconButton>
          <IconButton
            onClick={() => setShowEditor(!showEditor)}
            style={{ float: "right" }}
          >
            <Create />
          </IconButton>
          <h2>{task.name}</h2>
          <p>{task.content}</p>
        </Card>
      )}
    </>
  );
};

export default Task;

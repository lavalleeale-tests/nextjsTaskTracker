import { Card, TextField, Button } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { useState } from "react";
import styles from "../../../styles/Home.module.css";
import DateFnsUtils from "@date-io/date-fns";

export default function CreateNote() {
  const [value, setValue] = useState(new Date());
  async function onSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/taskTracker/addTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: e.target.name.value,
        content: e.target.content.value,
      }),
    });
    window.location.reload();
  }
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Card className={styles.card}>
        <form onSubmit={onSubmit}>
          <KeyboardDatePicker
            variant="inline"
            required
            value={value}
            onChange={setValue}
            id="date-picker-inline"
            style={{ width: "100%" }}
            label="When"
            format="MM/dd/yyyy"
            name="content"
            minDate={new Date()}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <TextField
            required
            style={{ marginTop: "10px", width: "100%" }}
            label="Content"
            variant="outlined"
            name="name"
          />
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
  );
}

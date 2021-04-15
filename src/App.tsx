import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addTask from "./actions/addTask";
import { taskState } from "./reducers/taskreducer";
import { DeleteRounded , AddRounded } from '@material-ui/icons';
import {
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
} from "@material-ui/core";
import removeTask from "./actions/removeTask";

const styles = {
  addbox: {
    margin: "1rem",
  },
  appbar: {
    margin: "0rem",
  },
  btn: {
    marginLeft: "1rem",
  },
  card: {
    margin: "1rem",
  }
};

const App: React.FC = () => {
  const [taskEntry, setTaskEntry] = useState("");
  const dispatch = useDispatch();
  const allTask = useSelector<taskState, taskState>((state) => state);
  const addTaskRoutine  = ():void =>{
    dispatch(addTask(taskEntry));
    setTaskEntry("");
  }
  const removeTaskRoutine = (key:number):void =>{
    dispatch(removeTask(key));
  }
  return (
    <>
    <CssBaseline/>
    <AppBar position="static" style={styles.appbar}>
    <Toolbar>
      <Typography variant="h6">
        Tasks App
      </Typography>
    </Toolbar>
  </AppBar>
    <main>
      <div style={styles.addbox}>
        <TextField
          id="standard-basic"
          label="Enter the Task"
          value={taskEntry}
          onChange={(e) => setTaskEntry(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          style= {styles.btn}
          onClick={() => addTaskRoutine()}
        >
          Add&nbsp;
          <AddRounded/>
        </Button>
      </div>
      <div>
        {allTask.map((task, key) => (
          <Card key={key} style={styles.card} elevation={3}>
            <CardContent>
              <Typography>{task.title}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={()=>removeTaskRoutine(task.id)}>
                Delete
                <DeleteRounded/>
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </main>
    </>
  );
};

export default App;

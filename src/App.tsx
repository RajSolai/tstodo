import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addTask from "./actions/addTask";
import { taskState } from "./reducers/taskreducer";
import { DeleteRounded, AddRounded, SearchRounded } from "@material-ui/icons";
import { motion } from "framer-motion";
import {
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  AppBar,
  Toolbar,
  InputBase,
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
    display: "flex",
  },
  searchInputBg: {
    marginLeft: "2rem",
    padding: "5px",
    border: "none",
    borderRadius: "10px",
    background: "rgba(40, 5, 144, 0.8)",
  },
  searchInput: {
    color: "#fafafa",
  },
  btn: {
    marginLeft: "1rem",
  },
  card: {
    margin: "1rem",
  },
};

const App: React.FC = () => {
  const [taskEntry, setTaskEntry] = useState("");
  const dispatch = useDispatch();
  const allTask = useSelector<taskState, taskState>((state) => state);
  const addTaskRoutine = (): void => {
    dispatch(addTask(taskEntry));
    setTaskEntry("");
  };
  const searchTask = (title: string) => {
    console.log(allTask.filter((tasks) => tasks.title.match(title)));
  };
  const removeTaskRoutine = (key: number): void => {
    dispatch(removeTask(key));
  };
  return (
    <>
      <CssBaseline />
      <AppBar position="static" style={styles.appbar}>
        <Toolbar>
          <Typography variant="h6">Tasks App</Typography>
          <div style={styles.searchInputBg}>
            <InputBase
              style={styles.searchInput}
              onChange={(e) => searchTask(e.target.value)}
            />
          </div>
	  <SearchRounded style={styles.btn}/>
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
            style={styles.btn}
            onClick={() => addTaskRoutine()}
          >
            Add&nbsp;
            <AddRounded />
          </Button>
        </div>
        <div>
          {allTask.map((task, key) => (
            <React.Fragment key={key}>
              <motion.div
                initial={{
                  y: -20,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 100,
                }}
              >
                <Card style={styles.card} elevation={3}>
                  <CardContent>
                    <Typography>{task.title}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => removeTaskRoutine(task.id)}
                    >
                      Delete
                      <DeleteRounded />
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </React.Fragment>
          ))}
        </div>
      </main>
    </>
  );
};

export default App;

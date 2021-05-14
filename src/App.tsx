import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addTask from "./actions/addTask";
import { taskState, taskType } from "./reducers/taskreducer";
import {
  DeleteRounded,
  Clear,
  AddRounded,
  SearchRounded,
} from "@material-ui/icons";
import { motion } from "framer-motion";
import {
  Button,
  TextField,
  Card,
  IconButton,
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
    color: "#fafafa",
  },
  card: {
    margin: "1rem",
  },
};

const App: React.FC = () => {
  const [taskEntry, setTaskEntry] = useState<string>("");
  const [isSearch, setSearch] = useState<boolean>(false);
  const [searchItems, setSearchItems] = useState<taskType[]>([]);
  const dispatch = useDispatch();
  const allTask = useSelector<taskState, taskState>((state) => state);
  const addTaskRoutine = (): void => {
    dispatch(addTask(taskEntry));
    setTaskEntry("");
  };
  const searchTask = (title: string) => {
    setSearchItems(allTask.filter((tasks) => tasks.title.match(title)));
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
              onChange={(e) => {
                searchTask(e.target.value);
                setSearch(true);
              }}
            />
          </div>
          <SearchRounded style={styles.btn} />
          <IconButton style={styles.btn} onClick={() => setSearch(false)}>
            <Clear />
          </IconButton>
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
          {isSearch
            ? searchItems.map((task, key) => (
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
                          onClick={() => {
                            removeTaskRoutine(task.id);
                            setSearch(false);
                          }}
                        >
                          Delete
                          <DeleteRounded />
                        </Button>
                      </CardActions>
                    </Card>
                  </motion.div>
                </React.Fragment>
              ))
            : allTask.map((task, key) => (
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

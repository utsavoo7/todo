/* eslint-disable react-hooks/exhaustive-deps */
import { DeleteOutline, ModeEditOutline } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { getAllData } from "../Common/getQuery";
import { deleteTodo, updateTodo } from "../APIs/Todo";
import TodoModal from "./TodoModal";
import ContentWrapper from "../Components/ContentWrapper";
import { AppContext } from "../App";

const Todo = () => {
  const user_id = localStorage.getItem("user_id");

  const { setLoading } = useContext(AppContext);

  const [todoList, setAllTodolist] = useState([]);

  const [editData, setEditData] = useState({});

  const [openTodoModal, setOpenTodoModal] = useState(false);

  function getAllTodos() {
    setLoading(true);
    getAllData("todo", user_id).then((data) => {
      setAllTodolist(data);
      setLoading(false);
    });
  }

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <ContentWrapper>
      <Grid
        container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 0 20px 1px #00000055",
          borderRadius: "6px",
        }}
        width={"50%"}
      >
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent={"space-between"}
          alignItems="center"
          p={2}
        >
          <Typography fontWeight={600} fontSize={20}>
            Todo List
          </Typography>
          <Button
            onClick={() => {
              setOpenTodoModal(true);
            }}
            variant="contained"
          >
            Add Todo
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sr No.</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="center">Completed</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todoList
                ?.filter((item) => user_id === item?.user_id)
                .map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1 || "-"}</TableCell>
                    <TableCell>{item.title || "-"}</TableCell>
                    <TableCell>{item.description || "-"}</TableCell>
                    <TableCell align="center">
                      {
                        <Checkbox
                          style={{
                            padding: 0,
                          }}
                          checked={item.completed}
                          onChange={() => {
                            updateTodo({
                              ...item,
                              completed: item.completed ? false : true,
                            }).then(() => {
                              getAllTodos();
                            });
                          }}
                        />
                      }
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          setEditData(item);
                          setOpenTodoModal(true);
                        }}
                      >
                        <ModeEditOutline
                          sx={{ fontSize: "16px" }}
                          color="primary"
                        />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          deleteTodo({ id: item.id }).then(() => {
                            getAllTodos();
                          });
                        }}
                      >
                        <DeleteOutline
                          sx={{ fontSize: "16px" }}
                          color="error"
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
      <Modal open={openTodoModal}>
        <Grid
          container
          height={"100vh"}
          width={"100%"}
          justifyContent="center"
          alignItems={"center"}
          display="flex"
        >
          <TodoModal
            setOpenTodoModal={setOpenTodoModal}
            getAllTodos={getAllTodos}
            editData={editData}
            setEditData={setEditData}
          />
        </Grid>
      </Modal>
    </ContentWrapper>
  );
};

export default Todo;

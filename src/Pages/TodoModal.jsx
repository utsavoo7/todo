import {
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { addTodo, updateTodo } from "../APIs/Todo";
import { AppContext } from "../App";

const TodoModal = ({
  setOpenTodoModal,
  getAllTodos,
  editData,
  setEditData,
}) => {
  const user_id = localStorage.getItem("user_id");

  const { setLoading, setShowAlert } = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      description: editData.id ? editData.description : "",
      title: editData.id ? editData.title : "",
      user_id: user_id,
    },
    onSubmit: (item) => {
      setLoading(true);
      if (editData.id) {
        updateTodo({
          completed: editData.completed,
          description: item.description,
          title: item.title,
          id: editData.id,
        }).then(() => {
          setOpenTodoModal(false);
          getAllTodos();
          setLoading(false);
          setShowAlert({
            show: true,
            message: "Data successfully updated",
            type: "info",
          });
        });
      } else {
        addTodo({
          completed: false,
          description: item.description,
          title: item.title,
          user_id: user_id,
        })
          .then(() => {
            setOpenTodoModal(false);
            getAllTodos();
            setLoading(false);
            setShowAlert({
              show: true,
              message: "Todo Added successfully",
              type: "success",
            });
          })
          .catch((error) => {
            setShowAlert({
              show: true,
              message: "Add new todo caused some problem please try again.",
              type: "error",
            });
          });
      }
    },
  });
  return (
    <Grid
      container
      width={"30%"}
      justifyContent="center"
      alignItems={"center"}
      display="flex"
      p={2}
      style={{
        background: "#fff",
      }}
      gap="20px"
    >
      <form
        onSubmit={formik.handleSubmit}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Grid item xs={12} display="flex" justifyContent={"space-between"}>
          <Typography fontWeight={700}>Add New Todo</Typography>
        </Grid>
        <Grid item xs={12} display="flex" gap={"10px"}>
          <FormControl fullWidth>
            <TextField
              name="title"
              label="Title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              name="description"
              label="Description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent={"center"} gap="10px">
          <Button type="submit" variant="contained">
            Add Todo
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setOpenTodoModal(false);
              setEditData({});
            }}
          >
            Close
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default TodoModal;

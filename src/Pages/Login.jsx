import {
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import image from "../assets/login.png";

const Login = () => {
  const navigate = useNavigate();

  const { setIsAuth, setLoading, setShowAlert } = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      await signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          navigate("/todo");
          setIsAuth(true);
          localStorage.setItem("accessToken", userCredential.user.accessToken);
          localStorage.setItem("user_id", userCredential.user.uid);
          localStorage.setItem("isAuth", true);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.response);
          setLoading(false);
          setShowAlert({
            show: true,
            message: "Something went wrong! Please try again.",
            type: "error",
          });
        });
    },
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          backgroundRepeat: "repeat",
          height: "calc(100vh - 7px)",
          zIndex: -1,
          width: "100vw",
        }}
      >
        <img alt="" src={image} height={"100%"} width={"100%"} />
      </span>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          padding: 50,
        }}
      >
        <Grid
          container
          spacing={3}
          style={{
            border: "1px solid rgb(201 201 201)",
            borderRadius: "6px",
            backdropFilter: "blur(50px)",
            boxShadow: "0 0 100px 0px #ffffff61",
          }}
          p={3}
        >
          <Grid item xs={12} style={{ paddingTop: 0, paddingLeft: 0 }}>
            <Typography fontWeight={600} fontSize={30}>
              Login
            </Typography>
          </Grid>
          <Grid container item xs={12} spacing={2} style={{ paddingLeft: 0 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  variant="outlined"
                  placeholder="Email"
                  color="secondary"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  variant="outlined"
                  placeholder="Password"
                  name="password"
                  color="secondary"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            alignItems={"center"}
            style={{ paddingLeft: 0 }}
          >
            <Button variant="contained" color="secondary" type="submit">
              Submit
            </Button>
            <Typography textAlign={"center"}>
              Don't have and account? No worries just
              <Button
                onClick={() => {
                  navigate("/sign-up");
                }}
                variant="text"
                color="secondary"
                type="submit"
              >
                Sign Up
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Login;

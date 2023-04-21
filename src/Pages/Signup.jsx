import {
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import image from "../assets/login.png";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

const Signup = () => {
  const navigate = useNavigate();

  const { setLoading, setShowAlert } = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      phone: "",
      first_name: "",
      last_name: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
        values.first_name,
        values.last_name,
        values.phone
      )
        .then((userCredential) => {
          navigate("/todo");
          localStorage.setItem("accessToken", userCredential.user.accessToken);
          addDoc(collection(db, "users"), {
            uid: userCredential.user.uid,
            email: values.email,
            password: values.password,
            first_name: values.first_name,
            last_name: values.last_name,
            phon: values.phone,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
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
          width: "100vw",
          zIndex: -1,
        }}
      >
        <img alt="" src={image} height={"100%"} width={"100%"} />
      </span>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          padding: 50,
        }}
      ></form>
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
              Get Started...
            </Typography>
          </Grid>
          <Grid container item xs={12} spacing={2} style={{ paddingLeft: 0 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  variant="outlined"
                  color="secondary"
                  placeholder="First Name"
                  name="first_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.first_name}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  variant="outlined"
                  color="secondary"
                  placeholder="Last Name"
                  name="last_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.last_name}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  variant="outlined"
                  color="secondary"
                  placeholder="Phone Number"
                  name="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  variant="outlined"
                  color="secondary"
                  placeholder="Email"
                  name="email"
                  type="email"
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
                  color="secondary"
                  placeholder="Password"
                  name="password"
                  type="password"
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
              Sign-Up
            </Button>
            <Typography color={"#000000"} textAlign={"center"}>
              Do have and account?
              <Button
                onClick={() => {
                  navigate("/");
                }}
                variant="text"
                color="secondary"
                type="submit"
              >
                Sign In
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Signup;

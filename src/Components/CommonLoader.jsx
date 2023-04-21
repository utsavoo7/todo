import { Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import Lottie from "react-lottie";
import loader from "../Lotties/mouse-loader.json";
import { AppContext } from "../App";

const CommonLoader = () => {
  const { loading } = useContext(AppContext);

  return (
    loading && (
      <Grid
        style={{
          position: "absolute",
          top: "0",
          backdropFilter: "blur(2px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        container
        height={"100vh"}
        width={"100vw"}
      >
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: loader,
          }}
          width={400}
          height={400}
        />
        <Typography fontWeight={900} fontSize={40} fontFamily={"Pacifico"}>
          Load your stuffs.....!
        </Typography>
      </Grid>
    )
  );
};

export default CommonLoader;

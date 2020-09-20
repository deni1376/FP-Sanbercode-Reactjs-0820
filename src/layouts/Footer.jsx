import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    // position: "absolute",
    bottom: 0,
    // width: "100%",
  },
}));

export default function Footer() {
  const style = useStyles();
  return (
    <footer className={style.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        SanberCode is The Best
      </Typography>

      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}Hilman Habibi {new Date().getFullYear()}
      </Typography>
    </footer>
  );
}

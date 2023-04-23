import React from "react";
import { useTheme } from "@material-ui/styles";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "./Wrapper";

const useStyles = makeStyles(() => ({
  avatar: {
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    margin: "0 10px",
  },
  text: {
    color: "white",
  },
}));

export default function UserAvatar({ color = "primary", ...props }) {
  var classes = useStyles();
  var theme = useTheme();

  const name = props.name || "";

  var letters = name
    .split(" ")
    .map((word) => word[0])
    .join("");

  return (
    <div
      className={classes.avatar}
      style={{ backgroundColor: theme.palette[color].main }}
    >
      <Typography variant='h6'  className={classes.text}>{letters}</Typography>
    </div>
  );
}

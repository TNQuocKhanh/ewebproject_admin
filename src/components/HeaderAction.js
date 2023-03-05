import { Typography } from "@material-ui/core";

export const HeaderAction = (props) => {
  const { title, actions } = props;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">{title}</Typography>
      {actions && actions}
    </div>
  );
};


import { Typography } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

export const HeaderAction = (props) => {
  const { title, actions } = props;

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {isSmall ? (
        <div>
          <Typography variant="h5">{title}</Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "10px 0",
            }}
          >
            {actions && actions}
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
};

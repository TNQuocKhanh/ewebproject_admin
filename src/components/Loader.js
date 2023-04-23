import { CircularProgress, Typography } from "@material-ui/core";

export const Loader = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <CircularProgress />
      <Typography>Đang tải ...</Typography>
      <Typography>Xin vui lòng đợi ...</Typography>
    </div>
  );
};

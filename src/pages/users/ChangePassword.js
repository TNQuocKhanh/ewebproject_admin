import { TextField, Typography, Card, Grid } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { changeUserPassword } from "../../apis/user.api";
import { ButtonCustom, ButtonSave } from "../../components/Button";
import { storage } from "../../utils";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export const ChangePassword = () => {
  const email = storage.load("auth").email;

  const [oldPassword, setOldPassword] = useState();
  const [changePassword, setChangePassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    changeUserPassword({ oldPassword, changePassword });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 10,
        }}
      >
        <Typography>Đổi mật khẩu</Typography>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <ButtonCustom
            style={{ backgroundColor: "#556afe", color: "#fff" }}
            icon={<ArrowBackIcon />}
            variant="contained"
            title="Quay lại"
          />
        </Link>
      </div>
      <Card style={{ padding: 10 }}>
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item md={8} xs={12}>
                  <TextField
                    disabled
                    fullWidth
                    type="text"
                    label="Email"
                    variant="outlined"
                    value={email}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item md={8} xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    required
                    label="Nhập mật khẩu cũ"
                    variant="outlined"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item md={8} xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    required
                    label="Nhập mật khẩu mới"
                    variant="outlined"
                    value={changePassword}
                    onChange={(e) => setChangePassword(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
              <div style={{ margin: "20px 0" }}>
                <ButtonSave />
              </div>
            </form>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

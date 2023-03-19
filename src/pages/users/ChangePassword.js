import {
  TextField,
  Typography,
  Card,
  Grid,
} from "@material-ui/core";
import {  useState } from "react";
import { Link } from "react-router-dom";
import {changeUserPassword} from "../../apis/user.api";
import { ButtonCustom } from "../../components/Button";
import {storage} from "../../utils";

export const ChangePassword = () => {

  const email = storage.load('auth').email

  const [oldPassword, setOldPassword] = useState()
  const [changePassword, setChangePassword] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault();
    changeUserPassword({oldPassword, changePassword})
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
        <Typography>Doi mat khau</Typography>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <ButtonCustom variant="contained" title="Quay lại" />
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
                    label="Old password"
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
                    label="New password"
                    variant="outlined"
                    value={changePassword}
                  onChange={(e) => setChangePassword(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
              <div style={{ margin: "20px 0" }}>
                <ButtonCustom
                  variant="contained"
                  type="submit"
                  title="Cập nhật"
                />
              </div>
            </form>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

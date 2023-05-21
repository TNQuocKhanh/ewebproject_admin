import {
  Select,
  TextField,
  InputLabel,
  FormControl,
  Card,
  Grid,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { createUser } from "../../apis/user.api";
import { ButtonList, ButtonSave } from "../../components/Button";
import { Loader } from "../../components/Loader";
import { Toastify } from "../../components/Toastify";

export const UserCreate = () => {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [roles, setRoles] = useState();
  const [loading, setLoading] = useState();

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, fullName, password, roles: [roles] };
    setLoading(true);
    try {
      await createUser(data);
      history.push("/users");
    } catch (err) {
      console.log("[Create user] Error", err);
      toast.error("Có lỗi xảy ra");
    }
    setLoading(false);
  };

  if (loading) return <Loader />;

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
        <Typography>Thêm mới</Typography>
        <ButtonList resource="users" />
      </div>
      <Card style={{ padding: 10 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField
                type="text"
                label="Tên người dùng"
                variant="outlined"
                value={fullName}
                required
                fullWidth
                onChange={(e) => setFullName(e.target.value)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                type="text"
                label="Email"
                required
                variant="outlined"
                value={email}
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="password"
                required
                label="Mật khẩu"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl required fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Vai trò
                </InputLabel>
                <Select
                  native
                  value={roles}
                  onChange={(e) => setRoles(e.target.value)}
                  label="Vai trò"
                >
                  <option aria-label="None" value="" />
                  <option value="ROLE_ADMIN">Admin</option>
                  <option value="ROLE_SALESPERSON">Sale person</option>
                  <option value="ROLE_EDITOR">Editor</option>
                  <option value="ROLE_ASSISTANT">Assistant</option>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <div style={{ margin: "20px 0" }}>
            <ButtonSave />
          </div>
        </form>
      </Card>
      <Toastify />
    </div>
  );
};

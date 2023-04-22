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
import {  useHistory } from "react-router-dom";
import { createUser } from "../../apis/user.api";
import { ButtonReturn, ButtonSave } from "../../components/Button";

export const UserCreate = () => {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [roles, setRoles] = useState();

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, fullName, password, roles: [roles] };

    try {
      const res = await createUser(data);
      if (res) {
        history.push("/users");
      }
    } catch (err) {
      console.log("====err", err);
    }
  };

  return (
    <div>
      <button>ACBD</button>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 10,
        }}
      >
        <Typography>Thêm mới</Typography>
        <ButtonReturn resource="users" />
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
                  Roles
                </InputLabel>
                <Select
                  native
                  value={roles}
                  onChange={(e) => setRoles(e.target.value)}
                  label="Roles"
                >
                  <option aria-label="None" value="" />
                  <option value="ROLE_ADMIN">ADMIN</option>
                  <option value="ROLE_SALESPERSON">sale person</option>
                  <option value="ROLE_EDITOR">editor</option>
                  <option value="ROLE_ASSISTANT">assistant</option>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <div style={{ margin: "20px 0" }}>
            <ButtonSave />
          </div>
        </form>
      </Card>
    </div>
  );
};

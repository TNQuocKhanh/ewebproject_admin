import {
  Select,
  TextField,
  InputLabel,
  FormControl,
  Card,
  Grid,
  Input,
  InputAdornment,
  Box,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createUser } from "../../apis/user.api";
import { ButtonCustom } from "../../components/Button";

export const UserCreate = () => {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [roles, setRoles] = useState();

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, fullName, password, roles: [roles] };

    const res = await createUser(data);
    console.log("==res", res);
    if (res) {
      history.push("/users");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', margin: 10 }}>
        <Typography>Thêm mới</Typography>
        <Link to={"/users"} style={{ textDecoration: "none" }}>
          <ButtonCustom variant="contained" title="Quay lại" />
        </Link>
      </div>
      <Card style={{ padding: 10 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField
                type="text"
                label="Full Name"
                variant="outlined"
                value={fullName}
                fullWidth
                onChange={(e) => setFullName(e.target.value)}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                type="text"
                label="Email"
                variant="outlined"
                value={email}
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                type="text"
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Roles
                </InputLabel>
                <Select
                  //style={{ width: "200px", margin: "5px" }}
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
            <ButtonCustom
            variant='contained'
              type="submit"
              title="Lưu"
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

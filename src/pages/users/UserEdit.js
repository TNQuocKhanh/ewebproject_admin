import {
  Select,
  TextField,
  InputLabel,
  FormControl,
  Typography,
  Card,
  Grid,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { getUserById, updateRole, updateUser } from "../../apis";
import { ButtonCustom } from "../../components/Button";

export const UserEdit = () => {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [roles, setRoles] = useState();

  const params = useParams();
  const id = params.id;

  const history = useHistory();

  const getUserDetail = async () => {
    const res = await getUserById(Number(id));
    setFullName(res.fullName);
    setEmail(res.email);
    setRoles(res.roles[0]?.name || "");
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = updateUser(Number(id), { fullName, email });
 
    //updateRole(id, {roles: [roles]})
    history.push("/users");
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
        <Typography>Cập nhật</Typography>
        <Link to={"/users"} style={{ textDecoration: "none" }}>
          <ButtonCustom variant="contained" title="Quay lại" />
        </Link>
      </div>
      <Card style={{ padding: 10 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="text"
                required
                label="Full Name"
                variant="outlined"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                fullWidth
                type="text"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl required fullWidth variant="outlined">
                <InputLabel shrink htmlFor="outlined-age-native-simple">
                  Roles
                </InputLabel>
                <Select
                  notched
                  native
                  value={roles}
                  onChange={(e) => setRoles(e.target.value)}
                  label="Roles"
                  InputLabelProps={{ shrink: true }}
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
            <ButtonCustom variant="contained" type="submit" title="Lưu" />
          </div>
        </form>
      </Card>
    </div>
  );
};

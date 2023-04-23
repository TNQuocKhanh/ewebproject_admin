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
import { useHistory, useParams } from "react-router-dom";
import { getUserById, updateRole, updateUser } from "../../apis";
import { ButtonReturn, ButtonSave } from "../../components/Button";
import { Toastify } from "../../components/Toastify";
import { toast } from "react-toastify";

export const UserEdit = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState("");

  const params = useParams();
  const id = params.id;

  const history = useHistory();

  const getUserDetail = async () => {
    try {
      const res = await getUserById(Number(id));
      setFullName(res.fullName);
      setEmail(res.email);
      setRoles(res.roles[0]?.name || "");
    } catch (err) {
      console.log("[Get user detail] Error", err);
    }
  };

  useEffect(() => {
    getUserDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser(Number(id), { fullName, email });
      await updateRole(id, { roles: [roles] });
      if (res.id) {
        toast.success("Cập nhật thành công");
      }
    } catch (e) {
      console.log("[Update user] Error", e);
    }

    setTimeout(() => history.push("/users"), 2000);
    //history.push("/users")
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
        <ButtonReturn resource="users" />
      </div>
      <Card style={{ padding: 10 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="text"
                required
                label="Tên người dùng"
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
                  <option value="ROLE_ADMIN">ADMIN</option>
                  <option value="ROLE_SALESPERSON">Sales person</option>
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
        <Toastify />
      </Card>
    </div>
  );
};

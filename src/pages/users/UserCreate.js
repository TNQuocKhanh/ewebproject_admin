import {
  Select,
  TextField,
  InputLabel,
  FormControl,
  Card,
  Grid,
} from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { createUser } from "../../apis/user.api";

export const UserCreate = () => {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [roles, setRoles] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, fullName, password, roles: [roles] };

    const res = await createUser(data);
    console.log("==res", res);
  };

  return (
    <Card>
      <Grid container>
        <form onSubmit={handleSubmit}>
          <Grid item>
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="text"
            label="Full Name"
            variant="outlined"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          </Grid>
          <Grid item>
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="text"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </Grid>
          <Grid item>
            <TextField
            fullWidth
            style={{ width: "200px", margin: "5px" }}
            type="text"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </Grid>
          <Grid item>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-age-native-simple">Roles</InputLabel>
            <Select
              style={{ width: "200px", margin: "5px" }}
              native
              value={roles}
              onChange={(e) => setRoles(e.target.value)}
              label="Age"
              inputProps={{
                name: "age",
                id: "outlined-age-native-simple",
              }}
            >
              <option aria-label="None" value="" />
              <option value="ROLE_ADMIN">ADMIN</option>
              <option value="ROLE_SALESPERSON">sale person</option>
              <option value="ROLE_EDITOR">editor</option>
              <option value="ROLE_ASSISTANT">assistant</option>
            </Select>
          </FormControl>
        </Grid>
        <div>
          <Link to={"/users"}>
            <button>Back</button>
          </Link>
          <button type="submit">Save</button>
        </div>
        </form>
      </Grid>
    </Card>
  );
};

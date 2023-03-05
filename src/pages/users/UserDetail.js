import { getUserById } from "../../apis";
import { useState, useEffect } from "react";
import {useParams} from "react-router";
import { Select, TextField, InputLabel, FormControl } from "@material-ui/core";
import { Link } from "react-router-dom";

export const UserDetail = () => {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [roles, setRoles] = useState();

  const params = useParams()
  const id = params.id

  const getUserDetail = async () => {
    const res = await getUserById(Number(id));
    setFullName(res.fullName);
    setEmail(res.email);
    setRoles(res.roles[0].name);
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  return (
    <form>
      <TextField
        style={{ width: "200px", margin: "5px" }}
        type="text"
        label="Full Name"
        variant="outlined"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <TextField
        style={{ width: "200px", margin: "5px" }}
        type="text"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
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
      <Link to={"/users"}>
        <button>Back</button>
      </Link>
    </form>
  );
};

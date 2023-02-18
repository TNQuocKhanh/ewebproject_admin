import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";

import Table from "../../components/Table";

import { getListUsers } from "../../apis/user.api";
import { useHistory } from "react-router-dom";

export default function Tables() {
  const history = useHistory();
  const [data, setData] = useState([]);

  const getAllUsers = async () => {
    const res = await getListUsers();

    setData(res);
  };

  const isLogin = localStorage.getItem("auth");

  useEffect(() => {
    if (isLogin) {
      getAllUsers();
    } else {
      history("/login");
    }
  }, [isLogin, history]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Table data={data} title="User List" />
        </Grid>
      </Grid>
    </>
  );
}

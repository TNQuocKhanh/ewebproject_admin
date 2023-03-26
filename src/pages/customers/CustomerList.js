import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import List from "../../components/List";
import { useHistory } from "react-router-dom";
import { storage } from "../../utils";
import { getListCustomers } from "../../apis";

const columns = [
  { id: "fullName", label: "Tên", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  {
    id: "status",
    label: "Trạng thái",
    minWidth: 170,
    customField: true,
    align: "center",
  },
];

export const CustomerList = () => {
  const history = useHistory();
  const [data, setData] = useState([]);

  const getAllCustomers = async () => {
    const res = await getListCustomers();

    setData(res);
  };

  const isLogin = storage.load("auth");

  useEffect(() => {
    if (isLogin) {
      getAllCustomers();
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <List
            isCreate={false}
            resource="customers"
            columns={columns}
            data={data}
            title="Danh sách khách hàng"
          />
        </Grid>
      </Grid>
    </>
  );
};

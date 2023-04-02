import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import List from "../../components/List";
import { useHistory } from "react-router-dom";
import { storage } from "../../utils";
import { getListSupplier } from "../../apis";

const columns = [
  { id: "name", label: "Tên nhà cung cấp", minWidth: 170 },
  { id: "phoneNumber", label: "Số điện thoại", minWidth: 170 },
  { id: "address", label: "Địa chỉ", minWidth: 170 },
];

export const SupplierList = () => {
  const history = useHistory();
  const [data, setData] = useState([]);

  const getAllSuppliers = async () => {
    try {
      const res = await getListSupplier();

      const transform = res.map((item) => ({
        ...item,
        enabled: item.enabled ? "true" : "false",
      }));

      setData(transform);
    } catch (e) {
      setData([]);
    }
  };

  const isLogin = storage.load("auth");

  useEffect(() => {
    if (isLogin) {
      getAllSuppliers();
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
            resource="suppliers"
            columns={columns}
            data={data}
            title="Danh sách nhà cung cấp"
          />
        </Grid>
      </Grid>
    </>
  );
};

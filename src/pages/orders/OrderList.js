import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import List from "../../components/List";
import { useHistory } from "react-router-dom";
import { storage } from "../../utils";
import { getListOrders } from "../../apis";

const columns = [
  { id: "email", label: "Email", minWidth: 170 },
  { id: "paymentMethod", label: "Phuong thuc", minWidth: 170 },
  { id: "orderTime", label: "Ngay tao", minWidth: 170 },
  { id: "total", label: "Total", minWidth: 170 },
  {
    id: "status",
    label: "Trạng thái",
    minWidth: 170,
    customField: true,
    align: "center",
  },
];

export const OrderList = () => {
  const history = useHistory();
  const [data, setData] = useState([]);

  const getAllOrders = async () => {
    try {
      const res = await getListOrders();

      const transform = res.map((item) => ({
        ...item,
        email: item.customer.email,
      }));

      setData(transform);
    } catch (e) {
      setData([]);
    }
  };

  const isLogin = storage.load("auth");

  useEffect(() => {
    if (isLogin) {
      getAllOrders();
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
            resource="orders"
            columns={columns}
            data={data}
            title="Danh sách don hang"
          />
        </Grid>
      </Grid>
    </>
  );
};

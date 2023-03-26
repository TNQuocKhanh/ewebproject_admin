import { getOrderById } from "../../apis";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Typography, Card, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ButtonCustom } from "../../components/Button";
import _ from "lodash";
import {getStatus} from "../../utils";

const headers = [
  { id: "name", label: "Tên danh mục" },
  { id: "email", label: "Trạng thái" },
  { id: "paymentMethod", label: "Phuong thuc" },
  { id: "orderTime", label: "Ngay dat" },
  { id: "status", label: "Trạng thái" },
];

export const OrderDetail = () => {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState();

  const getOrderDetail = async () => {
    const res = await getOrderById(Number(id));

    if (res) {
      const transform = {
        ...res,
        name: res.customer.fullName,
        email: res.customer.email,
        status: getStatus(res.status).text
      };
      setData(transform);
    }
  };

  useEffect(() => {
    getOrderDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Typography>Chi tiết</Typography>
        <Link to={"/orders"} style={{ textDecoration: "none" }}>
          <ButtonCustom variant="contained" title="Quay lại" />
        </Link>
      </div>
      <Card style={{ padding: 10 }}>
        <Grid container spacing={2}>
          {headers.map((item, idx) => {
            const val = item?.id;
            return (
              <Grid key={idx} item md={6} xs={12}>{`${item.label}: ${_.get(
                data,
                val,
                ""
              )}`}</Grid>
            );
          })}
        </Grid>
      </Card>
    </div>
  );
};

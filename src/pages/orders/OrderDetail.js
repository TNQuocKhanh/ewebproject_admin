import { getOrderById } from "../../apis";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Typography, Card, Grid } from "@material-ui/core";
import { ButtonReturn } from "../../components/Button";
import _ from "lodash";
import { formatDateTime, formatPrice, getStatus } from "../../utils";

const headers = [
  { id: "name", label: "Người đặt hàng" },
  { id: "paymentMethod", label: "Phương thức thanh toán" },
  { id: "orderTime", label: "Ngày đặt hàng" },
  { id: "total", label: "Tổng tiền" },
  { id: "status", label: "Trạng thái" },
];

export const OrderDetail = () => {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState();

  const getOrderDetail = async () => {
    try {
      const res = await getOrderById(Number(id));

      if (res) {
        const transform = {
          ...res,
          name: res.receiver,
          orderTime: formatDateTime(res.orderTime),
          status: getStatus(res.status).text,
          total: formatPrice(res.total)
        };
        setData(transform);
      }
    } catch (e) {
      console.log("====Err", e);
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
        <ButtonReturn resource="orders" />
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

import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import List from "../../components/List";
import { formatDateTime, formatPrice } from "../../utils";
import { getListOrders } from "../../apis";
import { Loader } from "../../components";

const columns = [
  { id: "receiver", label: "Tên người nhận hàng", minWidth: 170 },
  { id: "paymentMethod", label: "Phương thức thanh toán", minWidth: 170 },
  { id: "orderTime", label: "Ngày đặt hàng", minWidth: 170 },
  { id: "total", label: "Tổng tiền", minWidth: 170 },
  {
    id: "status",
    label: "Trạng thái",
    minWidth: 170,
    customField: true,
    align: "center",
  },
];

export const OrderList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllOrders = async () => {
    setLoading(true);
    try {
      const res = await getListOrders();
      const transform = res.map((item) => ({
        ...item,
        orderTime: formatDateTime(item.orderTime),
        total: formatPrice(item.total),
      }));
      setData(transform);
    } catch (e) {
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const transformCsv = [];
  data?.map((it) =>
    transformCsv.push({
      receiver: it.receiver,
      orderTime: it.orderTime,
      paymentMethod: it.paymentMethod,
      phoneNumber: it.phoneNumber,
      total: it.total,
      status: it.status,
    })
  );

  if (loading) return <Loader />;

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <List
            isCreate={false}
            resource="orders"
            columns={columns}
            data={data}
            title="Danh sách đơn hàng"
            dataCsv={transformCsv}
          />
        </Grid>
      </Grid>
    </>
  );
};

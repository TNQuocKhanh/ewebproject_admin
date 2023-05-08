import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import List from "../../../components/List";
import { getProductReportByTime } from "../../../apis";
import { Loader } from "../../../components";
import { formatPrice } from "../../../utils";

const columns = [
  { id: "productName", label: "Tên sản phẩm", minWidth: 170 },
  { id: "totalCost", label: "Giá nhập", minWidth: 170 },
  { id: "totalPrice", label: "Giá bán", minWidth: 170 },
  { id: "profit", label: "Lợi nhuận", minWidth: 170 },
];

export const ProductReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProductReporpt = async () => {
    setLoading(true);
    try {
      const res = await getProductReportByTime();
      const transform = res.map((it) => ({
        ...it,
        totalCost: formatPrice(it.totalCost),
        totalPrice: formatPrice(it.totalPrice),
        profit: formatPrice(it.profit),
      }));
      setData(transform);
    } catch (err) {
      console.log("[Get product report] Error", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProductReporpt();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <List
            resource="products"
            columns={columns}
            data={data}
            title="Doanh thu theo sản phẩm"
            isCreate={false}
            isExport={false}
            columnAction={false}
          />
        </Grid>
      </Grid>
    </>
  );
};

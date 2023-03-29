import { getProductById } from "../../apis";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Typography, Card, Grid } from "@material-ui/core";
import { ButtonReturn } from "../../components/Button";
import _ from "lodash";

const headers = [
  { id: "name", label: "Tên sản phẩm" },
  { id: "cost", label: "Giá nhập" },
  { id: "price", label: "Giá bán" },
  { id: "discountPercent", label: "Discount" },
  { id: "category", label: "Danh mục" },
];

export const ProductDetail = () => {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState();

  const getProductDetail = async () => {
    try {
      const res = await getProductById(Number(id));

      if (res) {
        const transform = {
          ...res,
          category: res.category.name,
        };
        setData(transform);
      }
    } catch (e) {
      console.log("==Err", e);
    }
  };

  useEffect(() => {
    getProductDetail();
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
        <ButtonReturn resource="products" />
      </div>
      <Card style={{ padding: 10 }}>
        <Grid container spacing={2}>
          {headers.map((item, idx) => {
            const val = item?.id;
            return (
              <Grid key={idx} item md={6}>{`${item.label}: ${_.get(
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

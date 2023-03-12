import { getProductById } from "../../apis";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Typography, Card, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ButtonCustom } from "../../components/Button";
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
    const res = await getProductById(Number(id));

    if (res) {
      const transform = {
        ...res,
        category: res.category.name,
      };
      setData(transform);
    }
  };

  useEffect(() => {
    getProductDetail();
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
        <Link to={"/products"} style={{ textDecoration: "none" }}>
          <ButtonCustom variant="contained" title="Quay lại" />
        </Link>
      </div>
      <Card style={{ padding: 10 }}>
        <Grid container spacing={2}>
          {headers.map((item) => {
            const val = item?.id;
            return (
              <Grid item md={6}>{`${item.label}: ${_.get(
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

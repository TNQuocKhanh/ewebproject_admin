import { getProductById } from "../../apis";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Typography, Card, Grid } from "@material-ui/core";
import { ButtonReturn } from "../../components/Button";
import _ from "lodash";
import { formatPrice } from "../../utils";
import { Loader } from "../../components/Loader";

const headers = [
  { id: "name", label: "Tên sản phẩm" },
  { id: "cost", label: "Giá nhập" },
  { id: "price", label: "Giá bán" },
  { id: "discountPercent", label: "Discount" },
  { id: "category", label: "Danh mục" },
  { id: "supplier", label: "Nhà cung cấp" },
  { id: "sold", label: "Đã bán" },
  { id: "inStock", label: "Còn hàng" },
  { id: "description", label: "Mô tả" },
];

export const ProductDetail = () => {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState();
  const [spec, setSpec] = useState();
  const [loading, setLoading] = useState(false);

  const getProductDetail = async () => {
    setLoading(true);
    try {
      const res = await getProductById(Number(id));

      if (res) {
        const transform = {
          ...res,
          category: res.category.name,
          supplier: res.supplier.name,
          cost: formatPrice(res.cost),
          price: formatPrice(res.price),
        };
        setSpec(res.specifications);
        setData(transform);
      }
    } catch (e) {
      console.log("[Get product detail] Error", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProductDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loader />;

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
          <Grid item md={6}>
            Thông số sản phẩm:
            {spec?.split("\n").map((it, idx) => (
              <div key={idx}>{it}</div>
            ))}
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

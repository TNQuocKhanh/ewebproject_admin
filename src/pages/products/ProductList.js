import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import List from "../../components/List";
import { useHistory } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { ButtonCustom } from "../../components/Button";
import { storage } from "../../utils";
import { getListProducts } from "../../apis";

const columns = [
  { id: "name", label: "Tên sản phẩm", minWidth: 170 },
  { id: "category", label: "Danh mục", minWidth: 100 },
  { id: "cost", label: "Giá nhập", minWidth: 100 },
  { id: "price", label: "Giá bán", minWidth: 100 },
  { id: "discountPercent", label: "Discount", minWidth: 100 },
];

export const ProductList = () => {
  const history = useHistory();
  const [data, setData] = useState([]);

  const getAllProducts = async () => {
    const res = await getListProducts();

    const transform = res.map(item => ({
      ...item, category: item.category?.name})
    )

    setData(transform);
  };

  const isLogin = storage.load("auth");

  useEffect(() => {
    if (isLogin) {
      getAllProducts();
    } else {
      history.push("/login");
    }
  }, []);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <List
            resource="products"
            columns={columns}
            data={data}
            title="Danh sách sản phẩm"
          />
        </Grid>
      </Grid>
    </>
  );
};

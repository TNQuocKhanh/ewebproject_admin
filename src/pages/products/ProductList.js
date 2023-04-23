import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import List from "../../components/List";
import { useHistory } from "react-router-dom";
import { storage, formatPrice } from "../../utils";
import { getListProducts } from "../../apis";
import { Loader } from "../../components";

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
  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const res = await getListProducts();

      const transform = await res.map((item) => ({
        ...item,
        category: item.category?.name,
        price: formatPrice(item.price),
        cost: formatPrice(item.cost)
      }));

      setData(transform);
    } catch (e) {
      setData([]);
    }
    setLoading(false);
  };

  const isLogin = storage.load("auth");

  useEffect(() => {
    if (isLogin) {
      getAllProducts();
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const transformCsv = [];
  data?.map((it) =>
    transformCsv.push({
      name: it.name,
      category: it.category?.name,
      cost: it.cost,
      price: it.price,
      discountPercent: it.discountPercent,
    })
  );

  if (loading) return <Loader />;

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <List
            resource="products"
            columns={columns}
            data={data}
            title="Danh sách sản phẩm"
            dataCsv={transformCsv}
          />
        </Grid>
      </Grid>
    </>
  );
};

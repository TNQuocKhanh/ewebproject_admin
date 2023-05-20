import { useEffect, useState } from "react";
import { getUnsold } from "../../../apis";
import { Grid } from "@material-ui/core";
import List from "../../../components/List";
import { Loader } from "../../../components";
import { formatPrice } from "../../../utils";

const columns = [
  { id: "productName", label: "Tên sản phẩm", minWidth: 170 },
  { id: "categoryName", label: "Danh mục", minWidth: 170 },
  { id: "productPrice", label: "Giá", minWidth: 170 },
  { id: "totalSold", label: "Đã bán", minWidth: 170 },
];

export const UnsoldProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFeatureProduct = async () => {
    setLoading(true);
    try {
      const res = await getUnsold();
      const transform = res.map((item) => ({
        ...item,
        productPrice: formatPrice(item.productPrice),
      }));
      setData(transform);
    } catch (err) {
      console.log("[Get feature product] Error", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getFeatureProduct();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <List
            resource="categories"
            columns={columns}
            data={data}
            title="Danh sách sản phẩm tồn kho"
            columnAction={false}
            isCreate={false}
            isExport={false}
          />
        </Grid>
      </Grid>
    </>
  );
};

import React, { useEffect, useState } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@material-ui/core";
import List from "../../components/List";
import { useHistory } from "react-router-dom";
import { formatPrice } from "../../utils";
import { getListProducts, getListCategories } from "../../apis";
import { Loader } from "../../components";
import { ButtonCustom } from "../../components";
import SearchIcon from "@material-ui/icons/Search";

const columns = [
  { id: "name", label: "Tên sản phẩm", minWidth: 170 },
  { id: "category", label: "Danh mục", minWidth: 100 },
  { id: "cost", label: "Giá nhập", minWidth: 100 },
  { id: "price", label: "Giá bán", minWidth: 100 },
  { id: "discountPercent", label: "Discount", minWidth: 100 },
];

const FilterForm = (props) => {
  const { setFilterValues } = props;
  const history = useHistory();

  const [productName, setProductName] = useState(
    new URLSearchParams(window.location.search).get("productName") || ""
  );
  const [categoryId, setCategoryId] = useState(
    new URLSearchParams(window.location.search).get("categoryId") || ""
  );

  const [categoryArr, setCategoryArr] = useState([]);

  const getAllCategories = async () => {
    try {
      const res = await getListCategories();
      setCategoryArr(res);
    } catch (e) {
      setCategoryArr([]);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = {
      productName,
      categoryId,
    };
    setFilterValues(value);
    const url = `${window.location.pathname}?` + new URLSearchParams(value);
    history.push(url);
  };

  return (
    <div style={{ padding: "10px" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <TextField
              fullWidth
              label="Tên sản phẩm"
              variant="outlined"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel shrink htmlFor="outlined-age-native-simple">
                Danh mục
              </InputLabel>
              <Select
                notched
                native
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                label="Danh mục"
                InputLabelProps={{ shrink: true }}
              >
                <option aria-label="None" value="" />
                {categoryArr.map((it) => (
                  <option key={it.id} value={it.id}>
                    {it.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <div
          style={{
            margin: "20px 0",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <ButtonCustom
            title="Tìm kiếm"
            variant="contained"
            handleClick={handleSubmit}
            icon={<SearchIcon />}
            style={{ backgroundColor: "#556afe", color: "#fff" }}
          />
        </div>
      </form>
    </div>
  );
};

export const ProductList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterValues, setFilterValues] = useState();

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const res = await getListProducts(filterValues);

      const transform = await res.content.map((item) => ({
        ...item,
        category: item.category?.name,
        price: formatPrice(item.price),
        cost: formatPrice(item.cost),
      }));

      setData(transform);
    } catch (e) {
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValues]);

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
            filter={<FilterForm setFilterValues={setFilterValues} />}
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

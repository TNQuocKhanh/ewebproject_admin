import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import List from "../../components/List";
import { useHistory } from "react-router-dom";
import { formatPrice } from "../../utils";
import { getListProducts } from "../../apis";
import { Loader } from "../../components";
import { Form, Field } from "react-final-form";
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

  const handleSubmit = (value) => {
    setFilterValues(value);
    const url = `${window.location.pathname}?` + new URLSearchParams(value);
    history.push(url);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={{
        productName: new URLSearchParams(window.location.search).get("productName"),
      }}
      setFilterValue={setFilterValues}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <label>Tên sản phẩm: </label>
              <Field
                style={{ width: "200px", margin: "5px", height: "30px" }}
                name="productName"
                component="input"
                type="text"
                placeholder="Tên sản phẩm"
              />
            </Grid>
          </Grid>
          <div
            className="buttons"
            style={{ margin: "20px 5px", textAlign: "center" }}
          >
            <ButtonCustom
              disabled={submitting || pristine}
              title="Tìm kiếm"
              variant="contained"
              handleClick={handleSubmit}
              icon={<SearchIcon />}
              style={
                pristine ? {} : { backgroundColor: "#556afe", color: "#fff" }
              }
            />
          </div>
        </form>
      )}
    />
  );
};

export const ProductList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterValues, setFilterValues] = useState({
    productName: new URLSearchParams(window.location.search).get("productName") || "",
  });

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

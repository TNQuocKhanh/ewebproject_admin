import {
  Select,
  TextField,
  InputLabel,
  FormControl,
  Card,
  Grid,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createProduct, getListCategories, getListSupplier } from "../../apis";
import { ButtonCustom } from "../../components/Button";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import SaveIcon from "@material-ui/icons/Save";

export const ProductCreate = () => {
  const [name, setName] = useState();
  const [cost, setCost] = useState();
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  const [categoryId, setCategoryId] = useState();
  const [supplierId, setSupplierId] = useState();

  const [categoryArr, setCategoryArr] = useState([]);
  const [supplierArr, setSupplierArr] = useState([]);

  const history = useHistory();

  const getAllCategories = async () => {
    const res = await getListCategories();
    if (res) {
      setCategoryArr(res);
    }
  };

  const getAllSupllier = async () => {
    const res = await getListSupplier();
    if (res) {
      setSupplierArr(res);
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllSupllier();
  }, []);

  console.log("===", categoryArr, supplierArr);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, cost, price, discount, categoryId, supplierId };
    const res = await createProduct(data);
    if (res) {
      history.push("/products");
    }
  };

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
        <Typography>Thêm mới</Typography>
        <Link to={"/products"} style={{ textDecoration: "none" }}>
          <ButtonCustom
            variant="contained"
            style={{ backgroundColor: "#556afe", color: "#fff" }}
            title="Quay lại"
            icon={<KeyboardBackspaceIcon fontSize="small" />}
          />
        </Link>
      </div>
      <Card style={{ padding: 10 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField
                type="text"
                label="Tên sản phẩm"
                variant="outlined"
                value={name}
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Danh mục
                </InputLabel>
                <Select
                  native
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  label="Danh mục"
                >
                  <option aria-label="None" value="" />
                  <option value="1">Laptop</option>
                  <option value="2">Phone</option>
                  <option value="3">Phone2</option>
                  <option value="4">Phone4</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="text"
                label="Giá nhập"
                variant="outlined"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Nha cung cap
                </InputLabel>
                <Select
                  native
                  value={supplierId}
                  onChange={(e) => setSupplierId(e.target.value)}
                  label="Danh mục"
                >
                  <option aria-label="None" value="" />
                  <option value="1">Laptop</option>
                  <option value="2">Phone</option>
                  <option value="3">Phone2</option>
                  <option value="4">Phone4</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="text"
                label="Giá bán"
                variant="outlined"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                label="Discount"
                variant="outlined"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Grid>
          </Grid>
          <div style={{ margin: "20px 0" }}>
            <ButtonCustom
              icon={<SaveIcon />}
              style={{ backgroundColor: "#556afe", color: "#fff" }}
              variant="contained"
              type="submit"
              title="Lưu"
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

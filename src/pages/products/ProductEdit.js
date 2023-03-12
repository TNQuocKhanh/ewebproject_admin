import {
  Select,
  TextField,
  InputLabel,
  FormControl,
  Typography,
  Card,
  Grid,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { getProductById, updateProduct, updateUser } from "../../apis";
import { ButtonCustom } from "../../components/Button";

export const ProductEdit = () => {
  const [name, setName] = useState();
  const [cost, setCost] = useState();
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  const [categoryId, setCategoryId] = useState();

  const params = useParams();
  const id = params.id;

  const history = useHistory();

  const getUserDetail = async () => {
    const res = await getProductById(Number(id));
    setName(res.name)
    setCost(res.cost)
    setPrice(res.price)
    setDiscount(res.discountPercent)
    setCategoryId(res.category?.id)
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = updateProduct(Number(id), { name, cost, price, discount, categoryId });

    history.push("/products");
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
        <Typography>Cập nhật</Typography>
        <Link to={"/products"} style={{ textDecoration: "none" }}>
          <ButtonCustom variant="contained" title="Quay lại" />
        </Link>
      </div>
      <Card style={{ padding: 10 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="text"
                label="Tên sản phẩm"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
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
                  <option value="1">Laptop</option>
                  <option value="2">Phone2</option>
                  <option value="3">Phone3</option>
                  <option value="4">Phone4</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
              disabled
                fullWidth
                type="text"
                label="Giá nhập"
                variant="outlined"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="text"
                label="Giá bán"
                variant="outlined"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="text"
                label="Discount"
                variant="outlined"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <div style={{ margin: "20px 0" }}>
            <ButtonCustom
            variant='contained'
              type="submit"
              title="Lưu"
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

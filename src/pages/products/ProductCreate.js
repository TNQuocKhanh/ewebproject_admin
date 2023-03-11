import {
  Select,
  TextField,
  InputLabel,
  FormControl,
  Card,
  Grid,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createUser } from "../../apis/user.api";
import { ButtonCustom } from "../../components/Button";

export const ProductCreate = () => {
  const [name, setName] = useState();
  const [cost, setCost] = useState();
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  const [categoryId, setCategoryId] = useState();

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, cost, price, discount, categoryId };
    console.log("===", data);
    //const res = await createUser(data);
    //console.log("==res", res);
    //if (res) {
    //history.push("/products");
    //}
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
          <ButtonCustom variant="contained" title="Quay lại" />
        </Link>
      </div>
      <Card style={{ padding: 10 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField
                type="text"
                label="Ten san pham"
                variant="outlined"
                value={name}
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Danh muc
                </InputLabel>
                <Select
                  native
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  label="Danh muc"
                >
                  <option aria-label="None" value="" />
                  <option value="1">Laptop</option>
                  <option value="2">Phone</option>
                  <option value="3">Phone2</option>
                  <option value="4">Phone4</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                type="text"
                label="Gia nhap"
                variant="outlined"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                type="text"
                label="Gia ban"
                variant="outlined"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                type="text"
                label="Discount"
                variant="outlined"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Grid>
          </Grid>
          <div style={{ margin: "20px 0" }}>
            <ButtonCustom variant="contained" type="submit" title="Lưu" />
          </div>
        </form>
      </Card>
    </div>
  );
};

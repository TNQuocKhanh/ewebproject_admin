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
import { useHistory } from "react-router-dom";
import { createProduct, getListCategories, getListSupplier } from "../../apis";
import { ButtonReturn, ButtonSave } from "../../components/Button";

export const ProductCreate = () => {
  const [name, setName] = useState();
  const [cost, setCost] = useState();
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  const [categoryId, setCategoryId] = useState();
  const [supplierId, setSupplierId] = useState();

  const [quantity, setQuantity] = useState();
  const [specifications, setSpecifications] = useState();
  const [description, setDescription] = useState();

  const [categoryArr, setCategoryArr] = useState([]);
  const [supplierArr, setSupplierArr] = useState([]);

  const history = useHistory();

  const getAllCategories = async () => {
    try {
      const res = await getListCategories();
      setCategoryArr(res);
    } catch (e) {
      setCategoryArr([]);
    }
  };

  const getAllSupllier = async () => {
    try {
      const res = await getListSupplier();
      setSupplierArr(res);
    } catch (e) {
      setSupplierArr([]);
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllSupllier();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      cost,
      price,
      discount,
      categoryId,
      supplierId,
      quantity,
      specifications,
      description,
    };
    try {
      const res = await createProduct(data);
      if (res) {
        history.push("/products");
      }
    } catch (e) {
      console.log("==Err", e);
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
        <ButtonReturn resource="products" />
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
                  {categoryArr.map((it) => (
                    <option key={it.id} value={it.id}>
                      {it.name}
                    </option>
                  ))}
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
                  Nhà cung cấp
                </InputLabel>
                <Select
                  native
                  value={supplierId}
                  onChange={(e) => setSupplierId(e.target.value)}
                  label="Nhà cung cấp"
                >
                  <option aria-label="None" value="" />
                  {supplierArr.map((it) => (
                    <option key={it.id} value={it.id}>
                      {it.name}
                    </option>
                  ))}
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
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                label="Số lượng nhập"
                variant="outlined"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Grid>
            <Grid item md={6}></Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Thông số sản phẩm"
                rows={3}
                variant="outlined"
                multiline
                value={specifications}
                onChange={(e) => setSpecifications(e.target.value)}
              />
            </Grid>
            <Grid item md={6}></Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Mô tả"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
          </Grid>
          <div style={{ margin: "20px 0" }}>
            <ButtonSave />
          </div>
        </form>
      </Card>
    </div>
  );
};

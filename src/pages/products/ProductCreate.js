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
import { toast } from "react-toastify";
import { createProduct, getListCategories, getListSupplier } from "../../apis";
import { ButtonReturn, ButtonSave } from "../../components/Button";
import {Loader} from "../../components/Loader";
import { Toastify } from "../../components/Toastify";

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

  const [length, setLength] = useState();
  const [height, setHeight] = useState();
  const [width, setWdith] = useState();
  const [weight, setWeight] = useState();

  const [categoryArr, setCategoryArr] = useState([]);
  const [supplierArr, setSupplierArr] = useState([]);

  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
      height,
      length,
      width,
      weight,
    };
    try {
      await createProduct(data);
      history.push("/products");
    } catch (e) {
      console.log("[Create product] Error", e);
      toast.error("Có lỗi xảy ra");
    }
    setLoading(false);
  };

  if(loading) return <Loader />

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
                required
                variant="outlined"
                value={name}
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth variant="outlined" required>
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
                required
                label="Giá nhập"
                variant="outlined"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth variant="outlined" required>
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
                required
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
                required
                InputProps={{ inputProps: { min: 1 } }}
                label="Số lượng nhập"
                variant="outlined"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="number"
                required
                InputProps={{ inputProps: { min: 1 } }}
                label="Chiều cao(cm)"
                variant="outlined"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="number"
                required
                InputProps={{ inputProps: { min: 1 } }}
                label="Cân nặng(g)"
                variant="outlined"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="number"
                required
                InputProps={{ inputProps: { min: 1 } }}
                label="Chiều dài(cm)"
                variant="outlined"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="number"
                required
                InputProps={{ inputProps: { min: 1 } }}
                label="Chiều rộng(cm)"
                variant="outlined"
                value={width}
                onChange={(e) => setWdith(e.target.value)}
              />
            </Grid>
            <Grid item md={6} xs={12}></Grid>
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
            <Grid item md={6} xs={12}></Grid>
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
            <Grid item md={6} xs={12}></Grid>
          </Grid>
          <div style={{ margin: "20px 0" }}>
            <ButtonSave />
          </div>
        </form>
      </Card>
      <Toastify />
    </div>
  );
};

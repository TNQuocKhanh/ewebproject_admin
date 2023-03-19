import {
  Select,
  TextField,
  InputLabel,
  FormControl,
  Typography,
  Card,
  Grid,
  Box,
  Tabs,
  Tab,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { getProductById, updateProduct, updateImageProduct } from "../../apis";
import { ButtonCustom } from "../../components/Button";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const ProductForm = () => {
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
    setName(res.name);
    setCost(res.cost);
    setPrice(res.price);
    setDiscount(res.discountPercent);
    setCategoryId(res.category?.id);
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = updateProduct(Number(id), {
      name,
      cost,
      price,
      discount,
      categoryId,
    });

    history.push("/products");
  };

  return (
    <div>
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
          <ButtonCustom variant="contained" type="submit" title="Lưu" />
        </div>
      </form>
    </div>
  );
};

export const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    updateImageProduct(1, selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div>
      <div
        style={{ border: "1px solid #000", width: "300px", height: "300px" }}
      >
        {selectedFile && (
          <img alt="img" src={preview} width="300px" height="300px" />
        )}
      </div>
      <input type="file" onChange={onSelectFile} />
    </div>
  );
};

export const ProductEdit = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
      <Card>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Thông tin" />
          <Tab label="Hình ảnh" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <ProductForm />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ImageUpload />
        </TabPanel>
      </Card>
    </div>
  );
};

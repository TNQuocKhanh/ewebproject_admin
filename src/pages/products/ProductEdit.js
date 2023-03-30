import {
  Select,
  TextField,
  InputLabel,
  FormControl,
  Typography,
  Card,
  Grid,
  Tabs,
  Tab,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  getProductById,
  updateProduct,
  updateImageProduct,
  getListCategories,
  getListSupplier,
  updateExtraImageProduct,
} from "../../apis";
import { ButtonReturn, ButtonSave } from "../../components/Button";
import { TabPanel } from "../../components";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [supplierId, setSupplierId] = useState("");

  const [quantity, setQuantity] = useState();
  const [specifications, setSpecifications] = useState();
  const [description, setDescription] = useState();
  const params = useParams();
  const id = params.id;

  const [categoryArr, setCategoryArr] = useState([]);
  const [supplierArr, setSupplierArr] = useState([]);

  const history = useHistory();

  const getUserDetail = async () => {
    try {
      const res = await getProductById(Number(id));
      setName(res.name);
      setCost(res.cost);
      setPrice(res.price);
      setDiscount(res.discountPercent);
      setCategoryId(res.category?.id);
      setSupplierId(res.supplier?.id);
      setQuantity(res.quantity);
      setSpecifications(res.specifications);
      setDescription(res.description);
    } catch (e) {
      console.log("===Err", e);
    }
  };

  useEffect(() => {
    getUserDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      updateProduct(Number(id), {
        name,
        cost,
        price,
        discount,
        categoryId,
        supplierId,
        quantity,
        specifications,
        description,
      });

      history.push("/products");
    } catch (e) {
      console.log("===Err", e);
    }
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
                {categoryArr.map((it) => (
                  <option key={it.id} value={it.id}>
                    {it.name}
                  </option>
                ))}
              </Select>
            </FormControl>
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
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              label="So luong nhap"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Grid>
          <Grid item md={6}></Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="specifications"
              rows={3}
              variant="outlined"
              multiline
              value={specifications}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setSpecifications(e.target.value)}
            />
          </Grid>
          <Grid item md={6}></Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              InputLabelProps={{ shrink: true }}
              label="description"
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
    </div>
  );
};

export const ImageUpload = ({ image }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState(image);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!selectedFile) {
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    updateImageProduct(id, selectedFile);
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
        style={{ border: "1px solid #000", width: "250px", height: "250px" }}
      >
        <img alt="img" src={preview} width="250px" height="250px" />
      </div>
      <input type="file" onChange={onSelectFile} />
    </div>
  );
};

function PreviewMultipleImages({ extra, image }) {
  const [images, setImages] = useState(extra);

  const params = useParams();
  const { id } = params;

  const handleMultipleImages = (evnt) => {
    const selectedFIles = [];
    const targetFiles = evnt.target.files;
    const targetFilesObject = [...targetFiles];
    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file));
    });
    console.log("====selectedFIles", selectedFIles);
    try {
      updateExtraImageProduct(id, image, selectedFIles);
    } catch (e) {
      console.log("===Error", e);
    }
    setImages(selectedFIles);
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        {images.map((url) => {
          return (
            <div
              style={{
                border: "1px solid #000",
                width: "200px",
                height: "200px",
                marginRight: 5,
              }}
            >
              <img alt="img" src={url} width="200px" height="200px" />
            </div>
          );
        })}
      </div>
      <div>
        <input type="file" onChange={handleMultipleImages} multiple />
      </div>
    </>
  );
}

export const ProductEdit = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const params = useParams();
  const { id } = params;

  const [mainImage, setMainImage] = useState();
  const [extraImage, setExtraImage] = useState();

  const getUserDetail = async () => {
    try {
      const res = await getProductById(Number(id));
      setMainImage(res.mainImage);
      setExtraImage(res.productImages.map((it) => it.extraImage));
    } catch (e) {
      console.log("===Err", e);
    }
  };

  useEffect(() => {
    getUserDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <ButtonReturn resource="products" />
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <ImageUpload image={mainImage} />
            </Grid>
            <Grid item xs={12} md={12}>
              <PreviewMultipleImages extra={extraImage} image={mainImage} />
            </Grid>
          </Grid>
        </TabPanel>
      </Card>
    </div>
  );
};

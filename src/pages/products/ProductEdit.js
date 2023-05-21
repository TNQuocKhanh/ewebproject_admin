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
  getListCategories,
  getListSupplier,
  updateExtraImageProduct,
} from "../../apis";
import { ButtonCustom, ButtonList, ButtonSave } from "../../components/Button";
import { Loader, TabPanel } from "../../components";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import { Toastify } from "../../components";
import { toast } from "react-toastify";

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

  const [length, setLength] = useState();
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [weight, setWeight] = useState();

  const [loading, setLoading] = useState(false);

  const params = useParams();
  const id = params.id;

  const [categoryArr, setCategoryArr] = useState([]);
  const [supplierArr, setSupplierArr] = useState([]);

  const history = useHistory();

  const getProductDetail = async () => {
    setLoading(true);
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
      setLength(res.length);
      setHeight(res.height);
      setWidth(res.width);
      setWeight(res.weight);
    } catch (e) {
      console.log("[Get product detail] Error", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProductDetail();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(Number(id), {
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
      });
      toast.success("Cập nhật thành công");
    } catch (e) {
      console.log("[Update product] Error", e);
      toast.error("Có lỗi xảy ra");
    }

    setTimeout(() => {
      history.push("/products");
    }, 2000);
  };

  if (loading) return <Loader />;

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
              required
              onChange={(e) => setName(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth variant="outlined" required>
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
            <FormControl fullWidth variant="outlined" i required>
              <InputLabel htmlFor="outlined-age-native-simple">
                Nhà cung cấp
              </InputLabel>
              <Select
                native
                value={supplierId}
                onChange={(e) => setSupplierId(e.target.value)}
                label="Nhà cung cấp"
                InputLabelProps={{ shrink: true }}
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
              required
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
              required
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
              required
              InputProps={{ inputProps: { min: 1 } }}
              label="Số lượng nhập"
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: 1 } }}
              label="Chiều rộng(cm)"
              variant="outlined"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </Grid>
          <Grid item md={6} xs={12}></Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              InputLabelProps={{ shrink: true }}
              label="Mô tả"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setSpecifications(e.target.value)}
            />
          </Grid>
        </Grid>
        <div style={{ margin: "20px 0" }}>
          <ButtonSave />
        </div>
      </form>
      <Toastify />
    </div>
  );
};

function PreviewMultipleImages({ extra, image, loading }) {
  const [images, setImages] = useState(extra);
  const [imageChoose, setImageChoose] = useState([]);

  const params = useParams();
  const { id } = params;

  const handleMultipleImages = (evnt) => {
    const selectedFIles = [];
    const targetFiles = evnt.target.files;
    setImageChoose(targetFiles);
    const targetFilesObject = [...targetFiles];
    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file));
    });
    setImages(selectedFIles);
  };

  const handleUpload = async () => {
    try {
      await updateExtraImageProduct(id, imageChoose);
      toast.success("Cập nhật hình ảnh thành công");
    } catch (e) {
      console.log("[Upload image] Error", e);
      toast.error("Có lỗi xảy ra");
    }
  };

  if (loading) return <Loader />;
  return (
    <>
      <div style={{ display: "flex" }}>
        {images?.map((url, idx) => {
          return (
            <div
              key={idx}
              style={{
                border: "1px solid #f2f2f2",
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
        {imageChoose.length > 0 ? (
          <ButtonCustom
            style={{ padding: "10px", margin: "10px 0" }}
            handleClick={handleUpload}
            icon={<CloudUploadIcon style={{ color: "#536cfe" }} />}
            title="Tải ảnh"
          />
        ) : (
          <>
            <label
              htmlFor="input-upload"
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "white",
                padding: "10px",
                width: "fit-content",
                borderRadius: "5px",
                margin: "10px 0",
                border: "1px solid #cccccc",
              }}
            >
              <PhotoLibraryIcon style={{ color: "#536cfe" }} />
              <span style={{ marginLeft: "10px" }}>Chọn ảnh</span>{" "}
            </label>
            <input
              hidden
              id="input-upload"
              type="file"
              multiple
              onChange={handleMultipleImages}
            />
          </>
        )}
      </div>
      <Toastify />
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
  const [loading, setLoading] = useState(false);

  const getUserDetail = async () => {
    setLoading(true);
    try {
      const res = await getProductById(Number(id));
      setMainImage(res.mainImage);
      setExtraImage(res.productImages.map((it) => it.extraImage));
    } catch (e) {
      console.log("===Err", e);
    }
    setLoading(false);
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
        <ButtonList resource="products" />
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
              <PreviewMultipleImages
                extra={extraImage}
                image={mainImage}
                loading={loading}
              />
            </Grid>
          </Grid>
        </TabPanel>
      </Card>
    </div>
  );
};

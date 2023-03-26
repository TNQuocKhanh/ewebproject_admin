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
import { getCategoryById, updateCategory } from "../../apis";
import { ButtonCustom } from "../../components/Button";

export const CategoryEdit = () => {
  const [name, setName] = useState("");
  const [enabled, setEnabled] = useState("");

  const params = useParams();
  const id = params.id;

  const history = useHistory();

  const getCategoryDetail = async () => {
    const res = await getCategoryById(Number(id));
    setName(res.name);
    setEnabled(res.enabled);
  };

  useEffect(() => {
    getCategoryDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCategory(Number(id), {
      name,
      enabled: enabled === "true" ? true : false,
    });

    history.push("/categories");
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
        <Link to={"/categories"} style={{ textDecoration: "none" }}>
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
                label="Tên danh mục"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel shrink htmlFor="outlined-age-native-simple">
                  Trạng thái
                </InputLabel>
                <Select
                  notched
                  native
                  value={enabled}
                  onChange={(e) => setEnabled(e.target.value)}
                  label="Trạng thái"
                  InputLabelProps={{ shrink: true }}
                >
                  <option value="true">Hoạt động</option>
                  <option value="false">Không hoạt động</option>
                </Select>
              </FormControl>
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

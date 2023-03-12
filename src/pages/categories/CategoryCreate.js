import {
  TextField,
  InputLabel,
  FormControl,
  Card,
  Grid,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createCategory } from "../../apis/category.api";
import { ButtonCustom } from "../../components/Button";

export const CategoryCreate = () => {
  const [name, setName] = useState();

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name };
    const res = await createCategory(data);
    if (res) {
      history.push("/categories");
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
        <Link to={"/categories"} style={{ textDecoration: "none" }}>
          <ButtonCustom variant="contained" title="Quay lại" />
        </Link>
      </div>
      <Card style={{ padding: 10 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField
                type="text"
                label="Tên danh mục"
                variant="outlined"
                required
                value={name}
                fullWidth
                onChange={(e) => setName(e.target.value)}
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

import { TextField, Card, Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createCategory } from "../../apis/category.api";
import { ButtonReturn, ButtonSave } from "../../components/Button";

export const CategoryCreate = () => {
  const [name, setName] = useState();

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name };
    try {
      const res = await createCategory(data);
      if (res) {
        history.push("/categories");
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
        <ButtonReturn resource="categories" />
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
            <ButtonSave />
          </div>
        </form>
      </Card>
    </div>
  );
};

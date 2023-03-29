import { TextField, Card, Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createSupplier } from "../../apis";
import { ButtonReturn, ButtonSave } from "../../components/Button";

export const SupplierCreate = () => {
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, phone, address };
    try {
      const res = await createSupplier(data);
      if (res) {
        history.push("/suppliers");
      }
    } catch (e) {
      console.log("===Err", e);
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
        <ButtonReturn resource="suppliers" />
      </div>
      <Card style={{ padding: 10 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField
                type="text"
                label="Tên NCC"
                variant="outlined"
                value={name}
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                type="text"
                label="SDT"
                variant="outlined"
                value={phone}
                fullWidth
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                type="text"
                label="Dia chi"
                variant="outlined"
                value={address}
                fullWidth
                onChange={(e) => setAddress(e.target.value)}
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

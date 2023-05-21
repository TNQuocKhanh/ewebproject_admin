import { TextField, Card, Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { createSupplier } from "../../apis";
import { ButtonList, ButtonSave } from "../../components/Button";
import { Loader } from "../../components/Loader";
import { Toastify } from "../../components/Toastify";

export const SupplierCreate = () => {
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { name, phoneNumber: phone, address };
    try {
      await createSupplier(data);
      history.push("/suppliers");
    } catch (e) {
      console.log("[Create supllier] Error", e);
      toast.error("Có lỗi xảy ra");
    }
    setLoading(false);
  };

  if (loading) return <Loader />;

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
        <ButtonList resource="suppliers" />
      </div>
      <Card style={{ padding: 10 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField
                type="text"
                label="Tên nhà cung cấp"
                variant="outlined"
                value={name}
                required
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                type="text"
                label="Số điện thoại"
                variant="outlined"
                required
                value={phone}
                fullWidth
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                type="text"
                label="Địa chỉ"
                required
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
      <Toastify />
    </div>
  );
};

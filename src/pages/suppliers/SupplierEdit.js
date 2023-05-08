import { TextField, Typography, Card, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSupplierById, updateSupplier } from "../../apis";
import { ButtonReturn, ButtonSave } from "../../components/Button";
import { Loader } from "../../components/Loader";
import { Toastify } from "../../components/Toastify";

export const SupplierEdit = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const id = params.id;

  const history = useHistory();

  const getCategoryDetail = async () => {
    setLoading(true);
    try {
      const res = await getSupplierById(Number(id));
      setName(res.name);
      setPhoneNumber(res.phoneNumber);
      setAddress(res.address);
    } catch (e) {
      console.log("===Err", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCategoryDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateSupplier(Number(id), {
        name,
        phoneNumber,
        address,
      });
      history.push("/suppliers");
    } catch (e) {
      console.log("[Update supplier] Error]", e);
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
        <Typography>Cập nhật</Typography>
        <ButtonReturn resource="suppliers" />
      </div>
      <Card style={{ padding: 10 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="text"
                label="Tên nhà cung cấp"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="text"
                label="Số điện thoại"
                variant="outlined"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="text"
                label="Địa chỉ"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                InputLabelProps={{ shrink: true }}
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

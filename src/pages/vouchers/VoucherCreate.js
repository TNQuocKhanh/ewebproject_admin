import { TextField, Card, Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { createVoucher } from "../../apis";
import { ButtonList, ButtonSave } from "../../components/Button";
import { Loader } from "../../components/Loader";
import { Toastify } from "../../components/Toastify";

export const VoucherCreate = () => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [voucherDiscount, setVoucherDiscount] = useState("");
  const [orderMinimumToUse, setOrderMinimumToUse] = useState("");
  const [orderApply, setOrderApply] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const now = new Date();
  const today = now.toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      name,
      startDate,
      endDate,
      voucherDiscount,
      orderMinimumToUse,
      orderApply,
    };
    try {
      await createVoucher(data);
      history.push("/vouchers");
    } catch (e) {
      console.log("[Create voucher] Error", e);
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
        <ButtonList resource="vouchers" />
      </div>
      <Card style={{ padding: 10 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField
                type="text"
                label="Tên mã voucher"
                variant="outlined"
                required
                value={name}
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                type="number"
                label="Số tiền giảm giá"
                variant="outlined"
                required
                value={voucherDiscount}
                fullWidth
                onChange={(e) => setVoucherDiscount(e.target.value)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="date"
                required
                label="Từ ngày"
                variant="outlined"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                inputProps={{ min: today }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="date"
                required
                label="Đến ngày"
                variant="outlined"
                value={endDate}
                inputProps={{ min: startDate }}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                type="number"
                label="Số tiền đơn hàng tối thiểu"
                variant="outlined"
                required
                value={orderMinimumToUse}
                fullWidth
                onChange={(e) => setOrderMinimumToUse(e.target.value)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                type="number"
                label="Giá trị đơn hàng đã mua được áp dụng"
                variant="outlined"
                required
                value={orderApply}
                fullWidth
                onChange={(e) => setOrderApply(e.target.value)}
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

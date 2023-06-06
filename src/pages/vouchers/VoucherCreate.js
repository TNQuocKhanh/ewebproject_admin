import { TextField, Card, Grid, Typography, Button } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { checkVoucher, createVoucher } from "../../apis";
import { ButtonList, ButtonSave } from "../../components/Button";
import { Loader } from "../../components/Loader";
import { Toastify } from "../../components/Toastify";
import {
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";

export const VoucherCreate = () => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [voucherDiscount, setVoucherDiscount] = useState("");
  const [orderMinimumToUse, setOrderMinimumToUse] = useState("");
  const [orderApply, setOrderApply] = useState("");
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [amountCustomer, setAmountCustomer] = useState(0);

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

  const handleClickCheck = async () => {
    try {
      const res = await checkVoucher({ orderApply });
      setAmountCustomer(res?.length);
    } catch (err) {
      console.log("[checkVoucher] error", err);
    }
    setOpen(true);
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
        <div>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#556afe",
              color: "#fff",
              marginRight: "5px",
              padding: "3px 9px",
            }}
            onClick={handleClickCheck}
            disabled={!orderApply}
          >
            <LiveHelpIcon fontSize="small" />
            &nbsp; Kiểm tra
          </Button>
          <ButtonList resource="vouchers" />
        </div>
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
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
        <DialogTitle>Số lượng khách hàng được áp dụng voucher</DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <TextField
                margin="dense"
                label="Số lượng"
                value={amountCustomer}
                type="text"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Toastify />
    </div>
  );
};

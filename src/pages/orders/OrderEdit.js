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
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getOrderById, updateStatus } from "../../apis";
import { Toastify } from "../../components";
import { ButtonReturn, ButtonSave } from "../../components/Button";
import { formatDateTime } from "../../utils";

export const OrderEdit = () => {
  const [name, setName] = useState("");
  const [total, setTotal] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderTime, setOrderTime] = useState("");
  const [status, setStatus] = useState("");

  const params = useParams();
  const id = params.id;

  const history = useHistory();

  const getOrderDetail = async () => {
    try {
      const res = await getOrderById(Number(id));
      if (res) {
        setName(res.receiver);
        setTotal(res.total);
        setStatus(res.status);
        setPaymentMethod(res.paymentMethod);
        setOrderTime(formatDateTime(res.orderTime));
      }
    } catch (e) {
      console.log("===Err", e);
    }
  };

  useEffect(() => {
    getOrderDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStatus(Number(id), { status });
      toast.success("Cập nhật thành công");
    } catch (e) {
      console.log("[Update order] Error", e);
    }
    setTimeout(() => {
      history.push("/orders");
    }, 2000);
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
        <ButtonReturn resource="orders" />
      </div>
      <Card style={{ padding: 10 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                onChange={(e) => setName(e.target.value)}
                type="text"
                label="Người đặt hàng"
                variant="outlined"
                value={name}
                InputLabelProps={{ shrink: true }}
                disabled
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="text"
                onChange={(e) => setTotal(e.target.value)}
                label="Tổng tiền"
                variant="outlined"
                value={total}
                disabled
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="text"
                onChange={(e) => setPaymentMethod(e.target.value)}
                label="Phương thức thanh toán"
                variant="outlined"
                value={paymentMethod}
                disabled
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="text"
                label="Ngày đặt hàng"
                onChange={(e) => setOrderTime(e.target.value)}
                variant="outlined"
                value={orderTime}
                disabled
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
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  label="Trạng thái"
                >
                  <option value="NEW">Chờ xác nhận</option>
                  <option value="PAID">Đã thanh toán</option>
                  <option value="DELIVERED">Đã giao hàng</option>
                  <option value="PROCESSING">Đang xử lý</option>
                  <option value="PACKAGED">Đã đóng gói</option>
                  <option value="SHIPPING">Đang giao hàng</option>
                  <option value="RETURNED">Đã trả lại</option>
                </Select>
              </FormControl>
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

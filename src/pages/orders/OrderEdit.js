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
import { Loader, Toastify } from "../../components";
import { ButtonReturn, ButtonSave } from "../../components/Button";
import { formatDateTime, formatPrice } from "../../utils";

export const OrderEdit = () => {
  const [name, setName] = useState("");
  const [total, setTotal] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderTime, setOrderTime] = useState("");
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const id = params.id;

  const history = useHistory();

  const getOrderDetail = async () => {
    setLoading(true)
    try {
      const res = await getOrderById(Number(id));
      if (res) {
        setName(res.receiver);
        setTotal(formatPrice(res.total));
        setStatus(res.status);
        setPaymentMethod(res.paymentMethod);
        setOrderTime(formatDateTime(res.orderTime));
        setAddress(`${res.street}, ${res.ward}, ${res.district}`)
      }
    } catch (e) {
      console.log("===Err", e);
    }
    setLoading(false)
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

  if(loading) return <Loader />

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
                  <option value="PROCESSING">Đang xử lý</option>
                  <option value="SHIPPING">Đang giao hàng</option>
                  <option value="DELIVERED">Đã giao hàng</option>
                  <option value="RETURNED">Đã huỷ</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="text"
                label="Địa chỉ"
                onChange={(e) => setAddress(e.target.value)}
                variant="outlined"
                value={address}
                disabled
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

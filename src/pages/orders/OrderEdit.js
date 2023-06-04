import {
  Select,
  TextField,
  InputLabel,
  FormControl,
  Typography,
  Card,
  Grid,
  Button,
} from "@material-ui/core";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getOrderById,
  getOrderRefund,
  getProfile,
  updateOrderRefund,
  updateStatus,
} from "../../apis";
import { Loader, Toastify } from "../../components";
import { ButtonDetail, ButtonList, ButtonSave } from "../../components/Button";
import { formatDateTime, formatPrice, formatStringDate } from "../../utils";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export const OrderEdit = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [total, setTotal] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderTime, setOrderTime] = useState("");
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderDetail, setOrderDetail] = useState([]);

  const [open, setOpen] = useState(false);
  const [refundData, setRefundData] = useState({});
  const [fullName, setFullName] = useState("");

  const classes = useStyles();
  const params = useParams();
  const id = params.id;

  const getOrderDetail = async () => {
    setLoading(true);
    try {
      const res = await getOrderById(Number(id));
      if (res) {
        setName(res.receiver);
        setPhoneNumber(res.phoneNumber);
        setTotal(formatPrice(res.total));
        setStatus(res.status);
        setPaymentStatus(res.paymentStatus);
        setPaymentMethod(res.paymentMethod);
        setOrderTime(formatDateTime(res.orderTime));
        setAddress(`${res.street}, ${res.ward}, ${res.district}`);
        setOrderDetail(res.orderDetails);
      }
    } catch (e) {
      console.log("===Err", e);
    }
    setLoading(false);
  };

  const getRefundInfo = async () => {
    try {
      const res = await getOrderRefund(id);
      setRefundData(res);
    } catch (err) {
      console.log("[getRefundInfo] Error", err);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitRefund = async () => {
    try {
      const res = await updateOrderRefund(refundData);
      if (res.vnp_ResponseCode === "00") {
        toast.success("Hoàn tiền thành công");
      } else {
        toast.info("Có lỗi xảy ra, vui lòng thử lại sau");
      }
    } catch (err) {
      console.log("[handleSubmitRefund] Error", err);
    }
    setOpen(false);
  };

  const getUserProfile = async () => {
    try {
      const res = await getProfile();
      if (res.id) {
        setFullName(res.fullName);
      } else {
        setFullName("ADMIN");
      }
    } catch (err) {
      console.log("[Get profile] Error", err);
    }
  };

  useEffect(() => {
    getRefundInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    getOrderDetail();
    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStatus(Number(id), { status, paymentStatus });
      toast.success("Cập nhật thành công");
    } catch (e) {
      console.log("[Update order] Error", e);
    }
    setTimeout(() => {
      window.location.replace("/orders");
    }, 2000);
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
        <div>
          {paymentMethod === "VNPAY" && (
            <Button
              variant="contained"
              style={{
                backgroundColor: "#556afe",
                color: "#fff",
                marginRight: "5px",
                padding: "3px 9px",
              }}
              onClick={() => setOpen(true)}
            >
              <AccountBalanceWalletIcon fontSize="small" />
              &nbsp; Hoàn tiền
            </Button>
          )}
          <ButtonDetail resource={`orders/${id}/detail`} />
          <ButtonList resource="orders" />
        </div>
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
                onChange={(e) => setName(e.target.value)}
                type="text"
                label="Số điên thoại"
                variant="outlined"
                value={phoneNumber}
                InputLabelProps={{ shrink: true }}
                disabled
              />
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
              <FormControl fullWidth variant="outlined">
                <InputLabel shrink htmlFor="outlined-age-native-simple">
                  Trạng thái đơn hàng
                </InputLabel>
                <Select
                  notched
                  native
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  label="Trạng thái đơn hàng"
                >
                  <option value="NEW">Chờ xác nhận</option>
                  <option value="PROCESSING">Đang xử lý</option>
                  <option value="SHIPPING">Đang giao hàng</option>
                  <option value="DELIVERED">Đã giao hàng</option>
                  <option value="REFUND_PENDING">Đang chờ hoàn tiền</option>
                  <option value="CANCELED">Đã huỷ</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel shrink htmlFor="outlined-age-native-simple">
                  Trạng thái thanh toán
                </InputLabel>
                <Select
                  notched
                  native
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  label="Trạng thái thanh toán"
                >
                  <option value="UNPAID">Chưa thanh toán</option>
                  <option value="PAID">Đã thanh toán</option>
                  <option value="REFUND">Đã hoàn tiền</option>
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "20px 10px",
        }}
      >
        <Typography>Sản phẩm đã đặt</Typography>
      </div>
      <div className={classes.root}>
        {orderDetail.map((item, idx) => (
          <Accordion key={idx} defaultExpanded={true}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                {`${idx + 1}. ${item.productName}`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Hình ảnh</TableCell>
                      <TableCell align="right">Số lượng</TableCell>
                      <TableCell align="right">Giá</TableCell>
                      <TableCell align="right">Phí vận chuyển</TableCell>
                      <TableCell align="right">Tổng</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <img
                          src={item.productImage}
                          width="50px"
                          height="50px"
                          alt="product-img"
                        />
                      </TableCell>
                      <TableCell align="right">x{item.quantity}</TableCell>
                      <TableCell align="right">
                        {formatPrice(item.productPrice)}
                      </TableCell>
                      <TableCell align="right">
                        {formatPrice(item.shippingFee)}
                      </TableCell>
                      <TableCell align="right">
                        {formatPrice(
                          item.shippingFee * item.quantity +
                            item.productPrice * item.quantity
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle>Xác nhận hoàn tiền</DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <TextField
                margin="dense"
                label="Mã giao dịch hoàn"
                value={refundData.vnpTxnRef}
                type="text"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                margin="dense"
                label="Ngày đặt"
                value={formatStringDate(refundData.payDate || "")}
                type="text"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                margin="dense"
                label="Số tiền"
                value={formatPrice(Number(refundData.amount?.slice(0, -2)))}
                type="text"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                margin="dense"
                label="Người thực hiện"
                value={fullName}
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
          <Button onClick={handleClose} color="secondary">
            Huỷ
          </Button>
          <Button onClick={handleSubmitRefund} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

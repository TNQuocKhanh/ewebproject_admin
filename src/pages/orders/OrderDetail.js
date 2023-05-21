import { getOrderById } from "../../apis";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Typography, Card, Grid } from "@material-ui/core";
import { ButtonEdit, ButtonList } from "../../components/Button";
import _ from "lodash";
import { formatDateTime, formatPrice, getStatus } from "../../utils";
import { Loader } from "../../components/Loader";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const headers = [
  { id: "name", label: "Người đặt hàng" },
  { id: "phoneNumber", label: "Số điện thoại" },
  { id: "address", label: "Địa chỉ" },
  { id: "paymentMethod", label: "Phương thức thanh toán" },
  { id: "orderTime", label: "Ngày đặt hàng" },
  { id: "total", label: "Tổng tiền" },
  { id: "status", label: "Trạng thái" },
];

export const OrderDetail = () => {
  const params = useParams();
  const classes = useStyles();
  const id = params.id;

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [orderDetail, setOrderDetail] = useState([]);

  const getOrderDetail = async () => {
    setLoading(true);
    try {
      const res = await getOrderById(Number(id));

      if (res) {
        const transform = {
          ...res,
          name: res.receiver,
          orderTime: formatDateTime(res.orderTime),
          status: getStatus(res.status).text,
          total: formatPrice(res.total),
          address: `${res.street}, ${res.ward}, ${res.district}`,
        };
        setData(transform);
        setOrderDetail(res.orderDetails);
      }
    } catch (e) {
      console.log("[Get order detail] Error", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getOrderDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Typography>Chi tiết</Typography>
        <div>
          <ButtonEdit resource={`orders/${id}/edit`} />
          <ButtonList resource="orders" />
        </div>
      </div>
      <Card style={{ padding: 10, marginBottom: "10px" }}>
        <Grid container spacing={2}>
          {headers.map((item, idx) => {
            const val = item?.id;
            return (
              <Grid key={idx} item md={6} xs={12}>
                <strong>{item.label}: </strong>
                {_.get(data, val, "")}
              </Grid>
            );
          })}
        </Grid>
      </Card>
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
          <Accordion key={idx}>
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
                        {formatPrice(item.shippingFee + item.productPrice)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

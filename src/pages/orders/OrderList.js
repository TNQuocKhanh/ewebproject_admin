import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import List from "../../components/List";
import {
  formatDateTime,
  formatPrice,
  getNow,
  getPreviousNow,
} from "../../utils";
import { filteOrders } from "../../apis";
import { Loader } from "../../components";
import { useHistory } from "react-router-dom";
import { ButtonCustom } from "../../components/Button";
import SearchIcon from "@material-ui/icons/Search";

const columns = [
  { id: "receiver", label: "Tên người nhận hàng", minWidth: 170 },
  { id: "paymentMethod", label: "Phương thức thanh toán", minWidth: 170 },
  { id: "orderTime", label: "Ngày đặt hàng", minWidth: 170 },
  { id: "total", label: "Tổng tiền", minWidth: 170 },
  {
    id: "status",
    label: "Trạng thái",
    minWidth: 170,
    customField: true,
    align: "center",
  },
];

const FilterForm = (props) => {
  const { setFilterValues } = props;
  const history = useHistory();

  const [startDate, setStartDate] = useState(
    new URLSearchParams(window.location.search).get("startDate") ||
      getPreviousNow()
  );
  const [endDate, setEndDate] = useState(
    new URLSearchParams(window.location.search).get("endDate") || getNow()
  );
  const [paymentMethod, setPaymentMethod] = useState(
    new URLSearchParams(window.location.search).get("paymentMethod") || "-1"
  );
  const [status, setStatus] = useState(
    new URLSearchParams(window.location.search).get("status") || "-1"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = {
      paymentMethod,
      status,
      startDate,
      endDate,
    };
    setFilterValues(value);
    const url = `${window.location.pathname}?` + new URLSearchParams(value);
    history.push(url);
  };

  return (
    <div style={{ padding: "10px" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <FormControl required fullWidth variant="outlined">
              <InputLabel shrink htmlFor="outlined-age-native-simple">
                Phương thức thanh toán
              </InputLabel>
              <Select
                notched
                native
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                label="Phương thức thanh toán"
                InputLabelProps={{ shrink: true }}
              >
                <option value="-1">Tất cả</option>
                <option value="COD">COD</option>
                <option value="VNPAY">VNPay</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              fullWidth
              type="date"
              required
              label="Từ ngày"
              variant="outlined"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              fullWidth
              type="date"
              required
              label="Đến ngày"
              variant="outlined"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl required fullWidth variant="outlined">
              <InputLabel shrink htmlFor="outlined-age-native-simple">
                Trạng thái
              </InputLabel>
              <Select
                notched
                native
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Trạng thái"
                InputLabelProps={{ shrink: true }}
              >
                <option value="-1">Tất cả</option>
                <option value="NEW">Chờ xác nhận</option>
                <option value="PAID">Đã thanh toán</option>
                <option value="PROCESSING">Đang xử lý</option>
                <option value="SHIPPING">Đang giao hàng</option>
                <option value="DELIVERED">Đã giao hàng</option>
                <option value="RETURNED">Đã huỷ</option>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <div
          style={{
            margin: "20px 0",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <ButtonCustom
            title="Tìm kiếm"
            variant="contained"
            handleClick={handleSubmit}
            icon={<SearchIcon />}
            style={{ backgroundColor: "#556afe", color: "#fff" }}
          />
        </div>
      </form>
    </div>
  );
};

export const OrderList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterValues, setFilterValues] = useState({
    paymentMethod:
      new URLSearchParams(window.location.search).get("paymentMethod") || "",
    startDate:
      new URLSearchParams(window.location.search).get("startDate") || "",
    endDate: new URLSearchParams(window.location.search).get("endDate") || "",
  });

  const getAllOrders = async () => {
    setLoading(true);
    try {
      const res = await filteOrders(filterValues);
      const result = res.content;
      const transform = result.map((item) => ({
        ...item,
        orderTime: formatDateTime(item.orderTime),
        total: formatPrice(item.total),
      }));
      setData(transform);
    } catch (e) {
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValues]);

  const transformCsv = [];
  data?.map((it) =>
    transformCsv.push({
      receiver: it.receiver,
      orderTime: it.orderTime,
      paymentMethod: it.paymentMethod,
      phoneNumber: it.phoneNumber,
      total: it.total,
      status: it.status,
    })
  );
  
  if (loading) return <Loader />;

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <List
            filter={<FilterForm setFilterValues={setFilterValues} />}
            isCreate={false}
            resource="orders"
            columns={columns}
            data={data}
            title="Danh sách đơn hàng"
            dataCsv={transformCsv}
          />
        </Grid>
      </Grid>
    </>
  );
};

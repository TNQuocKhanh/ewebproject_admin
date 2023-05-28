import { useEffect, useState } from "react";
import { Grid, FormControl, InputLabel, Select } from "@material-ui/core";
import List from "../../../components/List";
import { getOrderReportByTime } from "../../../apis";
import { Loader } from "../../../components";
import { formatPrice } from "../../../utils";
import { useHistory } from "react-router-dom";
import { ButtonCustom } from "../../../components";
import SearchIcon from "@material-ui/icons/Search";

const COD = "COD";
const VNPAY = "VNPay";

const columns = [
  { id: "method", label: "Tên phương thức", minWidth: 170 },
  { id: "netSale", label: "Lợi nhuận", minWidth: 170 },
  { id: "grossSale", label: "Doanh thu", minWidth: 170 },
  { id: "orderQuantity", label: "Số đơn hàng", minWidth: 170 },
];

const FilterForm = (props) => {
  const { setFilterValues } = props;
  const history = useHistory();

  const [day, setDay] = useState(
    new URLSearchParams(window.location.search).get("day") || 30
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = { day };
    setFilterValues(value);
    const url = `${window.location.pathname}?` + new URLSearchParams(value);
    history.push(url);
  };

  return (
    <div style={{ padding: "10px" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel shrink htmlFor="outlined-age-native-simple">
                Thời gian
              </InputLabel>
              <Select
                notched
                native
                value={day}
                onChange={(e) => setDay(e.target.value)}
                label="Thời gian"
                InputLabelProps={{ shrink: true }}
              >
                <option value={7}>Trong tuần</option>
                <option value={30}>Trong tháng</option>
                <option value={90}>Trong quý</option>
                <option value={365}>Trong năm</option>
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

export const PaymentList = () => {
  const [codData, setCodData] = useState([]);
  const [vnpayData, setVnpayData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterValues, setFilterValues] = useState();

  const getPaymentVNPay = async () => {
    setLoading(true);
    try {
      const res = await getOrderReportByTime(COD, filterValues?.day);
      setCodData(res);
    } catch (err) {
      console.log("[Get feature product] Error", err);
    }
    setLoading(false);
  };

  const getPaymentCOD = async () => {
    setLoading(true);
    try {
      const res = await getOrderReportByTime(VNPAY, filterValues?.day);
      setVnpayData(res);
    } catch (err) {
      console.log("[Get feature product] Error", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPaymentCOD();
    getPaymentVNPay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValues]);

  const paymentData = [
    {
      ...codData[0],
      method: COD,
      netSale:
        codData[0] && codData[0].netSale ? formatPrice(codData[0].netSale) : 0,
      grossSale:
        codData[0] && codData[0].grossSale
          ? formatPrice(codData[0].grossSale)
          : 0,
    },
    {
      ...vnpayData[0],
      method: VNPAY,
      netSale:
        vnpayData[0] && vnpayData[0].netSale
          ? formatPrice(vnpayData[0].netSale)
          : 0,
      grossSale:
        vnpayData[0] && vnpayData[0].grossSale
          ? formatPrice(vnpayData[0].grossSale)
          : 0,
    },
  ];

  if (loading) return <Loader />;

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <List
            filter={<FilterForm setFilterValues={setFilterValues} />}
            resource="categories"
            columns={columns}
            data={paymentData || []}
            title="Phương thức thanh toán"
            columnAction={false}
            isCreate={false}
            isExport={false}
          />
        </Grid>
      </Grid>
    </>
  );
};

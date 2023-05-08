import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import List from "../../../components/List";
import { getOrderReportByTime } from "../../../apis";
import { Loader } from "../../../components";
import {formatPrice} from "../../../utils";

const COD = 'COD'
const VNPAY = 'VNPay'

const columns = [
  { id: "method", label: "Tên phương thức", minWidth: 170 },
  { id: "netSale", label: "Lợi nhuận", minWidth: 170 },
  { id: "grossSale", label: "Doanh thu", minWidth: 170 },
  { id: "orderQuantity", label: "Số đơn hàng", minWidth: 170 },
];

export const PaymentList = () => {
  const [codData, setCodData] = useState([]);
  const [vnpayData, setVnpayData] = useState([])
  const [loading, setLoading] = useState(false);

  const getPaymentVNPay = async () => {
    setLoading(true);
    try {
      const res = await getOrderReportByTime(COD);
      setCodData(res);
    } catch (err) {
      console.log("[Get feature product] Error", err);
    }
    setLoading(false);
  };

  const getPaymentCOD = async () => {
    setLoading(true);
    try {
      const res = await getOrderReportByTime(VNPAY);
      setVnpayData(res);
    } catch (err) {
      console.log("[Get feature product] Error", err);
    }
    setLoading(false);
  }

  useEffect(() => {
    getPaymentCOD();
    getPaymentVNPay()
  }, []);

  const paymentData = [
    {
      ...codData[0],
      method: COD,
      netSale: codData[0] && codData[0].netSale ? formatPrice(codData[0].netSale) : 0,
      grossSale: codData[0] && codData[0].grossSale ? formatPrice(codData[0].grossSale) : 0
    },
    {
      ...vnpayData[0],
      method: VNPAY,
      netSale: vnpayData[0] && vnpayData[0].netSale ? formatPrice(vnpayData[0].netSale) : 0,
      grossSale: vnpayData[0] && vnpayData[0].grossSale ? formatPrice(vnpayData[0].grossSale) : 0
    }
  ]

  if (loading) return <Loader />;

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <List
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

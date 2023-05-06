import { useEffect } from "react";
import { getOrderReportByTime, getOrderReportByType, getPaymentReport, getProductReportByTime, getUnsold } from "../../../apis/report.api";

export const PaymentList = () => {
  const getPayment = async () => {
    const res = await getOrderReportByType();
    console.log("==res", res);
  };

  useEffect(() => {
    getPayment();
  }, []);

  return <div>PaymentList</div>;
};

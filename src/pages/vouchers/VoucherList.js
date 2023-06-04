import { useEffect, useState } from "react";
import { getListVouchers } from "../../apis";
import { formatDateTime, formatPrice } from "../../utils";
import List from "../../components/List";
import { Loader } from "../../components/Loader";
import { Grid } from "@material-ui/core";

const columns = [
  { id: "name", label: "Tên mã voucher", minWidth: 170 },
  { id: "voucherCode", label: "Mã voucher", minWidth: 170 },
  { id: "voucherDiscount", label: "Số tiền giảm giá", minWidth: 170 },
  { id: "orderMinimumToUse", label: "Đơn hàng tối thiểu", minWidth: 170 },
  { id: "startDate", label: "Ngày bắt đầu", minWidth: 170 },
  { id: "endDate", label: "Ngày kết thúc", minWidth: 170 },
  {
    id: "enabled",
    label: "Trạng thái",
    minWidth: 170,
    customField: true,
    align: "center",
  },
];

export const VoucherList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllVoucher = async () => {
    setLoading(true);
    try {
      const res = await getListVouchers();
      const transform = res.map((it) => ({
        ...it,
        startDate: formatDateTime(it.startDate, false),
        endDate: formatDateTime(it.endDate, false),
        voucherDiscount: formatPrice(it.voucherDiscount),
        orderMinimumToUse: formatPrice(it.orderMinimumToUse),
      }));
      setData(transform);
    } catch (err) {
      console.log("[getListVouchers] error", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllVoucher();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <List
            resource="voucher"
            columns={columns}
            data={data}
            title="Danh sách voucher"
            isExport={false}
          />
        </Grid>
      </Grid>
    </>
  );
};

import { getVoucherById } from "../../apis";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Typography, Card, Grid } from "@material-ui/core";
import { ButtonList } from "../../components/Button";
import _ from "lodash";
import { Loader } from "../../components/Loader";
import { formatDateTime, formatPrice } from "../../utils";

const headers = [
  { id: "name", label: "Tên mã voucher" },
  { id: "voucherCode", label: "Mã voucher" },
  { id: "voucherDiscount", label: "Số tiền giảm giá" },
  { id: "orderMinimumToUse", label: "Đơn hàng tối thiểu" },
  { id: "startDate", label: "Ngày bắt đầu" },
  { id: "endDate", label: "Ngày kết thúc" },
  { id: "enabled", label: "Trạng thái" },
];

export const VoucherDetail = () => {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const getCategoryDetail = async () => {
    setLoading(true);
    try {
      const res = await getVoucherById(Number(id));

      if (res) {
        const transform = {
          ...res,
          enabled: res.enabled ? "Hoạt động" : "Không hoạt động",
          voucherDiscount: formatPrice(res.voucherDiscount),
          orderMinimumToUse: formatPrice(res.orderMinimumToUse),
          startDate: formatDateTime(res.startDate, false),
          endDate: formatDateTime(res.endDate, false),
        };
        setData(transform);
      }
    } catch (e) {
      console.log("[Get voucher detail] error", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCategoryDetail();
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
        <ButtonList resource="vouchers" />
      </div>
      <Card style={{ padding: 10 }}>
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
    </div>
  );
};

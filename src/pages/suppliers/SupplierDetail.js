import { getSupplierById } from "../../apis";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Typography, Card, Grid } from "@material-ui/core";
import { ButtonList } from "../../components/Button";
import _ from "lodash";
import { Loader } from "../../components/Loader";

const headers = [
  { id: "name", label: "Tên nhà cung cấp" },
  { id: "phoneNumber", label: "Số điện thoại" },
  { id: "address", label: "Địa chỉ" },
];

export const SupplierDetail = () => {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const getSupplierDetail = async () => {
    setLoading(true);
    try {
      const res = await getSupplierById(Number(id));

      if (res) {
        setData(res);
      }
    } catch (e) {
      console.log("[Get supplier details] Error", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getSupplierDetail();
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
        <ButtonList resource="suppliers" />
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

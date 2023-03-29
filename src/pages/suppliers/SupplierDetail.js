import { getSupplierById } from "../../apis";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Typography, Card, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ButtonCustom, ButtonReturn } from "../../components/Button";
import _ from "lodash";

const headers = [
  { id: "name", label: "Tên danh mục" },
  { id: "phoneNumber", label: "SDT" },
  { id: "address", label: "Dia chi" },
];

export const SupplierDetail = () => {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState();

  const getSupplierDetail = async () => {
    try {
      const res = await getSupplierById(Number(id));

      if (res) {
        setData(res);
      }
    } catch (e) {
      console.log("====", e);
    }
  };

  useEffect(() => {
    getSupplierDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <ButtonReturn resource="suppliers" />
      </div>
      <Card style={{ padding: 10 }}>
        <Grid container spacing={2}>
          {headers.map((item, idx) => {
            const val = item?.id;
            return (
              <Grid key={idx} item md={6} xs={12}>{`${item.label}: ${_.get(
                data,
                val,
                ""
              )}`}</Grid>
            );
          })}
        </Grid>
      </Card>
    </div>
  );
};

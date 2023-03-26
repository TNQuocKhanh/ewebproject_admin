import { getCategoryById } from "../../apis";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Typography, Card, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ButtonCustom } from "../../components/Button";
import _ from "lodash";

const headers = [
  { id: "name", label: "Tên danh mục" },
  { id: "enabled", label: "Trạng thái" },
];

export const CategoryDetail = () => {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState();

  const getCategoryDetail = async () => {
    const res = await getCategoryById(Number(id));

    if (res) {
      const transform = {
        ...res,
        enabled: res.enabled ? "Hoạt động" : "Không hoạt động",
      };
      setData(transform);
    }
  };

  useEffect(() => {
    getCategoryDetail();
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
        <Link to={"/categories"} style={{ textDecoration: "none" }}>
          <ButtonCustom variant="contained" title="Quay lại" />
        </Link>
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

import { getUserById } from "../../apis";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  Typography,
  Card,
  Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { ButtonCustom } from "../../components/Button";
import _ from "lodash";

const headers = [
  { id: "fullName", label: "Fullname" },
  { id: "email", label: "Email" },
  { id: "roles", label: "Roles" },
];

export const UserDetail = () => {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState();

  const getUserDetail = async () => {
    const res = await getUserById(Number(id));
    console.log("==res", res);
    if (res) {
      setData(res);
    }
  };

  useEffect(() => {
    getUserDetail();
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
        <Link to={"/users"} style={{ textDecoration: "none" }}>
          <ButtonCustom variant="contained" title="Quay lại" />
        </Link>
      </div>
      <Card style={{ padding: 10 }}>
        <Grid container spacing={2}>
          {headers.map((item) => {
            const val = item?.id;
            return <Grid item md={6}>{`${item.label}: ${_.get(data, val, "")}`}</Grid>;
          })}
        </Grid>
      </Card>
    </div>
  );
};

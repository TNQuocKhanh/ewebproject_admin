import { getUserById } from "../../apis";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Typography, Card, Grid } from "@material-ui/core";
import { ButtonList } from "../../components/Button";
import _ from "lodash";
import { Loader } from "../../components/Loader";

const headers = [
  { id: "fullName", label: "Tên người dùng" },
  { id: "email", label: "Email" },
  { id: "roles", label: "Roles" },
];

export const UserDetail = () => {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const getUserDetail = async () => {
    setLoading(true);
    try {
      const res = await getUserById(Number(id));
      if (res) {
        const transform = {
          ...res,
          roles: res.roles[0]?.name,
        };
        setData(transform);
      }
    } catch (e) {
      console.log("===Err", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUserDetail();
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
        <ButtonList resource="users" />
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

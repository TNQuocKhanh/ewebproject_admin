import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import List from "../../components/List";
import { useHistory } from "react-router-dom";
import { storage } from "../../utils";
import { getListCategories } from "../../apis";

const columns = [
  { id: "name", label: "Tên danh mục", minWidth: 170 },
  {
    id: "enabled",
    label: "Trạng thái",
    minWidth: 170,
    customField: true,
    align: "center",
  },
];

export const CategoryList = () => {
  const history = useHistory();
  const [data, setData] = useState([]);

  const getAllCategories = async () => {
    const res = await getListCategories();

    const transform = res.map((item) => ({
      ...item,
      enabled: item.enabled ? "true" : "false",
    }));

    setData(transform);
  };

  const isLogin = storage.load("auth");

  useEffect(() => {
    if (isLogin) {
      getAllCategories();
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <List
            resource="categories"
            columns={columns}
            data={data}
            title="Danh sách danh mục"
          />
        </Grid>
      </Grid>
    </>
  );
};

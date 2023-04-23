import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import List from "../../components/List";
import { getListCategories } from "../../apis";
import { Loader } from "../../components/Loader";

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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllCategories = async () => {
    setLoading(true);
    try {
      const res = await getListCategories();

      const transform = res.map((item) => ({
        ...item,
        enabled: item.enabled ? "true" : "false",
      }));

      setData(transform);
    } catch (e) {
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const transformCsv = [];
  data?.map((it) =>
    transformCsv.push({
      name: it.name,
      enabled: it.enabled === "true" ? true : false,
    })
  );

  if (loading) return <Loader />;

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <List
            resource="categories"
            columns={columns}
            data={data}
            title="Danh sách danh mục"
            dataCsv={transformCsv}
          />
        </Grid>
      </Grid>
    </>
  );
};

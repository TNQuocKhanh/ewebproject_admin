import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import List from "../../components/List";
import { getListCustomers } from "../../apis";
import { Loader } from "../../components";

const columns = [
  { id: "fullName", label: "Tên", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  {
    id: "status",
    label: "Trạng thái",
    minWidth: 170,
    customField: true,
    align: "center",
  },
];

export const CustomerList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllCustomers = async () => {
    setLoading(true);
    try {
      const res = await getListCustomers();
      setData(res || []);
    } catch (e) {
      console.log("[Get customers] Error", e);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const transformCsv = [];
  data?.map((it) =>
    transformCsv.push({
      name: it.fullName,
      email: it.email,
      status: it.status,
    })
  );

  if (loading) return <Loader />;

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <List
            columnAction={false}
            isCreate={false}
            resource="customers"
            columns={columns}
            data={data}
            title="Danh sách khách hàng"
            isLock={true}
            dataCsv={transformCsv}
          />
        </Grid>
      </Grid>
    </>
  );
};

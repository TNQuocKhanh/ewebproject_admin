import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import List from "../../components/List";
import { getListSupplier } from "../../apis";
import { Loader } from "../../components/Loader";

const columns = [
  { id: "name", label: "Tên nhà cung cấp", minWidth: 170 },
  { id: "phoneNumber", label: "Số điện thoại", minWidth: 170 },
  { id: "address", label: "Địa chỉ", minWidth: 170 },
];

export const SupplierList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllSuppliers = async () => {
    setLoading(true);
    try {
      const res = await getListSupplier();

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
    getAllSuppliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const trans = [];
  data?.map((it) =>
    trans.push({
      name: it.name,
      phoneNumber: it.phoneNumber,
      address: it.address,
    })
  );

  if (loading) return <Loader />;

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <List
            resource="suppliers"
            columns={columns}
            data={data}
            title="Danh sách nhà cung cấp"
            dataCsv={trans}
          />
        </Grid>
      </Grid>
    </>
  );
};

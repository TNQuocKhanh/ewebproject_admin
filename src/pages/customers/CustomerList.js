import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import List from "../../components/List";
import { getListCustomers } from "../../apis";
import { Loader } from "../../components";
import { useHistory } from "react-router-dom";
import { ButtonCustom } from "../../components";
import SearchIcon from "@material-ui/icons/Search";

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

const FilterForm = (props) => {
  const { setFilterValues } = props;
  const history = useHistory();

  const [fullName, setFullName] = useState(
    new URLSearchParams(window.location.search).get("fullName") || ""

  );
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = { fullName };
    setFilterValues(value);
    const url = `${window.location.pathname}?` + new URLSearchParams(value);
    history.push(url);
  };

  return (
    <div style={{ padding: "10px" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <TextField
              fullWidth
              label="Tên khách hàng"
              variant="outlined"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
        <div
          style={{
            margin: "20px 0",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <ButtonCustom
            title="Tìm kiếm"
            variant="contained"
            handleClick={handleSubmit}
            icon={<SearchIcon />}
            style={{ backgroundColor: "#556afe", color: "#fff" }}
          />
        </div>
      </form>
    </div>
  );
};

export const CustomerList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterValues, setFilterValues] = useState();

  const getAllCustomers = async () => {
    setLoading(true);
    try {
      const res = await getListCustomers(filterValues);
      setData(res.content);
    } catch (e) {
      console.log("[Get customers] Error", e);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValues]);

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
            filter={<FilterForm setFilterValues={setFilterValues} />}
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

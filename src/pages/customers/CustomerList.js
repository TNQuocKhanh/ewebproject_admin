import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import List from "../../components/List";
import { getListCustomers } from "../../apis";
import { Loader } from "../../components";
import { Form, Field } from "react-final-form";
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

  const handleSubmit = (value) => {
    setFilterValues(value);
    const url = `${window.location.pathname}?` + new URLSearchParams(value);
    history.push(url);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={{
        fullName: new URLSearchParams(window.location.search).get("fullName"),
      }}
      setFilterValue={setFilterValues}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <label>Tên người dùng: </label>
              <Field
                style={{ width: "200px", margin: "5px", height: "30px" }}
                name="fullName"
                component="input"
                type="text"
                placeholder="Tên người dùng"
              />
            </Grid>
          </Grid>
          <div
            className="buttons"
            style={{ margin: "20px 5px", textAlign: "center" }}
          >
            <ButtonCustom
              disabled={submitting || pristine}
              title="Tìm kiếm"
              variant="contained"
              handleClick={handleSubmit}
              icon={<SearchIcon />}
              style={
                pristine ? {} : { backgroundColor: "#556afe", color: "#fff" }
              }
            />
          </div>
        </form>
      )}
    />
  );
};

export const CustomerList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterValues, setFilterValues] = useState({
    fullName: new URLSearchParams(window.location.search).get("fullName") || "",
  });

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

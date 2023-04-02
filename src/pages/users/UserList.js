import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import List from "../../components/List";
import { useHistory } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { ButtonCustom } from "../../components/Button";
import { storage } from "../../utils";
import { getListUsers } from "../../apis";
import LinearProgress from "@material-ui/core/LinearProgress";
import SearchIcon from "@material-ui/icons/Search";

const columns = [
  { id: "fullName", label: "Tên người dùng", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "status",
    minWidth: 170,
    label: "Trạng thái",
    align: "center",
    customField: true,
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

export const UserList = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterValues, setFilterValues] = useState({
    fullName: new URLSearchParams(window.location.search).get("fullName") || "",
  });

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const res = await getListUsers(filterValues);
      setLoading(false);
      setData(res.content);
    } catch (e) {
      setData([]);
    }
  };

  const isLogin = storage.load("auth");

  useEffect(() => {
    if (isLogin) {
      getAllUsers();
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValues]);

  const trans = [];
  data?.map((it) =>
    trans.push({ fullName: it.fullName, email: it.email, status: it.status })
  );

  if (loading) return <LinearProgress />;

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <List
            filter={<FilterForm setFilterValues={setFilterValues} />}
            resource="users"
            isBlock={true}
            columns={columns}
            data={data}
            title="Danh sách người dùng"
            dataCsv={trans}
          />
        </Grid>
      </Grid>
    </>
  );
};

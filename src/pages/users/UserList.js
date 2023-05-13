import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import List from "../../components/List";
import { useHistory } from "react-router-dom";
import { ButtonCustom } from "../../components/Button";
import { getListUsers } from "../../apis";
import SearchIcon from "@material-ui/icons/Search";
import { Loader } from "../../components/Loader";

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
              label="Tên người dùng"
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

export const UserList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterValues, setFilterValues] = useState();

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const res = await getListUsers(filterValues);
      setData(res.content);
    } catch (e) {
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValues]);

  const trans = [];
  data?.map((it) =>
    trans.push({ fullName: it.fullName, email: it.email, status: it.status })
  );

  if (loading) return <Loader />;

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

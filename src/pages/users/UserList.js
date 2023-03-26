import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import List from "../../components/List";
import { useHistory } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { ButtonCustom } from "../../components/Button";
import { storage } from "../../utils";
import { getListUsers } from "../../apis";
import LinearProgress from "@material-ui/core/LinearProgress";
import { ExportToCsv } from "export-to-csv";

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
  const { setFilterValue } = props;

  const handleSubmit = (value) => {
    setFilterValue(value);
  };
  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={{}}
      //initialValues={{ stooge: "larry", employed: false }}
      setFilterValue={setFilterValue}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <label>Tên người dùng</label>
              <Field
                style={{ width: "200px", margin: "5px" }}
                name="fullName"
                component="input"
                type="text"
                placeholder="Tên người dùng"
              />
            </Grid>
            <Grid item xs={4}>
              <label>Email</label>
              <Field
                style={{ width: "200px", margin: "5px" }}
                name="email"
                component="input"
                type="text"
                placeholder="Email"
              />
            </Grid>
            <Grid item xs={4}>
              <label>Trạng thái</label>
              <Field
                name="status"
                component="select"
                style={{ width: "200px", margin: "5px" }}
              >
                <option />
                <option value="sent">Sent</option>
                <option value="pending">Pending</option>
                <option value="declined">Declined</option>
              </Field>
            </Grid>
          </Grid>
          <div
            className="buttons"
            style={{ margin: "20px 5px", textAlign: "center" }}
          >
            <ButtonCustom
              disabled={submitting || pristine}
              title="Tìm"
              variant="contained"
              handleClick={handleSubmit}
            />
            <ButtonCustom
              disabled={submitting || pristine}
              title="Bỏ lọc"
              variant="contained"
              handleClick={form.reset}
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
  //const [filterValues, setFilterValues] = useState();

  const getAllUsers = async () => {
    setLoading(true);
    const res = await getListUsers();
    if (res) {
      setLoading(false);
      setData(res);
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
  }, []);

  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.id),
  };

  const csvExporter = new ExportToCsv(csvOptions);

  let trans = [];
  data.map((it) =>
    trans.push({ fullName: it.fullName, email: it.email, status: it.status })
  );

  const handleExportData = () => {
    csvExporter.generateCsv(trans);
  };

  if (loading) return <LinearProgress />;

  return (
    <>
      <Grid container spacing={4}>
        <button onClick={handleExportData}>Export</button>
        <Grid item xs={12}>
          <List
            //filter={<FilterForm setFilterValues={setFilterValues} />}
            resource="users"
            isBlock={true}
            columns={columns}
            data={data}
            title="Danh sách người dùng"
          />
        </Grid>
      </Grid>
    </>
  );
};

import {
  Select,
  TextField,
  InputLabel,
  FormControl,
  Typography,
  Card,
  Grid,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { getCustomerById, updateCustomer } from "../../apis";
import { ButtonCustom } from "../../components/Button";

export const CustomerEdit = () => {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [status, setStatus] = useState();

  const params = useParams();
  const id = params.id;

  const history = useHistory();

  const getCustomerDetail = async () => {
    const res = await getCustomerById(Number(id));
    setFullName(res.fullName);
    setEmail(res.email);
    setStatus(res.status)
  };

  useEffect(() => {
    getCustomerDetail();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    //updateCustomer(Number(id), { name, enabled: enabled==='true' ? true : false });

    history.push("/categories");
  };
  
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
        <Typography>Cập nhật</Typography>
        <Link to={"/customers"} style={{ textDecoration: "none" }}>
          <ButtonCustom variant="contained" title="Quay lại" />
        </Link>
      </div>
      <Card style={{ padding: 10 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="text"
                label="Tên"
                variant="outlined"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                type="text"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel shrink htmlFor="outlined-age-native-simple">
                  Trạng thái
                </InputLabel>
                <Select
                  notched
                  native
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  label="Trạng thái"
                  InputLabelProps={{ shrink: true }}
                >
                  <option value="true">Hoạt động</option>
                  <option value="false">Không hoạt động</option>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <div style={{ margin: "20px 0" }}>
            <ButtonCustom
            variant='contained'
              type="submit"
              title="Lưu"
            />
          </div>
        </form>
      </Card>
    </div>
  );
}

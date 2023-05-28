import React, { useEffect, useState } from "react";
import { Grid, FormControl, InputLabel, Select } from "@material-ui/core";
import List from "../../../components/List";
import { getProductReportByTime } from "../../../apis";
import { Loader } from "../../../components";
import { formatPrice } from "../../../utils";
import { useHistory } from "react-router-dom";
import { ButtonCustom } from "../../../components";
import SearchIcon from "@material-ui/icons/Search";

const columns = [
  { id: "productName", label: "Tên sản phẩm", minWidth: 170 },
  { id: "totalCost", label: "Giá nhập", minWidth: 170 },
  { id: "totalPrice", label: "Giá bán", minWidth: 170 },
  { id: "profit", label: "Lợi nhuận", minWidth: 170 },
];

const FilterForm = (props) => {
  const { setFilterValues } = props;
  const history = useHistory();

  const [day, setDay] = useState(
    new URLSearchParams(window.location.search).get("day") || 30
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = { day };
    setFilterValues(value);
    const url = `${window.location.pathname}?` + new URLSearchParams(value);
    history.push(url);
  };

  return (
    <div style={{ padding: "10px" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel shrink htmlFor="outlined-age-native-simple">
                Thời gian
              </InputLabel>
              <Select
                notched
                native
                value={day}
                onChange={(e) => setDay(e.target.value)}
                label="Thời gian"
                InputLabelProps={{ shrink: true }}
              >
                <option value={7}>Trong tuần</option>
                <option value={30}>Trong tháng</option>
                <option value={90}>Trong quý</option>
                <option value={365}>Trong năm</option>
              </Select>
            </FormControl>
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

export const ProductReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterValues, setFilterValues] = useState();

  const getProductReporpt = async () => {
    setLoading(true);
    try {
      const res = await getProductReportByTime(filterValues?.day);
      const transform = res.map((it) => ({
        ...it,
        totalCost: formatPrice(it.totalCost),
        totalPrice: formatPrice(it.totalPrice),
        profit: formatPrice(it.profit),
      }));
      setData(transform);
    } catch (err) {
      console.log("[Get product report] Error", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProductReporpt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValues]);

  if (loading) return <Loader />;

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <List
            filter={<FilterForm setFilterValues={setFilterValues} />}
            resource="products"
            columns={columns}
            data={data}
            title="Doanh thu theo sản phẩm"
            isCreate={false}
            isExport={false}
            columnAction={false}
          />
        </Grid>
      </Grid>
    </>
  );
};

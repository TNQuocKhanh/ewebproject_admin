import React, { useEffect, useState } from "react";
import { Button, Card, Grid } from "@material-ui/core";
import useStyles from "./styles";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrapper";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ComposedChart,
} from "recharts";
import { Loader } from "../../components";
import {
  countInDashboard,
  getOrderReportByType,
  getProductReportByTime,
} from "../../apis/report.api";
import { formatDateTime, formatPrice } from "../../utils";

import BookIcon from "@material-ui/icons/Book";
import GroupIcon from "@material-ui/icons/Group";
import PersonIcon from "@material-ui/icons/Person";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

const WEEK = "WEEK";
const MONTH = "MONTH";
const YEAR = "YEAR";

export default function Dashboard(props) {
  var classes = useStyles();

  const [amount, setAmount] = useState({});
  const [type, setType] = useState(WEEK);
  const [dataChart, setDataChart] = useState([]);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAmount = async () => {
    const res = await countInDashboard();
    setAmount(res[0]);
  };

  const getOrderReport = async () => {
    const res = await getOrderReportByType(type);
    setDataChart(res);
  };

  const getProductReporpt = async () => {
    setLoading(true);
    const res = await getProductReportByTime();
    setProductData(res);
    setLoading(false);
  };

  const _dataChart = dataChart.map((item) => {
    return {
      time: formatDateTime(item.time, false),
      net: item.orderReports[0].netSale ? item.orderReports[0].netSale : 0,
      gross: item.orderReports[0].grossSale
        ? item.orderReports[0].grossSale
        : 0,
    };
  });

  useEffect(() => {
    getOrderReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    getAmount();
  }, []);

  useEffect(() => {
    getProductReporpt();
  }, []);

  const DataFormater = (number) => {
    if (number > 1000000000) {
      return (number / 1000000000).toString() + " tỉ";
    } else if (number > 1000000) {
      return (number / 1000000).toString() + " triệu";
    } else if (number > 1000) {
      return (number / 1000).toString() + " nghìn";
    } else {
      return number.toString();
    }
  };
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Card style={{ padding: "5px" }}>
          <p className="label">{label}</p>
          <p className="label">{`${payload[0].name} : ${formatPrice(
            payload[0].value
          )}`}</p>
          <p className="label">{`${payload[1].name} : ${formatPrice(
            payload[1].value
          )}`}</p>
        </Card>
      );
    }

    return null;
  };
  if (loading) return <Loader />;

  return (
    <>
      <PageTitle title="Dashboard" />
      <Grid container spacing={4}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Người dùng"
            upperTitle
            disableWidgetMenu={true}
            bodyClass={classes.fullHeightBody}
            className={classes.card}
            icon={<GroupIcon fontSize="large" color="primary" />}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
                  <Typography size="lg" weight="medium" noWrap>
                    Tổng số:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography size="xl" weight="medium" noWrap>
                    {amount.totalUsers}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Widget>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Sản phẩm"
            upperTitle
            disableWidgetMenu={true}
            bodyClass={classes.fullHeightBody}
            className={classes.card}
            icon={<BookIcon fontSize="large" color="primary" />}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
                  <Typography size="lg" weight="medium" noWrap>
                    Tổng số:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography size="xl" weight="medium" noWrap>
                    {amount.totalProducts}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Widget>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Khách hàng"
            upperTitle
            disableWidgetMenu={true}
            bodyClass={classes.fullHeightBody}
            className={classes.card}
            icon={<PersonIcon fontSize="large" color="primary" />}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
                  <Typography size="lg" weight="medium" noWrap>
                    Tổng số:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography size="xl" weight="medium" noWrap>
                    {amount.totalCustomers}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Widget>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Đơn hàng"
            upperTitle
            disableWidgetMenu={true}
            bodyClass={classes.fullHeightBody}
            className={classes.card}
            icon={<AddShoppingCartIcon fontSize="large" color="primary" />}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
                  <Typography size="lg" weight="medium" noWrap>
                    Tổng số:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography size="xl" weight="medium" noWrap>
                    {amount.totalOrders}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Widget>
        </Grid>
        <Grid item xs={12}>
          <Widget
            bodyClass={classes.mainChartBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography>Doanh thu</Typography>
                <div>
                  <Button variant="outlined" onClick={() => setType(WEEK)}>
                    Trong tuần
                  </Button>
                  <Button
                    variant="outlined"
                    style={{ margin: "0 5px" }}
                    onClick={() => setType(MONTH)}
                  >
                    Trong tháng
                  </Button>
                  <Button variant="outlined" onClick={() => setType(YEAR)}>
                    Trong năm
                  </Button>
                </div>
              </div>
            }
          >
            <LineChart
              width={type === YEAR ? 1000 : 800}
              height={300}
              data={_dataChart}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis tickFormatter={DataFormater} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="net"
                name="Lợi nhuận"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="gross"
                name="Doanh thu"
                stroke="#82ca9d"
              />
            </LineChart>
          </Widget>
        </Grid>
        <Grid item xs={12}>
          <Widget
            bodyClass={classes.mainChartBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography>Doanh thu</Typography>
                <div>
                  <Button variant="outlined" onClick={() => setType(WEEK)}>
                    Trong tuần
                  </Button>
                  <Button
                    variant="outlined"
                    style={{ margin: "0 5px" }}
                    onClick={() => setType(MONTH)}
                  >
                    Trong tháng
                  </Button>
                  <Button variant="outlined" onClick={() => setType(YEAR)}>
                    Trong năm
                  </Button>
                </div>
              </div>
            }
          >
            <BarChart
              width={type === YEAR ? 1000 : 800}
              height={400}
              data={_dataChart}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis tickFormatter={DataFormater} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="net" name="Lợi nhuận" fill="#8884d8" />
              <Bar dataKey="gross" name="Doanh thu" fill="#82ca9d" />
            </BarChart>
          </Widget>
        </Grid>
        <Grid item xs={12}>
          <Widget
            bodyClass={classes.mainChartBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography>Sản phẩm trong tuần</Typography>
              </div>
            }
          >
            <ComposedChart
              layout="vertical"
              width={800}
              height={500}
              data={productData}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis type="number" tickFormatter={DataFormater} />
              <YAxis dataKey="productName" type="category" scale="band" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="totalPrice"
                name="Giá bán"
                barSize={20}
                fill="#8884d8"
              />
              <Bar
                dataKey="totalCost"
                name="Giá nhập"
                barSize={20}
                fill="#82ca9d"
              />
              <Line dataKey="profit" name="Lợi nhuận" />
            </ComposedChart>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}

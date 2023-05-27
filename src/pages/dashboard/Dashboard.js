import React, { useEffect, useState, useCallback } from "react";
import { Button, Card, Grid } from "@material-ui/core";
import useStyles from "./styles";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrapper";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  Area,
  AreaChart,
  Pie,
  Sector,
  PieChart,
} from "recharts";
import { Loader } from "../../components";
import {
  countInDashboard,
  getCategoryReport,
  getOrderReportByType,
  getOrderReportByTypePlus,
} from "../../apis/report.api";
import { formatDateTime, formatPrice } from "../../utils";

import { useCurrentPng } from "recharts-to-png";
import FileSaver from "file-saver";

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
  const [areaChart, setAreaChart] = useState([]);
  const [circleData, setCircleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeNetIndex, setActiveNexIndex] = useState(0);
  const [activeGrossIndex, setActiveGrossIndex] = useState(0);

  const [getAreaPng, { ref: areaRef }] = useCurrentPng();
  const [getBarPng, { ref: barRef }] = useCurrentPng();

  const handleAreaDownload = useCallback(async () => {
    const png = await getAreaPng();
    if (png) {
      FileSaver.saveAs(png, "report-avenue-profit.png");
    }
  }, [getAreaPng]);

  const handleBarDownload = useCallback(async () => {
    const png = await getBarPng();
    if (png) {
      FileSaver.saveAs(png, "report-avenue-profit-bar-chart.png");
    }
  }, [getBarPng]);

  const getAmount = async () => {
    try {
      const res = await countInDashboard();
      setAmount(res[0]);
    } catch (err) {
      console.log("[Get amount] Error", err);
    }
  };

  const getOrderReport = async () => {
    try {
      const res = await getOrderReportByType(type);
      setDataChart(res);
    } catch (err) {
      console.log("[Get order report] Error", err);
    }
  };

  const getOrderReportPlus = async () => {
    try {
      const res = await getOrderReportByTypePlus(type);
      setAreaChart(res);
    } catch (err) {
      console.log("[Get order report plus] Error", err);
    }
  };

  const getReportByCategory = async () => {
    setLoading(true);
    try {
      const res = await getCategoryReport();
      setCircleData(res);
    } catch (err) {
      console.log("[Get report by category] Error", err);
    }
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

  const _areaChart = areaChart.map((item) => {
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
    getOrderReportPlus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    getAmount();
  }, []);

  useEffect(() => {
    getReportByCategory();
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

  const renderActiveNetShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.categoryName}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`Lợi nhuận ${formatPrice(value)}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Tỷ lệ ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const renderActiveGrossShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.categoryName}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`Doanh thu ${formatPrice(value)}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Tỷ lệ ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
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
                  <Button
                    variant="outlined"
                    style={type === WEEK ? { background: "#e8deff" } : {}}
                    onClick={() => setType(WEEK)}
                  >
                    Trong tuần
                  </Button>
                  <Button
                    variant="outlined"
                    style={
                      type === MONTH
                        ? { background: "#e8deff", margin: "0 5px" }
                        : { margin: "0 5px" }
                    }
                    onClick={() => setType(MONTH)}
                  >
                    Trong tháng
                  </Button>
                  <Button
                    style={type === YEAR ? { background: "#e8deff" } : {}}
                    variant="outlined"
                    onClick={() => setType(YEAR)}
                  >
                    Trong năm
                  </Button>
                </div>
              </div>
            }
          >
            <AreaChart
              ref={areaRef}
              width={type === YEAR ? 1000 : 800}
              height={300}
              data={_areaChart}
              margin={{
                top: 10,
                right: 30,
                left: 10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis tickFormatter={DataFormater} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="net"
                stackId="1"
                name="Lợi nhuận"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="gross"
                stackId="1"
                i
                name="Doanh thu"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
            </AreaChart>
            <div>
              <Button
                onClick={handleAreaDownload}
                variant="outlined"
                style={{ margin: "20px 0" }}
              >
                <code>Xuất biểu đồ</code>
              </Button>
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
                  <Button
                    variant="outlined"
                    style={type === WEEK ? { background: "#e8deff" } : {}}
                    onClick={() => setType(WEEK)}
                  >
                    Trong tuần
                  </Button>
                  <Button
                    variant="outlined"
                    style={
                      type === MONTH
                        ? { background: "#e8deff", margin: "0 5px" }
                        : { margin: "0 5px" }
                    }
                    onClick={() => setType(MONTH)}
                  >
                    Trong tháng
                  </Button>
                  <Button
                    style={type === YEAR ? { background: "#e8deff" } : {}}
                    variant="outlined"
                    onClick={() => setType(YEAR)}
                  >
                    Trong năm
                  </Button>
                </div>
              </div>
            }
          >
            <BarChart
              ref={barRef}
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
            <div>
              <Button
                onClick={handleBarDownload}
                variant="outlined"
                style={{ margin: "20px 0" }}
              >
                <code>Xuất biểu đồ</code>
              </Button>
            </div>
          </Widget>
        </Grid>
        <Grid item xs={12}>
          <Widget
            bodyClass={classes.mainChartBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography>Danh mục sản phẩm</Typography>
              </div>
            }
          >
            <Grid container>
              <Grid item md={6} xs={12}>
                <PieChart width={600} height={500}>
                  <Pie
                    activeIndex={activeGrossIndex}
                    activeShape={renderActiveGrossShape}
                    data={circleData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="grossSale"
                    onMouseEnter={(_, index) => setActiveGrossIndex(index)}
                  />
                </PieChart>
              </Grid>
              <Grid item md={6} xs={12}>
                <PieChart width={600} height={500}>
                  <Pie
                    activeIndex={activeNetIndex}
                    activeShape={renderActiveNetShape}
                    data={circleData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#82ca9d"
                    dataKey="netSale"
                    onMouseEnter={(_, index) => setActiveNexIndex(index)}
                  />
                </PieChart>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}

import React, { cloneElement } from "react";
import { Typography, IconButton, Grid, Card } from "@material-ui/core";
import Widget from "./Widget";
import { makeStyles } from "@material-ui/styles";
import { ButtonCustom } from "./Button";
import { Link } from "react-router-dom";
import { HeaderAction } from "./HeaderAction";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddIcon from "@material-ui/icons/Add";
import GetAppIcon from "@material-ui/icons/GetApp";
import _ from "lodash";
import LockIcon from "@material-ui/icons/Lock";
import { blockUser, unblockUser } from "../apis";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { getStatus } from "../utils";

const useStyles = makeStyles((theme) => ({
  tableOverflow: {
    overflow: "auto",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "20px 0",
  },
}));

export const MobileList = ({
  title,
  filter,
  data,
  columns,
  resource,
  isCreate,
  isBlock,
}) => {
  const classes = useStyles();
  const handleBlock = (row) => {
    console.log("===", row);
    blockUser(row.id);
  };

  const handleUnblock = (row) => {
    unblockUser(row.id);
  };
  return (
    <>
      <HeaderAction
        title={title}
        actions={
          <div>
            {isCreate && (
              <Link
                to={`/${resource}/create`}
                style={{ textDecoration: "none" }}
              >
                <ButtonCustom
                  style={{
                    backgroundColor: "#556afe",
                    color: "#fff",
                    width: "fit-content",
                  }}
                  icon={<AddIcon />}
                  title="Tạo mới"
                  variant="contained"
                />
              </Link>
            )}
            <ButtonCustom
              style={{
                backgroundColor: "#556afe",
                color: "#fff",
                marginLeft: 5,
              }}
              icon={<GetAppIcon />}
              title="Export"
              variant="contained"
            />
          </div>
        }
      />

      <Widget
        noBodyPadding
        disableWidgetMenu={true}
        bodyClass={classes.tableOverflow}
      >
        {filter && cloneElement(filter)}
        <Typography style={{ margin: "10px" }}>
          Tổng số bản ghi: {data.length}{" "}
        </Typography>
        <hr />
        {data.length > 0 ? (
          data.map((it, idx) => (
            <Card key={idx} style={{ padding: 10, margin: 10 }}>
              <Grid container spacing={2}>
                {columns.map((item, idx) => {
                  const val = item?.id;
                  const result = item.customField
                    ? getStatus(it.status).text
                    : _.get(it, val, "");
                  return (
                    <Grid
                      key={idx}
                      item
                      xs={12}
                    >{`${item.label}: ${result}`}</Grid>
                  );
                })}
                <Link to={`/${resource}/${it.id}/edit`}>
                  <IconButton>
                    <EditIcon fontSize="small" color="primary" />
                  </IconButton>
                </Link>
                <Link to={`/${resource}/${it.id}/detail`}>
                  <IconButton>
                    <VisibilityIcon fontSize="small" color="primary" />
                  </IconButton>
                </Link>
                {isBlock && it.status === "STATUS_BLOCKED" ? (
                  <IconButton onClick={() => handleUnblock(it)}>
                    <LockOpenIcon fontSize="small" color="primary" />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => handleBlock(it)}>
                    <LockIcon fontSize="small" color="primary" />
                  </IconButton>
                )}
              </Grid>
            </Card>
          ))
        ) : (
          <div>Không có bản ghi nào</div>
        )}
      </Widget>
    </>
  );
};

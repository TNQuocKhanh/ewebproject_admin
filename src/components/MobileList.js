import React, { cloneElement } from "react";
import { Typography, IconButton, Grid, Card } from "@material-ui/core";
import Widget from "./Widget";
import { makeStyles } from "@material-ui/styles";
import { ButtonCreate, IconButtonDetail, IconButtonEdit } from "./Button";
import { HeaderAction } from "./HeaderAction";
import _ from "lodash";
import LockIcon from "@material-ui/icons/Lock";
import { blockUser } from "../apis";
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
  columnAction,
}) => {
  const classes = useStyles();
  const handleBlock = (row) => {
    blockUser(row.id, { status: "STATUS_BLOCKED" });
  };

  const handleUnblock = (row) => {
    blockUser(row.id, { status: "STATUS_ACTIVE" });
  };
  return (
    <>
      <HeaderAction
        title={title}
        actions={<div>{isCreate && <ButtonCreate resource={resource} />}</div>}
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
                {columnAction && (
                  <>
                    <IconButtonEdit resource={resource} row={it} />
                    <IconButtonDetail resource={resource} row={it} />
                  </>
                )}
                {isBlock ? (
                  <>
                    {it.status === "STATUS_BLOCKED" ? (
                      <IconButton onClick={() => handleUnblock(it)}>
                        <LockOpenIcon fontSize="small" color="primary" />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleBlock(it)}>
                        <LockIcon fontSize="small" color="primary" />
                      </IconButton>
                    )}
                  </>
                ) : (
                  ""
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

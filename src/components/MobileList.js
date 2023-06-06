import React, { cloneElement, useState } from "react";
import { Typography, IconButton, Grid, Card } from "@material-ui/core";
import Widget from "./Widget";
import { makeStyles } from "@material-ui/styles";
import { ButtonCreate, IconButtonDetail, IconButtonEdit } from "./Button";
import { HeaderAction } from "./HeaderAction";
import _ from "lodash";
import LockIcon from "@material-ui/icons/Lock";
import { blockUser, blockCustomer, deleteVoucher } from "../apis";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { getStatus } from "../utils";
import { ConfirmDialog } from "./ConfirmDialog";
import DeleteIcon from "@material-ui/icons/Delete";

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
  isLock,
  isExport,
  isDelete,
}) => {
  const classes = useStyles();

  const [idBlock, setIdBlock] = useState();
  const [open, setOpen] = useState();

  const [openCustomer, setOpenCustomer] = useState(false);
  const [idCustomer, setIdCustomer] = useState();

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleOpenDelete = (row) => {
    setOpenDelete(true);
    setDeleteId(row.id);
  };

  const handleDeleteVoucher = async (id) => {
    try {
      await deleteVoucher(id);
    } catch (err) {
      console.log("[deleteVoucher] error", err);
    }
    setOpenDelete(false);
  };

  const handleClick = (row) => {
    try {
      if (row.status === "STATUS_ACTIVE") {
        blockUser(row.id, { status: "STATUS_BLOCKED" });
      } else {
        blockUser(row.id, { status: "STATUS_ACTIVE" });
      }
    } catch (err) {
      console.log("[Block or unblock user] Error", err);
    }
    setOpen(false);
  };

  const handleBlockCustomer = async (row) => {
    try {
      if (row.status !== "STATUS_BLOCKED") {
        await blockCustomer(row.id, { status: "STATUS_BLOCKED" });
      } else {
        await blockUser(row.id, { status: "STATUS_ACTIVE" });
      }
    } catch (err) {
      console.log("[Block or unblock customer] Error", err);
    }
    setOpenCustomer(false);
  };

  const handleOpen = (row) => {
    setOpen(true);
    setIdBlock(row);
  };

  const handleOpenCustomer = (row) => {
    setOpenCustomer(true);
    setIdCustomer(row);
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
                {isDelete && (
                  <>
                    <IconButton onClick={() => handleOpenDelete(it)}>
                      <DeleteIcon fontSize="small" color="primary" />
                    </IconButton>
                  </>
                )}
                {isBlock && it?.roles[0]?.id !== 1 ? (
                  <>
                    {it.status === "STATUS_BLOCKED" ? (
                      <IconButton onClick={() => handleOpen(it)}>
                        <LockOpenIcon fontSize="small" color="primary" />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleOpen(it)}>
                        <LockIcon fontSize="small" color="primary" />
                      </IconButton>
                    )}
                  </>
                ) : (
                  ""
                )}

                {isLock && (
                  <>
                    {it.status === "STATUS_BLOCKED" ? (
                      <IconButton onClick={() => handleOpenCustomer(it)}>
                        <LockOpenIcon fontSize="small" color="primary" />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleOpenCustomer(it)}>
                        <LockIcon fontSize="small" color="primary" />
                      </IconButton>
                    )}
                  </>
                )}
              </Grid>
            </Card>
          ))
        ) : (
          <div>Không có bản ghi nào</div>
        )}
        <ConfirmDialog
          open={open}
          message={"Bạn có chắc chắn muốn khoá/mở khoá người dùng này?"}
          handleClose={() => setOpen(false)}
          handleClick={() => handleClick(idBlock)}
        />
        <ConfirmDialog
          open={openCustomer}
          message={"Bạn có chắc chắn muốn khoá/mở khoá khách hàng này?"}
          handleClose={() => setOpenCustomer(false)}
          handleClick={() => handleBlockCustomer(idCustomer)}
        />
        <ConfirmDialog
          open={openDelete}
          message={"Bạn có chắc chắn muốn xoá mã giảm giá này?"}
          handleClose={() => setOpenDelete(false)}
          handleClick={() => handleDeleteVoucher(deleteId)}
        />
      </Widget>
    </>
  );
};

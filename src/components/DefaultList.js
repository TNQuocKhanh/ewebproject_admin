import React, { cloneElement, useState } from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip,
  Typography,
  TablePagination,
  TableContainer,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import Widget from "./Widget";
import { makeStyles } from "@material-ui/styles";
import { ButtonExport, IconButtonDetail, IconButtonEdit } from "./Button";
import { HeaderAction } from "./HeaderAction";
import LockIcon from "@material-ui/icons/Lock";
import { blockCustomer, blockUser } from "../apis";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { getStatus } from "../utils";
import { ButtonCreate } from "./Button";
import { ConfirmDialog } from "./ConfirmDialog";
import { toast } from "react-toastify";
import { Toastify } from "./Toastify";
import Divider from '@material-ui/core/Divider';

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

export const DefaultList = ({
  data = [],
  title,
  columns,
  filter,
  resource,
  isCreate,
  isBlock,
  dataCsv,
  columnAction,
  isLock,
  isExport
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [open, setOpen] = useState(false);
  const [idBlock, setIdBlock] = useState();

  const [openCustomer, setOpenCustomer] = useState(false);
  const [idCustomer, setIdCustomer] = useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = (row) => {
    setOpen(true);
    setIdBlock(row);
  };

  const handleOpenCustomer = (row) => {
    setOpenCustomer(true);
    setIdCustomer(row);
  };

  const handleClick =async (row) => {
    try {
      if (row.status === "STATUS_ACTIVE") {
        await blockUser(row.id, { status: "STATUS_BLOCKED" });
        toast.success("Khoá người dùng thành công");
      } else {
        await blockUser(row.id, { status: "STATUS_ACTIVE" });
        toast.success("Mở khoá người dùng thành công");
      }
    } catch (err) {
      console.log("[Block or unblock user] Error", err);
      toast.error("Có lỗi xảy ra");
    }
    setOpen(false);
  };

  const handleBlockCustomer = async (row) => {
    try {
      if (row.status !== "STATUS_BLOCKED") {
        await blockCustomer(row.id, { status: "STATUS_BLOCKED" });
        toast.success("Khoá khách hàng thành công");
      } else {
        await blockCustomer(row.id, { status: "STATUS_ACTIVE" });
        toast.success("Mở khoá khách hàng thành công");
      }
    } catch (err) {
      console.log("[Block or unblock customer] Error", err);
      toast.error("Có lỗi xảy ra");
    }
    setOpenCustomer(false);
  };

  return (
    <>
      <HeaderAction
        title={title}
        actions={
          <div className={classes.actions}>
            {isCreate && <ButtonCreate resource={resource} />}
            {isExport && <ButtonExport columns={columns} transformCsv={dataCsv} />}
          </div>
        }
      />

      <Widget
        noBodyPadding
        disableWidgetMenu={true}
        bodyClass={classes.tableOverflow}
      >
        {filter && cloneElement(filter)}
      <Divider />
      {data && data.length > 0 && (
          <Typography style={{ margin: "10px" }}>
            Tổng số bản ghi: {data.length || 0}
          </Typography>
        )}
        {data.length > 0 ? (
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, idx) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell>{idx + 1}</TableCell>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.customField ? (
                                <Chip
                                  label={getStatus(value).text}
                                  style={{
                                    backgroundColor: `${
                                      getStatus(value).color
                                    }`,
                                  }}
                                />
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                        <TableCell>
                          {columnAction && (
                            <>
                              <IconButtonEdit resource={resource} row={row} />
                              <IconButtonDetail resource={resource} row={row} />
                            </>
                          )}
                          {isBlock && row?.roles[0]?.id !== 1 ? (
                            <>
                              {row.status === "STATUS_BLOCKED" ? (
                                <Tooltip title="Mở khoá">
                                  <IconButton onClick={() => handleOpen(row)}>
                                    <LockOpenIcon
                                      fontSize="small"
                                      color="primary"
                                    />
                                  </IconButton>
                                </Tooltip>
                              ) : (
                                <Tooltip title="Khoá">
                                  <IconButton onClick={() => handleOpen(row)}>
                                    <LockIcon
                                      fontSize="small"
                                      color="primary"
                                    />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </>
                          ) : (
                            ""
                          )}
                          {isLock && (
                            <>
                              {row.status === "STATUS_BLOCKED" ? (
                                <Tooltip title="Mở khoá">
                                  <IconButton
                                    onClick={() => handleOpenCustomer(row)}
                                  >
                                    <LockOpenIcon
                                      fontSize="small"
                                      color="primary"
                                    />
                                  </IconButton>
                                </Tooltip>
                              ) : (
                                <Tooltip title="Khoá">
                                  <IconButton
                                    onClick={() => handleOpenCustomer(row)}
                                  >
                                    <LockIcon
                                      fontSize="small"
                                      color="primary"
                                    />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <>Không có bản ghi nào</>
        )}
        {data.length > 0 && (
          <TablePagination
            labelRowsPerPage="Hiển thị"
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
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
        <Toastify />
      </Widget>
    </>
  );
};

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
} from "@material-ui/core";
import Widget from "./Widget";
import { makeStyles } from "@material-ui/styles";
import { ButtonExport, IconButtonDetail, IconButtonEdit } from "./Button";
import { HeaderAction } from "./HeaderAction";
import LockIcon from "@material-ui/icons/Lock";
import { blockUser } from "../apis";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { getStatus } from "../utils";
import { ButtonCreate } from "./Button";

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
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
        actions={
          <div className={classes.actions}>
            {isCreate && <ButtonCreate resource={resource} />}
            <ButtonExport columns={columns} transformCsv={dataCsv} />
          </div>
        }
      />

      <Widget
        noBodyPadding
        disableWidgetMenu={true}
        bodyClass={classes.tableOverflow}
      >
        {filter && cloneElement(filter)}
        <hr />
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
                          {isBlock ? (
                            <>
                              {row.status === "STATUS_BLOCKED" ? (
                                <IconButton onClick={() => handleUnblock(row)}>
                                  <LockOpenIcon
                                    fontSize="small"
                                    color="primary"
                                  />
                                </IconButton>
                              ) : (
                                <IconButton onClick={() => handleBlock(row)}>
                                  <LockIcon fontSize="small" color="primary" />
                                </IconButton>
                              )}
                            </>
                          ) : (
                            ""
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
      </Widget>
    </>
  );
};

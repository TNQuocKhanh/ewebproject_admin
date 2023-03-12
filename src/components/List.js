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
import { ButtonCustom } from "./Button";
import { Link } from "react-router-dom";
import { HeaderAction } from "./HeaderAction";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddIcon from "@material-ui/icons/Add";
import GetAppIcon from "@material-ui/icons/GetApp";

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

export default function List({ data, title, columns, filter, resource }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  //const [filterValue, setFilterValue] = useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getStatus = (value) => {
    switch (value) {
      case "STATUS_ACTIVE":
        return { text: "Hoạt động", color: "#eaf6f9" };
      case "STATUS_LOGOUT":
        return { text: "Đã đăng xuất", color: "#a2dea7" };
      case "true":
        return { text: "Hoạt động", color: "#eaf6f9" };
      case "false":
        return { text: "Không hoạt động", color: "#d7d8da" };
      default:
        return { text: "Không xác định", color: "#d7d8da" };
    }
  };

  return (
    <>
      <HeaderAction
        title={title}
        actions={
          <div className={classes.actions}>
            <Link to={`/${resource}/create`} style={{ textDecoration: "none" }}>
              <ButtonCustom
                style={{ backgroundColor: "#556afe", color: "#fff" }}
                icon={<AddIcon />}
                title="Tạo mới"
                variant="contained"
              />
            </Link>
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
        <hr />
        {data.length > 0 && (
          <Typography style={{margin: '10px'}}>Tổng số bản ghi: {data.length} </Typography>
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
                          <Link to={`/${resource}/${row.id}/edit`}>
                            <IconButton>
                              <EditIcon fontSize="small" color="primary" />
                            </IconButton>
                          </Link>
                          <Link to={`/${resource}/${row.id}/detail`}>
                            <IconButton>
                              <VisibilityIcon
                                fontSize="small"
                                color="primary"
                              />
                            </IconButton>
                          </Link>
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
}

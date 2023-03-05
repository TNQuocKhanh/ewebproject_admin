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
import { Link} from "react-router-dom";
import { HeaderAction } from "./HeaderAction";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddIcon from "@material-ui/icons/Add";
import GetAppIcon from "@material-ui/icons/GetApp";
//import { downloadUserList } from "../apis/user.api";

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

export default function List({ data, title, columns, filter }) {
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

  //const handleDownload =async () => {
  //const res = await downloadUserList()

  //console.log('===res', res)
  //}

  return (
    <>
      <HeaderAction
        title={title}
        actions={
          <div className={classes.actions}>
            <Link to="/user/create" style={{ textDecoration: "none" }}>
              <ButtonCustom
                icon={<AddIcon />}
                title="Tạo mới"
                variant="contained"
              />
            </Link>
            <ButtonCustom
              //handleClick={handleDownload}
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
        <Typography>Tổng số bản ghi: {data.length} </Typography>
        { 
          data.length > 0 ? 
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
              {data.length > 0 ? (
                data
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
                                <Chip label={value} />
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                        <TableCell>
                          <Link to={`/user/${row.id}/edit`}>
                            <IconButton>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Link>
                          <Link to={`/user/${row.id}/detail`}>
                            <IconButton>
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <>Khong co ban ghi nao</>
              )}
            </TableBody>
          </Table>
        </TableContainer> : <>No record</>
        }
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
      </Widget>
    </>
  );
}

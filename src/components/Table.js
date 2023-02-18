import React, { useState } from "react";
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
  Grid,
} from "@material-ui/core";
import Widget from "./Widget";
import { Form, Field } from "react-final-form";
import {makeStyles} from "@material-ui/styles";
import { ButtonCustom } from "./Button";

const useStyles = makeStyles(theme => ({
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

const HeaderAction = (props) => {
  const { title, actions } = props;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">{title}</Typography>
      {actions && actions}
    </div>
  );
};
const columns = [
  { id: "firstName", label: "First Name", minWidth: 170 },
  { id: "lastName", label: "Last Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  //{
    //id: "roles",
    //label: "Product",
    //minWidth: 170,
    //align: "center",
    //isArray: true,
  //},
  {
    id: "status",
    minWidth: 170,
    label: "Status",
    align: "center",
    customField: true,
  },
];

const FilterForm = (props) => {
  const { setFilterValue } = props;

  const handleSubmit = (value) => {
    setFilterValue(value);
  };
  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={{ stooge: "larry", employed: false }}
      setFilterValue={setFilterValue}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item>
              <label>First Name</label>
              <Field
                name="name"
                component="input"
                type="text"
                placeholder="Name"
              />
            </Grid>
            <Grid item>
              <label>Email</label>
              <Field
                name="email"
                component="input"
                type="text"
                placeholder="Email"
              />
            </Grid>
            <Grid item>
              <label>Status</label>
              <Field name="status" component="select">
                <option />
                <option value="sent">Sent</option>
                <option value="pending">Pending</option>
                <option value="declined">Declined</option>
              </Field>
            </Grid>
          </Grid>
          <div className="buttons" style={{margin: '20px 5px', textAlign: 'center'}}>
            <ButtonCustom
            disabled={submitting || pristine}
              title="Submit"
              variant="contained"
              handleClick={handleSubmit}
            />
              <ButtonCustom
              disabled={submitting || pristine}
              title="Reset"
              variant="contained"
              handleClick={form.reset}
            />
          </div>
        </form>
      )}
    />
  );
};

export default function TableComponent({ data, title }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [filterValue, setFilterValue] = useState();

  //const filter = useMemo(() => {
    //if (filterValue) {
      //let val = filterValue;
      //console.log("====val", val);
      //if (page !== 1) setPage(1);
      //return val;
    //}
  //}, [filterValue, page]);

  console.log("==filter", filterValue);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <HeaderAction
        title={title}
        actions={
          <div className={classes.actions}>
              <ButtonCustom
              title="Create"
              variant="contained"
            />
              <ButtonCustom
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
        <FilterForm setFilterValue={setFilterValue} />

        <hr />

        <Typography>Tong so ban ghi: {data.length} </Typography>
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
                <TableCell>ACTIONS</TableCell>
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
                              <Chip label={value} />
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <button onClick={() => console.log("===", row)}>
                          Edit
                        </button>
                        <button>Detail</button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Widget>
    </>
  );
}

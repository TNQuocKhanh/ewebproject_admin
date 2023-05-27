import { Button, IconButton, Tooltip } from "@material-ui/core";
//import useMediaQuery from '@material-ui/core/useMediaQuery';
//import { useTheme } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import GetAppIcon from "@material-ui/icons/GetApp";
import { ExportToCsv } from "export-to-csv";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SaveIcon from "@material-ui/icons/Save";
import ListIcon from "@material-ui/icons/List";

export const ButtonCustom = (props) => {
  const {
    title,
    variant = "outlined",
    size = "small",
    icon,
    handleClick,
    mLeft = false,
    disabled,
  } = props;

  //const theme = useTheme()
  //const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Button
      {...props}
      disabled={disabled}
      variant={variant}
      size={size}
      startIcon={icon}
      onClick={handleClick}
      sx={mLeft ? { marginLeft: 2 } : {}}
    >
      {title}
    </Button>
  );
};

export const ButtonCreate = (props) => {
  const { resource } = props;

  return (
    <Link to={`/${resource}/create`} style={{ textDecoration: "none" }}>
      <ButtonCustom
        style={{ backgroundColor: "#556afe", color: "#fff" }}
        icon={<AddIcon />}
        title="Tạo mới"
        variant="contained"
      />
    </Link>
  );
};

export const ButtonReturn = (props) => {
  const { resource } = props;

  return (
    <Link to={`/${resource}`} style={{ textDecoration: "none" }}>
      <ButtonCustom
        style={{ backgroundColor: "#556afe", color: "#fff" }}
        icon={<ArrowBackIcon />}
        title="Quay lại"
        variant="contained"
      />
    </Link>
  );
};

export const ButtonList = (props) => {
  const { resource } = props;

  return (
    <Link to={`/${resource}`} style={{ textDecoration: "none" }}>
      <ButtonCustom
        style={{ backgroundColor: "#556afe", color: "#fff" }}
        icon={<ListIcon />}
        title="Về danh sách"
        variant="contained"
      />
    </Link>
  );
};

export const ButtonDetail = (props) => {
  const { resource } = props;

  return (
    <Link to={`/${resource}`} style={{ textDecoration: "none" }}>
      <ButtonCustom
        style={{
          backgroundColor: "#556afe",
          color: "#fff",
          marginRight: "5px",
        }}
        icon={<VisibilityIcon />}
        title="Chi tiết"
        variant="outlined"
      />
    </Link>
  );
};

export const ButtonEdit = (props) => {
  const { resource } = props;

  return (
    <Link to={`/${resource}`} style={{ textDecoration: "none" }}>
      <ButtonCustom
        style={{
          backgroundColor: "#556afe",
          color: "#fff",
          marginRight: "5px",
        }}
        icon={<EditIcon />}
        title="Cập nhật"
        variant="outlined"
      />
    </Link>
  );
};

export const ButtonSave = (props) => {
  return (
    <ButtonCustom
      style={{ backgroundColor: "#556afe", color: "#fff" }}
      icon={<SaveIcon />}
      title="Lưu"
      type="submit"
      variant="contained"
    />
  );
};

export const ButtonExport = (props) => {
  const { columns, transformCsv } = props;

  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.id),
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportData = () => {
    csvExporter.generateCsv(transformCsv);
  };

  return (
    <ButtonCustom
      style={{
        backgroundColor: "#556afe",
        color: "#fff",
        marginLeft: 5,
      }}
      icon={<GetAppIcon />}
      title="Xuất"
      handleClick={handleExportData}
    />
  );
};

export const IconButtonEdit = (props) => {
  const { resource, row } = props;

  return (
    <Link to={`/${resource}/${row.id}/edit`}>
      <Tooltip title="Cập nhật">
        <IconButton>
          <EditIcon fontSize="small" color="primary" />
        </IconButton>
      </Tooltip>
    </Link>
  );
};

export const IconButtonDetail = (props) => {
  const { resource, row } = props;

  return (
    <Link to={`/${resource}/${row.id}/detail`}>
      <Tooltip title="Chi tiết">
        <IconButton>
          <VisibilityIcon fontSize="small" color="primary" />
        </IconButton>
      </Tooltip>
    </Link>
  );
};

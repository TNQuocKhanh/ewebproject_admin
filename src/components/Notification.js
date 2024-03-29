import React from "react";
import { Button } from "@material-ui/core";
import {
  NotificationsNone as NotificationsIcon,
  ThumbUp as ThumbUpIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalOffer as TicketIcon,
  BusinessCenter as DeliveredIcon,
  SmsFailed as FeedbackIcon,
  DiscFull as DiscIcon,
  Email as MessageIcon,
  Report as ReportIcon,
  Error as DefenceIcon,
  AccountBox as CustomerIcon,
  Done as ShippedIcon,
  Publish as UploadIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import classnames from "classnames";
import tinycolor from "tinycolor2";
import { Link, useHistory } from "react-router-dom";

// styles
import { makeStyles } from "@material-ui/styles";
// components
import { Typography } from "./Wrapper";
import { formatDateTime } from "../utils";

const useStyles = makeStyles((theme) => ({
  notificationContainer: {
    display: "flex",
    alignItems: "center",
  },
  notificationContained: {
    borderRadius: 45,
    height: 45,
    boxShadow: theme.customShadows.widgetDark,
  },
  notificationContainedShadowless: {
    boxShadow: "none",
  },
  notificationIconContainer: {
    minWidth: 45,
    height: 45,
    borderRadius: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
  },
  notificationIconContainerContained: {
    fontSize: 18,
    color: "#FFFFFF80",
  },
  notificationIconContainerRounded: {
    marginRight: theme.spacing(2),
  },
  containedTypography: {
    color: "white",
  },
  messageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: 1,
    textDecoration: "none",
  },
  extraButton: {
    color: "white",
    "&:hover, &:focus": {
      background: "transparent",
    },
  },
}));
const typesIcons = {
  "e-commerce": <ShoppingCartIcon />,
  notification: <NotificationsIcon />,
  offer: <TicketIcon />,
  info: <ThumbUpIcon />,
  message: <MessageIcon />,
  feedback: <FeedbackIcon />,
  customer: <CustomerIcon />,
  shipped: <ShippedIcon />,
  delivered: <DeliveredIcon />,
  defence: <DefenceIcon />,
  report: <ReportIcon />,
  upload: <UploadIcon />,
  disc: <DiscIcon />,
};

export default function Notification({ variant, ...props }) {
  const { orderTime, id, receiver, status } = props;

  const history = useHistory();

  var classes = useStyles();
  var theme = useTheme();

  const icon = getIconByType(props.type);
  const iconWithStyles = React.cloneElement(icon, {
    classes: {
      root: classes.notificationIcon,
    },
    style: {
      color:
        variant !== "contained" &&
        theme.palette[props.color] &&
        theme.palette[props.color].main,
    },
  });

  return (
    <div
      className={classnames(classes.notificationContainer, props.className, {
        [classes.notificationContained]: variant === "contained",
        [classes.notificationContainedShadowless]: props.shadowless,
      })}
      style={{
        backgroundColor:
          variant === "contained" &&
          theme.palette[props.color] &&
          theme.palette[props.color].main,
      }}
    >
      <div
        className={classnames(classes.notificationIconContainer, {
          [classes.notificationIconContainerContained]: variant === "contained",
          [classes.notificationIconContainerRounded]: variant === "rounded",
        })}
        style={{
          backgroundColor:
            variant === "rounded" &&
            theme.palette[props.color] &&
            tinycolor(theme.palette[props.color].main)
              .setAlpha(0.15)
              .toRgbString(),
        }}
      >
        {iconWithStyles}
      </div>
      {!id ? (
        <Link to={`/orders`} className={classes.messageContainer}>
          <Typography
            className={classnames({
              [classes.containedTypography]: variant === "contained",
            })}
            variant={props.typographyVariant}
            size={variant !== "contained" && !props.typographyVariant && "md"}
          >
            {props.message}
          </Typography>
          {props.extraButton && props.extraButtonClick && (
            <Button
              onClick={props.extraButtonClick}
              disableRipple
              className={classes.extraButton}
            >
              {props.extraButton}
            </Button>
          )}
        </Link>
      ) : (
        <div
          onClick={() => history.push(`/orders/${id}/edit`)}
          className={classes.messageContainer}
        >
          <Typography
            className={classnames({
              [classes.containedTypography]: variant === "contained",
            })}
            variant={props.typographyVariant}
            size={variant !== "contained" && !props.typographyVariant && "md"}
          >
            {status === "REFUND_PENDING" ? (
              <div>
                Đơn hàng của {<strong>{receiver}</strong>} đang{" "}
                {<strong>yêu cầu hoàn tiền</strong>}
              </div>
            ) : (
              <div>
                Đơn hàng của {<strong>{receiver}</strong>} đang{" "}
                {<strong>chờ xác nhận</strong>}
              </div>
            )}
            <Typography variant="caption">
              {formatDateTime(orderTime)}
            </Typography>
          </Typography>
          <br />
          {props.extraButton && props.extraButtonClick && (
            <Button
              onClick={props.extraButtonClick}
              disableRipple
              className={classes.extraButton}
            >
              {props.extraButton}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

function getIconByType(type = "customer") {
  return typesIcons[type];
}

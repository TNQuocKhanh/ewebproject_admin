import { Button } from "@material-ui/core";

export const ButtonCustom= (props) => {
  const {
    title,
    variant = "outlined",
    size = "small",
    icon,
    handleClick,
    mLeft=false,
    disabled,
  } = props;

  return (
    <Button
    disabled={disabled}
      variant={variant}
      size={size}
      startIcon={icon}
      onClick={handleClick}
      sx={ mLeft ? {marginLeft: 2} : {}  }
    >
      {title}
    </Button>
  );
};


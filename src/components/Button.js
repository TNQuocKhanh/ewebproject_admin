import { Button } from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

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

  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

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
      {!isSmall && title}
    </Button>
  );
};

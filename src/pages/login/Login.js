import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Fade,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import useStyles from "./styles";
import img from "./image.png";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { login } from "../../apis";
import { storage } from "../../utils";

function Login(props) {
  var classes = useStyles();

  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    const res = await login(loginValue, passwordValue);

    if (res.status === 200) {
      const data = await res.json();
      storage.save("auth", data);
      window.location.replace("/dashboard");
    } else {
      setError(true);
    }
    setIsLoading(false);
  };

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={img} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>HDKShop Admin</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <form onSubmit={handleLogin}>
            <Typography variant="h2" className={classes.greeting}>
              Chào mừng đến trang quản trị
            </Typography>
            <Fade in={error}>
              <Typography color="secondary" className={classes.errorMessage}>
                Email hoặc mật khẩu không đúng, vui lòng thử lại!
              </Typography>
            </Fade>
            <TextField
              id="email"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={loginValue}
              onChange={(e) => setLoginValue(e.target.value)}
              margin="normal"
              placeholder="Email"
              type="email"
              fullWidth
            />
            <TextField
              id="password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              margin="normal"
              placeholder="Mật khẩu"
              fullWidth
            />
            <div className={classes.formButtons}>
              {isLoading ? (
                <CircularProgress size={26} className={classes.loginLoader} />
              ) : (
                <Button
                  type="submit"
                  disabled={
                    loginValue.length === 0 || passwordValue.length === 0
                  }
                  onClick={handleLogin}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Đăng nhập
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Grid>
  );
}

export default Login;

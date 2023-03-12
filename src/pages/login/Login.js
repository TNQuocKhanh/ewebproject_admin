import React, { useEffect, useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Fade,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import logo from "./logo.svg";
import { login } from "../../apis";
import {storage} from "../../utils";

function Login(props) {
  var classes = useStyles();

  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

  const history = useHistory();

  useEffect(() => {
    storage.load('auth') && history.push("/dashboard")
  })

  const handleLogin = async () => {
    setIsLoading(true);
    const res = await login(loginValue, passwordValue);

    if (res.status === 200) {
      const data = await res.json();
      storage.save('auth', data)
      history.push("/dashboard");
    } else {
      setError(true);
    }
    setIsLoading(false);
  };

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>HDKShop Admin</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <React.Fragment>
            <Typography variant="h2" className={classes.greeting}>
              Chào mừng đến trang quản trị
            </Typography>
            <Fade in={error}>
              <Typography color="secondary" className={classes.errorMessage}>
                 Có lỗi xảy ra, vui lòng thử lại!
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
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              margin="normal"
              placeholder="Mật khẩu"
              type="password"
              fullWidth
            />
            <div className={classes.formButtons}>
              {isLoading ? (
                <CircularProgress size={26} className={classes.loginLoader} />
              ) : (
                <Button
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
              <Button
                color="primary"
                size="large"
                className={classes.forgetButton}
              >
                Quên mật khẩu
              </Button>
            </div>
          </React.Fragment>
        </div>
      </div>
    </Grid>
  );
}

export default Login;

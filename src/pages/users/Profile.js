import {
  TextField,
  Typography,
  Card,
  Grid,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { getProfile, updatePhotoProfile, updateProfile } from "../../apis";
import { ButtonSave, ButtonCustom } from "../../components/Button";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Loader, Toastify } from "../../components";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import { toast } from "react-toastify";

export const Profile = () => {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  const [photo, setPhoto] = useState();

  const [selectedFile, setSelectedFile] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedFile) {
      setPhoto(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPhoto(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const getUserDetail = async () => {
    setLoading(true)
    const res = await getProfile();
    setFullName(res.fullName);
    setEmail(res.email);
    setPhoneNumber(res.phoneNumber);
    setAddress(res.address);
    setPhoto(res.photos);
    setLoading(false)
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await updateProfile({ phoneNumber, address, fullName });
      toast.success("Cập nhật thành công");
    } catch (err) {
      console.log("[Update profile] Error", err);
      toast.success("Có lỗi xảy ra");
    }
    setLoading(false)
  };

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadPhoto = async () => {
    setLoading(true);
    try {
      await updatePhotoProfile(selectedFile);
      toast.success("Cập nhật hình ảnh thành công");
      setLoading(false);
    } catch (error) {
      console.log("[Update photo] Error", error);
      toast.success("Có lỗi xảy ra");
    }
    setLoading(false);
  };

  if(loading) return <Loader />

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 10,
        }}
      >
        <Typography>Thông tin</Typography>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <ButtonCustom
            style={{ backgroundColor: "#556afe", color: "#fff" }}
            icon={<ArrowBackIcon />}
            variant="contained"
            title="Quay lại"
          />
        </Link>
      </div>
      <Card style={{ padding: 10 }}>
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <div>
              <Box
                style={{
                  border: "1px solid #f2f2f2",
                  height: "200px",
                  width: "200px",
                  margin: "auto",
                }}
              >
                <img src={photo} alt="avatar" width="200px" height="200px" />
              </Box>
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                {selectedFile ? (
                  loading ? (
                    <CircularProgress />
                  ) : (
                    <ButtonCustom
                      style={{ padding: "10px", margin: "10px 0" }}
                      handleClick={handleUploadPhoto}
                      icon={<CloudUploadIcon style={{ color: "#536cfe" }} />}
                      title="Tải ảnh"
                    />
                  )
                ) : (
                  <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <label
                      htmlFor="input-upload"
                      style={{
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        background: "white",
                        padding: "10px",
                        width: "fit-content",
                        borderRadius: "5px",
                        margin: "10px 0",
                        border: "1px solid #cccccc",
                      }}
                    >
                      <PhotoLibraryIcon style={{ color: "#536cfe" }} />
                      <span style={{ marginLeft: "10px" }}>Chọn ảnh</span>{" "}
                    </label>
                    <input
                      hidden
                      id="input-upload"
                      type="file"
                      multiple
                      onChange={onSelectFile}
                    />
                  </div>
                )}
              </div>
            </div>
          </Grid>
          <Grid item md={8} i xs={12}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item md={8} xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    required
                    label="Tên"
                    variant="outlined"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item md={8} xs={12}>
                  <TextField
                    disabled
                    fullWidth
                    type="text"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item md={8} xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Số điện thoại"
                    variant="outlined"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item md={8} xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Địa chỉ"
                    variant="outlined"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
              <div style={{ margin: "20px 0" }}>
                <ButtonSave />
              </div>
            </form>
          </Grid>
        </Grid>
      </Card>
      <Toastify />
    </div>
  );
};

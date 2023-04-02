import { TextField, Typography, Card, Grid, Box } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getProfile, updatePhotoProfile, updateProfile } from "../../apis";
import { ButtonSave, ButtonCustom } from "../../components/Button";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export const Profile = () => {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  const [photo, setPhoto] = useState();

  const [selectedFile, setSelectedFile] = useState();

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
    const res = await getProfile();
    setFullName(res.fullName);
    setEmail(res.email);
    setPhoneNumber(res.phoneNumber);
    setAddress(res.address);
    setPhoto(res.photos);
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile({ phoneNumber, address, fullName });
  };

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadPhoto = async () => {
    try {
      await updatePhotoProfile(selectedFile);
    } catch (error) {
      console.log("====Error", error);
    }
  };

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
                  border: "1px solid #000",
                  height: "200px",
                  width: "200px",
                  margin: "auto",
                }}
              >
                <img src={photo} alt="avatar" width="200px" height="200px" />
              </Box>
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <input type="file" onChange={onSelectFile} />
              </div>
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                {selectedFile && (
                  <button onClick={handleUploadPhoto}>Upload</button>
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
    </div>
  );
};

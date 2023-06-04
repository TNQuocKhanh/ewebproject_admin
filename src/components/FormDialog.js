import {
  Dialog,
  Button,
  DialogContent,
  DialogActions,
  Grid,
  DialogTitle,
  TextField,
  Divider,
} from "@material-ui/core";
import { useState } from "react";
export const FormDialog = (props) => {
  const { open, handleClose } = props;
  const [idRefund, setIdRefund] = useState("");

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Hoan tien</DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <TextField
              required
              margin="dense"
              label="Tên"
              value={idRefund}
              onChange={(e) => setIdRefund(e.target.value)}
              type="text"
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Huỷ
        </Button>
        <Button onClick={() => console.log("===ABC")} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

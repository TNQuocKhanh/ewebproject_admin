import { Button, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions } from "@material-ui/core"

export const ConfirmDialog = (props) => {
  const { open, handleClose, handleClick, message='Are you sure' } = props

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Xác nhận</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Huỷ</Button>
          <Button onClick={handleClick}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

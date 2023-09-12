import { IconButton, Slide, Snackbar } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { handleSnackbar } from "../../../redux/reducers/index-reducer";

SnackbarComponent.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
  severity: PropTypes.string,
};

function SnackbarComponent() {
  const snackbar = useSelector((state) => state.indexReducer.snackbar);
  const dispatch = useDispatch();

  const SlideTransition = (props) => {
    return <Slide {...props} direction="left" />;
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(
      handleSnackbar({
        snackbar: {
          open: false,
          message: "",
          severity: "info",
        },
      })
    );
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={handleClose}
      action={action}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionComponent={SlideTransition}
    >
      <Alert
        onClose={handleClose}
        severity={snackbar.severity}
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarComponent;

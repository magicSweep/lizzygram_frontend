import React from "react";
//import Modal from "@material-ui/core/Modal";
import Box from "@mui/material/Box";
import Modal from "../FormModal";

class ErrorBoundary extends React.Component {
  state: { hasError: boolean; error?: Error } = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // You can also log the error to an error reporting service
    //console.log("ERROR_BOUNDARY", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI

      return (
        <Modal
          open={true}
          //onClose={}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Box bgcolor="background.paper" p="30px 40px">
            <Box typography="body1" color="error">
              Какая-то ошибочка...
            </Box>
            <ul className="pt-3 pl-5">
              <Box component="li" typography="body2" color="error">
                {this.state.error?.message} |{this.state.error?.stack}
              </Box>
              <Box component="li" typography="body2" color="error">
                - Проверьте интернет соединение.
              </Box>

              {/* <li>
                      Попробуйте 
                      <Button 
                        label={"еще раз."} 
                        type={"CONTAINED"}
                        onClick={() => this.setState({hasError: false})}
                        ariaLabel={"Перезагрузить страницу."}
                      />
                    </li> */}

              <Box component="li" typography="body2" color="error">
                - Перезагрузите страницу.
              </Box>
            </ul>
          </Box>
        </Modal>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

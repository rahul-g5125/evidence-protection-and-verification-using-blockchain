import React, { useEffect } from "react";
import { Upload } from "../../../typechain-types";
import { Dialog, Box, Typography, TextField, Button } from "@mui/material";
import "./Modal.css";

interface props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  contract: Upload;
}

const Modal = (props: props) => {
  const sharing = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const address: string = document.querySelector("#address")?.value;
    await props.contract.allow(address);
    props.setModalOpen(false);
  };
  useEffect(() => {
    const accessList = async () => {
      const addressList = await props.contract.shareAccess();
      const select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        const opt = options[i];
        const e1 = document.createElement("option");
        e1.textContent = opt.toString();
        e1.value = opt.toString();
        select!.appendChild(e1);
      }
    };
    props.contract && accessList();
  }, [props.contract]);
  return (
    <>
      <Dialog
        open={true}
        onClose={() => {
          props.setModalOpen(false);
        }}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            padding: "50px",
            textAlign: "center",
            backgroundImage:
              "radial-gradient(circle farthest-corner at 10% 20%,rgba(215, 223, 252, 1) 0%,rgba(255, 255, 255, 1) 0%,rgba(215, 223, 252, 1) 84%)",
          }}
        >
          <div className="modalBackground">
            <div className="modalContainer">
              <Typography
                sx={{ margin: "20px", fontWeight: "bold" }}
                variant="h4"
                className="title"
              >
                Share with
              </Typography>
              <div className="body">
                <TextField
                  id="address"
                  placeholder="Enter Address"
                  sx={{ width: "400px", backgroundColor: "white" }}
                ></TextField>
              </div>
              <form id="myForm">
                <select id="selectNumber">
                  <option className="address">People With Access</option>
                </select>
              </form>
              <div className="footer">
                <Button
                  variant="contained"
                  onClick={() => {
                    props.setModalOpen(false);
                  }}
                  id="cancelBtn"
                  sx={{ marginRight: "10px" }}
                >
                  Cancel
                </Button>
                <Button variant="contained" onClick={() => sharing()}>
                  Share
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Dialog>
    </>
  );
};
export default Modal;

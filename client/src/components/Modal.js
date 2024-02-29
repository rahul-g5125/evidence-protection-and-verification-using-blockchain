import { useEffect } from "react";
import {
  TextField,
  Box,
  Button,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import "./Modal.css";
const Modal = ({ setModalOpen, contract }) => {
  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    setModalOpen(false);
  };
  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#fff",
          width: "40%",
          margin: "auto",
          borderRadius: "20px",
          padding: "4%",
        }}
      >
        <div className="modalContainer">
          <div className="body">
            <TextField
              sx={{ width: "80%" }}
              className="address"
              placeholder="Share With"
              label="Enter Address"
              variant="filled"
            />
          </div>
          <form id="myForm">
            <FormControl
              sx={{ width: "40%", marginX: "auto", marginY: "5%" }}
              fullWidth
            >
              <InputLabel id="access">People With Access</InputLabel>
              <Select
                labelId="access"
                label="People With Access"
                id="selectNumber"
              >
                <option value=" People with Access" className="address">
                  People With Access
                </option>
              </Select>
            </FormControl>
          </form>
          <div className="footer">
            <Button
              sx={{ marginTop: "2%" }}
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </Button>
            <Button
              sx={{ marginTop: "2%" }}
              variant="contained"
              onClick={() => sharing()}
            >
              Share
            </Button>
          </div>
        </div>
      </Box>
    </>
  );
};
export default Modal;

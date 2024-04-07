import { useState } from "react";
import { Upload } from "../../../typechain-types";
import { ethers } from "ethers";
import { Typography, TextField, Button } from "@mui/material";
import "./Display.css";

interface props {
  contract: Upload;
  account: string;
}

const Display = (props: props) => {
  const [data, setData] = useState("");
  const getData = async () => {
    let dataArray: string[] = [];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const otherAddress: string =
      document.getElementById("addressOfOther")?.value;
    try {
      if (otherAddress) {
        dataArray = await props.contract.display(otherAddress);
        console.log(dataArray);
      } else {
        dataArray = await props.contract.display(
          ethers.getAddress(props.account)
        );
        console.log(dataArray);
      }
    } catch (e) {
      alert("You don't have access");
      console.log(e);
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      // console.log(str);
      // console.log(str_array);
      const images = str_array.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank">
            <img key={i} src={item} alt="new" className="image-list-item"></img>
          </a>
        );
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      setData(images);
    } else {
      alert("No image to display");
    }
  };
  return (
    <>
      <div id="get-data-form">
        <TextField
          type="text"
          sx={{ height: "60px", margin: "10px" }}
          placeholder="Enter Address"
          id="addressOfOther"
        ></TextField>
        <Button
          variant="contained"
          sx={{ height: "60px", margin: "10px" }}
          className="center button"
          onClick={getData}
        >
          Get Data
        </Button>
      </div>

      <div className="image-list">
        <Typography variant="h5" fontFamily="helvetica">
          Pieces of Evidence:
        </Typography>
        {data}
      </div>
    </>
  );
};
export default Display;

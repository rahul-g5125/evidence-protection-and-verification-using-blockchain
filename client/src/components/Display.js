import { useState } from "react";
import "./Display.css";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
        console.log(dataArray);
      }
    } catch (e) {
      console.log(e);
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      // console.log(str);
      // console.log(str_array);
      let count = 0;
      const images = str_array.map((item, i) => {
        count++;
        return (
          <Box
            sx={{
              display: "inline-block",
              backgroundColor: "#c0c0c0",
              borderRadius: "20px",
              padding: "1%",
              margin: "1%",
            }}
          >
            <a href={item} key={i} target="_blank">
              Click here to display image Number: {count}
            </a>
          </Box>
        );
      });
      setData(images);
    } else {
      alert("No image to display");
    }
  };
  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <Button variant="contained" className="center button" onClick={getdata}>
        Get Data
      </Button>
    </>
  );
};
export default Display;

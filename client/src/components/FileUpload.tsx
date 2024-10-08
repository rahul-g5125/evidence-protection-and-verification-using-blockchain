import { FormEvent, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { Upload } from "../../../typechain-types";
import { styled } from "@mui/material/styles";
import "./FileUpload.css";
import { Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface props {
  contract: Upload;
  account: string;
  provider: ethers.BrowserProvider;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const FileUpload = (props: props) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            headers: {
              pinata_api_key: import.meta.env.VITE_API_KEY,
              pinata_secret_api_key: import.meta.env.VITE_API_SECRET,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(resFile.data.IpfsHash);
        const ImgHash = `https://brown-patient-penguin-941.mypinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        const response = await props.contract.add(
          props.account.toString(),
          ImgHash
        );
        console.log(response);
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert(e);
      }
    }
  };
  const retrieveFile = (e: FormEvent) => {
    const data = (e.target as HTMLInputElement).files?.[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setFile(e.target.files[0]);
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <Button
          component="label"
          disabled={!props.account}
          role={undefined}
          id="file-upload"
          variant="contained"
          tabIndex={-1}
          sx={{ backgroundColor: "#008DDA" }}
          startIcon={<CloudUploadIcon />}
        >
          Choose Image
          <VisuallyHiddenInput
            name="data"
            onChange={retrieveFile}
            type="file"
          />
        </Button>
        <Typography sx={{ margin: 2 }} className="textArea">
          Image: {fileName}
        </Typography>
        <Button
          variant="contained"
          type="submit"
          className="upload"
          sx={{ backgroundColor: "#008DDA " }}
          disabled={!file}
        >
          Upload File
        </Button>
      </form>
    </div>
  );
};
export default FileUpload;

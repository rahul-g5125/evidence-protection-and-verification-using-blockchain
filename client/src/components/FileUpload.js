import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { Alert } from "@mui/material";

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [fileName, setFileName] = useState("No image selected");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `2c96f07df4a300ba07cc`,
            pinata_secret_api_key: `ead5b222e9c23da5412b5e368a256585ffe1ccd9d117d49d4b0d84a32c56c977`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        contract.add(account, ImgHash);
        setSuccess(true);
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        setFailure(true);
      }
    }
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <div className="top">
      {success ? (
        <Alert severity="success">Successfully Image Uploaded</Alert>
      ) : (
        ""
      )}
      {failure ? (
        <Alert severity="error">Unable to upload on Pinata Server</Alert>
      ) : (
        ""
      )}
      <form id="uploadForm" className="form" onSubmit={handleSubmit}>
        <div class="mb-3 mx-80">
          <input
            disabled={!account}
            type="file"
            id="file-upload"
            name="data"
            onChange={retrieveFile}
            class="form-control"
          />
        </div>
        <Box sx={{ color: "#fff" }} className="textArea">
          Image: {fileName}
        </Box>
        <Button
          variant="contained"
          type="submit"
          className="upload"
          disabled={!file}
        >
          Upload File
        </Button>
      </form>
    </div>
  );
};
export default FileUpload;

/*
jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiOTQ5ZDZiYS1hNWFjLTRkODktYTViNi0wYzJjMGI5NjdjOTQiLCJlbWFpbCI6InJhaHVsLmguZ2FuZGxhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI2OTI1MzJmNzMzOTM0ODhlMWQyMyIsInNjb3BlZEtleVNlY3JldCI6IjUyNjQ1ODg3ZTg3YzQ3MjI1Y2RkYzEwYTdkMzFiNzFmMGMwZTI0MzNjNmEwNTFjODU4YTZlMjRkOTg3MWJkYTciLCJpYXQiOjE2OTgzMzY0Mjd9.iFHIcPjUGJSvCC4rydQ4a5HcQuwx3woF67MQSpW6SKg
*/
// import { useState } from "react";
// import axios from "axios";
// import "./FileUpload.css";
// function FileUpload({ contract, provider, account }) {
//   // const [urlArr, setUrlArr] = useState([]);
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("No image selected");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (file) {
//         try {
//           const formData = new FormData();
//           formData.append("file", file);

//           const resFile = await axios({
//             method: "post",
//             url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//             data: formData,
//             headers: {
//               pinata_api_key: `95f328a012f1634eab8b`,
//               pinata_secret_api_key: `8ea64e6b39c91631c66128a7c0e0dde35a6fbdf797a8393cc5ba8bf8d58e9b54`,
//               "Content-Type": "multipart/form-data",
//             },
//           });

//           const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
//           const signer = contract.connect(provider.getSigner());
//           signer.add(account, ImgHash);

//           //setUrlArr((prev) => [...prev, ImgHash]);

//           //Take a look at your Pinata Pinned section, you will see a new file added to you list.
//         } catch (error) {
//           alert("Error sending File to IPFS");
//           console.log(error);
//         }
//       }

//       alert("Successfully Uploaded");
//       setFileName("No image selected");
//       setFile(null); //to again disable the upload button after upload
//     } catch (error) {
//       console.log(error.message); //this mostly occurse when net is not working
//     }
//   };
//   const retrieveFile = (e) => {
//     const data = e.target.files[0];
//     console.log(data);

//     const reader = new window.FileReader();

//     reader.readAsArrayBuffer(data);
//     reader.onloadend = () => {
//       setFile(e.target.files[0]);
//     };
//     setFileName(e.target.files[0].name);
//     e.preventDefault();
//   };
//   return (
//     <div className="top">
//       <form className="form" onSubmit={handleSubmit}>
//         <label htmlFor="file-upload" className="choose">
//           {/*turn around for avoding choose file */}
//           Choose Image
//         </label>
//         <input
//           disabled={!account} //disabling button when metamask account is not connected
//           type="file"
//           id="file-upload"
//           name="data"
//           onChange={retrieveFile}
//         />
//         <span className="textArea">Image: {fileName}</span>
//         {/* choose file */}
//         <button type="submit" disabled={!file} className="upload">
//           Upload file
//         </button>
//       </form>
//     </div>
//   );
// }

// export default FileUpload;

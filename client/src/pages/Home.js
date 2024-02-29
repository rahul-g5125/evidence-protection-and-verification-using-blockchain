import Upload from "../artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "../components/FileUpload";
import Display from "../components/Display";
import Modal from "../components/Modal";
import Box from "@mui/material/Box";
import { Typography, Button } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Home.css";

function Home({ account, contract, provider, modalOpen, setModalOpen }) {
  // const [account, setAccount] = useState("");
  // const [contract, setContract] = useState(null);
  // const [provider, setProvider] = useState(null);
  // const [modalOpen, setModalOpen] = useState(false);

  // useEffect(() => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);

  //   const loadProvider = async () => {
  //     if (provider) {
  //       window.ethereum.on("chainChanged", () => {
  //         window.location.reload();
  //       });

  //       window.ethereum.on("accountsChanged", () => {
  //         window.location.reload();
  //       });
  //       await provider.send("eth_requestAccounts", []);
  //       const signer = provider.getSigner();
  //       const address = await signer.getAddress();
  //       setAccount(address);
  //       let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  //       const contract = new ethers.Contract(
  //         contractAddress,
  //         Upload.abi,
  //         signer
  //       );
  //       //console.log(contract);
  //       setContract(contract);
  //       setProvider(provider);
  //     } else {
  //       console.error("Metamask is not installed");
  //     }
  //   };
  //   provider && loadProvider();
  // }, []);
  return (
    <>
      <Header />

      <Box id="main">
        {!modalOpen && (
          <Button
            variant="contained"
            className="share"
            onClick={() => setModalOpen(true)}
          >
            Share
          </Button>
        )}
        {modalOpen && (
          <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
        )}
        <Typography sx={{ color: "#fff", fontSize: "50px" }}>
          Your Evidences are safe with us
        </Typography>
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>

        <p style={{ color: "white" }}>
          Account : {account ? account : "Not connected"}
        </p>
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
      </Box>
      <Footer />
    </>
  );
}

export default Home;

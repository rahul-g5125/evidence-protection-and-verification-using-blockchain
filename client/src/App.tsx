import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import Navbar from "./components/Navbar";
import { Upload as UploadInterface } from "../../typechain-types";
import "./App.css";
import { useState, useEffect } from "react";
import { BrowserProvider, ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Modal from "./components/Modal";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Button, Box, Typography } from "@mui/material";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState<
    ethers.Contract | UploadInterface | null
  >(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.BrowserProvider(window.ethereum!);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum?.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum?.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = (await signer).address;
        setAccount(address);
        const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );

        console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <>
      <Navbar />
      <Box className="main">
        {!modalOpen && (
          <Button
            variant="contained"
            sx={{
              margin: "10px",
              backgroundColor: "#008DDA",
            }}
            className="share"
            onClick={() => setModalOpen(true)}
          >
            Share
          </Button>
        )}
        {modalOpen && (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <Modal setModalOpen={setModalOpen} contract={contract!}></Modal>
        )}

        <div className="App">
          <Typography
            variant="h3"
            className="title"
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              width: "60%",
              marginX: "auto",
              marginY: "50px",
              textAlign: "center",
            }}
          >
            Store your Sensitive Pieces of Evidence here.
          </Typography>
          <div className="bg"></div>
          <div className="bg bg2"></div>
          <div className="bg bg3"></div>

          <Typography sx={{ textAlign: "center", marginBottom: "20px" }}>
            Account : {account ? account : "Not connected"}
          </Typography>
          <FileUpload
            account={account}
            provider={provider!}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            contract={contract!}
          ></FileUpload>
        </div>
      </Box>
    </>
  );
}
export default App;

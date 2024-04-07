import Upload from "../artifacts/contracts/Upload.sol/Upload.json";
import { Upload as UploadInterface } from "../../../typechain-types";
import { useState, useEffect } from "react";
import { BrowserProvider, ethers } from "ethers";
import FileUpload from "../components/FileUpload";
import Display from "../components/Display";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

function Home() {
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
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

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
      {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Modal setModalOpen={setModalOpen} contract={contract!}></Modal>
      )}

      <div className="App">
        <h1>Store your Sensitive Pieces of Evidence here.</h1>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>

        <p>Account : {account ? account : "Not connected"}</p>
        <FileUpload
          account={account}
          provider={provider!}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          contract={contract!}
        ></FileUpload>
        {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        @ts-ignore */}
        <Display account={account} contract={contract!}></Display>
      </div>
    </>
  );
}
export default Home;

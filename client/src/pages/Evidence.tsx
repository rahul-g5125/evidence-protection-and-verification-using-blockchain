import { useEffect, useState } from "react";
import Upload from "../artifacts/contracts/Upload.sol/Upload.json";
import { UploadInterface } from "../../../typechain-types/Upload";
import Display from "../components/Display";
import Navbar from "../components/Navbar";
import { ethers } from "ethers";
import { BrowserProvider } from "ethers/providers";

const Evidence = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState<
    ethers.Contract | UploadInterface | null
  >(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);

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
    <div>
      <Navbar />
      <h1>Evidence</h1>
      <Display contract={contract} account={account} />
    </div>
  );
};

export default Evidence;

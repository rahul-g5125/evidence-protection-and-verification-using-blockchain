import { useState, useEffect } from "react";
import { Input, Button, Box, Stack } from "@mui/material";
import Navbar from "../components/Navbar";
import { ethers, BrowserProvider } from "ethers";
import Authenticity from "../artifacts/contracts/Authenticity.sol/Authenticity.json";
import { Authenticity as AuthenticityInterface } from "../../../typechain-types/";

export default function Verification() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState<
    ethers.Contract | AuthenticityInterface | null
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
        const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

        const contract = new ethers.Contract(
          contractAddress,
          Authenticity.abi,
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

  const certificationHandler = async () => {
    const hash: string = (
      document.getElementById("hash-certification") as HTMLInputElement
    ).value;
    const size: number = parseInt(
      (document.getElementById("size") as HTMLInputElement).value
    );
    const extension: string = (
      document.getElementById("extension") as HTMLInputElement
    ).value;

    contract
      ?.certifyFile(ethers.toBigInt(size), hash, extension)
      .then((res) => {
        console.log(res);
        alert("Your file is Certified");
      });
  };

  const verificationHandler = async () => {
    const hash: string = (
      document.getElementById("hash-verification") as HTMLInputElement
    ).value;

    contract
      ?.verifyFile(hash)
      .then((res) => {
        console.log(res);
        if (res[0] === "0x0000000000000000000000000000000000000000") {
          alert("File not found.");
        } else {
          const timestamp = ethers.toNumber(res[2]);
          console.log(timestamp.toString());
          const d = new Date(timestamp);
          console.log(d);
          alert(
            `Your file is Verified:  \n File Hash: ${res[1]} \n TimeStamp: ${d} \n Extension: ${res[4]} \n Size: ${res[3]} \n Certified By: ${res[0]} \n `
          );
        }
      })
      .catch((e) => {
        alert("File not found");
        console.log(e);
      });
  };

  return (
    <>
      <Navbar />
      <div id="certification">
        <h1>Certification</h1>

        <Stack
          component="form"
          sx={{
            width: "35%",
            margin: "auto",
            textAlign: "center",
          }}
          spacing={2}
          noValidate
          autoComplete="off"
        >
          <p>Account: {account}</p>
          <Input
            sx={{ textAlign: "center" }}
            id="hash-certification"
            placeholder="Enter the hash of the file"
          ></Input>
          <Box>
            <Input
              sx={{ width: "45%", margin: "0 5% 0 0" }}
              id="size"
              placeholder="Enter the size of the file in Kb"
            ></Input>
            <Input
              sx={{ width: "45%", margin: "0 0 0 5%" }}
              id="extension"
              placeholder="Enter the file Extension"
            ></Input>
          </Box>

          <Button onClick={certificationHandler} variant="contained">
            Certify
          </Button>
        </Stack>
      </div>
      <div id="certification-alert"></div>
      <div>
        <h1>Verification</h1>

        <Stack
          component="form"
          sx={{
            width: "35%",
            margin: "auto",
            textAlign: "center",
          }}
          spacing={2}
          noValidate
          autoComplete="off"
        >
          <p>Account: {account}</p>
          <Input
            sx={{ textAlign: "center" }}
            id="hash-verification"
            placeholder="Enter the hash of the file"
          ></Input>

          <Button onClick={verificationHandler} variant="contained">
            Verify
          </Button>
        </Stack>
      </div>
    </>
  );
}

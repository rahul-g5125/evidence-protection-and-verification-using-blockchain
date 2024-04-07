import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const UploadModule = buildModule("UploadModule", (m) => {
  const upload = m.contract("Upload");

  return { upload };
});

export default UploadModule;

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AuthenticityModule = buildModule("AuthenticityModule", (m) => {
  const authenticity = m.contract("Authenticity");

  return { authenticity };
});

export default AuthenticityModule;

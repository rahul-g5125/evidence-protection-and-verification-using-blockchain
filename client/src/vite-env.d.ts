/// <reference types="vite/client" />
import { ExternalProvider } from "@ethersproject/providers";

declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
}

declare module "react" {
  interface HTMLElement {
    value: string;
  }
}

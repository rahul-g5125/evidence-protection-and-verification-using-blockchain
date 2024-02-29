import Header from "../components/Header";
import Footer from "../components/Footer";
import Display from "../components/Display";
export default function Evidences({ contract, account }) {
  return (
    <div>
      <Header />
      <br />
      <Display contract={contract} account={account}></Display>
      <div class="container"></div>
      <Footer />
    </div>
  );
}

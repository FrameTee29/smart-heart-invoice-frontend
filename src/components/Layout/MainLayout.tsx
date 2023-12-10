import Head from "next/head";
import Navbar from "./Navbar";

interface IMainLayout {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayout) => {
  return (
    <>
      <Head>
        <title>Smart Heart Invoice</title>
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default MainLayout;

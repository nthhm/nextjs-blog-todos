import Head from "next/head";
import { Layout } from "../types/LayoutProps";

const Layout = ({ children, title = "Default title" }: Layout) => {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-white font-mono bg-gray-800">
      <Head>
        <title>{title}</title>
      </Head>
      <main className="flex flex-1 justify-center items-center w-screen flex-col">
        {children}
      </main>
      <footer className="w-full h-6 justify-center items-center text-center text-gray-500 text-sm">
        @Hedwig 2022
      </footer>
    </div>
  );
};

export default Layout;

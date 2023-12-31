import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <h1 className="text-black w-full bg-white h-[100px] mb-20 flex justify-center items-center font-bold text-4xl">Navbar</h1>
        <div className="h-[calc(100vh-5rem)] container mx-auto px-10">{children}</div>
      </body>
    </html>
  );
}

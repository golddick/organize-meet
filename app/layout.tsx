import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import "@stream-io/video-react-sdk/dist/css/styles.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ORGANIZE",
  description: " A TASK AND A VIDEO APP ",
  icons:{
    icon: '/icons/gnb.png'
  }
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider 
      appearance={{
        layout:{
          logoImageUrl:'/icons/bnt.png',
          socialButtonsVariant:'iconButton'
        },
        variables:{
          colorBackground:'gray',
          colorInputBackground:'white',
          colorDanger:'red',
          colorText:'white'
        }
      }}
      >
        <body className={`${geistSans.variable} ${geistMono.variable}bg-dark-1 antialiased`} >
          <main className=" bg-muted">
          {children}
          <Toaster />
          </main>
        </body>
      </ClerkProvider>
    </html>
  );
}

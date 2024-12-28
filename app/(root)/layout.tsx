import { StreamVideoProvider } from "@/providers/StreamClientProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ORGANIZE",
  description: " A TASK AND A VIDEO APP ",
  icons:{
    icon: '/icons/gnb.png'
  }
};

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  )
}

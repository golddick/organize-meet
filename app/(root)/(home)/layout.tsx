import { Navbar } from "@/components/_component/Navbar/Navbar";
import { Sidebar } from "@/components/_component/sidebar/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ORGANIZE",
  description: " A TASK AND A VIDEO APP ",
  icons:{
    icon: '/icons/gnb.png'
  }
};


export default function HomeLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <main  className="relative">
      <Navbar/>
      <div className="flex">
        <Sidebar/>
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="w-full">
            {children}
          </div>
        </section>
      </div>
    </main>
  )
}

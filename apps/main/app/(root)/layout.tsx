import Credits from "@/components/common/Creadits";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import NotifictionHeader from "@/components/common/NotifictionHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col min-h-screen">
      
      <NotifictionHeader variant='info'>
        {/* <strong>Heads up!</strong> This is a demo store, you can&apos;t buy anything. */}
      </NotifictionHeader >
      
      <Navbar />
      {children}
      <Footer />
      <Credits/>
    </section>
  );
}

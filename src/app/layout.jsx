import { Montserrat, Montserrat_Alternates } from "next/font/google";
import "../styles/globals.css"; 
import { ToastProvider } from "@/views/layouts/components/ToastContainer"; 


const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat-alternates",
});


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});


export const metadata = {
  title: "SynKKafrica Admin",
  description: "Empowering mobility across Africa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <body className="font-sans bg-[var(--background)] text-[var(--foreground)]">
          <ToastProvider>
            {children}
          </ToastProvider>
        </body>
    </html>
  );
}

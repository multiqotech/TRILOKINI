import "./globals.css";
import AdminShell from "../components/AdminShell";

export const metadata = {
  title: "Trilokini Admin",
  description: "Admin panel for Trilokini e-commerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}

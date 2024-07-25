import "../styles/global.css";
import NavBar from "../components/NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>(주)이프정보시스템</title>
        <meta
          name="description"
          content="글로벌뱅킹의 중심, (주)이프정보시스템"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <NavBar />
        <main>{children}</main>
        <footer>
          <p>&copy; {new Date().getFullYear()} (주)이프정보시스템</p>
        </footer>
      </body>
    </html>
  );
}

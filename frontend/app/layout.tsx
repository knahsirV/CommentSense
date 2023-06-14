import "./globals.css";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata = {
  title: "Comment Sense",
  description: "Sentiment analysis for YouTube comments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`bg-zinc-950 bg-opacity-[98%] text-white ${urbanist.className}`}
      >
        {children}
      </body>
    </html>
  );
}

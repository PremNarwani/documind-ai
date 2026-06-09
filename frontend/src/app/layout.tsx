import "./globals.css";

export const metadata = {
  title: "DocuMind AI",
  description: "RAG Chatbot with Web Search",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
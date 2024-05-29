import { Inter } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { icons } from "lucide-react"
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Memorify",
  description: "Social app",
  icons: {
    icon: "/app/icon.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider
        appearance={{
          baseTheme: dark,
        }}
      >
        <body
          className={`${inter.className} mx-auto min-h-screen max-w-[1920px]`}
          suppressHydrationWarning
        >
          {children}
        </body>
      </ClerkProvider>
    </html>
  )
}

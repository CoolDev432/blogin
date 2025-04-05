import { Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const tech = Share_Tech_Mono({
  subsets: ['latin'],
  weight: ['400']
})

export const metadata = {
  title: "BlogIn",
  description: "Get Ready For The Blogging Experience Of Your Life",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${tech.className} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
"use client"

import { Button } from "@/components/ui/button"
import { navLinks, unLoginNavLinks } from "@/lib/constants"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
const BottomBar = () => {
  const router = useRouter()
  const pathName = usePathname()

  return (
    <div className="sticky bottom-0 left-0 right-0 z-20 flex min-h-[100px] w-full items-center justify-around bg-black lg:hidden">
      <SignedIn>
        {navLinks.map((link, idx) => {
          const isActive = pathName === link.path
          return (
            <Link
              href={link.path}
              key={idx}
              className={` ${
                isActive && "bg-primary"
              } flex items-center gap-2 rounded-xl p-4 text-2xl duration-300 hover:bg-primary`}
            >
              <p className="flexCenter scale-125">{link.icon}</p>
            </Link>
          )
        })}
      </SignedIn>
      <SignedOut>
        <div className="flexBetween w-full mx-10">
          <div className="flexCenter flex-1 gap-10">
            {unLoginNavLinks.map((link, idx) => {
              const isActive = pathName === link.path
              return (
                <Link
                  href={link.path}
                  key={idx}
                  className={` ${
                    isActive && "bg-primary"
                  } flex items-center gap-2 rounded-xl p-4 text-2xl duration-300 hover:bg-primary`}
                >
                  <p className="flexCenter scale-125">{link.icon}</p>
                </Link>
              )
            })}
          </div>
          <Button variant="custom" onClick={() => router.push("/login")} className="p-6 text-lg tracking-wider">
            Login
          </Button>
        </div>
      </SignedOut>
    </div>
  )
}

export default BottomBar

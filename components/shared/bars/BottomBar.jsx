"use client"

import { navLinks } from "@/lib/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"
const BottomBar = () => {
  const pathName = usePathname()

  return (
    <div className="sticky bottom-0 left-0 right-0 z-20 flex min-h-[100px] w-full items-center justify-around bg-black lg:hidden">
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
    </div>
  )
}

export default BottomBar

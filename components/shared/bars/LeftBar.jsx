"use client"
import { navLinks } from "@/lib/constants"
import Link from "next/link"
import Image from "next/image"
import { LogOut } from "lucide-react"
import { SignOutButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
// import { useUserStore } from "@/lib/stores/user.store"
import { Button } from "@/components/ui/button"
import { useUserStore } from "@/lib/stores/user.store"
import { usePathname } from "next/navigation"
const LeftBar = () => {
  const pathName = usePathname()
  const { currentUser } = useUserStore()
  return (
    <div className="flexCol min-w-2xl sticky bottom-0 left-0 top-0 h-screen gap-10 overflow-auto px-4 py-12 max-lg:hidden">
      <h1 className=" group text-5xl font-bold tracking-widest text-primary transition-all duration-500 hover:text-foreground">
        Memori
        <span className="text-foreground group-hover:text-primary">fy</span>
      </h1>
      <div className="flexBetween flex-1 flex-col">
        <SignedIn>
          {currentUser && (
            <>
              <div className="flexCenter w-full flex-col gap-6">
                <Link href={`/profile/${currentUser._id}`}>
                  <Image
                    src={currentUser.profilePhoto}
                    alt="avatar"
                    width={100}
                    height={100}
                    className="rounded-full object-center"
                  />
                </Link>
                <div className="flexCenter w-full flex-col">
                  <p className="text-lg font-semibold capitalize">
                    {currentUser.firstName} {currentUser.lastName}
                  </p>
                  <p className="w-full border-b-2 border-primary pb-8 text-center italic text-muted-foreground">
                    @{currentUser.username}
                  </p>
                </div>

                <div className="flexCol w-full gap-4">
                  {navLinks.map((link, idx) => {
                    const isActive = pathName === link.path
                    return (
                      <div key={idx} className="flexCol group px-4">
                        <Link
                          href={link.path}
                          className={`flex items-center gap-4 rounded-xl py-4 ${isActive && "bg-primary px-8"}`}
                        >
                          <p className="text-xl">{link.icon}</p>
                          <p className="text-xl">{link.name}</p>
                        </Link>
                        <div
                          className={`${!isActive && "h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"}`}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flexCol w-full gap-8 border-t-2 border-primary pt-4">
                <div className="group flex items-center gap-4">
                  <UserButton
                    afterSignOutUrl="/"
                    showName={true}
                    appearance={{
                      userButtonBox: {
                        width: "100%",
                        height: "100%",
                        padding: "0.5rem",
                        borderRadius: "0.75rem",
                      },
                      elements: {
                        userButtonBox: {
                          flexDirection: "row-reverse",
                        },
                        userButtonAvatarBox: {
                          width: "3.5rem",
                          height: "3.5rem",
                          border: "1px solid blue",
                        }
                      },
                    }}
                  />
                </div>
                <div className="w-1/2">
                  <SignOutButton>
                    <div className="group flex cursor-pointer items-center gap-4 ">
                      <LogOut
                        size={24}
                        className="transition-all duration-300 group-hover:text-primary"
                      />
                      <p className="transition-all duration-300 group-hover:text-primary">
                        Sign Out
                      </p>
                    </div>
                  </SignOutButton>
                </div>
              </div>
            </>
          )}
        </SignedIn>
        <SignedOut>
          <div className="flexCenter h-full w-full">
            <Link href="/sign-in" className="w-full">
              <Button className="w-full" variant="custom">
                Sign In
              </Button>
            </Link>
          </div>
        </SignedOut>
      </div>
    </div>
  )
}

export default LeftBar

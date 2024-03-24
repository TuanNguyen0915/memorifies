"use client"
import { navLinks, unLoginNavLinks } from "@/lib/constants"
import Link from "next/link"
import Image from "next/image"
import { LogOut } from "lucide-react"
import { SignOutButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
// import { useUserStore } from "@/lib/stores/user.store"
import { Button } from "@/components/ui/button"
import { useUserStore } from "@/lib/stores/user.store"
import { usePathname, useRouter } from "next/navigation"
const LeftBar = () => {
  const router = useRouter()
  const pathName = usePathname()
  const { currentUser, setCurrentUser } = useUserStore()
  return (
    <div className="flexCol min-w-2xl sticky bottom-0 left-0 top-0 h-screen gap-10 overflow-auto px-4 py-12 max-lg:hidden">
      <h1
        onClick={() => router.push("/")}
        className=" group cursor-pointer text-5xl font-bold tracking-widest text-primary transition-all duration-500 hover:text-foreground"
      >
        Memori
        <span className="text-foreground group-hover:text-primary">fy</span>
      </h1>
      <div className="flexBetween flex-1 flex-col">
        <SignedIn>
          {currentUser && (
            <>
              <div className="flexCenter w-full flex-col gap-6">
                <Link
                  href={`/profile/${currentUser.clerkId}`}
                  className="relative h-[100px] w-[100px] rounded-full ring-[1px] ring-ring"
                >
                  <Image
                    src={currentUser.profilePhoto}
                    alt="avatar"
                    fill
                    className="rounded-full object-cover object-center"
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
                        },
                      },
                    }}
                  />
                </div>
                <div className="w-1/2" onClick={() => setCurrentUser(null)}>
                  <SignOutButton afterSignOutUrl>
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
          <div className="flexBetween h-full w-full flex-col gap-10">
            <div className="mt-[10vh] w-full flex-col">
            {unLoginNavLinks.map((link, idx) => {
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

            <Link href="/sign-in" className="w-full">
              <Button className="w-full py-8 text-xl" variant="custom">
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

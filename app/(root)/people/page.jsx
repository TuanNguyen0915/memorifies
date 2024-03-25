"use client"
import { getAllUsers } from "@/lib/services/user.service"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"

const PeoplePage = () => {
  const [allUser, setAllUsers] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllUsers()
      setAllUsers(data)
    }
    fetchData()
  }, [])

  return (
    <div className="flexCol w-full gap-10">
      {allUser?.map((user) => (
        <Link
          href={`/profile/${user.clerkId}`}
          key={user._id}
          className="group flex w-full items-center rounded-full border px-2 py-4 transition-all duration-500 hover:border-indigo-500"
        >
          <div className="w-[250px] space-y-2 px-10 transition-all duration-1000 group-hover:w-full">
            <p className="text-lg font-semibold group-hover:text-indigo-500">
              {user.firstName} {user.lastName}
            </p>
            <Image
              src={user.profilePhoto}
              alt="avatar"
              width={80}
              height={80}
              className="rounded-full group-hover:hidden max-lg:hidden max-lg:h-[50px] max-lg:w-[50px]"
            />

            <p className="text-muted-foreground transition-all duration-500 group-hover:block group-hover:opacity-100 lg:hidden lg:opacity-0">
              username: <span className="italic"> @{user.username}</span>
            </p>
            <p className="hidden text-muted-foreground transition-all duration-700 group-hover:opacity-100 lg:opacity-0 group-hover:lg:block">
              email: {user.email}
            </p>
            <p className="text-muted-foreground transition-all duration-1000 group-hover:block group-hover:opacity-100 lg:hidden lg:opacity-0">
              Total post:{" "}
              <span className="font-bold">{user.posts?.length}</span>
            </p>
          </div>

          <Image
            src={user.profilePhoto}
            alt="avatar"
            width={80}
            height={80}
            className="rounded-full group-hover:block max-lg:h-[50px] max-lg:w-[50px] lg:hidden"
          />
        </Link>
      ))}
    </div>
  )
}

export default PeoplePage

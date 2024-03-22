import React from "react"

const PostLoader = () => {
  return (
    <div className="flexCenter mt-10 w-full flex-col space-y-10">
      <div className="w-2/3 space-y-6 rounded-xl border p-6">
        <div className="flex items-center gap-5">
          <div className="h-[50px] w-[50px] rounded-full border bg-gradient-to-r from-primary/10 to-secondary/80" />
          <div className="flex w-[150px] flex-col gap-4">
            <div className="h-5 w-full rounded-xl border bg-gradient-to-r from-primary/10 to-secondary/80" />
            <div className="h-5 w-full rounded-xl border bg-gradient-to-r from-primary/10 to-secondary/80" />
          </div>
        </div>
        <div className="h-[50px] w-1/2 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/80" />
        <div className="h-[250px] w-full rounded-xl border bg-gradient-to-r from-primary/10 to-secondary/80" />
        <div className="flexBetween w-full">
          <div className="h-10 w-20 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/80" />
          <div className="h-10 w-20 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/80" />
        </div>
      </div>
      <div className="w-2/3 space-y-6 rounded-xl border p-6">
        <div className="flex items-center gap-5">
          <div className="h-[50px] w-[50px] rounded-full border bg-gradient-to-r from-primary/10 to-secondary/80" />
          <div className="flex w-[150px] flex-col gap-4">
            <div className="h-5 w-full rounded-xl border bg-gradient-to-r from-primary/10 to-secondary/80" />
            <div className="h-5 w-full rounded-xl border bg-gradient-to-r from-primary/10 to-secondary/80" />
          </div>
        </div>
        <div className="h-[50px] w-1/2 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/80" />
        <div className="h-[250px] w-full rounded-xl border bg-gradient-to-r from-primary/10 to-secondary/80" />
        <div className="flexBetween w-full">
          <div className="h-10 w-20 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/80" />
          <div className="h-10 w-20 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/80" />
        </div>
      </div>
    </div>
  )
}

export default PostLoader

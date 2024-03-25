"use client"
import React, { useCallback } from "react"
import qs from "query-string"
import { useRouter, useSearchParams } from "next/navigation"
const TagItem = ({ tag }) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleOnClick = useCallback(() => {
    let currentQuery = {}
    if (params) {
      currentQuery = qs.parse(params)
    }
    const updatedQuery = {
      ...currentQuery,
      category: tag.name,
    }
    if (params?.get("category") === tag.name) {
      delete updatedQuery.category
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      {
        skipNull: true,
      },
    )

    router.push(url)
  }, [params, tag, router])

  const isActive = params?.get("category") === tag.name
  return (
    <div
      onClick={handleOnClick}
      key={tag.name}
      className={`${isActive ? "opacity-100" : "opacity-50"} flexCenter w-full cursor-pointer rounded-xl border px-4 py-2 transition-all duration-500 hover:opacity-100`}
      style={{ backgroundColor: tag.color, borderColor: tag.color }}
    >
      {tag.name}
    </div>
  )
}

export default TagItem

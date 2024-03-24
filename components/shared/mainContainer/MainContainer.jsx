import React from "react"
import TopBar from "../bars/TopBar"
import BottomBar from "../bars/BottomBar"


const MainContainer = ({ children }) => {
  return (
    <section className="flexCol flex-1 gap-10 ">
      <TopBar />
      <div className="flex-1 p-2">{children}</div>
      <BottomBar />
    </section>
  )
}

export default MainContainer

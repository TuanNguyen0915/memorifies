import {
  RiHome2Line,
  RiImageAddLine,
  RiBookMarkLine,
  RiHeart2Line,
  RiDashboardLine,
} from "react-icons/ri"
import { MdOutlineGroups3 } from "react-icons/md"

export const navLinks = [
  {
    path: "/",
    name: "Home",
    icon: <RiHome2Line />,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <RiDashboardLine />,
  },
  {
    path: "/new-post",
    name: "New Post",
    icon: <RiImageAddLine />,
  },
  {
    path: "/like",
    name: "Like",
    icon: <RiHeart2Line />,
  },
  {
    path: "/save",
    name: "Save",
    icon: <RiBookMarkLine />,
  },
  {
    path: "/people",
    name: "People",
    icon: <MdOutlineGroups3 />,
  },
]

export const unLoginNavLinks = [
  {
    path: "/",
    name: "Home",
    icon: <RiHome2Line />,
  },
  {
    path: "/people",
    name: "People",
    icon: <MdOutlineGroups3 />,
  },
]

export const ads = [
  {
    imgUrl: "/assets/ualife.jpeg",
    name: "Under Armour",
    desc: "Under Armour, Inc., together with its subsidiaries, develops, markets, and distributes performance apparel, footwear, and accessories for men, women, and youth",
  },
  {
    imgUrl: "/assets/microcenter.jpeg",
    name: "Micro Center",
    desc: "Micro Center is among the nation's leading information technology, communications, and electronic device suppliers, operating twenty-five large stores in major markets nationwide.",
  },
  {
    imgUrl: "/assets/bestbuy.jpeg",
    name: "BestBuy",
    desc: "Best Buy, Inc. is an American multinational technology company that specializes in consumer electronics, computers, software, and online services.",
  },
  {
    imgUrl: "/assets/ualife.jpeg",
    name: "Under Armour2",
    desc: "Under Armour, Inc., together with its subsidiaries, develops, markets, and distributes performance apparel, footwear, and accessories for men, women, and youth",
  },
]

export const tags = [
  {
    name: "All",
    color: "#8E7AB5",
  },
  {
    name: "Fashion",
    color: "#4F6F52",
  },
  {
    name: "Game",
    color: "#FA7070",
  },
  {
    name: "Music",
    color: "#8E7AB5",
  },
  {
    name: "Cars",
    color: "#9CAFAA",
  },
  {
    name: "Food",
    color: "#FFD966",
  },
  { name: "Wallpaper", color: "#FFBE98" },
  { name: "Nature", color: "#D5C7E7" },
  {name: "Other", color: "#867070"}
]

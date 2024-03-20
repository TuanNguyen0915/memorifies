import { ads } from "@/lib/constants"
import Image from "next/image"

const RightBar = () => {
  return (
    <div className="no-scrollbar xl:flexCol sticky bottom-0 left-0 top-0 hidden h-screen gap-16 overflow-y-scroll px-4 py-12 md:max-w-[18em]">
      <p className="my-10 text-4xl font-bold text-white">Sponsor</p>
      {ads.map((ad) => (
        <div className="flex w-full flex-col gap-5" key={ad.name}>
          <div className="flexCenter w-full">
            <Image
              src={ad.imgUrl}
              height={150}
              width={150}
              className="rounded-xl object-cover"
              alt={ad.name}
            />
          </div>
          <p className="text-textColor-100 font-semibold">{ad.name}</p>
          <p className="text-textColor-200 text-sm italic">{ad.desc}</p>
        </div>
      ))}
    </div>
  )
}

export default RightBar

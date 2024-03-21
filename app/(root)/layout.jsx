// import CurrentUser from '@/components/shared/CurrentUser'
import CurrentUser from '@/components/shared/CurrentUser'
import LeftBar from '@/components/shared/bars/LeftBar'
import RightBar from '@/components/shared/bars/RightBar'
import MainContainer from '@/components/shared/mainContainer/MainContainer'

const RootLayout = ({ children }) => {
  return (
    <div className='flex min-h-screen w-full gap-2 lg:gap-10'>
      <CurrentUser />
      <LeftBar />
      <MainContainer>{children}</MainContainer>
      <RightBar />
    </div>
  )
}

export default RootLayout

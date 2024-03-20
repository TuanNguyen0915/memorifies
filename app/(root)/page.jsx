import { PostCard } from '@/components/shared/mainContainer/PostCard'

export default function Home() {
  return (
    <main className="flexCol gap-10">
      <PostCard imgSrc="https://images.unsplash.com/photo-1707343848723-bd87dea7b118?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <PostCard imgSrc="https://images.unsplash.com/photo-1710598586964-77602da09d41?q=80&w=1928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <PostCard imgSrc="https://images.unsplash.com/photo-1710594935133-17e492868934?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
    </main>
  )
}

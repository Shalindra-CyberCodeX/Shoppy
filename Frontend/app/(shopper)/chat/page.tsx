import { ChatView } from "@/components/shoppy/chat-view"

export default async function ChatPage({
  searchParams,
}: {
  searchParams: Promise<{ prompt?: string }>
}) {
  const { prompt } = await searchParams
  return <ChatView initialPrompt={prompt} />
}

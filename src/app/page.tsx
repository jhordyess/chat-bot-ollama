'use client'
import { useCallback, useState } from 'react'
import { sendMessage2AI } from '@/services/chatAI'

export default function Home() {
  const [messages, setMessages] = useState<
    Array<{
      message: string
      role: 'user' | 'model'
    }>
  >([])
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<'idle' | 'error' | 'typing' | 'success'>('idle')

  const sendMessage = useCallback(async () => {
    if (!input.trim()) return

    const userMessage: {
      message: string
      role: 'user' | 'model'
    } = { message: input, role: 'user' }
    setStatus('typing')

    const { error, response } = await sendMessage2AI({
      question: input,
      messageList: [...messages, userMessage]
    })

    if (error || !response) {
      setMessages(prev => [...prev, userMessage, { message: `Error: ${error}`, role: 'model' }])
      setStatus('error')
    } else {
      setMessages(prev => [...prev, userMessage, { message: response, role: 'model' }])
      setStatus('success')
      setInput('')
    }
  }, [input, messages])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-md">
        <header className="bg-blue-500 py-4 text-center text-white">
          <h1 className="text-lg font-bold">Easy Bot</h1>
        </header>

        <div className="flex h-96 flex-col space-y-4 overflow-y-auto p-4">
          <div className="flex justify-start">
            <div className="rounded-lg bg-gray-200 px-4 py-2 text-black">Ask me anything</div>
          </div>

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg px-4 py-2 ${
                  msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}

          {status === 'typing' && (
            <div className="flex justify-start">
              <div className="rounded-lg bg-gray-200 px-4 py-2 text-black">Typing...</div>
            </div>
          )}
        </div>

        <div className="flex items-center border-t p-4">
          <input
            type="text"
            className="flex-1 rounded-lg border px-4 py-2"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
          />
          <button
            className="ml-2 rounded-lg bg-blue-500 px-4 py-2 text-white"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

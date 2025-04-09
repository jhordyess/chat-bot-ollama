'use server'
import { Ollama, type Message } from 'ollama'

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434'
const MODEL_NAME = process.env.MODEL_NAME || 'gemma3:1b'

const ollama = new Ollama({ host: OLLAMA_HOST })

type SendMessage2AI = (args: {
  question: string
  messageList?: { role: string; message: string }[]
}) => Promise<{
  response?: string
  error?: string
}>

export const sendMessage2AI: SendMessage2AI = async ({ question, messageList }) => {
  try {
    if (!question) return { error: 'Question is required' }

    // Assemble the message history
    const messages: Message[] = messageList
      ? messageList.map((msg: { role: string; message: string }) => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.message
        }))
      : []

    // Send the user's question and get the response
    const response = await ollama.chat({
      model: MODEL_NAME,
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        ...messages,
        { role: 'user', content: question }
      ]
    })

    return { response: response.message.content }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message)
      return { error: 'Server error' }
    }

    return { error: 'An unknown error occurred' }
  }
}

'use server'
import { Ollama, type Message } from 'ollama'

const DEEPSEEK_HOST = process.env.DEEPSEEK_HOST || ''

const ollama = new Ollama({ host: DEEPSEEK_HOST })

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
          role: msg.role === 'user' ? 'user' : 'model',
          content: msg.message
        }))
      : []

    // Send the user's question and get the response
    const response = await ollama.chat({
      model: 'deepseek-r1:1.5b',
      messages: [...messages, { role: 'user', content: question }]
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

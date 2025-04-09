'use server'
import {
  Content,
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory
} from '@google/generative-ai'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ''

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
    }
  ]
})

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
    const history: Content[] = messageList
      ? messageList.map((msg: { role: string; message: string }) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.message }]
        }))
      : []

    // Create a chat session with the history
    const chat = model.startChat({ history })

    // Send the user's question and get the response
    const { response } = await chat.sendMessage(question)

    return { response: response.text() }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message)
      return { error: 'Server error' }
    }

    return { error: 'An unknown error occurred' }
  }
}

"use client"

import {useEffect, useRef, useState} from 'react'
import {addBotMessage, addUserMessage, toggleOpen} from '@/features/chatbox/slices/chatSlice'
import {useSendMessageMutation} from '@/services/chatApi'
import {
  ChatBubbleLeftIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  XMarkIcon
} from '@heroicons/react/24/solid'
import {useAppDispatch, useAppSelector} from "@/libs/rtk/hooks";
import {ChatMessageSender, SendMessageRequestBody} from "@/types/chat";
import {formatAIMessageToHTML, formatDateToTime} from "@/utils/functionHelpers";
import {UserRole} from "@/types/user";

export default function UChatWidget() {
  const dispatch = useAppDispatch()
  const {open, messages} = useAppSelector(state => state.chat)
  const [input, setInput] = useState('')
  const [sendMessage, {isLoading}] = useSendMessageMutation()
  const bottomRef = useRef<HTMLDivElement>(null)

  const auth = useAppSelector((state) => state.auth);
  const userRole = auth?.user?.role;

  const routesOnRole = () => {
    if (userRole == UserRole.CompanyEnterprise ||
        userRole == UserRole.CompanyBasic ||
        userRole == UserRole.CompanyPro
    ) {
      return "enterprise"
    } else if (userRole == UserRole.StudentPro ||
        userRole == UserRole.StudentBasic) {
      return "student"
    } else if (userRole == UserRole.UniversityManager) {
      return "school"
    } else {
      return ""
    }
  }


  // auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages])

  // handle submit new chat
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // get only text
    const text: string = input.trim()
    if (!text) return

    const chatObject: SendMessageRequestBody = {
      question: text
    }

    const dateNow = new Date().toISOString();

    // add new message here to the store
    dispatch(addUserMessage({text, date: dateNow}))
    setInput('')

    try {
      const {answer, dateReply} = await sendMessage(chatObject).unwrap()
      dispatch(addBotMessage({text: answer, date: dateReply}))
    } catch {
      dispatch(addBotMessage({
        text: '⚠️ Failed to send',
        date: new Date().toISOString()
      }))
    }
  }

  return (
      <>
        {/* Custom Toggle Button */}
        <button
            onClick={() => dispatch(toggleOpen())}
            className="
          fixed left-0 top-1/2 transform -translate-y-1/2 z-50
          py-6 px-3 bg-custom-blue-3/85 text-custom-white rounded-r-2xl shadow-2xl
          bg-custom-blue-2/85 focus:outline-none hover:bg-custom-blue-2"
            aria-label={open ? 'Close chat' : 'Open chat'}
        >
          {open
              ? <XMarkIcon className="h-6 w-6"/>
              : <ChatBubbleLeftIcon className="h-6 w-6"/>}
        </button>

        {/* Panel */}
        <div
            className={`
              fixed top-1/2 right-[2vh] h-[96vh] bg-custom-white/98 shadow-2xl
              flex flex-col z-50
              border-1 border-custom-blue-3/10 rounded-2xl
              -translate-y-1/2
              transition-transform duration-1000 ease-in-out
              ${open ? 'translate-x-0' : 'translate-x-[110%]'}
              w-1/6 min-w-[35rem]
        `}
        >
          {/* Header */}
          <div className="flex items-center justify-center border-b p-4 space-x-3 border-custom-blue-3">
            {/* Heroicon as logo */}
            <ChatBubbleLeftRightIcon className="h-8 w-8 text-custom-blue-3"/>

            {/* Vietnamese title */}
            <h2 className="text-2xl font-semibold text-custom-blue-3">
              Trợ lý ảo XIMI
            </h2>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map(
                msg => {

                  const isUser = msg.sender === ChatMessageSender.User
                  const time = formatDateToTime(msg.date)

                  return (
                      <div
                          key={msg.id}
                          className={`flex items-end ${isUser
                              ? 'justify-end space-x-reverse space-x-2'
                              : 'justify-start space-x-2'}`}
                      >
                        {/* Bubble */}
                        <div className={`inline-block px-4 py-2 rounded-xl max-w-[75%] shadow-xl break-words whitespace-pre-line
                          ${isUser
                            ? 'bg-custom-blue-3 text-custom-white'
                            : 'bg-custom-gray/20 text-custom-black'}`}>

                          <div dangerouslySetInnerHTML={{__html: formatAIMessageToHTML(msg.text, routesOnRole())}}/>

                          <div className={`mt-1 text-right text-x
                          ${isUser ? 'text-custom-white/50' : 'text-custom-black/60'}`}>{time}</div>
                        </div>
                      </div>)
                })}

            <div ref={bottomRef}/>
          </div>

          {/* Input bar: slides down when loading */}
          <form
              onSubmit={handleSubmit}
              className={`flex items-center border-t p-4
                          transform transition-transform duration-700 ease-in-out
                        `}
          >
            <textarea
                value={input}
                maxLength={600}
                onChange={e => setInput(e.target.value)}
                className="flex-1 border rounded-l px-4 py-4
                            focus:outline-none
                            focus:ring-3 focus:ring-custom-yellow-3
                            overflow-y-auto
                            max-h-32
                            resize-none
                           "
                placeholder="Hỏi Uphub nhé ..."
            />

            {/* Submit Button */}

            <button
                disabled={isLoading}
                type="submit"
                className="flex items-center bg-custom-yellow-3 text-custom-white px-6 py-3 rounded-r
                           hover:bg-custom-yellow-3/80 focus:outline-none"
            >{!isLoading
                ? <PaperAirplaneIcon className="h-6 w-6 rotate-90 transform"/>
                : <SparklesIcon className="h-6 w-6 transition"/>
            }
            </button>

          </form>
        </div>
      </>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  MessageSquare,
  Send,
  Mic,
  Volume2,
  Languages,
  Bot,
  User,
  Clock,
  Sparkles,
  History,
  Settings,
  HelpCircle,
  CheckCircle
} from "lucide-react"

// Sample chat messages with Hinglish support
const sampleMessages = [
  {
    id: 1,
    role: "user",
    content: "Bhaiya, Block C mein kal raat ko light kyun gayi thi?",
    timestamp: "Yesterday, 10:45 PM",
    language: "hi"
  },
  {
    id: 2,
    role: "assistant",
    content: "Sir, Block C mein kal raat 2 baje voltage surge hua tha, isliye auto-cut ho gaya. Safety ke liye system ne automatically power cut kar diya. Koi major damage nahi hua. Subah 6 baje power restore kar diya gaya tha.",
    timestamp: "Yesterday, 10:46 PM",
    language: "hi"
  },
  {
    id: 3,
    role: "user",
    content: "What is the current water level in Tank A?",
    timestamp: "Today, 9:15 AM",
    language: "en"
  },
  {
    id: 4,
    role: "assistant",
    content: "Tank A (Block 1) is currently at 78% capacity. The tank was last filled today at 6:30 AM. Water level is in the normal range, and the pump is currently OFF. No action needed.",
    timestamp: "Today, 9:15 AM",
    language: "en"
  },
]

// Common queries in both languages
const commonQueries = [
  { 
    text: "Tank ka pani level kya hai?", 
    icon: "💧",
    category: "Water"
  },
  { 
    text: "Bijli ka bill kitna aaya?", 
    icon: "⚡",
    category: "Energy"
  },
  { 
    text: "Koi visitor aaya hai?", 
    icon: "🚪",
    category: "Security"
  },
  { 
    text: "Gas leak detection status?", 
    icon: "🔥",
    category: "Safety"
  },
  { 
    text: "Kachra collection kab hoga?", 
    icon: "🗑️",
    category: "Waste"
  },
  { 
    text: "CCTV mein kuch dikha?", 
    icon: "📹",
    category: "CCTV"
  },
]

// Query history
const queryHistory = [
  {
    query: "Block A mein maintenance kab hoga?",
    time: "2 hours ago",
    response: "Block A maintenance scheduled for this Saturday"
  },
  {
    query: "Today's power consumption",
    time: "5 hours ago",
    response: "Current consumption: 245 kWh"
  },
  {
    query: "Parking mein jagah hai kya?",
    time: "Yesterday",
    response: "Available parking slots: 12"
  },
]

export default function AssistantPage() {
  const [messages, setMessages] = useState(sampleMessages)
  const [inputValue, setInputValue] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [language, setLanguage] = useState<"en" | "hi" | "auto">("auto")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const newUserMessage = {
      id: messages.length + 1,
      role: "user" as const,
      content: inputValue,
      timestamp: new Date().toLocaleString(),
      language: language === "auto" ? "hi" : language
    }

    setMessages([...messages, newUserMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        role: "assistant" as const,
        content: generateResponse(inputValue, language),
        timestamp: new Date().toLocaleString(),
        language: language === "auto" ? "hi" : language
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateResponse = (query: string, lang: string) => {
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes("water") || lowerQuery.includes("pani") || lowerQuery.includes("tank")) {
      return lang === "hi" || lang === "auto"
        ? "Sir, abhi sab tanks ka status normal hai. Tank A - 78%, Tank B - 25%, Tank C - 92%. Tank B mein thoda kam hai, lekin pump ON hai aur fill ho raha hai."
        : "All water tanks are functioning normally. Tank A is at 78%, Tank B at 25% (pump is ON and filling), and Tank C is at 92%."
    }
    
    if (lowerQuery.includes("light") || lowerQuery.includes("bijli") || lowerQuery.includes("power")) {
      return lang === "hi" || lang === "auto"
        ? "Aaj ka power consumption 245 kWh hai. Sab zones mein electricity supply normal hai. Koi voltage issue nahi hai currently."
        : "Today's power consumption is 245 kWh. All zones have normal electricity supply. No voltage issues detected."
    }

    if (lowerQuery.includes("visitor") || lowerQuery.includes("security") || lowerQuery.includes("gate")) {
      return lang === "hi" || lang === "auto"
        ? "Abhi 3 visitors andar hain. Sab ka entry register ho gaya hai. Security system fully active hai."
        : "There are currently 3 visitors on premises. All entries are registered. Security system is fully active."
    }

    if (lowerQuery.includes("gas") || lowerQuery.includes("lpg") || lowerQuery.includes("leak")) {
      return lang === "hi" || lang === "auto"
        ? "⚠️ IMPORTANT: Block A kitchen mein LPG level critical hai (1850 PPM). Turant evacuate karein aur emergency team ko call karein!"
        : "⚠️ IMPORTANT: LPG levels in Block A kitchen are critical (1850 PPM). Immediate evacuation required and emergency team has been notified!"
    }

    return lang === "hi" || lang === "auto"
      ? "Main aapki query ko samajh raha hoon. System logs check kar raha hoon... Kya aap thoda aur detail de sakte hain?"
      : "I understand your query. Checking system logs... Could you please provide more details?"
  }

  const handleQuickQuery = (query: string) => {
    setInputValue(query)
    setTimeout(() => handleSend(), 100)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setIsRecording(false)
        setInputValue("Tank ka pani level kya hai?")
      }, 2000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
          <Bot className="h-7 w-7" />
          Sahayak AI - सहायक AI Assistant
        </h1>
        <p className="text-muted-foreground">
          Multilingual AI assistant powered by RAG and fine-tuned LLM (Llama 3)
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Queries</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+23 today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Languages</CardTitle>
            <Languages className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Hindi, English, Hinglish</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">96.8%</div>
            <p className="text-xs text-muted-foreground">Response accuracy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2s</div>
            <p className="text-xs text-muted-foreground">Real-time processing</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chat Interface */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Chat with Sahayak
                </CardTitle>
                <CardDescription>
                  Ask questions in Hindi, English, or Hinglish
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  AI Online
                </Badge>
                <Button variant="outline" size="sm">
                  <Languages className="h-4 w-4 mr-2" />
                  {language === "auto" ? "Auto" : language === "hi" ? "हिंदी" : "English"}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Chat Messages */}
            <ScrollArea className="h-[400px] pr-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.role === "user"
                            ? "text-blue-100"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                    {message.role === "user" && (
                      <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" />
                        <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce delay-100" />
                        <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your question in Hindi or English..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1"
                />
                <Button
                  size="icon"
                  variant={isRecording ? "destructive" : "outline"}
                  onClick={toggleRecording}
                >
                  <Mic className={`h-4 w-4 ${isRecording ? "animate-pulse" : ""}`} />
                </Button>
                <Button size="icon" onClick={handleSend}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {isRecording && (
                <div className="text-xs text-red-600 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                  Recording... Speak in Hindi or English
                </div>
              )}
            </div>

            {/* Quick Queries */}
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground mb-2">Quick Questions:</p>
              <div className="flex flex-wrap gap-2">
                {commonQueries.slice(0, 4).map((q, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickQuery(q.text)}
                    className="text-xs"
                  >
                    <span className="mr-1">{q.icon}</span>
                    {q.text}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar - Quick Actions & History */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Common Queries</CardTitle>
              <CardDescription>Quick access to frequent questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {commonQueries.map((query, idx) => (
                  <Button
                    key={idx}
                    variant="ghost"
                    className="w-full justify-start text-sm h-auto py-3"
                    onClick={() => handleQuickQuery(query.text)}
                  >
                    <span className="mr-2 text-lg">{query.icon}</span>
                    <div className="flex-1 text-left">
                      <div>{query.text}</div>
                      <div className="text-xs text-muted-foreground">{query.category}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <History className="h-4 w-4" />
                Recent Queries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {queryHistory.map((item, idx) => (
                  <div key={idx} className="border-b pb-2 last:border-0">
                    <p className="text-sm font-medium">{item.query}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.response}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {item.time}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Settings className="h-4 w-4" />
                AI Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Model:</span>
                <Badge variant="outline">Llama 3.1 70B</Badge>
              </div>
              <div className="flex justify-between">
                <span>RAG Database:</span>
                <Badge variant="outline">PostgreSQL</Badge>
              </div>
              <div className="flex justify-between">
                <span>Context Size:</span>
                <Badge variant="outline">128K tokens</Badge>
              </div>
              <div className="flex justify-between">
                <span>Voice Support:</span>
                <Badge className="bg-green-500">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="h-3 w-3" />
                  <span>Fine-tuned on 50K+ society queries</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <Card>
        <CardHeader>
          <CardTitle>Sahayak AI Capabilities</CardTitle>
          <CardDescription>
            What our multilingual AI assistant can help you with
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Languages className="h-4 w-4 text-blue-600" />
                </div>
                <h4 className="font-semibold">Multilingual Support</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Understands and responds in Hindi, English, and Hinglish. Perfect for security guards, staff, and residents.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Mic className="h-4 w-4 text-green-600" />
                </div>
                <h4 className="font-semibold">Voice Commands</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Speak naturally in your preferred language. Voice-to-text and text-to-speech enabled.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                </div>
                <h4 className="font-semibold">RAG-Powered</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Retrieval-Augmented Generation uses your building's logs and data for accurate, contextual responses.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import React, { useState, useEffect, useRef, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Trophy, DollarSign, Star } from "lucide-react"
import Image from "next/image"
import PriceAnchoring from "@/components/price-anchoring"
import Script from "next/script"
import Head from "next/head"

// Declare tipos globais para os pixels
declare global {
  interface Window {
    TiktokAnalyticsObject?: string;
    ttq?: any;
    _fbq?: any;
    fbq?: any;
    pixelId?: string;
  }
}

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "In what year was the Oklahoma City Thunder founded?",
    options: ["2008", "1996", "2012", "1985"],
    correct: 0,
    explanation:
      "The Oklahoma City Thunder was founded in 2008 when the Seattle SuperSonics relocated to Oklahoma City.",
  },
  {
    id: 2,
    question: "What is Shai Gilgeous-Alexander's jersey number?",
    options: ["2", "5", "11", "0"],
    correct: 0,
    explanation: "Shai Gilgeous-Alexander wears jersey number 2 for the Oklahoma City Thunder.",
  },
  {
    id: 3,
    question: "In which city does the Thunder play home games?",
    options: ["Oklahoma City", "Dallas", "New York", "Miami"],
    correct: 0,
    explanation: "The Oklahoma City Thunder plays their home games at Paycom Center in Oklahoma City, Oklahoma.",
  },
  {
    id: 4,
    question: "What colors are on the official Oklahoma City Thunder jersey?",
    options: ["Blue and orange", "Red and white", "Green and yellow", "Black and gold"],
    correct: 0,
    explanation:
      "The Oklahoma City Thunder's official colors are blue and orange, representing the team's identity and energy.",
  },
]

// Enhanced notification component
const SuccessNotification = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => {
          onClose()
        }, 500) // Wait for exit animation
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-500 transform ${
        isVisible ? "translate-x-0 opacity-100 scale-100" : "translate-x-full opacity-0 scale-95"
      }`}
    >
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center space-x-3 border border-green-400">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center animate-pulse">
          <DollarSign className="h-6 w-6 text-green-500" />
        </div>
        <div>
          <p className="font-bold text-lg">Congratulations! 🎉</p>
          <p className="text-sm opacity-90">You earned $25 discount!</p>
        </div>
        <div className="w-2 h-2 bg-green-300 rounded-full animate-ping"></div>
      </div>
    </div>
  )
}

// Componente de vídeo simplificado
const VideoPlayer = React.memo(({ isReady }: { isReady: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showMuteButton, setShowMuteButton] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const forcePlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {
            console.log("Não foi possível iniciar o vídeo automaticamente");
          });
        });
      }
    };

    forcePlay();
    video.addEventListener('canplay', forcePlay);
    video.addEventListener('loadeddata', forcePlay);
    setTimeout(forcePlay, 1000);

    return () => {
      video.removeEventListener('canplay', forcePlay);
      video.removeEventListener('loadeddata', forcePlay);
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
      if (!videoRef.current.muted) {
        // Se foi desmutado, esconde o botão após um pequeno delay
        setTimeout(() => {
          setShowMuteButton(false);
        }, 500);
      }
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
      <video
        ref={videoRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '25px'
        }}
        autoPlay
        playsInline
        controls={false}
        preload="auto"
        src="https://pub-715e1058d62e45dca1d7229ecb1e7480.r2.dev/original.mp4"
      />
      {showMuteButton && (
        <button
          onClick={toggleMute}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            background: 'rgba(0, 0, 0, 0.6)',
            border: 'none',
            borderRadius: '50%',
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white',
            transition: 'opacity 0.3s ease'
          }}
        >
          {isMuted ? (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

// Componente de Layout para os scripts simplificado
const PixelScripts = () => (
  <>
    {/* UTMify Pixel */}
    <Script
      id="utmify-pixel"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.pixelId = "685891b70625ccf1fd3a54bc";
          var a = document.createElement("script");
          a.setAttribute("async", "");
          a.setAttribute("defer", "");
          a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
          document.head.appendChild(a);
        `
      }}
    />

    {/* UTMify UTM Tracking */}
    <Script
      id="utmify-tracking"
      src="https://cdn.utmify.com.br/scripts/utms/latest.js"
      data-utmify-prevent-xcod-sck=""
      data-utmify-prevent-subids=""
      async
      defer
      strategy="beforeInteractive"
    />

    {/* Meta Pixel */}
    <Script
      id="meta-pixel"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '10005843282818404');
          fbq('track', 'PageView');
        `
      }}
    />

    {/* TikTok Pixel */}
    <Script
      id="tiktok-pixel"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

            ttq.load('CQI0UF3C77UBN1SEFPV0');
            ttq.page();
          }(window, document, 'ttq');
        `
      }}
    />
  </>
);

// Hook para controlar o carregamento dos pixels com verificações do VTurb
const usePixelLoader = () => {
  const [isPixelsReady, setPixelsReady] = useState(false);
  const pixelsInitialized = useRef(false);

  useEffect(() => {
    if (pixelsInitialized.current) {
      setPixelsReady(true);
      return;
    }

    // Verifica se o VTurb está carregado
    const checkVturb = () => {
      const vturbElement = document.querySelector('iframe[src*="converteai"]');
      return vturbElement !== null;
    };

    // Verifica se os pixels estão carregados
    const checkPixels = () => {
      return window.fbq && window.ttq;
    };

    // Função que verifica tudo
    const checkAll = () => {
      if (checkVturb() && checkPixels()) {
        setPixelsReady(true);
        pixelsInitialized.current = true;
        clearInterval(checkInterval);
      }
    };

    // Inicia verificação periódica
    const checkInterval = setInterval(checkAll, 500);

    // Timeout de segurança após 10 segundos
    const timeoutId = setTimeout(() => {
      setPixelsReady(true);
      pixelsInitialized.current = true;
      clearInterval(checkInterval);
    }, 10000);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(timeoutId);
    };
  }, []);

  return isPixelsReady;
};

// Função simplificada para disparar eventos
const trackEvent = (eventName: string) => {
  try {
    if (window.fbq) {
      window.fbq('track', eventName);
    }
    if (window.ttq) {
      window.ttq.track(eventName);
    }
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

// Rastrear visualização da VSL apenas uma vez
const useTrackVSLView = () => {
  const [hasTracked, setHasTracked] = useState(false);

  useEffect(() => {
    if (!hasTracked) {
      setTimeout(() => {
        trackEvent('VSL_View');
        setHasTracked(true);
      }, 1000);
    }
  }, [hasTracked]);
};

// Hook personalizado para gerenciar elementos escondidos (não é mais necessário)
function useDelayedElements() {
  // O delay agora é controlado pelo VTurb
  return;
}

// Modificar o hook de áudio para ser mais simples e direto
const useAudioSystem = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio("https://cdn.shopify.com/s/files/1/0946/2290/8699/files/notifica_o-venda.mp3?v=1749150271");
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  return playSound;
};

export default function PSGQuiz() {
  const [gameStarted, setGameStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [audioInitialized, setAudioInitialized] = useState(false)
  const isPixelsReady = usePixelLoader()
  const playNotificationSound = useAudioSystem()

  // Usar o hook de delay
  useDelayedElements()

  // Modificar a função de início do quiz
  const handleStartQuiz = () => {
    trackEvent('Quiz_Start');
    setGameStarted(true);
  };

  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio system
  useEffect(() => {
    const initializeAudio = () => {
      try {
        // Create audio element
        const audio = new Audio(
          "https://cdn.shopify.com/s/files/1/0946/2290/8699/files/notifica_o-venda.mp3?v=1749150271",
        )
        audio.preload = "auto"
        audio.volume = 1
        audioRef.current = audio

        // Try to initialize audio context for mobile
        const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext
        if (AudioContext) {
          const audioContext = new AudioContext()
          if (audioContext.state === "suspended") {
            audioContext.resume()
          }
        }

        setAudioInitialized(true)
        console.log("Audio system initialized successfully")
      } catch (error) {
        console.log("Error initializing audio:", error)
      }
    }

    // Initialize on first user interaction
    const handleFirstInteraction = () => {
      initializeAudio()
      document.removeEventListener("touchstart", handleFirstInteraction)
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("keydown", handleFirstInteraction)
    }

    document.addEventListener("touchstart", handleFirstInteraction, { passive: true })
    document.addEventListener("click", handleFirstInteraction)
    document.addEventListener("keydown", handleFirstInteraction)

    return () => {
      document.removeEventListener("touchstart", handleFirstInteraction)
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("keydown", handleFirstInteraction)
    }
  }, [])

  // Modificar a função de resposta
  const handleAnswer = () => {
    const isCorrect = Number.parseInt(selectedAnswer) === questions[currentQuestion].correct
    const questionNumber = currentQuestion + 1;

    trackEvent(`Quiz_Question_${questionNumber}`);

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1)
      setShowNotification(true)
      trackEvent(`Quiz_Correct_Answer_${questionNumber}`);
      playNotificationSound()
    } else {
      trackEvent(`Quiz_Wrong_Answer_${questionNumber}`);
    }

    setShowResult(true)
  }

  // Modificar a função de próxima questão
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer("")
      setShowResult(false)
    } else {
      setQuizCompleted(true)
      trackEvent('Quiz_Completed');
    }
  }

  // Modificar o botão de compra para não recarregar a página
  const handleBuyNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackEvent('Going_to_Store');
    const newWindow = window.open("https://nba-thunder.store/", "_blank");
    if (newWindow) newWindow.opener = null;
  };

  // Modificar o botão de reiniciar para não recarregar a página
  const handleRestart = () => {
    trackEvent('Quiz_Restart');
    setGameStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setCorrectAnswers(0);
    setShowResult(false);
    setQuizCompleted(false);
    setShowNotification(false);
  };

  const discount = correctAnswers * 25
  const originalPrice = 150.0
  const finalPrice = Math.max(originalPrice - discount, 50.0)

  useTrackVSLView();

  // Initial screen with the president
  if (!gameStarted) {
    return (
      <>
        <PixelScripts />
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600 flex items-center justify-center p-4">
          <audio
            id="notification-sound"
            src="https://cdn.shopify.com/s/files/1/0946/2290/8699/files/notifica_o-venda.mp3?v=1749150271"
            preload="auto"
            style={{ display: "none" }}
          />

          <Card className="w-full max-w-3xl mx-2">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold text-blue-900 mb-6">Message from Thunder Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="mb-6">
                <VideoPlayer isReady={true} />
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200 esconder mb-6">
                <blockquote className="text-sm md:text-lg text-gray-800 italic text-center leading-relaxed">
                  "Answer the 4 questions to prove that you are a true fan of the team and win the opportunity to win an
                  autographed shirt at cost price"
                </blockquote>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 esconder mb-6">
                <div className="flex items-center justify-center space-x-2 text-yellow-800">
                  <Star className="h-5 w-5" />
                  <span className="font-semibold">Maximum discount: $100 • Final price: $49.99</span>
                  <Star className="h-5 w-5" />
                </div>
              </div>

              <div className="px-4 pb-6 esconder">
                <Button
                  onClick={handleStartQuiz}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3"
                  size="lg"
                >
                  <Trophy className="h-6 w-6" />
                  Start the Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    )
  }

  if (quizCompleted) {
    return (
      <>
        <PixelScripts />
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl mx-2">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Trophy className="h-16 w-16 text-yellow-500" />
              </div>
              <CardTitle className="text-3xl font-bold text-blue-900">Congratulations, True Thunder Fan! 🎉</CardTitle>
              <CardDescription className="text-lg">
                You got {correctAnswers} correct answers out of {questions.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <PriceAnchoring correctAnswers={correctAnswers} />

              <div className="flex flex-col gap-4">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                  size="lg"
                  onClick={handleBuyNowClick}
                >
                  <DollarSign className="mr-2 h-5 w-5" />
                  Buy Now
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full" 
                  onClick={handleRestart}
                >
                  Start Over
                </Button>
              </div>

              <div className="text-center text-sm text-gray-600">
                <p>* Offer valid only for true Thunder fans</p>
                <p>** Special price: $50.00 (maximum discount applied)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    )
  }

  return (
    <>
      <PixelScripts />
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600 flex items-center justify-center p-4">
        <SuccessNotification show={showNotification} onClose={() => setShowNotification(false)} />

        <Card className="w-full max-w-2xl mx-2">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alexander.jpg-yJWzzHVbBOK22oRDWw59IGExKSePHQ.jpeg"
                    alt="Thunder Jersey"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <CardTitle className="text-xl">Thunder Fan Quiz</CardTitle>
                  <CardDescription>
                    Question {currentQuestion + 1} of {questions.length}
                  </CardDescription>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Current discount</p>
                <p className="text-2xl font-bold text-green-600">${correctAnswers * 25}</p>
              </div>
            </div>
            <Progress value={(currentQuestion / questions.length) * 100} className="w-full" />
          </CardHeader>

          <CardContent className="space-y-6">
            {!showResult ? (
              <>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-900">{questions[currentQuestion].question}</h3>

                  <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-blue-100 transition-colors"
                      >
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer font-medium">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <Button
                  onClick={handleAnswer}
                  disabled={!selectedAnswer}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="lg"
                >
                  Confirm Answer
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <div
                  className={`p-6 rounded-lg ${
                    Number.parseInt(selectedAnswer) === questions[currentQuestion].correct
                      ? "bg-green-50 border-2 border-green-200"
                      : "bg-red-50 border-2 border-red-200"
                  }`}
                >
                  <div className="flex items-center mb-3">
                    {Number.parseInt(selectedAnswer) === questions[currentQuestion].correct ? (
                      <>
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-bold">✓</span>
                        </div>
                        <span className="text-green-800 font-semibold text-lg">Correct! +$25 discount</span>
                      </>
                    ) : (
                      <>
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-bold">✗</span>
                        </div>
                        <span className="text-red-800 font-semibold text-lg">Incorrect</span>
                      </>
                    )}
                  </div>

                  <p className="text-gray-700 mb-3">
                    <strong>Correct answer:</strong>{" "}
                    {questions[currentQuestion].options[questions[currentQuestion].correct]}
                  </p>

                  <p className="text-gray-600 text-sm">{questions[currentQuestion].explanation}</p>
                </div>

                <Button onClick={nextQuestion} className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                  {currentQuestion < questions.length - 1 ? "Next Question" : "See Final Result"}
                </Button>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Discount progress:</span>
                <span className="font-semibold">${correctAnswers * 25} / $100</span>
              </div>
              <Progress value={(correctAnswers / 4) * 100} className="mt-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redireciona automaticamente para a URL completa
    router.replace('/temu/limitedFragrances/box310/Eua/UTMS-campaign-2024')
  }, [router])

  // Página de loading enquanto redireciona
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Carregando...</p>
      </div>
    </div>
  )
}

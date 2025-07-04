"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FooterProps {
  metadata?: {
    version: string
    lastUpdated: string
    totalProducts: number
  }
}

export default function Footer({ metadata }: FooterProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>("Help")

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <footer className="bg-gray-100 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <span className="hover:text-gray-800 cursor-pointer">Home</span>
            <span className="mx-2">›</span>
            <span className="hover:text-gray-800 cursor-pointer">Appliances</span>
            <span className="mx-2">›</span>
            <span className="hover:text-gray-800 cursor-pointer">Fans & Air Conditioners</span>
            <span className="mx-2">›</span>
          </div>
          <p className="text-sm text-gray-700">
            Adjustable air conditioning deflector, 8pcs wall-mounted deflectors, multi-angle airflow guide for
            enhanced efficiency in cooling/heating circulation, wind protection, and anti-condensation
          </p>
        </div>

        {/* Expandable Sections */}
        <div className="space-y-4 mb-8">
          {/* Company Info */}
          <div className="border-b border-gray-200 pb-4">
            <button
              onClick={() => toggleSection("Company info")}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="font-medium text-gray-900">Company info</span>
              {expandedSection === "Company info" ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </button>
            {expandedSection === "Company info" && (
              <div className="mt-3 space-y-2">
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">
                  About Temu
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">
                  Careers
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">
                  Press
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">
                  Investor Relations
                </a>
              </div>
            )}
          </div>

          {/* Customer Service */}
          <div className="border-b border-gray-200 pb-4">
            <button
              onClick={() => toggleSection("Customer service")}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="font-medium text-gray-900">Customer service</span>
              {expandedSection === "Customer service" ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </button>
            {expandedSection === "Customer service" && (
              <div className="mt-3 space-y-2">
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">
                  Help Center
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">
                  Contact Us
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">
                  Return Policy
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">
                  Shipping Info
                </a>
              </div>
            )}
          </div>

          {/* Help */}
          <div className="border-b border-gray-200 pb-4">
            <button
              onClick={() => toggleSection("Help")}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="font-medium text-gray-900">Help</span>
              {expandedSection === "Help" ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </button>
            {expandedSection === "Help" && (
              <div className="mt-3 space-y-2">
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">
                  Support center
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">
                  Sitemap
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">
                  Temu purchase protection
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">
                  How to order
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">
                  How to track
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-6 mb-8">
          <a href="#" className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.212 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
            </svg>
          </a>
        </div>

        {/* Copyright and Links */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">© 2022 - 2025 Whaleco Inc.</p>
          {metadata && (
            <div className="text-xs text-gray-400 mb-2 bg-gray-50 rounded px-2 py-1 inline-block">
              Dados v{metadata.version} • Atualizado em {metadata.lastUpdated} • {metadata.totalProducts} produtos
            </div>
          )}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-4">
            <a href="#" className="hover:text-gray-800 underline">
              Terms of use
            </a>
            <a href="#" className="hover:text-gray-800 underline">
              Privacy policy
            </a>
            <a href="#" className="hover:text-gray-800 underline">
              Consumer health data privacy policy
            </a>
            <a href="#" className="hover:text-gray-800 underline">
              Ad Choices
            </a>
          </div>
          <div className="flex justify-center items-center gap-2">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-800 underline">
              Your privacy choices
            </a>
            <div className="w-6 h-4 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs">🔒</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 
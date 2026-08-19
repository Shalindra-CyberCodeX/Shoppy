"use client"

import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = "shoppy-shopper-session"

type StoredSession = {
  email: string
  name: string
}

function readSession(): StoredSession | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as StoredSession) : null
  } catch {
    return null
  }
}

export function useShopperAuth() {
  const [session, setSession] = useState<StoredSession | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setSession(readSession())
    setIsReady(true)
  }, [])

  const saveSession = useCallback((nextSession: StoredSession) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession))
    setSession(nextSession)
  }, [])

  const signIn = useCallback(
    (email: string, password: string) => {
      if (!email.trim() || !password.trim()) {
        return { success: false, message: "Enter your email and password." }
      }

      const name = email.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())
      saveSession({ email: email.trim().toLowerCase(), name: name || "Shoppy shopper" })
      return { success: true }
    },
    [saveSession],
  )

  const signUp = useCallback(
    (name: string, email: string, password: string) => {
      if (!name.trim() || !email.trim() || !password.trim()) {
        return { success: false, message: "Complete all fields to create your account." }
      }
      if (password.length < 6) {
        return { success: false, message: "Use a password with at least 6 characters." }
      }

      saveSession({ email: email.trim().toLowerCase(), name: name.trim() })
      return { success: true }
    },
    [saveSession],
  )

  const signInWithGoogle = useCallback(() => {
    saveSession({ email: "google-shopper@shoppy.demo", name: "Google shopper" })
    return { success: true }
  }, [saveSession])

  const signOut = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY)
    setSession(null)
  }, [])

  return {
    session,
    isReady,
    isAuthenticated: Boolean(session),
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
  }
}

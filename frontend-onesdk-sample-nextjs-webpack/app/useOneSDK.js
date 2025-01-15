"use client"
import OneSDK from "@frankieone/one-sdk"
import { useEffect, useRef, useState } from "react"

const CUSTOMER_ID = process.env.NEXT_PUBLIC_CUSTOMER_ID
const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const CHILD_ID = ''

const useOneSDK = ({config}) => {
  const [oneSDKInstance, setOneSDKInstance] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const initializedRef = useRef(false);

  const generateToken = async () => {
    const parseURL = () => {
      return btoa(`${CUSTOMER_ID}:${API_KEY}`)
    }
    try {

      const tokenRawAsync = await fetch("https://backend.latest.frankiefinancial.io/auth/v2/machine-session", {
          method: "POST",
          headers: {
              "authorization": "machine " + parseURL(),
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              permissions: {
                  "preset": "one-sdk",
                  "reference": `demo-${new Date().toISOString()}`//"<YOUR_UNIQUE_CUSTOMER_REF>"
              }
          })
      });
      return await tokenRawAsync.json()
    } catch (error) {
      setError(error.message)
      return null
    }
  }

  const generateOneSDKInstance = async () => {
    setLoading(true)
    const tokenSessionFromBackEnd = await generateToken()
    if(!tokenSessionFromBackEnd) return
    const SDKConfig = config || {
      mode: "development",
      recipe: {
        form: {
          provider: {
            name: 'react'
          },
        }
      }
    }
    const {session, ...rest} = SDKConfig
    console.log({
        session: {...session, ...tokenSessionFromBackEnd},
        ...rest
      })
    try {

      const oneSDKInit = await OneSDK({
        session: {session, ...tokenSessionFromBackEnd},
        ...rest
      })
      setOneSDKInstance(oneSDKInit)
    } catch(error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if(!initializedRef.current) {

      generateOneSDKInstance()
      initializedRef.current = true
    }
  }, [config])

  return {
    oneSDKInstance,
    error,
    loading
  }
}

export default useOneSDK
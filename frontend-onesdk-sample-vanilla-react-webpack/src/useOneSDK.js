"use client"
import OneSDK from "@frankieone/one-sdk"
import { useEffect, useRef, useState } from "react"

const CUSTOMER_ID = process.env.REACT_APP_CUSTOMER_ID
const API_KEY = process.env.REACT_APP_API_KEY
const CHILD_ID = ''

const CUSTOMER_ID2 = process.env.REACT_APP_CUSTOMER_ID2
const API_KEY2 = process.env.REACT_APP_API_KEY2
const CHILD_ID2 = process.env.REACT_APP_CUSTOMER_CHILD_ID2
const BFF_BASE_URL = process.env.REACT_APP_BFF_BASE_URL

const useOneSDK = ({config, alternateKey}) => {
  const [oneSDKInstance, setOneSDKInstance] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const initializedRef = useRef(false);

  const generateToken = async () => {
    console.log(CUSTOMER_ID2)
    const parseURL = () => {
      if(alternateKey) {
        return btoa([CUSTOMER_ID2, CHILD_ID2, API_KEY2].filter(Boolean).join(":"))
      }
      return btoa(`${CUSTOMER_ID}:${API_KEY}`)
    }
    try {

      const tokenRawAsync = await fetch(`${BFF_BASE_URL}/auth/v2/machine-session`, {
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
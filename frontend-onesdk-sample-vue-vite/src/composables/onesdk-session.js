import { onMounted, ref } from 'vue'

export function useOneSdkSession() {
  const CUSTOMER_ID = import.meta.env.VITE_CUSTOMER_ID
  const API_KEY = import.meta.env.VITE_API_KEY

  const tokenResult = ref()

  onMounted(async () => {
    const tokenResultRaw = await fetch(
      'https://backend.latest.frankiefinancial.io/auth/v2/machine-session',
      {
        method: 'POST',
        headers: {
          'authorization': 'machine ' + btoa(`${CUSTOMER_ID}:${API_KEY}`),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          permissions: {
            preset: 'one-sdk',
            reference: `demo-${new Date().toISOString()}` //"<YOUR_UNIQUE_CUSTOMER_REF>"
          }
        })
      }
    )
    tokenResult.value = await tokenResultRaw.json()
  })

  return tokenResult
}

export function useOneSdkSessionWithChildId() {
  const CUSTOMER_ID = import.meta.env.VITE_CUSTOMER_ID2
  const CUSTOMER_CHILD_ID = import.meta.env.VITE_CUSTOMER_CHILD_ID2
  const API_KEY = import.meta.env.VITE_API_KEY2

  const tokenResult = ref()

  onMounted(async () => {
    const tokenResultRaw = await fetch(
      'https://backend.latest.frankiefinancial.io/auth/v2/machine-session',
      {
        method: 'POST',
        headers: {
          'authorization': 'machine ' + btoa(`${CUSTOMER_ID}:${CUSTOMER_CHILD_ID}:${API_KEY}`),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          permissions: {
            preset: 'one-sdk',
            reference: `demo-${new Date().toISOString()}` //"<YOUR_UNIQUE_CUSTOMER_REF>"
          }
        })
      }
    )
    tokenResult.value = await tokenResultRaw.json()
  })

  return tokenResult
}

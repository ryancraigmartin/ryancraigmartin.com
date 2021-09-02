import '../styles/globals.scss'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import * as googleAnalytics from '../lib/analytics'

function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = url => {
      googleAnalytics.pageView(url)
    }
    // When the component is mounted, subscribe to router changes and log page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Component {...pageProps} />
}

export default App

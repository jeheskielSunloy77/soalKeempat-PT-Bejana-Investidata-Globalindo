import "../styles/globals.css"
import { AppProvider } from "../utils/AppContext"

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp

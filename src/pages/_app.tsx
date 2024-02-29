import '../app/globals.css'; // Adjust the path according to your project's structure
import type { AppProps } from 'next/app';
import { AuthProvider} from '../contexts/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return ( 
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>    
  )
}

export default MyApp;

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './app/ui/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Provider store={rtkStore}>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <AuthProvider> */}
            <BrowserRouter>
                  <App />
            </BrowserRouter>
           {/* </AuthProvider>
         </LanguageProvider>
       </QueryClientProvider>
     </Provider> */}
  </StrictMode>,
)

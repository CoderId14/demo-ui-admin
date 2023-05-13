import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './config/queryClient.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { injectStore } from './config/axios.ts'
import { persistor, store } from './redux/store.ts'
import { Provider } from 'react-redux'
const theme = createTheme()
// Tránh trực tiếp injectStore vào codebase file, và cũng không dùng trực tiếp hook ở file không phải components
//  => injectStore vào interceptors
injectStore(store)

// Giữ server luôn ở trạng thái hoạt động
setInterval( async () => {
	await fetch(`https://demo-jg34.onrender.com/api/book/v1/search`);
}, 60*1000*5);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <App />
              <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)

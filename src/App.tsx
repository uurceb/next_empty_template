import { Routes, Route, Navigate } from 'react-router-dom'

// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'
import LayoutWrapper from '@layouts/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'
import HorizontalLayout from '@layouts/HorizontalLayout'
import Navigation from '@components/layout/vertical/Navigation'
import Navbar from '@components/layout/vertical/Navbar'
import VerticalFooter from '@components/layout/vertical/Footer'
import HorizontalFooter from '@components/layout/horizontal/Footer'
import Header from '@components/layout/horizontal/Header'
import ScrollToTop from '@core/components/scroll-to-top'
import Login from '@views/Login'
import NotFound from '@views/NotFound'
import HomePage from '@views/HomePage'
import AboutPage from '@views/AboutPage'

// MUI Imports
import Button from '@mui/material/Button'

// Utils
import { getInitialSettings, getInitialMode, getInitialSystemMode } from '@/utils/settings'

function App() {
  // Get initial settings from localStorage or defaults
  const direction = 'ltr'
  const mode = getInitialMode()
  const settingsCookie = getInitialSettings()
  const systemMode = getInitialSystemMode()

  return (
    <Providers direction={direction} mode={mode} settingsCookie={settingsCookie} systemMode={systemMode}>
      <Routes>
        {/* Redirect root to home */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        {/* Blank layout routes */}
        <Route path="/login" element={
          <BlankLayout systemMode={systemMode}>
            <Login mode={mode} />
          </BlankLayout>
        } />
        
        {/* Dashboard layout routes */}
        <Route path="/*" element={
          <LayoutWrapper
            systemMode={systemMode}
            verticalLayout={
              <VerticalLayout 
                navigation={<Navigation mode={mode} />} 
                navbar={<Navbar />} 
                footer={<VerticalFooter />}
              >
                <Routes>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="*" element={<NotFound mode={mode} />} />
                </Routes>
              </VerticalLayout>
            }
            horizontalLayout={
              <HorizontalLayout 
                header={<Header />} 
                footer={<HorizontalFooter />}
              >
                <Routes>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="*" element={<NotFound mode={mode} />} />
                </Routes>
              </HorizontalLayout>
            }
          />
        } />
      </Routes>
      
      <ScrollToTop className='mui-fixed'>
        <Button variant='contained' className='is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center'>
          <i className='ri-arrow-up-line' />
        </Button>
      </ScrollToTop>
    </Providers>
  )
}

export default App
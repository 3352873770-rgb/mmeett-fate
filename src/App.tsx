import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from '@/components/SiteLayout'
import { AuthProvider } from '@/lib/auth'
import { ThemeProvider } from '@/lib/theme'
import { LangProvider } from '@/lib/i18n'
import { HomePage } from '@/pages/HomePage'
import { ToolsPage } from '@/pages/ToolsPage'
import { ToolDetailPage } from '@/pages/ToolDetailPage'
import { PersonalityPage } from '@/pages/PersonalityPage'
import { RelationshipPage } from '@/pages/RelationshipPage'
import { GamesPage } from '@/pages/GamesPage'
import { GameDetailPage } from '@/pages/GameDetailPage'
import { ClassicsPage } from '@/pages/ClassicsPage'
import { ClassicDetailPage } from '@/pages/ClassicDetailPage'
import { WikiPage } from '@/pages/WikiPage'
import { KnowledgePage } from '@/pages/KnowledgePage'
import { AboutPage } from '@/pages/AboutPage'
import { LoginPage } from '@/pages/LoginPage'
import { FavoritesPage } from '@/pages/FavoritesPage'
import { LegalPage } from '@/pages/LegalPage'

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<SiteLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/tools" element={<ToolsPage />} />
                <Route path="/tools/:id" element={<ToolDetailPage />} />
                <Route path="/personality" element={<PersonalityPage />} />
                <Route path="/relationship-lab" element={<RelationshipPage />} />
                <Route path="/games" element={<GamesPage />} />
                <Route path="/games/:id" element={<GameDetailPage />} />
                <Route path="/classics" element={<ClassicsPage />} />
                <Route path="/classics/:title" element={<ClassicDetailPage />} />
                <Route path="/wiki" element={<WikiPage />} />
                <Route path="/knowledge" element={<KnowledgePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<Navigate to="/" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/disclaimer" element={<LegalPage kind="disclaimer" />} />
                <Route path="/privacy" element={<LegalPage kind="privacy" />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LangProvider>
    </ThemeProvider>
  )
}

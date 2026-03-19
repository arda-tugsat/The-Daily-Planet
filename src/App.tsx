import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { EditionProvider } from './context/EditionContext'
import { ArticlePage } from './pages/ArticlePage'
import { BriefingPage } from './pages/BriefingPage'
import { CorrectionsPage } from './pages/CorrectionsPage'
import { ForumPage } from './pages/ForumPage'
import { HomePage } from './pages/HomePage'
import { LettersPage } from './pages/LettersPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SavedPage } from './pages/SavedPage'
import { SearchPage } from './pages/SearchPage'
import { SectionPage } from './pages/SectionPage'
import { SeriesPage } from './pages/SeriesPage'
import { StaffPage } from './pages/StaffPage'
import { StandardsPage } from './pages/StandardsPage'
import { TopicPage } from './pages/TopicPage'
import { TopicsIndexPage } from './pages/TopicsIndexPage'

function App() {
  return (
    <EditionProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="article/:slug" element={<ArticlePage />} />
          <Route path="section/:sectionId" element={<SectionPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="briefing" element={<BriefingPage />} />
          <Route path="letters" element={<LettersPage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="corrections" element={<CorrectionsPage />} />
          <Route path="forum" element={<ForumPage />} />
          <Route path="series/:seriesId" element={<SeriesPage />} />
          <Route path="topic/:topicSlug" element={<TopicPage />} />
          <Route path="topics" element={<TopicsIndexPage />} />
          <Route path="saved" element={<SavedPage />} />
          <Route path="standards" element={<StandardsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </EditionProvider>
  )
}

export default App

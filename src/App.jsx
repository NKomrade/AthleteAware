import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LeaderboardPage from './components/LeaderboardPage';
import ProfilePage from './components/ProfilePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatSupportComponent from './components/ChatSupport';
import CourseIntroductionPage from './pages/CourseIntroductionPage';
import CertificatePage from './components/CertificatePage';
import CoursesPage from './pages/CoursesPage';
import Community from './components/Community';
import ProhibitedSubstancesCourse from './pages/ProhibitedSubstanceCourse';
import CertificatePageProhibited from './components/CertificatePageProhibited';
import TestingProcedures from './pages/TestingProcedures';
import CertificatePageTesting from './components/CertificatePageTesting';
import TherapeuticUseCourse from './pages/TherapeuticUse';
import CertificatePageTUE from './components/CertificatePageTUE';
import Quiz from './pages/Quiz';
// import Bullseye from './pages/Bullseye';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './components/Dashboard';
function App() { 
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/quiz" element={<Quiz />} />
        {/* <Route path="/bullseye" element={<Bullseye />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses/introduction-to-anti-doping" element={<CourseIntroductionPage />} />
        <Route path="/courses/introduction-to-anti-doping/certificate" element={<CertificatePage />} />
        <Route path="/courses/prohibited-substances" element={<ProhibitedSubstancesCourse />} />
        <Route path="/courses/prohibited-substances/certificate" element={<CertificatePageProhibited/>} />
        <Route path="/courses/testing-procedures" element={<TestingProcedures />} />
        <Route path="/courses/testing-procedures/certificate" element={<CertificatePageTesting/>} />
        <Route path="/courses/therapeutic-use-exemptions" element={<TherapeuticUseCourse />} />
        <Route path="/courses/therapeutic-use-exemptions/certificate" element={<CertificatePageTUE/>} />

      </Routes>
      <ChatSupportComponent />
      {/* <Footer/> */}
    </Router>
  );
}

export default App;
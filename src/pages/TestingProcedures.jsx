import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Book, CheckCircle, PlayCircle, FileText, Award, ArrowRight } from 'lucide-react'
import QuizComponent from '../components/QuizComponent'

const courseContent = [
    { id: 1, title: "Introduction to Doping Control", type: "video", duration: "10 min" },
    { id: 2, title: "Understanding the Testing Process", type: "reading", duration: "15 min" },
    { id: 3, title: "Types of Doping Tests: In-Competition vs Out-of-Competition", type: "video", duration: "12 min" },
    { id: 4, title: "Sample Collection Procedures", type: "reading", duration: "18 min" },
    { id: 5, title: "Urine vs Blood Testing", type: "video", duration: "14 min" },
    { id: 6, title: "Athlete Rights and Responsibilities", type: "reading", duration: "20 min" },
    { id: 7, title: "Handling of Samples and Chain of Custody", type: "video", duration: "16 min" },
    { id: 8, title: "Course Quiz on Testing Procedures", type: "quiz", duration: "15 min" },
  ];
  

export default function TestingProcedures() {
  const [activeSection, setActiveSection] = useState(1)
  const [completedSections, setCompletedSections] = useState([])
  const navigate = useNavigate()

  const markAsComplete = (sectionId) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId])
    }
    if (sectionId < courseContent.length) {
      setActiveSection(sectionId + 1)
    }
  }

  const handleQuizCompletion = () => {
    markAsComplete(courseContent.length)
  }


  const isCourseDone = completedSections.length === courseContent.length

  const progress = (completedSections.length / courseContent.length) * 100

  const navigateToCertificate = () => {
    navigate('/courses/testing-procedures/certificate')
  }

  return (
    <div className="flex h-screen bg-white text-black">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Course Progress</h2>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-black h-4 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="mt-2 text-lg">{completedSections.length} of {courseContent.length} sections completed</p>
            </div>

            <div className="space-y-6">
              {courseContent.map((section) => (
                <div 
                  key={section.id} 
                  className={`p-6 border-2 ${activeSection === section.id ? 'border-black' : 'border-gray-200'} rounded-xl transition-all duration-300 ${activeSection === section.id ? 'shadow-lg' : ''}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      {section.type === 'video' && <PlayCircle className="text-blue-500" size={24} />}
                      {section.type === 'reading' && <FileText className="text-green-500" size={24} />}
                      {section.type === 'quiz' && <Book className="text-red-500" size={24} />}
                      <h3 className="text-xl font-semibold">{section.title}</h3>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-lg text-gray-600">{section.duration}</span>
                      {completedSections.includes(section.id) && (
                        <CheckCircle className="text-green-500" size={24} />
                      )}
                    </div>
                  </div>
                  {activeSection === section.id && (
                    <div className="mt-4">
                      {section.id === 1 ? (
                        <div className="space-y-4">
                          <div className="aspect-w-16 aspect-h-9 h-[380px]">
                            <iframe
                              src="https://www.youtube.com/embed/XzOnQBK_YZo"
                              title="Introduction to Prohibited Substances"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full rounded-lg"
                            ></iframe>
                          </div>
                          <p className="text-lg">This video provides an introduction to prohibited substances in sports, their impact on fair competition, and the importance of anti-doping efforts.</p>
                          <button 
                            onClick={() => markAsComplete(section.id)}
                            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center text-lg font-semibold"
                          >
                            Mark as Complete
                            <ArrowRight className="ml-2" size={20} />
                          </button>
                        </div>
                      ) : section.type === 'quiz' ? (
                        <QuizComponent onComplete={handleQuizCompletion} />
                      ) : (
                        <>
                          <p className="mb-4 text-lg">This is where the content for {section.title} would be displayed. It would include detailed information about prohibited substances, their effects, and why they are banned in sports.</p>
                          <button 
                            onClick={() => markAsComplete(section.id)}
                            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center text-lg font-semibold"
                          >
                            Mark as Complete
                            <ArrowRight className="ml-2" size={20} />
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {isCourseDone && (
              <div className="mt-12 text-center">
                <button
                  onClick={navigateToCertificate}
                  className="bg-green-500 text-white px-8 py-4 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center mx-auto text-xl font-bold"
                >
                  <Award className="mr-3" size={28} />
                  Complete Course and Get Certificate
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
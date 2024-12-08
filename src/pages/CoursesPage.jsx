import React from 'react'
import { Link } from 'react-router-dom'
import { Search, Book } from 'lucide-react'
// import Sidebar from './Sidebar'


const courses = [
  { 
    id: 1, 
    title: "Introduction to Anti-Doping", 
    description: "Learn the basics of anti-doping regulations and practices.", 
    image:"https://media.istockphoto.com/id/1420663169/photo/sports-doctor-fitness-man-or-blood-test-doping-in-wellness-clinic-health-or-consulting-room.jpg?s=2048x2048&w=is&k=20&c=oBh-BEqFPvt6ASAmaRKMRi3o51BjgkGYx-QqZWR-Q2s=",
    // image:"https://i.ytimg.com/vi/DMRmmRoPO-4/hqdefault.jpg",
    slug: "introduction-to-anti-doping" 
  },
  { 
    id: 2, 
    title: "Prohibited Substances", 
    description: "Understand the list of prohibited substances and their effects.", 
    image:"https://media.istockphoto.com/id/1334296760/photo/syringe-medals-and-pills-on-a-blue-background-doping-in-sports-abuse-of-anabolic-steroids-for.jpg?s=2048x2048&w=is&k=20&c=0Ewrwnm8FpeDkQtJKcShmFJghN5Fu1weuTpGpD_-1Ug=",
    slug: "prohibited-substances" 
  },
  { 
    id: 3, 
    title: "Testing Procedures", 
    description: "Get familiar with doping control and testing procedures.", 
    image:"https://media.istockphoto.com/id/859339256/photo/doping-in-sports-and-steroid-abuse-concept.jpg?s=2048x2048&w=is&k=20&c=KdbABghkIaELn4EOiDjWL6Lqc7LFFEmQf--8uAvjY00=",
    // image:"https://i.imgflip.com/1z2ofw.jpg?a479915",
    slug: "testing-procedures" 
  },
  { 
    id: 4, 
    title: "Therapeutic Use Exemptions", 
    description: "Learn about TUEs and how to apply for them.",
    image: "https://media.istockphoto.com/id/1133801346/photo/the-weight-of-fame.jpg?s=2048x2048&w=is&k=20&c=zUNxjUdwLfYoyMRw6rbjqrPHdeoiG4O0UD1r2WWtfbc=" ,
    slug: "therapeutic-use-exemptions" 
  }
];


function CourseCard({ course }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <Link
          to={`/courses/${course.slug}`}
          className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
        >
          <Book className="mr-2" size={20} />
          Enroll Now
        </Link>
      </div>
    </div>
  )
}

export default function CoursesPage() {
  return (
    <div className="flex h-screen bg-white text-black">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </main>

      </div>
    </div>
  )
}
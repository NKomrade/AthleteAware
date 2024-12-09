import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [completedCourses, setCompletedCourses] = useState([
    {
      title: "Introduction to Anti-Doping in Sports",
      author: "World Anti-Doping Agency",
      progress: "4/10 Videos Completed",
      progressPercentage: 40,
      image:
        "https://media.istockphoto.com/id/1420663169/photo/sports-doctor-fitness-man-or-blood-test-doping-in-wellness-clinic-health-or-consulting-room.jpg?s=2048x2048&w=is&k=20&c=oBh-BEqFPvt6ASAmaRKMRi3o51BjgkGYx-QqZWR-Q2s=",
    },
    {
      title: "Ethics and Fair Play in Sports",
      author: "Global Sports Integrity Network",
      progress: "12/40 Videos Completed",
      progressPercentage: 30,
      image:
        "https://media.istockphoto.com/id/1334296760/photo/syringe-medals-and-pills-on-a-blue-background-doping-in-sports-abuse-of-anabolic-steroids-for.jpg?s=2048x2048&w=is&k=20&c=0Ewrwnm8FpeDkQtJKcShmFJghN5Fu1weuTpGpD_-1Ug=",
    },
    {
      title: "The Science of Doping Detection",
      author: "Anti-Doping Laboratory Experts",
      progress: "3/8 Videos Completed",
      progressPercentage: 37.5,
      image:
        "https://media.istockphoto.com/id/859339256/photo/doping-in-sports-and-steroid-abuse-concept.jpg?s=2048x2048&w=is&k=20&c=KdbABghkIaELn4EOiDjWL6Lqc7LFFEmQf--8uAvjY00=",
    },
  ]);

  const [moreCourses, setMoreCourses] = useState([
    {
      title: "History of Anti-Doping",
      subtitle: "Key Events in Anti-Doping Efforts",
      description:
        "Explore the history and milestones of anti-doping movements in sports worldwide.",
      price: 24.92,
      originalPrice: 32.0,
      rating: 5,
      image: "https://i.ytimg.com/vi/DMRmmRoPO-4/hqdefault.jpg",
    },
    {
      title: "Recognizing Performance-Enhancing Substances",
      subtitle: "A Comprehensive Guide",
      description:
        "Learn how to identify banned substances and understand their effects on the human body.",
      price: 24.92,
      originalPrice: 32.0,
      rating: 4,
      image: "https://i.imgflip.com/1z2ofw.jpg?a479915",
    },
    {
      title: "Athletes' Rights and Responsibilities",
      subtitle: "Understanding Anti-Doping Rules",
      description:
        "A course tailored for athletes to understand their rights and obligations under anti-doping codes.",
      price: 24.92,
      originalPrice: 32.0,
      rating: 5,
      image:
        "https://media.istockphoto.com/id/1091306636/photo/close-up-of-unrecognizable-athletic-woman-taking-supplements.jpg?s=612x612&w=0&k=20&c=jNzRvt8h7dwbKxx9yZN2epPT-EJTEQ5LMKiObNx84DU=",
    },
    {
      title: "Coaches' Role in Anti-Doping Education",
      subtitle: "Building Clean Sports Culture",
      description:
        "Learn how coaches can educate athletes and foster a culture of clean sport.",
      price: 24.92,
      originalPrice: 32.0,
      rating: 5,
      image: "https://shorturl.at/Xk59c",
    },
    {
      title: "Doping in Football",
      subtitle: "Understanding Doping Risks in Football",
      description:
        "Explore common doping practices in football and their consequences for players and teams.",
      price: 24.92,
      originalPrice: 32.0,
      rating: 5,
      image: "https://shorturl.at/Xk59c",
    },
    {
      title: "Doping in Cricket",
      subtitle: "Anti-Doping Practices in Cricket",
      description:
        "Learn about anti-doping policies in cricket and how they maintain the spirit of the game.",
      price: 24.92,
      originalPrice: 32.0,
      rating: 4,
      image: "https://shorturl.at/Xk59c",
    },
    {
      title: "Doping in Wrestling",
      subtitle: "Combatting Doping in Wrestling",
      description:
        "Discover the measures taken to prevent doping in wrestling and promote fair competition.",
      price: 24.92,
      originalPrice: 32.0,
      rating: 5,
      image: "https://shorturl.at/Xk59c",
    },
    {
      title: "Doping in Athletics",
      subtitle: "Protecting Integrity in Athletics",
      description:
        "Understand the impact of doping on track and field events and how testing is conducted.",
      price: 24.92,
      originalPrice: 32.0,
      rating: 5,
      image: "https://shorturl.at/Xk59c",
    },
    {
      title: "Doping in Cycling",
      subtitle: "Addressing Doping in Professional Cycling",
      description:
        "Examine famous cases of doping in cycling and learn how the sport is being cleaned up.",
      price: 24.92,
      originalPrice: 32.0,
      rating: 5,
      image: "https://shorturl.at/Xk59c",
    },
    {
      title: "Doping in Swimming",
      subtitle: "The Fight Against Doping in Swimming",
      description:
        "Learn about the challenges of doping in swimming and strategies to ensure fair play.",
      price: 24.92,
      originalPrice: 32.0,
      rating: 4,
      image: "https://shorturl.at/Xk59c",
    },
    {
      title: "Doping in Weightlifting",
      subtitle: "Clean Lifts and Anti-Doping Efforts",
      description:
        "Understand the specific anti-doping challenges in weightlifting and how athletes are tested.",
      price: 24.92,
      originalPrice: 32.0,
      rating: 5,
      image: "https://shorturl.at/Xk59c",
    },
    {
      title: "Doping in Tennis",
      subtitle: "Maintaining Fairness in Tennis",
      description:
        "Discover how tennis addresses doping violations and protects player integrity.",
      price: 24.92,
      originalPrice: 32.0,
      rating: 4,
      image: "https://shorturl.at/Xk59c",
    },
    {
      title: "Doping in Basketball",
      subtitle: "Anti-Doping Strategies in Basketball",
      description:
        "Explore doping risks in basketball and how governing bodies ensure clean competition.",
      price: 24.92,
      originalPrice: 32.0,
      rating: 5,
      image: "https://shorturl.at/Xk59c",
    },
    {
      title: "Doping in E-sports",
      subtitle: "Addressing Doping in Competitive Gaming",
      description:
        "Learn how the growing world of E-sports is tackling performance-enhancing substance use.",
      price: 24.92,
      originalPrice: 32.0,
      rating: 5,
      image: "https://shorturl.at/Xk59c",
    },
  ]);

  const [filteredCompletedCourses, setFilteredCompletedCourses] =
    useState(completedCourses);
  const [filteredMoreCourses, setFilteredMoreCourses] = useState(moreCourses);

  const categories = [
    "All Recommendations",
    "Doping Detection",
    "Athlete Education",
    "Sports Ethics",
    "Fair Play",
    "Substance Identification",
    "Clean Sports Coaching",
    "Anti-Doping History",
  ];

  useEffect(() => {
    const filterCourses = () => {
      const lowercasedSearch = searchTerm.toLowerCase();

      const filteredCompleted = completedCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(lowercasedSearch) ||
          course.author.toLowerCase().includes(lowercasedSearch)
      );

      const filteredMore = moreCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(lowercasedSearch) ||
          course.subtitle.toLowerCase().includes(lowercasedSearch) ||
          course.description.toLowerCase().includes(lowercasedSearch)
      );

      setFilteredCompletedCourses(filteredCompleted);
      setFilteredMoreCourses(filteredMore);
    };

    filterCourses();
  }, [searchTerm, completedCourses, moreCourses]);

  const enrollCourse = (course) => {
    // Remove the course from moreCourses
    setMoreCourses(moreCourses.filter((c) => c.title !== course.title));

    // Add the course to completedCourses
    const newCompletedCourse = {
      title: course.title,
      author: course.subtitle,
      progress: "0/10 Videos Completed",
      progressPercentage: 0,
      image: course.image,
    };
    setCompletedCourses([...completedCourses, newCompletedCourse]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
          />
        </div>
      </div>

      {/* Complete your Course section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-2">Complete Your Anti-Doping Course</h2>
        <p className="text-gray-500 mb-6">
          Learn about anti-doping, fair play, and ethics in sports. Top picks for you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCompletedCourses.map((course, index) => (
            <Link
              to={`/courses/${course.title.toLowerCase().replace(/\s+/g, '-')}`}
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-3 right-3 bg-white rounded-full p-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                <p className="text-gray-500 text-sm mb-2">{course.author}</p>
                <p className="text-gray-600 text-sm mb-2">{course.progress}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-[#6366F1] h-2.5 rounded-full"
                    style={{ width: `${course.progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((category, index) => (
          <button
            key={index}
            className="px-4 py-2 rounded-full text-sm bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            {category}
          </button>
        ))}
      </div>

      {/* More Courses Section */}
      <div>
        <h2 className="text-2xl font-bold mb-2">More Courses on Clean Sports</h2>
        <p className="text-gray-500 mb-6">
          Expand your knowledge on anti-doping and ethics in sports. Enroll today.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMoreCourses.map((course, index) => (
            <Link
              to={`/courses/${course.title.toLowerCase().replace(/\s+/g, '-')}`}
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-1">{course.subtitle}</h3>
                <p className="text-gray-600 text-xs mb-3">{course.description}</p>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(course.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">${course.price}</span>
                    <span className="text-gray-400 line-through text-sm">
                      ${course.originalPrice}
                    </span>
                  </div>
                </div>
              </div>
              <Link to={`/courses/${course.title.toLowerCase().replace(/\s+/g, '-')}`}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  enrollCourse(course);
                }}
                className="w-full bg-[#6366F1] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors mt-4"
              >
                Enroll Now
              </button>
              </Link>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
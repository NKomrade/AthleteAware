import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import newslogo from '../assets/news-logo.jpg';
import podcastlogo from '../assets/podcast.jpg';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    '/football.jpg',
    '/rules.png',
    '/conversation.png',
  ];

  const slides = [
    {
      heading: 'Quick, Easy Lessons on Clean Sport',
      subheading: 'Explore anti-doping courses designed to help you compete the right way.',
      buttonText: 'Start Learning',
      buttonLink: '/learn', // Update the link as needed
    },
    {
      heading: 'Test Your Knowledge, Play Clean',
      subheading: 'Take quizzes to prove your understanding of clean sport and earn badges.',
      buttonText: 'Take a Quiz',
      buttonLink: '/quiz', // Update the link as needed
    },
    {
      heading: 'Join the Conversation',
      subheading: 'Set goals, join forums, and explore the latest anti-doping updates in CleanCorner.',
      buttonText: 'Explore CleanCorner',
      buttonLink: '/cleancorner', // Update the link as needed
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="flex flex-col min-h-screen text-white">
      <main className="flex-1">
        {/* Hero Section with Text on Left and Slideshow on Right */}
        <div className="min-h-screen bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12 md:py-24">
              {/* Left Column */}
              <div className="space-y-8 mt-8">
                <h1 className="text-[2rem] md:text-6xl font-bold leading-tight">
                  <span className="text-black block text-3xl font-[Montserrat]">
                    {slides[currentSlide].heading.split('\n').map((line, index) => (
                      <span key={index}>{line}<br /></span>
                    ))}
                  </span>
                  {/* Alternatively, if you prefer to keep it simple without handling line breaks */}
                  {/* {slides[currentSlide].heading} */}
                </h1>
                <p className="text-gray-600 text-lg max-w-[600px]">
                  {slides[currentSlide].subheading}
                </p>
                <div className="mt-8"> {/* Added margin-top to button */}
                  <Link
                    to={slides[currentSlide].buttonLink}
                    className="px-8 py-3 border-2 border-[#1A2B3B] text-[#1A2B3B] font-semibold hover:bg-[#1A2B3B] hover:text-white transition-colors duration-300"
                  >
                    {slides[currentSlide].buttonText}
                  </Link>
                </div>
              </div>

              {/* Right Column with Slideshow */}
              <div className="relative">
                <div className="relative w-full h-[400px] bg-white rounded-lg overflow-hidden">
                  {/* Current Image */}
                  <img
                    src={images[currentSlide]}
                    alt={`Slide ${currentSlide + 1}`}
                    className="w-full h-full object-cover rounded-lg shadow-lg transition-opacity duration-1000"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start justify-between gap-12">
              {/* Left Flex (Text and Enroll Now button) with wider width */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                  Unlock your potential and revolutionize your future with our cutting-edge courses.
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Join our community of learners and experts to take your skills to the next level.
                </p>
                <a
                  href="/courses"
                  className=" text-black bg-white text-xl py-3 px-8 hover:font-bold"
                >
                  Enroll Now 
                </a>
              </div>

              {/* Right Flex (Horizontal Scrolling Courses) with narrower width */}
              <div className="w-full md:w-1/2">
                <div className="overflow-x-auto py-4 scroll-smooth">
                  <div className="flex gap-12">
                    <a
                      href="/courses/basketball"
                      target="_blank"
                      className="flex-none w-80 bg-white rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
                    >
                      <div
                        style={{ backgroundColor: '#B7EEAB' }}
                        className="w-full h-56 rounded-t-lg transition duration-300 transform hover:scale-110"
                      ></div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Basketball Training</h3>
                        <p className="text-gray-500 text-sm">Sharpen your skills in basketball! Master shooting, defense, and team tactics with expert coaching.</p>
                      </div>
                    </a>

                    <a
                      href="/courses/football"
                      target="_blank"
                      className="flex-none w-80 bg-white rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
                    >
                      <div
                        style={{ backgroundColor: '#FEBAC7' }}
                        className="w-full h-56 rounded-t-lg transition duration-300 transform hover:scale-110"
                      ></div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Football Tactics</h3>
                        <p className="text-gray-500 text-sm">Master the strategies, footwork, and game vision needed for competitive football. Elevate your play.</p>
                      </div>
                    </a>

                    <a
                      href="/courses/tennis"
                      target="_blank"
                      className="flex-none w-80 bg-white rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
                    >
                      <div
                        style={{ backgroundColor: '#FFF39F' }}
                        className="w-full h-56 rounded-t-lg transition duration-300 transform hover:scale-110"
                      ></div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Tennis Coaching</h3>
                        <p className="text-gray-500 text-sm">Enhance your serve, backhand, and overall tennis skills with focused coaching and practice.</p>
                      </div>
                    </a>

                    <a
                      href="/courses/running"
                      target="_blank"
                      className="flex-none w-80 bg-white rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
                    >
                      <div
                        style={{ backgroundColor: '#C1C1FF' }}
                        className="w-full h-56 rounded-t-lg transition duration-300 transform hover:scale-110"
                      ></div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Endurance Running</h3>
                        <p className="text-gray-500 text-sm">Increase your stamina and perfect your running form with professional endurance running coaching.</p>
                      </div>
                    </a>

                    <a
                      href="/courses/swimming"
                      target="_blank"
                      className="flex-none w-80 bg-white rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
                    >
                      <div
                        style={{ backgroundColor: '#D3F8FF' }}
                        className="w-full h-56 rounded-t-lg transition duration-300 transform hover:scale-110"
                      ></div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Swimming Techniques</h3>
                        <p className="text-gray-500 text-sm">Master swimming techniques to improve your speed, stroke, and endurance for better performance.</p>
                      </div>
                    </a>

                    <a
                      href="/courses/weightlifting"
                      target="_blank"
                      className="flex-none w-80 bg-white rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
                    >
                      <div
                        style={{ backgroundColor: '#FFEDED' }}
                        className="w-full h-56 rounded-t-lg transition duration-300 transform hover:scale-110"
                      ></div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Weightlifting Basics</h3>
                        <p className="text-gray-500 text-sm">Learn the fundamentals of weightlifting, focusing on strength-building and proper technique.</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Sections (News, Podcasts, etc.) */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <img src={newslogo} className="w-8 h-8 text-blue-500">
              </img>
              <h2 className="text-3xl font-bold text-black">NEWS</h2>
            </div>
            <a href="/news" className="text-blue-500 hover:text-blue-600 font-semibold">VIEW ALL</a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-5">
            {/* Featured Article */}
            <div className="lg:col-span-2">
              <div className="relative h-[500px] rounded-lg overflow-hidden group">
                <img
                  src="https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Track athletes racing"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="absolute bottom-0 p-6">
                    <span className="inline-block px-3 py-1 bg-white text-gray-900 text-sm font-semibold rounded-[7px] mb-3">
                      ANTI DOPING
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Handball Player Tests Positive for Doping
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Articles */}
            <div className="space-y-4">
              {/* Paris 2024 - Swimming */}
              <article className="flex gap-4">
                <img
                  src="https://images.pexels.com/photos/12585940/pexels-photo-12585940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Swimming competition"
                  className="w-[111px] h-[111px] object-cover rounded-lg"
                />
                <div>
                  <span className="text-blue-500 text-sm font-semibold">Argentine Footballer 'Papu' Gómez's Doping Revelation</span>
                  <h3 className="font-bold text-gray-900 text-sm">Alejandro received a doping notification four days before the 2022 World Cup final.</h3>
                </div>
              </article>

              {/* Paris 2024 - Boxing */}
              <article className="flex gap-4">
                <img
                  src="https://images.pexels.com/photos/332835/pexels-photo-332835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Boxing gloves"
                  className="w-[111px] h-[111px] object-cover rounded-lg"
                />
                <div>
                  <span className="text-blue-500 text-sm font-semibold">Iga Swiatek's Doping Case Raises Concerns</span>
                  <h3 className="font-bold text-gray-900 text-sm">Tennis player Iga Swiatek served a 1 month suspension after testing positive.</h3>
                </div>
              </article>

              {/* Prevention of Competition */}
              <article className="flex gap-4">
                <img
                  src="https://images.pexels.com/photos/2228741/pexels-photo-2228741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Group of athletes"
                  className="w-[111px] h-[111px] object-cover rounded-lg"
                />
                <div>
                  <span className="text-blue-500 text-sm font-semibold">Nick Kyrgios Criticizes Doping Rulings</span>
                  <h3 className="font-bold text-gray-900 text-sm">Tennis player Nick Kyrgios faced criticism for opposing doping rulings on Jannik Sinner and Iga Swiatek.</h3>
                </div>
              </article>

              {/* Athlete Moment */}
              <article className="flex gap-4">
                <img
                  src="https://images.pexels.com/photos/33703/relay-race-competition-stadium-sport.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Interactive display"
                  className="w-[111px] h-[111px] object-cover rounded-lg"
                />
                <div>
                  <span className="text-blue-500 text-sm font-semibold">Spanish anti-doping agency, CELAD</span>
                  <h3 className="font-bold text-gray-900 text-sm">CELAD is criticized for ignoring 11 football doping cases between 2017 and 2021.</h3>
                </div>
              </article>
            </div>
          </div>
        </div>

        {/* Podcasts Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <img src={podcastlogo} className="w-8 h-8 text-blue-500" alt="Podcast logo" />
                <h2 className="text-3xl font-bold text-gray-900">Famous Athletes Podcasts</h2>
              </div>
              <a href="/podcasts" className="text-blue-500 hover:text-blue-600 font-semibold">VIEW ALL</a>
            </div>

            {/* Podcast Cards Section with Horizontal Scrolling */}
            <div className="flex overflow-x-auto space-x-8 scrollbar-hide">
              {/* Existing Podcast Cards */}
              <a href="https://youtu.be/5tSTk1083VY" target="_blank" rel="noopener noreferrer" className="flex-none w-80 bg-white rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
                <img
                  src="https://img.youtube.com/vi/5tSTk1083VY/0.jpg"
                  alt="Podcast 1"
                  className="w-full h-56 object-cover rounded-t-lg transition duration-300 transform hover:scale-110"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Podcast 1 - Athlete Insights</h3>
                  <p className="text-gray-500 text-sm">In-depth conversation with a famous athlete about their career and life.</p>
                </div>
              </a>

              <a href="https://youtu.be/eNCK_PWtOoE" target="_blank" rel="noopener noreferrer" className="flex-none w-80 bg-white rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
                <img
                  src="https://img.youtube.com/vi/eNCK_PWtOoE/0.jpg"
                  alt="Podcast 2"
                  className="w-full h-56 object-cover rounded-t-lg transition duration-300 transform hover:scale-110"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Podcast 2 - Behind the Athlete</h3>
                  <p className="text-gray-500 text-sm">Exclusive insights from athletes, offering a behind-the-scenes look at their training and success.</p>
                </div>
              </a>

              <a href="https://youtu.be/0N2U2lo7PG4" target="_blank" rel="noopener noreferrer" className="flex-none w-80 bg-white rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
                <img
                  src="https://img.youtube.com/vi/0N2U2lo7PG4/0.jpg"
                  alt="Podcast 3"
                  className="w-full h-56 object-cover rounded-t-lg transition duration-300 transform hover:scale-110"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Podcast 3 - Journey to Success</h3>
                  <p className="text-gray-500 text-sm">Inspiring stories from athletes on how they overcame challenges and achieved greatness.</p>
                </div>
              </a>

              <a href="https://youtu.be/AyiWKXTd9aY" target="_blank" rel="noopener noreferrer" className="flex-none w-80 bg-white rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
                <img
                  src="https://img.youtube.com/vi/AyiWKXTd9aY/0.jpg"
                  alt="Podcast 4"
                  className="w-full h-56 object-cover rounded-t-lg transition duration-300 transform hover:scale-110"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Podcast 4 - Athlete Mindset</h3>
                  <p className="text-gray-500 text-sm">A deep dive into the mindset and mentality that drives world-class athletes to succeed.</p>
                </div>
              </a>

              {/* New Podcast Cards */}
              <a href="https://youtu.be/VSceuiPBpxY" target="_blank" rel="noopener noreferrer" className="flex-none w-80 bg-white rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
                <img
                  src="https://img.youtube.com/vi/VSceuiPBpxY/0.jpg"
                  alt="Podcast 5"
                  className="w-full h-56 object-cover rounded-t-lg transition duration-300 transform hover:scale-110"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Podcast 5 - Success Beyond the Track</h3>
                  <p className="text-gray-500 text-sm">Learn about the journeys and off-field endeavors of athletes who excel in all aspects of life.</p>
                </div>
              </a>

              <a href="https://youtu.be/oTDBXB_6LC8" target="_blank" rel="noopener noreferrer" className="flex-none w-80 bg-white rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
                <img
                  src="https://img.youtube.com/vi/oTDBXB_6LC8/0.jpg"
                  alt="Podcast 6"
                  className="w-full h-56 object-cover rounded-t-lg transition duration-300 transform hover:scale-110"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Podcast 6 - Champions Talk</h3>
                  <p className="text-gray-500 text-sm">Champions share their perspectives on winning, losing, and staying motivated through challenges.</p>
                </div>
              </a>

              <a href="https://youtu.be/M1Hltl4QBww" target="_blank" rel="noopener noreferrer" className="flex-none w-80 bg-white rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
                <img
                  src="https://img.youtube.com/vi/M1Hltl4QBww/0.jpg"
                  alt="Podcast 7"
                  className="w-full h-56 object-cover rounded-t-lg transition duration-300 transform hover:scale-110"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Podcast 7 - Legends Never Quit</h3>
                  <p className="text-gray-500 text-sm">Listen to inspiring stories from legendary athletes who refuse to give up, no matter the odds.</p>
                </div>
              </a>

              <a href="https://youtu.be/g2cQ2kD6lzs" target="_blank" rel="noopener noreferrer" className="flex-none w-80 bg-white rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
                <img
                  src="https://img.youtube.com/vi/g2cQ2kD6lzs/0.jpg"
                  alt="Podcast 8"
                  className="w-full h-56 object-cover rounded-t-lg transition duration-300 transform hover:scale-110"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Podcast 8 - Overcoming Injury</h3>
                  <p className="text-gray-500 text-sm">Athletes discuss how they overcome the toughest injuries and return stronger than ever.</p>
                </div>
              </a>

              <a href="https://youtu.be/gHQo3UafM54" target="_blank" rel="noopener noreferrer" className="flex-none w-80 bg-white rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
                <img
                  src="https://img.youtube.com/vi/gHQo3UafM54/0.jpg"
                  alt="Podcast 9"
                  className="w-full h-56 object-cover rounded-t-lg transition duration-300 transform hover:scale-110"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Podcast 9 - The Spirit of Teamwork</h3>
                  <p className="text-gray-500 text-sm">Listen to athletes talk about the importance of teamwork and collaboration in their success.</p>
                </div>
              </a>

              <a href="https://youtu.be/XK-vMrk2qXA" target="_blank" rel="noopener noreferrer" className="flex-none w-80 bg-white rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
                <img
                  src="https://img.youtube.com/vi/XK-vMrk2qXA/0.jpg"
                  alt="Podcast 10"
                  className="w-full h-56 object-cover rounded-t-lg transition duration-300 transform hover:scale-110"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Podcast 10 - Road to Glory</h3>
                  <p className="text-gray-500 text-sm">Discover the mental and physical preparation athletes undergo to achieve peak performance.</p>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function GameCarousel({ games, autoRotate = true, showControls = true, rotationInterval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + games.length) % games.length)
  }

  useEffect(() => {
    if (autoRotate) {
      const timer = setInterval(nextSlide, rotationInterval)
      return () => clearInterval(timer)
    }
  }, [autoRotate, rotationInterval])

  return (
    <div className="w-full h-[85vh] relative">
      <div className="w-full h-full overflow-hidden rounded-lg shadow-lg relative">
        {games.map((game, index) => (
          <div
            key={game.id}
            className={`absolute w-full h-full transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={game.image}
              alt={game.name}
              className="w-full h-full"
            />
          </div>
        ))}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-12">
          {games.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-5 h-5 rounded-full transition-colors duration-200 ${
                index === currentIndex ? "bg-white" : "bg-black/50 hover:bg-black/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      {/* {showControls && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 rounded-full p-2 transition-colors duration-200"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 rounded-full p-2 transition-colors duration-200"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )} */}
    </div>
  )
}

export default GameCarousel
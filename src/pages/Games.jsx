import { useState } from 'react'
import GameCarousel from '../components/GamesCarousel'
import GameCard from '../components/GamesCard'

const games = [
  {
    id: 1,
    name: 'CrossWord Game',
    image: '/cross_word.png',
    logo: '/crossword-logo.png',
    video: '/Crossword.mp4',
    poster: '/crossword-poster.png',
    rating: 4
  },
  {
    id: 2,
    name: 'Memory Card Game',
    image: '/flip_cards.png',
    logo: '/flipcard-logo.png',
    video: '/flip_card.mp4',
    poster: '/flipcards-poster.png',
    rating: 5
  },
  {
    id: 3,
    name: 'Choose Your Path',
    image: '/bulls_eye.png',
    logo: '/bullseye-logo.png',
    video: '/Archery.mp4',
    poster: '/bullseye-poster.png',
    rating: 4
  },
  {
    id: 4,
    name: 'Anti Doping Adventure',
    image: '/memory_match.png',
    logo: '/memory-match-logo.png',
    video: '/MemoryMatch.mp4',
    poster: '/memory-match-poster.png',
    rating: 4
  },
]

function Games() {
  const [selectedGame, setSelectedGame] = useState(null)

  const handlePlayClick = (game) => {
    setSelectedGame(game)
    console.log(`Playing ${game.name}`)
  }

  return (
    <div className="container mx-auto px-16 py-4">
      <div className="mb-12">
        <GameCarousel games={games} />
      </div>

      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {games.map((game) => (
            <GameCard
              key={game.id}
              title={game.name}
              rating={game.rating}
              videoSrc={game.video}
              posterSrc={game.poster}
              onPlay={() => handlePlayClick(game)}
            />
          ))}
        </div>
      </div>

      {selectedGame && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-2xl w-full">
            <h2 className="text-3xl font-bold mb-4">{selectedGame.name}</h2>
            <p className="mb-4">Game content would go here.</p>
            <button 
              onClick={() => setSelectedGame(null)}
              className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Games
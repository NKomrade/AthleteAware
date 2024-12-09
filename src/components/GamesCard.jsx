import { Star } from 'lucide-react'

function GameCard({ title, rating, maxRating = 5, videoSrc, posterSrc, onPlay }) {
  return (
    <div className="w-full bg-white shadow-md overflow-hidden mb-6 rounded-[16px] border-[1.5px] border-black">
      {/* Video/Image Banner */}
      <div className="relative w-full aspect-[15/8] bg-white p-4">
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Game Info Bar */}
      <div className="px-6 py-4 flex items-center justify-between">
        <h2 className="text-[22px] font-medium text-gray-900 py-4">{title}</h2>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={onPlay}
            className="px-8 py-1.5 bg-white border-2 border-black rounded-full text-[20px] font-medium hover:bg-black hover:text-white transition-colors mr-4"
          >
            Play
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-[24px] text-gray-600">Ratings: {rating}/{maxRating}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameCard
import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { Link } from 'react-router-dom'
import { Download, Share2 } from 'lucide-react'
import confetti from 'canvas-confetti'
import { toast } from "@/hooks/use-toast";


export default function CertificatePageProhibited() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }, [])

  const fadeIn = useSpring({
    opacity: animate ? 1 : 0,
    transform: animate ? 'translateY(0)' : 'translateY(50px)',
    config: { tension: 280, friction: 60 }
  })

  const pulseAnimation = useSpring({
    from: { transform: 'scale(1)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'scale(1.05)' })
        await next({ transform: 'scale(1)' })
      }
    },
    config: { tension: 300, friction: 10 }
  })

  const handleDownload = (certName) => {
    // Simulating certificate download
    const blob = new Blob([`This is a certificate for ${certName}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${certName.replace(/\s+/g, '_')}_Certificate.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Show a toast notification
    toast({
      title: "Certificate Downloaded",
      description: `Your certificate for ${certName} has been downloaded.`,
      duration: 3000,
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <animated.div style={fadeIn} className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6 text-black">Congratulations!</h1>
        <p className="text-xl mb-8 text-gray-700">
          You've successfully completed the Prohibited Substances course.
        </p>
        <animated.div style={pulseAnimation} className="mb-8">
          <img
            src="https://gdoc.io/uploads/Certificate-of-Completion-w-1040x752.webp"
            alt="Certificate of Completion"
            className="w-full h-auto border-4 border-black rounded-lg"
          />
        </animated.div>
        <p className="text-lg mb-8 text-gray-700">
          This certifies that <span className="font-bold">Athlete Conners</span> has successfully
          completed the Prohibited Substances course on {new Date().toLocaleDateString()}.
        </p>
        <div className="flex justify-center space-x-4 mb-8">
          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center"
            onClick={() => handleDownload("Prohibited Substances")}>
            <Download className="mr-2" size={20} />
            Download Certificate
          </button>
          <button className="bg-white text-black px-6 py-3 rounded-lg border border-black hover:bg-gray-100 transition-colors flex items-center">
            <Share2 className="mr-2" size={20} />
            Share Achievement
          </button>
        </div>
        <Link
          to="/courses"
          className="text-black hover:underline"
        >
          Return to Courses
        </Link>
      </animated.div>
    </div>
  )
}

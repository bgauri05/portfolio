import { useState, useRef, useEffect } from 'react'
import { Music, Volume2, VolumeX } from 'lucide-react'

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Autoplay muted on load
    if (iframeRef.current) {
      const src = `https://www.youtube.com/embed/2yJgwwDcgV8?autoplay=1&mute=1&loop=1&playlist=2yJgwwDcgV8&enablejsapi=1`
      iframeRef.current.src = src
    }
  }, [])

  const toggleMute = () => {
    if (iframeRef.current) {
      const newMuteState = !isMuted
      // YouTube iframe API approach - reload with new mute state
      const src = `https://www.youtube.com/embed/2yJgwwDcgV8?autoplay=1&mute=${newMuteState ? 1 : 0}&loop=1&playlist=2yJgwwDcgV8&enablejsapi=1`
      iframeRef.current.src = src
      setIsMuted(newMuteState)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded player */}
      {isOpen && (
        <div className="glass-card p-3 w-72 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-charcoal/60 uppercase tracking-wider">
              Now Playing
            </span>
            <button
              onClick={toggleMute}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blush/30 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-charcoal/60" />
              ) : (
                <Volume2 className="w-4 h-4 text-gold" />
              )}
            </button>
          </div>
          <div className="text-sm font-body text-charcoal mb-2">
            On Melancholy Hill
          </div>
          <div className="text-xs font-body text-charcoal/50 mb-3">
            Gorillaz
          </div>
          <div className="relative w-full h-24 rounded-lg overflow-hidden bg-charcoal/5">
            <iframe
              ref={iframeRef}
              className="absolute inset-0 w-full h-full"
              title="On Melancholy Hill - Gorillaz"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-glow ${
          isOpen
            ? 'bg-blush text-charcoal'
            : 'bg-gradient-to-br from-blush to-dusty-rose text-charcoal hover:scale-110'
        }`}
        style={{
          boxShadow: isOpen
            ? '0 4px 20px rgba(242, 196, 206, 0.3)'
            : '0 4px 20px rgba(242, 196, 206, 0.5), 0 0 30px rgba(201, 168, 76, 0.2)',
        }}
      >
        <Music className="w-6 h-6" />
        {!isMuted && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full animate-pulse" />
        )}
      </button>
    </div>
  )
}

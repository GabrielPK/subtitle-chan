import React, { useEffect, useRef, useState } from 'react'

interface TTSPlayerProps {
  text: string
  lang: string
}

export function TTSPlayer({ text, lang }: TTSPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null)
  const [volume, setVolume] = useState(1) // Default volume is 1 (max)
  const previousTextRef = useRef<string>('')

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const newUtterance = new SpeechSynthesisUtterance(text)
      newUtterance.lang = lang
      newUtterance.volume = volume
      newUtterance.onend = () => setIsPlaying(false)
      setUtterance(newUtterance)

      // Play automatically if the text has changed
      if (text !== previousTextRef.current && text.trim() !== '') {
        window.speechSynthesis.cancel() // Cancel any ongoing speech
        window.speechSynthesis.speak(newUtterance)
        setIsPlaying(true)
      }

      previousTextRef.current = text
    }
  }, [text, lang, volume])

  const handleTogglePlay = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
    } else if (utterance) {
      window.speechSynthesis.speak(utterance)
      setIsPlaying(true)
    }
  }

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value)
    setVolume(newVolume)
    if (utterance) {
      utterance.volume = newVolume
    }
  }

  if (!('speechSynthesis' in window)) {
    return <div>Your browser does not support speech synthesis.</div>
  }

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handleTogglePlay}
        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
        disabled={!utterance}
      >
        {isPlaying ? 'Stop TTS' : 'Play TTS'}
      </button>
      <div className="flex items-center space-x-2">
        <label htmlFor="volume-slider" className="text-sm">
          Volume:
        </label>
        <input
          id="volume-slider"
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24"
        />
      </div>
    </div>
  )
}
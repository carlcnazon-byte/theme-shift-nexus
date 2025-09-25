import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Download, SkipBack, SkipForward } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AudioPlayerProps {
  audioUrl: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState([75]);
  const [playbackRate, setPlaybackRate] = useState('1');
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (value[0] / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    setVolume(value);
    audio.volume = value[0] / 100;
  };

  const handlePlaybackRateChange = (rate: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    setPlaybackRate(rate);
    audio.playbackRate = parseFloat(rate);
  };

  const skipTime = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <audio ref={audioRef} src={audioUrl} preload="metadata" />
        
        {/* Waveform Placeholder */}
        <div className="mb-6 h-20 bg-accent/30 rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center">
            {/* Mock waveform bars */}
            <div className="flex items-center justify-center w-full h-full gap-1 px-4">
              {Array.from({ length: 50 }, (_, i) => (
                <div
                  key={i}
                  className={`bg-primary/60 rounded-full transition-all duration-200 ${
                    (i / 50) * 100 < progress ? 'bg-primary' : 'bg-primary/30'
                  }`}
                  style={{
                    width: '2px',
                    height: `${Math.random() * 60 + 20}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <Slider
            value={[progress]}
            onValueChange={handleSeek}
            max={100}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => skipTime(-10)}
              className="h-8 w-8"
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button
              variant="default"
              size="icon"
              onClick={togglePlayPause}
              className="h-10 w-10"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => skipTime(10)}
              className="h-8 w-8"
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            {/* Playback Speed */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Speed:</span>
              <Select value={playbackRate} onValueChange={handlePlaybackRateChange}>
                <SelectTrigger className="w-16 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">0.5x</SelectItem>
                  <SelectItem value="0.75">0.75x</SelectItem>
                  <SelectItem value="1">1x</SelectItem>
                  <SelectItem value="1.25">1.25x</SelectItem>
                  <SelectItem value="1.5">1.5x</SelectItem>
                  <SelectItem value="2">2x</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Slider
                value={volume}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="w-20"
              />
            </div>

            {/* Download Button */}
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
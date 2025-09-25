import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative h-10 w-10 rounded-xl border border-border-subtle bg-panel/80 backdrop-blur-sm hover:bg-accent/20 hover:shadow-hover-glow transition-all duration-300"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Sun
        className={`h-5 w-5 text-accent transition-all duration-500 ${
          theme === 'dark' ? 'scale-0 rotate-90' : 'scale-100 rotate-0'
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 text-accent transition-all duration-500 ${
          theme === 'dark' ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'
        }`}
      />
    </Button>
  );
};
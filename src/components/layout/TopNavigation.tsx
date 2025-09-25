import React from 'react';
import { Search, ChevronDown, User } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const TopNavigation: React.FC = () => {
  return (
    <header className="h-16 flex items-center justify-between px-3 sm:px-4 lg:px-6 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      {/* Left Section */}
      <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1 sm:flex-initial">
        <SidebarTrigger className="h-8 w-8 flex-shrink-0" />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-1 sm:gap-2 text-foreground hover:bg-accent hover:text-accent-foreground min-w-0 px-2 sm:px-4">
              <span className="font-semibold text-base sm:text-lg truncate">Demo PM Co</span>
              <ChevronDown className="h-4 w-4 flex-shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 bg-popover border border-border">
            <DropdownMenuItem>
              <span>Switch Organization</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Organization Settings</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Center Section - Search (Hidden on mobile) */}
      <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tickets, vendors, properties..."
            className="pl-10 bg-background border-border focus:border-primary focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 flex-shrink-0">
        {/* Mobile Search Button */}
        <Button variant="ghost" size="sm" className="md:hidden h-8 w-8 p-0">
          <Search className="h-4 w-4" />
        </Button>
        
        <ThemeToggle />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2">
              <span className="text-sm">EN</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32 bg-popover border border-border">
            <DropdownMenuItem>
              <span>English</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Français</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-1 sm:gap-2 px-1 sm:px-2">
              <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                <AvatarImage src="/placeholder-avatar.jpg" alt="User Avatar" />
                <AvatarFallback className="bg-primary/10 text-primary">
                  <User className="h-3 w-3 sm:h-4 sm:w-4" />
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="h-3 w-3 hidden sm:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-popover border border-border">
            <DropdownMenuItem>
              <span>Profile Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Account Preferences</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
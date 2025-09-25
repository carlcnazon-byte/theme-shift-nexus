import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Ticket,
  Users,
  Phone,
  TrendingUp,
  Settings,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const navigationItems = [
  {
    title: 'Dashboard',
    url: '/',
    icon: BarChart3,
  },
  {
    title: 'Tickets',
    url: '/tickets',
    icon: Ticket,
  },
  {
    title: 'Vendors',
    url: '/vendors',
    icon: Users,
  },
  {
    title: 'Calls',
    url: '/calls',
    icon: Phone,
  },
  {
    title: 'Reports',
    url: '/reports',
    icon: TrendingUp,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];

export const AppSidebar: React.FC = () => {
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const isActiveRoute = (url: string) => {
    if (url === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(url);
  };

  return (
    <Sidebar
      className={`
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-12' : 'w-60'}
        border-r border-border
        bg-sidebar/90 backdrop-blur-sm
      `}
      collapsible="icon"
    >
      <SidebarContent className="p-0">
        <SidebarGroup className="pt-4">
          <SidebarGroupLabel className={`px-3 mb-2 text-xs font-medium text-muted-foreground ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = isActiveRoute(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="relative">
                      <NavLink
                        to={item.url}
                        className={`
                          flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                          ${isActive 
                            ? 'bg-primary/10 text-primary border-l-3 border-l-primary ml-0' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                          }
                          ${isCollapsed ? 'justify-center' : 'justify-start'}
                        `}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                        )}
                        <item.icon 
                          className={`
                            h-5 w-5 flex-shrink-0 transition-all duration-200
                            ${isActive ? 'text-primary' : ''}
                            ${isCollapsed ? '' : 'mr-0'}
                          `} 
                        />
                        {!isCollapsed && (
                          <span className="text-sm font-medium transition-opacity duration-200">
                            {item.title}
                          </span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
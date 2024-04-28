import { MenuIcon, StickyNoteIcon } from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { DashboardNav } from '../dashboard-nav';
import { navItems } from '../../constants/data';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

// import { Playlist } from "../data/playlists";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // playlists: Playlist[];
}

export function MobileSidebar({ className }: SidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              {/* <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Overview
              </h2> */}

              <Link to={'/dashboard'}>
                <span
                  className={cn(
                    'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                    // location.pathname === item.href ? 'bg-accent' : 'transparent',
                    // item.disabled && 'cursor-not-allowed opacity-80',
                  )}
                >
                  <StickyNoteIcon className="mr-2 h-4 w-4" />
                  <span>Add Note</span>
                </span>
              </Link>
              <div className="space-y-1">
                <DashboardNav items={navItems} setOpen={setOpen} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

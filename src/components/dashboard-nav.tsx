import { Dispatch, SetStateAction } from 'react';
import { Icons } from './icons';
import { cn } from '../lib/utils';
import { NavItem } from '../types';
import { Link, useLocation } from 'react-router-dom';

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
  const location = useLocation();
  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items?.map((item: NavItem, index: number) => {
        const Icon = Icons[item.icon || 'arrowRight'];

        return (
          item.href && (
            <Link key={index} to={item.disabled ? '/dashboard' : item.href}>
              <span
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                  location.pathname === item.href ? 'bg-accent' : 'transparent',
                  item.disabled && 'cursor-not-allowed opacity-80',
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}

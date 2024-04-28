import { Link } from 'react-router-dom';
import { Separator } from '../../ui/separator';
import Header from '../header';
import { SidebarNav } from './side-bar-nav';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Forms',
  description: 'Advanced form example using react-hook-form and Zod.',
};

const sidebarNavItems = [
  {
    title: 'Account',
    href: '/settings/account',
  },
  {
    title: 'Appearance',
    href: '/settings/appearance',
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-6 p-10 pb-16 md:block">
        <Header />
        <div className="space-y-0.5">
          <div className="text-md flex item-center font-bold tracking-tight">
            <Link to="/dashboard" className="mr-3">
              <ArrowLeft size={20} />
            </Link>
            <small className="text-md">Back to dashboard</small>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}

import React from 'react';
import Header from './layout/header';
import Sidebar from './layout/sidebar';
import { ScrollArea } from './ui/scroll-area';
import { Outlet } from 'react-router-dom';

function AppLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-auto">
        <Sidebar />
        <main className="w-full pt-16">
          <ScrollArea className="h-full">{props.children}</ScrollArea>
        </main>
      </div>

      <Outlet />
    </>
  );
}

export default AppLayout;

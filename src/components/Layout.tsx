import React from 'react';

import { LayoutContainer } from './ui/layout-container';
import { Nav } from './Nav';
import { useTheme } from '../context/LayoutContext';

type LayoutProps = {
  children?: React.ReactNode;
};

function Layout(props: LayoutProps) {
  const { theme, setTheme } = useTheme();

  return (
    <LayoutContainer>
      <Nav themeState={theme} setThemeState={setTheme} />
      {props.children}
    </LayoutContainer>
  );
}
export default Layout;

import * as React from 'react';

import { cn } from '../../lib/utils';

const LayoutContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('p-4', className)} {...props} />;
});

LayoutContainer.displayName = 'LayoutContainer';

export { LayoutContainer };

import React from 'react';

import { cn } from './utils';

export type DrawerProps = {
  children?: React.ReactNode;
  open?: boolean;
  onClose?: React.MouseEventHandler<HTMLElement>;
  anchor?: 'right';
};

export const Drawer: React.FC<DrawerProps> = ({ children, open, onClose, anchor = 'right' }) => {
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose?.(event as unknown as React.MouseEvent<HTMLElement>);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropClick: React.MouseEventHandler<HTMLButtonElement> = event => {
    onClose?.(event);
  };

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 cursor-default border-0 bg-black/50 p-0"
        aria-label="閉じる"
        onClick={handleBackdropClick}
      />
      <aside
        className={cn(
          'bg-surface text-on-surface shadow-elevation-1 fixed top-0 z-50 h-full',
          anchor === 'right' && 'right-0',
        )}
      >
        {children}
      </aside>
    </>
  );
};

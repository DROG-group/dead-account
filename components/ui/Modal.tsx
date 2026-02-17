'use client';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70" />
      <div
        className="relative bg-bg-surface border border-border rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto p-6"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

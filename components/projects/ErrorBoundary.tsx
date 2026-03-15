/**
 * ErrorBoundary — shared React error boundary.
 * Catches render-time crashes and renders a clean fallback.
 * Accepts a `fallback` prop for fully custom fallback UI.
 *
 * Usage:
 *   <ErrorBoundary fallback={<MyFallback />}>
 *     <UnsafeComponent />
 *   </ErrorBoundary>
 */
import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Rendered when an error is caught. Defaults to a minimal dark fallback. */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log silently — no console.error spam in production
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn('[ErrorBoundary] Caught:', error.message, info.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <DefaultFallback />;
    }
    return this.props.children;
  }
}

/** Default fallback styled to the dark design system. */
function DefaultFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#0F0B07] border border-[#8B6F47]/20">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#8B6F47]/50"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span className="text-[#F5F0E8]/30 text-[9px] font-sans uppercase tracking-widest">
        Preview unavailable
      </span>
    </div>
  );
}

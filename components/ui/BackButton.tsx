import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  href?: string;
  label?: string;
  className?: string;
}

export default function BackButton({ 
  href = '/projects', 
  label = 'Back to Projects',
  className = 'mb-10'
}: BackButtonProps) {
  return (
    <Link 
      href={href} 
      className={`inline-flex items-center gap-2 group transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${className}`}
      style={{
        padding: '8px 20px',
        paddingLeft: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '9999px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        color: '#000000',
        fontFamily: 'var(--font-sans), sans-serif',
        fontSize: '14px',
        fontWeight: 500,
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        zIndex: 50
      }}
    >
      <ArrowLeft 
        className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" 
      />
      {label}
    </Link>
  );
}

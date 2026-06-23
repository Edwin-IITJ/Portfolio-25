import { forwardRef } from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', rows = 5, ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {label}
            {props.required && <span style={{ color: 'var(--color-accent)' }} className="ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={`w-full px-4 py-3 rounded-lg transition-all outline-none resize-vertical border ${className}`}
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: error ? 'var(--color-destructive)' : 'var(--color-border)',
            color: 'var(--color-text-primary)',
            transitionDuration: 'var(--motion-fast)',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = error ? 'var(--color-destructive)' : 'var(--color-accent)'
            e.currentTarget.style.boxShadow = `0 0 0 2px ${error ? 'rgba(158, 110, 110, 0.3)' : 'rgba(201, 169, 110, 0.3)'}`
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error ? 'var(--color-destructive)' : 'var(--color-border)'
            e.currentTarget.style.boxShadow = 'none'
          }}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm flex items-center" style={{ color: 'var(--color-destructive)' }}>
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>{helperText}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea

import '../../styles/components/Badge.css';

/**
 * Badge Component
 * Small label for status/tags
 * 
 * @param {string} variant - 'default' | 'success' | 'warning' | 'error' | 'info'
 */
export default function Badge({
  children,
  variant = 'default',
  className = '',
  ...props
}) {
  return (
    <span
      className={`badge badge--${variant} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

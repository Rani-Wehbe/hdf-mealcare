import '../../styles/components/Card.css';

/**
 * Card Component
 * Flexible container with consistent styling
 * 
 * @param {string} elevation - 'flat' | 'default' | 'elevated'
 */
export default function Card({
  children,
  className = '',
  elevation = 'default',
  ...props
}) {
  return (
    <div
      className={`card card--${elevation} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

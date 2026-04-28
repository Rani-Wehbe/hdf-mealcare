import PropTypes from 'prop-types';
import '../styles/components/Card.css';

/**
 * Card Component
 * Flexible container with consistent styling
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

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  elevation: PropTypes.oneOf(['flat', 'default', 'elevated']),
};

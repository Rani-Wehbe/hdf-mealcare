import '../../styles/components/PageHeader.css';

/**
 * PageHeader Component
 * Consistent header for all pages with title, subtitle, and actions
 */
export default function PageHeader({
  title,
  subtitle,
  icon,
  actions,
  className = '',
}) {
  return (
    <div className={`page-header ${className}`}>
      <div className="page-header__content">
        <div className="page-header__title-section">
          {icon && <span className="page-header__icon">{icon}</span>}
          <div>
            <h1 className="page-header__title">{title}</h1>
            {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
          </div>
        </div>
        {actions && <div className="page-header__actions">{actions}</div>}
      </div>
    </div>
  );
}

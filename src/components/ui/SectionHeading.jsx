import PropTypes from 'prop-types'

export default function SectionHeading({ eyebrow, title, description, id }) {
  return (
    <div className="section-heading" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  )
}
SectionHeading.propTypes = { eyebrow: PropTypes.string.isRequired, title: PropTypes.string.isRequired, description: PropTypes.string, id: PropTypes.string }

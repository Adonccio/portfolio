import PropTypes from 'prop-types'

const paths = {
  arrow: 'M7 17 17 7M7 7h10v10',
  right: 'M4 12h16M13 5l7 7-7 7',
  down: 'M12 4v16M5 13l7 7 7-7',
  up: 'M12 20V4M5 11l7-7 7 7',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'm6 6 12 12M6 18 18 6',
  sun: 'M12 3v1M12 20v1M3 12h1M20 12h1M5.6 5.6l.7.7M17.7 17.7l.7.7M5.6 18.4l.7-.7M17.7 6.3l.7-.7M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  moon: 'M20.9 13a9 9 0 1 1-9.9-9.9A7 7 0 0 0 20.9 13Z',
  code: 'm8 6-6 6 6 6M16 6l6 6-6 6M14 3l-4 18',
  layers: 'm12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 16l10 5 10-5',
  database: 'M21 5c0 2-4 3-9 3S3 7 3 5s4-3 9-3 9 1 9 3ZM3 5v14c0 2 4 3 9 3s9-1 9-3V5M3 12c0 2 4 3 9 3s9-1 9-3',
  terminal: 'M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM7 8l4 4-4 4M13 16h4',
  tools: 'm12 3 9 5v8l-9 5-9-5V8l9-5ZM3 8l9 5 9-5M12 13v8',
  mail: 'M3 5h18v14H3V5ZM3 5l9 7 9-7',
  copy: 'M8 8h13v13H8V8ZM16 5V2H2v14h3',
  check: 'm5 12 4 4L19 6',
  linkedin: 'M4 8v12M4 4v.1M9 20V8h4v2c1-3 7-3 7 2v8M13 20v-8',
  github: 'M9 19c-4 1-4-2-6-2M15 22v-4c0-1 .2-1.5-1-2 5-.5 7-2.5 7-6 0-1.5-.5-3-1.5-4 .5-1 .5-2.5 0-4-2 0-3 1-4 2a14 14 0 0 0-7 0c-1-1-2-2-4-2-.5 1.5-.5 3 0 4C3.5 7 3 8.5 3 10c0 3.5 2 5.5 7 6-1 .5-1 1-1 2v4',
  instagram: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4ZM16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0M17 7h.01',
  chat: 'M21 11.5a9 9 0 0 1-9 9 9 9 0 0 1-4-.9L3 21l1.4-4.5A9 9 0 1 1 21 11.5Z',
  globe: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c-5 5-5 13 0 18 5-5 5-13 0-18',
  search: 'M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-2 5 6 6',
  book: 'M3 4h6l3 2 3-2h6v16h-6l-3 2-3-2H3V4ZM12 6v16'
}

export default function Icon({ name = 'arrow', className = '' }) {
  return <svg className={'icon ' + className} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true"><path d={paths[name] || paths.arrow} /></svg>
}

Icon.propTypes = { name: PropTypes.string, className: PropTypes.string }

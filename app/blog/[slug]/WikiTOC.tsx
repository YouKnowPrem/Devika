'use client'

import { useState } from 'react'

interface BlockChild {
  text?: string;
  [key: string]: any;
}

interface Block {
  _type: string;
  style?: string;
  _key: string;
  children?: BlockChild[];
  [key: string]: any;
}

interface HeadingItem {
  id: string;
  text: string;
  level: 'h2' | 'h3';
}

interface WikiTOCProps {
  body: Block[];
}

export default function WikiTOC({ body = [] }: WikiTOCProps) {
  const [isOpen, setIsOpen] = useState(true)

  if (!body || body.length === 0) return null

  // Scan blocks for h2 and h3 elements
  const headings: HeadingItem[] = body
    .filter((block) => block._type === 'block' && (block.style === 'h2' || block.style === 'h3'))
    .map((block) => {
      const text = block.children?.map((child) => child.text || '').join('') || ''
      const id = text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // remove special chars
        .replace(/\s+/g, '-') // replace spaces with dashes

      return {
        id,
        text,
        level: block.style as 'h2' | 'h3'
      }
    })
    .filter((heading) => heading.text.trim() !== '')

  if (headings.length === 0) return null

  return (
    <div className="wiki-toc animate-fade-up">
      <div className="wiki-toc-title">
        <span>Contents</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--accent-blue)',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            marginLeft: 'auto'
          }}
        >
          [{isOpen ? 'hide' : 'show'}]
        </button>
      </div>

      {isOpen && (
        <ol className="wiki-toc-list">
          {headings.map((heading, index) => (
            <li key={heading.id} className="wiki-toc-item">
              <a
                href={`#${heading.id}`}
                className={`wiki-toc-link ${heading.level === 'h3' ? 'subheading' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(heading.id)
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // Adjust for navbar header height offset
                    window.scrollBy(0, -100)
                  }
                }}
              >
                {index + 1}. {heading.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

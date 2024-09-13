'use client'
import { Box, Heading } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import './styles.css' // CSS 파일을 import

const useIntersectionObserver = (setVisible: (visible: boolean) => void) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
      },
      {
        threshold: 0.5, // 50%가 뷰포트에 들어오면 트리거
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, setVisible])

  return ref
}

const Section = ({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) => {
  const [visible, setVisible] = React.useState(false)
  const ref = useIntersectionObserver(setVisible)

  return (
    <div
      id={id}
      ref={ref}
      className={`section fade-in-section ${visible ? 'is-visible' : ''}`}>
      {children}
    </div>
  )
}

const TableOfContents = ({
  sections,
}: {
  sections: { id: string; title: string }[]
}) => {
  const handleClick = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="table-of-contents">
      <h1 style={{ fontSize: 30, marginBottom: 20 }}>Company</h1>
      <ul>
        {sections.map(section => (
          <li key={section.id}>
            <button onClick={() => handleClick(section.id)}>
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const MobileTableOfContents = ({
  sections,
}: {
  sections: { id: string }[]
}) => {
  const handleClick = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="mobile-toc">
      {sections.map(section => (
        <button
          key={section.id}
          onClick={() => handleClick(section.id)}></button>
      ))}
    </div>
  )
}

const Page = () => {
  const sections = [
    { id: 'section1', title: 'Overview' },
    { id: 'section2', title: 'Vision' },
    { id: 'section3', title: 'Organization' },
    { id: 'section4', title: 'History' },
  ]

  return (
    <div style={{ display: 'flex' }}>
      <TableOfContents sections={sections} />
      <MobileTableOfContents sections={sections} />
      <div className="container">
        <Section id="section1">
          <Box style={{ width: '100%', marginBottom: '3em' }}>
            <Heading
              className="mainSection1text"
              size="3xl"
              style={{
                fontStyle: 'italic',
                textAlign: 'center',
              }}>
              Overview
            </Heading>
            <Heading
              className="mainSection1text"
              size="lg"
              style={{
                textAlign: 'center',
                fontWeight: '400',
                marginTop: 10,
              }}></Heading>
          </Box>
        </Section>
        <Section id="section2">
          <Box style={{ width: '100%', marginBottom: '3em' }}>
            <Heading
              className="mainSection1text"
              size="3xl"
              style={{
                fontStyle: 'italic',
                textAlign: 'center',
              }}>
              Vision
            </Heading>
            <Heading
              className="mainSection1text"
              size="lg"
              style={{
                textAlign: 'center',
                fontWeight: '400',
                marginTop: 10,
              }}></Heading>
          </Box>
        </Section>
        <Section id="section3">
          <Box style={{ width: '100%', marginBottom: '3em' }}>
            <Heading
              className="mainSection1text"
              size="3xl"
              style={{
                fontStyle: 'italic',
                textAlign: 'center',
              }}>
              Organization
            </Heading>
            <Heading
              className="mainSection1text"
              size="lg"
              style={{
                textAlign: 'center',
                fontWeight: '400',
                marginTop: 10,
              }}></Heading>
          </Box>
        </Section>
        <Section id="section4">
          <Box style={{ width: '100%', marginBottom: '3em' }}>
            <Heading
              className="mainSection1text"
              size="3xl"
              style={{
                fontStyle: 'italic',
                textAlign: 'center',
              }}>
              History
            </Heading>
            <Heading
              className="mainSection1text"
              size="lg"
              style={{
                textAlign: 'center',
                fontWeight: '400',
                marginTop: 10,
              }}></Heading>
          </Box>
        </Section>
      </div>
    </div>
  )
}

export default Page

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

const Section = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = React.useState(false)
  const ref = useIntersectionObserver(setVisible)

  return (
    <div
      ref={ref}
      className={`section fade-in-section ${visible ? 'is-visible' : ''}`}>
      {children}
    </div>
  )
}

const Page = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault()
      if (containerRef.current) {
        containerRef.current.scrollBy({
          top: event.deltaY > 0 ? window.innerHeight : -window.innerHeight,
          behavior: 'smooth',
        })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleScroll)
      }
    }
  }, [])

  return (
    <div className="container" ref={containerRef}>
      <header
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          backgroundColor: 'white',
          zIndex: 1000,
        }}>
        <h1>Header</h1>
      </header>
      <div style={{ paddingTop: '60px' }}>
        {' '}
        {/* 헤더 높이만큼 패딩 추가 */}
        <Section>
          <Box style={{ width: '100%', marginBottom: '3em' }}>
            <Heading
              className="mainSection1text"
              size="3xl"
              style={{
                fontStyle: 'italic',
                textAlign: 'center',
              }}>
              Company
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
        <Section>
          <Box style={{ width: '100%', marginBottom: '3em' }}>
            <Heading
              className="mainSection1text"
              size="3xl"
              style={{
                fontStyle: 'italic',
                textAlign: 'center',
              }}>
              Company2
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
        <Section>
          <Box style={{ width: '100%', marginBottom: '3em' }}>
            <Heading
              className="mainSection1text"
              size="3xl"
              style={{
                fontStyle: 'italic',
                textAlign: 'center',
              }}>
              Company3
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
        {/* 다른 섹션들도 동일한 방식으로 추가 */}
      </div>
    </div>
  )
}

export default Page

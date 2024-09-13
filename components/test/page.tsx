'use client'
import { Box, Heading } from '@chakra-ui/react'
import { ReactNode, useEffect, useRef, useState } from 'react'
import './page.module.css'

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

const Section = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false)
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
    let isScrolling = false
    let start: number | null = null
    let targetScrollTop: number | null = null

    const handleScroll = (event: WheelEvent) => {
      event.preventDefault()
      if (isScrolling) return

      const container = containerRef.current
      if (container) {
        const currentScrollTop = container.scrollTop
        const sectionHeight = window.innerHeight
        const direction = event.deltaY > 0 ? 1 : -1
        targetScrollTop = currentScrollTop + direction * sectionHeight

        isScrolling = true
        start = null
        requestAnimationFrame(step)
      }
    }

    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = timestamp - start
      const duration = 1000 // 스크롤 애니메이션 지속 시간 (밀리초)
      const container = containerRef.current

      if (container && targetScrollTop !== null) {
        const currentScrollTop = container.scrollTop
        const distance = targetScrollTop - currentScrollTop
        const scrollAmount = distance * (progress / duration)

        container.scrollTop = currentScrollTop + scrollAmount

        if (progress < duration) {
          requestAnimationFrame(step)
        } else {
          container.scrollTop = targetScrollTop
          isScrolling = false
        }
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
      <div>
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
            아무거나 넣어봅시다그럴까여
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
            아무거나 넣어봅시다
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

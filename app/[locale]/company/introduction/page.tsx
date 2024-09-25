'use client'
import { Heading, Text } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import { ReactNode, useEffect, useRef, useState } from 'react'
import './styles.css'

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
  setVisibleSections,
  backgroundImage,
}: {
  id: string
  children: ReactNode
  setVisibleSections: (id: string, visible: boolean) => void
  backgroundImage: string
}) => {
  const [visible, setVisible] = useState(false)
  const ref = useIntersectionObserver(setVisible)

  useEffect(() => {
    setVisibleSections(id, visible)
  }, [visible, id])

  return (
    <div
      id={id}
      ref={ref}
      className={`section fade-in-section ${visible ? 'is-visible' : ''}`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      {children}
    </div>
  )
}

const MobileTableOfContents = ({
  sections,
  visibleSections,
}: {
  sections: { id: string }[]
  visibleSections: { [key: string]: boolean }
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
          onClick={() => handleClick(section.id)}
          className={visibleSections[section.id] ? 'active' : ''}></button>
      ))}
    </div>
  )
}

const Page = () => {
  const sections = [
    { id: 'section1' },
    { id: 'section2' },
    { id: 'section3' },
    { id: 'section4' },
  ]
  const t = useTranslations('Company')
  const [visibleSections, setVisibleSections] = useState<{
    [key: string]: boolean
  }>({})

  const handleSetVisibleSections = (id: string, visible: boolean) => {
    setVisibleSections(prev => ({ ...prev, [id]: visible }))
  }
  return (
    <div style={{ display: 'flex' }}>
      <MobileTableOfContents
        sections={sections}
        visibleSections={visibleSections}
      />
      <div className="container">
        <Section
          id="section1"
          setVisibleSections={handleSetVisibleSections}
          backgroundImage="/images/company/overview.png">
          <Text
            fontSize={['md', 'xl', '2xl', '3xl']}
            color={' hsl(0, 23%, 95%)'}>
            전문성을 바탕으로 신뢰받는
          </Text>
          <Heading
            fontSize={['3xl', '4xl', '5xl', '6xl']}
            className="overviewText">
            국제금융 파트너 <br />
            이프정보시스템
          </Heading>
        </Section>
        <Section
          id="section2"
          setVisibleSections={handleSetVisibleSections}
          backgroundImage="/images/company/vision1.png">
          <Text
            fontSize={['md', 'lg', 'xl', '2xl']}
            color={'#142567'}
            marginBottom={'1em'}>
            Vision 1
          </Text>
          <Heading
            fontSize={['3xl', '4xl', '5xl', '6xl']}
            color={'black'}
            marginBottom={'1em'}>
            👍고객만족
          </Heading>
          <Text
            textAlign={'center'}
            fontWeight={'bold'}
            fontSize={['md', 'xl', '2xl', '3xl']}
            color={'black'}
            paddingBottom={'5em'}>
            고객의 기대를 초과하는
            <br /> 최상의 서비스를 제공하기 위해
            <br /> 끈임없이 노력합니다.
          </Text>
        </Section>
        <Section
          id="section3"
          setVisibleSections={handleSetVisibleSections}
          backgroundImage="/images/company/vision2.png">
          <Text
            fontSize={['md', 'lg', 'xl', '2xl']}
            color={'#142567'}
            marginBottom={'1em'}>
            Vision 2
          </Text>
          <Heading
            fontSize={['3xl', '4xl', '5xl', '6xl']}
            color={'black'}
            marginBottom={'1em'}>
            👍장인정신
          </Heading>
          <Text
            textAlign={'center'}
            fontWeight={'bold'}
            fontSize={['md', 'xl', '2xl', '3xl']}
            color={'black'}
            paddingBottom={'5em'}>
            장인정신을 바탕으로
            <br /> 세심한 주의와 정성을 다해 제품의
            <br /> 최고 품질을 유지합니다.
          </Text>
        </Section>

        <Section
          id="section4"
          setVisibleSections={handleSetVisibleSections}
          backgroundImage="/images/company/vision3.png">
          <Text
            fontSize={['md', 'lg', 'xl', '2xl']}
            color={'#142567'}
            marginBottom={'1em'}>
            Vision 3
          </Text>
          <Heading
            fontSize={['3xl', '4xl', '5xl', '6xl']}
            color={'black'}
            marginBottom={'1em'}>
            👍혁신
          </Heading>
          <Text
            textAlign={'center'}
            fontWeight={'bold'}
            fontSize={['md', 'xl', '2xl', '3xl']}
            color={'black'}
            paddingBottom={'5em'}>
            환경을 고려한 혁신적인
            <br /> 솔루션을 제공하며 장기적인
            <br /> 비즈니스 발전을 추구합니다.
          </Text>
        </Section>
      </div>
    </div>
  )
}

export default Page

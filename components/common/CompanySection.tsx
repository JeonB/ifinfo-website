'use client'
import HistoryTimeline from '@/components/common/History'
import { Box, Heading } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
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
}: {
  id: string
  children: ReactNode
  setVisibleSections: (id: string, visible: boolean) => void
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
      style={{ height: '100vh' }}>
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
    { id: 'section1', title: 'Overview' },
    { id: 'section2', title: 'Vision' },
    { id: 'section3', title: 'Organization' },
    { id: 'section4', title: 'History' },
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
      <TableOfContents sections={sections} />
      <MobileTableOfContents
        sections={sections}
        visibleSections={visibleSections}
      />
      <div className="container">
        <Section id="section1" setVisibleSections={handleSetVisibleSections}>
          <Box style={{ width: '100%', margin: '0 1em 3em 1em' }}>
            <Heading
              className="mainSection1text"
              size="3xl"
              p={7}
              style={{
                color: '#79baf2',
              }}>
              {t('overview')}
            </Heading>
            <Image
              src="/images/overview.png"
              alt="company"
              width={500}
              height={500}
              style={{ borderRadius: 10 }}
            />
            <Heading
              size="lg"
              style={{
                textAlign: 'right',
                fontWeight: '800',
                marginTop: 10,
              }}>
              전문성을 바탕으로 신뢰받는 <br />
              <div>
                국제금융 파트너 &nbsp;
                <Box display="inline-block" position="relative">
                  이프정보시스템
                  <Box
                    bg="#8fb2f1"
                    w="105%"
                    h="1em"
                    position="absolute"
                    bottom="-2"
                    zIndex="-1"
                    right="0"
                  />
                </Box>
              </div>
            </Heading>
          </Box>
        </Section>

        <Section id="section2" setVisibleSections={handleSetVisibleSections}>
          <Box
            style={{
              width: '100%',
              marginBottom: '3em',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
            }}>
            <Heading
              className="mainSection1text"
              size="3xl"
              p={7}
              style={{ color: '#4ba256' }}>
              {t('vision')}
            </Heading>

            <Box
              display="inline-block"
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              margin="0 0 0 40px"
              textAlign="center"
              width="300px"
              height="500px">
              <Heading size="xl" p={4}>
                Client-focused
              </Heading>
              <Image
                src="/images/BusinessLoanImage1.svg"
                alt="vision1"
                width={300}
                height={300}
              />
              <Box p={10} whiteSpace="normal">
                이프정보시스템은 고객 만족을 최우선가치로 두고, 고객의 필요를
                충족시키고 기대를 초과하는 최상의 서비스를 제공하기 위해
                끊임없이 노력합니다.
              </Box>
            </Box>

            <Box
              display="inline-block"
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              margin="0 0 0 40px"
              textAlign="center"
              width="300px"
              height="500px">
              <Heading size="xl" p={4}>
                Professional
              </Heading>
              <Image
                src="/images/Product2.png"
                alt="vision2"
                width={300}
                height={300}
              />
              <Box p={10} whiteSpace="normal">
                금융분야 전문인력의 장인정신을 바탕으로 최고의 품질을 유지하며,
                세심한 주의와 정성을 다해 제품과 서비스를 제공합니다.
              </Box>
            </Box>

            <Box
              display="inline-block"
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              margin="0 40px 0 40px"
              textAlign="center"
              width="300px"
              height="500px">
              <Heading size="xl" p={4}>
                Progressive
              </Heading>
              <Image
                src="/images/BusinessLoanImage2.svg"
                alt="vision3"
                width={300}
                height={300}
              />
              <Box p={10} whiteSpace="normal">
                이프정보시스템은 지속 가능한 성장을 목표로 삼아 환경을 고려한
                혁신적인 솔루션을 제공하며, 장기적인 비즈니스 발전을 추구합니다.
              </Box>
            </Box>
          </Box>
        </Section>

        <Section id="section3" setVisibleSections={handleSetVisibleSections}>
          <Box style={{ width: '100%', marginBottom: '3em' }}>
            <Heading
              className="mainSection1text"
              size="3xl"
              p={7}
              style={{
                color: '#c63e9c',
                textAlign: 'center',
              }}>
              {t('organization')}
            </Heading>

            {/* 글로벌뱅킹사업부 */}
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="90%"
              margin="20px auto"
              p={5}
              minHeight="200px" // 최소 높이 설정
              textAlign="center">
              <Heading size="lg" color="#79baf2">
                글로벌뱅킹사업부
              </Heading>
              <Box p={5} whiteSpace="normal">
                글로벌뱅킹사업부는 국제금융 시장에서 고객에게 최적화된 솔루션을
                제공하며, 글로벌 자금 조달, 외환 관리 및 국제 금융 규제 준수를
                지원합니다.
              </Box>
            </Box>

            {/* 금융정보사업부 */}
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="90%"
              margin="20px auto"
              p={5}
              minHeight="200px" // 최소 높이 설정
              textAlign="center">
              <Heading size="lg" color="#4ba256">
                금융정보사업부
              </Heading>
              <Box p={5} whiteSpace="normal">
                금융정보사업부는 금융 데이터 분석 및 시스템 개발에 특화되어
                있으며, 고객 맞춤형 금융 정보 서비스를 제공하여 금융 산업의
                경쟁력을 강화합니다.
              </Box>
            </Box>

            {/* 자본시장사업부 */}
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="90%"
              margin="20px auto"
              p={5}
              minHeight="200px" // 최소 높이 설정
              textAlign="center">
              <Heading size="lg" color="#c63e9c">
                자본시장사업부
              </Heading>
              <Box p={5} whiteSpace="normal">
                자본시장사업부는 자본 조달, 증권 거래, 자산 관리 등의 서비스를
                제공하며, 고객이 자본 시장에서 경쟁 우위를 확보할 수 있도록
                지원합니다.
              </Box>
            </Box>
          </Box>
        </Section>

        <Section id="section4" setVisibleSections={handleSetVisibleSections}>
          <Box style={{ width: '100%', marginBottom: '3em' }}>
            <Heading
              className="mainSection1text"
              size="3xl"
              p={7}
              style={{
                color: '#d1d445',
              }}>
              {t('history')}
            </Heading>
            <HistoryTimeline />
          </Box>
        </Section>
      </div>
    </div>
  )
}

export default Page

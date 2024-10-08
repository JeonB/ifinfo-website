'use client'
import { Grid, GridItem, Heading, Image, Text } from '@chakra-ui/react'
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
  backgroundImage?: string
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
    { id: 'section5' },
  ]
  const t = useTranslations('Company')
  const [visibleSections, setVisibleSections] = useState<{
    [key: string]: boolean
  }>({})

  const handleSetVisibleSections = (id: string, visible: boolean) => {
    setVisibleSections(prev => ({ ...prev, [id]: visible }))
  }

  const items = [
    {
      src: '/images/iconlist/bank.png',
      alt: 'bank Image',
      heading: 'section5.items.item1.heading',
      description: 'section5.items.item1.description',
    },
    {
      src: '/images/iconlist/bag.png',
      alt: 'bag Image',
      heading: 'section5.items.item2.heading',
      description: 'section5.items.item2.description',
    },
    {
      src: '/images/iconlist/money.png',
      alt: 'money Image',
      heading: 'section5.items.item3.heading',
      description: 'section5.items.item3.description',
    },
    {
      src: '/images/iconlist/finance.png',
      alt: 'finance Image',
      heading: 'section5.items.item4.heading',
      description: 'section5.items.item4.description',
    },
  ]

  interface ItemGridProps {
    src: string
    alt: string
    heading: string
    description: string
  }
  const ItemGrid = ({ src, alt, heading, description }: ItemGridProps) => (
    <Grid
      margin={3}
      w={['22em', '30em', '40em']}
      h={['6em', '8em', '10em']}
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(4, 1fr)"
      gap={1}>
      <GridItem
        rowSpan={2}
        colSpan={1}
        p={4}
        alignContent={'center'}
        justifyContent={'center'}>
        <Image src={src} alt={alt} width="80%" height="80%" />
      </GridItem>
      <GridItem colSpan={3} alignContent={'center'}>
        <Heading fontSize={['lg', 'xl', '2xl', '3xl']}>{t(heading)}</Heading>
      </GridItem>
      <GridItem colSpan={3}>
        <Text fontSize={['sm', 'lg', 'xl', '2xl']} fontWeight={400}>
          {t(description)}
        </Text>
      </GridItem>
    </Grid>
  )

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
            {t('section1.text')}
          </Text>
          <Heading
            fontSize={['3xl', '5xl', '6xl', '7xl']}
            className="overviewText">
            {t('section1.heading')}
          </Heading>
        </Section>

        <Section
          id="section2"
          setVisibleSections={handleSetVisibleSections}
          backgroundImage="/images/company/vision1.png">
          <Text fontSize={['lg', 'xl', '2xl', '3xl']} className="vision">
            {t('section2.text')}
          </Text>
          <Heading
            className="vision-header"
            fontSize={['4xl', '5xl', '6xl', '7xl']}>
            {t('section2.heading')}
          </Heading>
          <Text className="vision-text" fontSize={['2xl', '2xl', '3xl', '4xl']}>
            {t('section2.description')}
          </Text>
        </Section>

        <Section
          id="section3"
          setVisibleSections={handleSetVisibleSections}
          backgroundImage="/images/company/vision2.png">
          <Text fontSize={['lg', 'xl', '2xl', '3xl']} className="vision">
            {t('section3.text')}
          </Text>
          <Heading
            fontSize={['4xl', '5xl', '6xl', '7xl']}
            className="vision-header">
            {t('section3.heading')}
          </Heading>
          <Text fontSize={['xl', '2xl', '3xl', '4xl']} className="vision-text">
            {t('section3.description')}
          </Text>
        </Section>

        <Section
          id="section4"
          setVisibleSections={handleSetVisibleSections}
          backgroundImage="/images/company/vision3.png">
          <Text fontSize={['lg', 'xl', '2xl', '3xl']} className="vision">
            {t('section4.text')}
          </Text>
          <Heading
            fontSize={['4xl', '5xl', '6xl', '7xl']}
            className="vision-header">
            {t('section4.heading')}
          </Heading>
          <Text fontSize={['xl', '2xl', '3xl', '4xl']} className="vision-text">
            {t('section4.description')}
          </Text>
        </Section>

        <Section id="section5" setVisibleSections={handleSetVisibleSections}>
          <Text fontSize={['md', 'lg', 'xl', '2xl']} className="vision">
            {t('section5.text')}
          </Text>
          <Heading fontSize={['3xl', '4xl', '5xl', '6xl']} textAlign={'center'}>
            {t('section5.heading')}
          </Heading>
          {items.map((item, index) => (
            <ItemGrid
              key={index}
              src={item.src}
              alt={item.alt}
              heading={item.heading}
              description={item.description}
            />
          ))}
        </Section>
      </div>
    </div>
  )
}

export default Page

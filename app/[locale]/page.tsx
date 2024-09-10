'use client'
import { Section } from '@/components/common/utill/Section'
import BusinessCarousel from '@/components/desktop/business'
import { Image } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import 'react-multi-carousel/lib/styles.css'
import './card-styles.css'

export default function Page({
  params: { locale },
}: {
  params: {
    locale: string
  }
}) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // 클라이언트에서 화면 너비로 모바일 여부 확인
    const checkMobile = () => {
      const userAgent = navigator.userAgent || ''
      setIsMobile(/Mobi/i.test(userAgent))
    }

    checkMobile() // 처음 로드 시 확인
    window.addEventListener('resize', checkMobile) // 화면 크기 변경 시 확인

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1, // 줄임
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      partialVisibilityGutter: 0,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      partialVisibilityGutter: 30,
      // 줄임
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 45,
    },
  }
  const t = useTranslations('Main')

  const slides = [
    {
      image: '/images/business.png',
      title: 'Consulting',
      description: t('consulting'),
    },
    {
      image: '/images/outsourcing.png',
      title: 'OutSourcing',
      description: t('outsourcing'),
    },
    {
      image: '/images/solution.png',
      title: 'Solution',
      description: t('solution'),
    },
  ]

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '3em',
        }}>
        <video
          autoPlay
          muted
          loop
          style={{
            width: '100%',
            height: '80vh',
            objectFit: 'cover',
          }}>
          <source src="/intro-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Business */}
      <Section title="Business" description={t('business')}>
        {isMobile ? (
          <BusinessCarousel
            slides={slides}
            responsive={responsive}
            mode="mobile"
          />
        ) : (
          <BusinessCarousel slides={slides} responsive={responsive} />
        )}
      </Section>

      {/* Product */}
      <Section title="Product" description={t('product')}>
        <Image
          style={{
            padding: 20,
            borderRadius: 30,
            margin: '0 auto',
          }}
          src="./images/product.png"
          alt="product"
          width="90%"
          height="80%"
        />
      </Section>

      {/* Clients */}
      <Section title="Clients" description={t('clients')}>
        <Image
          style={{
            padding: 20,
            borderRadius: 30,
            margin: '0 auto',
          }}
          src="./images/clients.png"
          alt="product"
          width="90%"
          height="80%"
        />
      </Section>
    </>
  )
}

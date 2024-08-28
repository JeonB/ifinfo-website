'use client'
import FadeInview from '@/components/common/utill/FadeInview'
import { Link } from '@/navigation'
import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import './card-styles.css'

export default function Page({
  params: { locale },
}: {
  params: {
    locale: string
  }
}) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1, // 줄임
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      partialVisibilityGutter: 30,
      // 줄임
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      partialVisibilityGutter: 30,
      items: 1,
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
      <FadeInview type="scale" range={0.3}>
        <Flex
          justify="center"
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Box style={{ width: '100%', marginBottom: '3em' }}>
            <Heading
              className="mainSection1text"
              size="3xl"
              style={{
                fontStyle: 'italic',
                textAlign: 'center',
              }}>
              Business
            </Heading>
            <Heading
              className="mainSection1text"
              size="lg"
              style={{
                textAlign: 'center',
                fontWeight: '400',
                marginTop: 10,
              }}>
              {t('business')}
            </Heading>
            <Carousel
              showDots={true}
              centerMode={true}
              // partialVisbile={true}
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              transitionDuration={500}
              removeArrowOnDeviceType={['tablet', 'mobile']}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
              containerClass="carousel-container">
              {slides.map((slide, index) => (
                <Box key={index} style={{ width: '95%', height: 'auto' }}>
                  <Card
                    direction={{ base: 'column', sm: 'row' }}
                    variant="outline"
                    size={'lg'}
                    alignItems="center"
                    width="100%"
                    height="auto"
                    display="flex"
                    flexDirection={{ base: 'column', md: 'row' }}>
                    <AspectRatio
                      ratio={16 / 9}
                      width={{ base: '100%', md: '50%' }}>
                      <Image
                        style={{ padding: 20, borderRadius: 30 }}
                        src={slide.image}
                        alt={slide.title}
                        objectFit="cover"
                        width="100%"
                        height="100%"
                      />
                    </AspectRatio>
                    <Stack flex="1" padding={4}>
                      <CardBody>
                        <Heading style={{ fontSize: '3em', color: '#586cdb' }}>
                          {slide.title}
                        </Heading>
                        <Text py="0" style={{ fontSize: '1.5em' }}>
                          {slide.description}
                        </Text>
                      </CardBody>
                      <CardFooter>
                        <Button variant="solid" colorScheme="blue">
                          <Link href="/business">Learn More</Link>
                        </Button>
                      </CardFooter>
                    </Stack>
                  </Card>
                </Box>
              ))}
            </Carousel>
          </Box>
        </Flex>
      </FadeInview>

      {/* Product */}
      <FadeInview type="scale" range={0.3}>
        <Flex
          justify="center"
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Box
            style={{
              width: '100%',
              marginBottom: '3em',
            }}>
            <Heading
              className="mainSection1text"
              size="3xl"
              style={{
                fontStyle: 'italic',
                textAlign: 'center',
              }}>
              Product
            </Heading>
            <Heading
              className="mainSection1text"
              size="lg"
              style={{
                textAlign: 'center',
                fontWeight: '400',
                marginTop: 10,
              }}>
              {t('product')}
            </Heading>
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
          </Box>
        </Flex>
      </FadeInview>

      {/* Clients */}
      <FadeInview type="scale" range={0.3}>
        <Flex
          justify="center"
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Box style={{ width: '100%', marginBottom: '3em' }}>
            <Heading
              className="mainSection1text"
              size="3xl"
              style={{
                fontStyle: 'italic',
                textAlign: 'center',
              }}>
              Clients
            </Heading>
            <Heading
              className="mainSection1text"
              size="lg"
              style={{
                textAlign: 'center',
                fontWeight: '400',
                marginTop: 10,
              }}>
              {t('clients')}
            </Heading>
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
          </Box>
        </Flex>
      </FadeInview>
    </>
  )
}

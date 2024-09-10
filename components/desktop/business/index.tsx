'use client'
import { Link } from '@/navigation'
import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Carousel, { ResponsiveType } from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

interface Slide {
  image: string
  title: string
  description: string
}

interface BusinessProps {
  responsive: ResponsiveType
  slides: Slide[]
  mode?: string
}

export default function BusinessCarousel({
  responsive,
  slides,
  mode,
}: BusinessProps) {
  const [isCenterMode, setIsCenterMode] = useState(true)
  const [isPartialVisible, setIsPartialVisible] = useState(false)
  useEffect(() => {
    if (mode === 'mobile') {
      setIsCenterMode(false)
      setIsPartialVisible(true)
    } else {
      setIsCenterMode(true)
      setIsPartialVisible(false)
    }
  }, [mode])
  return (
    <Carousel
      showDots={true}
      centerMode={isCenterMode}
      partialVisbile={isPartialVisible}
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
        <Box key={index} style={{ width: '90%', height: 'auto', padding: 0 }}>
          <Card
            direction={{ base: 'column', sm: 'row' }}
            variant="outline"
            size={'lg'}
            alignItems="center"
            width="100%"
            height="auto"
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }}>
            <AspectRatio ratio={16 / 9} width={{ base: '100%', md: '50%' }}>
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
                <Heading
                  fontSize={{ base: '2em', md: '3em' }} // fontSize 속성을 직접 설정
                  color="#586cdb">
                  {slide.title}
                </Heading>
                <Text
                  py="0"
                  fontSize={{ base: '1em', md: '1.5em' }} // fontSize 속성을 직접 설정
                >
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
  )
}

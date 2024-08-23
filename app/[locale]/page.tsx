'use client'
import FadeInview from '@/components/common/utill/FadeInview'
import { Box, Flex, Heading, Image, Link } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import { fallbackLng, languages } from '../i18n/settings'
export default function Page({
  params: { lng },
}: {
  params: {
    lng: string
  }
}) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng
  const t = useTranslations('HomePage')
  return (
    <>
      <video autoPlay muted loop style={{ width: '100%', height: 'auto' }}>
        <source src="/intro-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* section1 */}
      <FadeInview type="scale" range="0.3">
        <Flex justify="center" className="mainSection1">
          <Box>
            <Heading className="mainText1" size="lg">
              {t('title')}
            </Heading>
            <Heading className="mainSection1text" size="3xl">
              Global Banking System
            </Heading>
            <Box className="mainButtonFlex">
              <Link href="http://bit.ly/3JWadeu" target="_blank">
                <Image
                  display={'inline-block'}
                  src={'/images/GooglePlayButton.png'}
                  p={'10px'}
                />
              </Link>
            </Box>
          </Box>
        </Flex>
      </FadeInview>
      <hr />
    </>
  )
}

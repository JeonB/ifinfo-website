'use client'
import { ScaleFade, SlideFade } from '@chakra-ui/react'
import { useInView } from 'react-intersection-observer'

const FadeInview = ({
  type,
  range,
  children,
}: {
  type: string
  range: string
  children: React.ReactNode
}) => {
  const { ref, inView, entry } = useInView({
    threshold: range || 0.3,
  })
  const typeData = type
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {typeData === 'scale' ? (
        <ScaleFade in={inView} initialScale={0.9}>
          <div ref={ref}>{children}</div>
        </ScaleFade>
      ) : typeData === 'slide' ? (
        <SlideFade in={inView} offsetY="20px">
          <div ref={ref}>{children}</div>
        </SlideFade>
      ) : (
        <ScaleFade in={inView} initialScale={0.9}>
          <div ref={ref}>{children}</div>
        </ScaleFade>
      )}
    </>
  )
}
export default FadeInview

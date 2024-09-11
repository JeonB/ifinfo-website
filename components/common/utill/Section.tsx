'use client'
import FadeInview from '@/components/common/utill/FadeInview'
import { Box, Flex, Heading } from '@chakra-ui/react'
import 'react-multi-carousel/lib/styles.css'
/**
 * 제목, 설명 및 선택적 자식 요소가 있는 섹션을 렌더링하는 함수형 컴포넌트입니다.
 * 섹션에는 페이드 인 애니메이션과 반응형 스타일이 포함됩니다.
 *
 * @param {Object} props - 속성 객체입니다.
 * @param {React.ReactNode} [props.children] - 섹션 내에 렌더링할 선택적 자식 요소입니다.
 * @param {string} props.title - 섹션의 제목입니다.
 * @param {string} props.description - 섹션의 설명입니다.
 *
 * @returns {JSX.Element} 렌더링된 섹션 컴포넌트입니다.
 */
export const Section = ({
  children,
  title,
  description,
}: {
  children?: React.ReactNode
  title: string
  description: string
}) => {
  return (
    <FadeInview type="scale" range={0.4}>
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
            size={{ base: 'lg', md: '3xl' }} // 반응형 폰트 크기 설정
            style={{
              fontStyle: 'italic',
              textAlign: 'center',
            }}>
            {title}
          </Heading>
          <Heading
            className="mainSection1text"
            size={{ base: 'sm', md: 'lg' }} // 반응형 폰트 크기 설정
            style={{
              textAlign: 'center',
              fontWeight: '400',
              marginTop: 10,
            }}>
            {description}
          </Heading>
          {children}
        </Box>
      </Flex>
    </FadeInview>
  )
}

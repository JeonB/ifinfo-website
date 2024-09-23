import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react'

const historyData = [
  {
    year: '2024',
    events: [
      {
        description: '농협자산관리회사 업무시스템 재구축',
        period: '2024-03 ~ 2024-11',
      },
      {
        description: '하나은행 CLS 결제시스템 재구축',
        period: '2024-01 ~ 2025-03',
      },
    ],
  },
  {
    year: '2023',
    events: [
      {
        description: '하나은행 재정거래시스템 디지털화 개발',
        period: '2023-09 ~ 2025-05',
      },
      {
        description: '하나은행(중국)유한공사 차세대 시스템 구축 참여',
        period: '2023-09 ~ 2024-12',
      },
      {
        description: '인도네시아 하나은행 차세대 리드빌 사업',
        period: '2023-07 ~ 2024-06',
      },
      {
        description:
          '인도네시아 우리소다라은행 현지보고서시스템 인터페이스 개선 컨설팅',
        period: '2023-07 ~ 2023-09',
      },
      {
        description: 'AIFUL 리보 전용 카드시스템 구축(회원정산)',
        period: '2023-06 ~ 2024-06',
      },
      {
        description:
          'KDB 산업은행 글로벌 표준뱅킹시스템 재구축을 위한 요건정의 컨설팅',
        period: '2023-06 ~ 2024-04',
      },
    ],
  },
  {
    year: '2022',
    events: [
      {
        description: '하나은행 Canada 뱅킹시스템 구축(LDW',
        period: '2022-10 ~ 2024-11',
      },
      {
        description: '      JB Capital Myanmar GBS 운영',
        period: '2022-09 ~ 2023-08',
      },
      {
        description: 'AIFUL리보 전용 카드시스템 구축(채권/영업)',
        period: '2022-09 ~ 2023-05',
      },

      {
        description: '      유앤아이대부 정보보호 시스템 구축',
        period: '2022-08 ~ 2023-01',
      },
      {
        description: '       NongHyup Finance Myanmar GBS 모바일시스템 구축',
        period: '2022-07 ~ 2022-12',
      },

      {
        description: '        KB국민은행 E-Capital Market 운영',
        period: '2022-04 ~ 2024-05',
      },

      {
        description: '         KB국민은행 E-Capital Market',
        period: '2022-02 ~ 2022-12',
      },
    ],
  },
]

const HistoryTimeline = () => {
  return (
    <>
      {historyData.map((yearData, index) => (
        <Box key={index}>
          <SimpleGrid columns={3} spacing={0} templateColumns="1fr 0.05fr 1fr">
            {/* 왼쪽 연혁 */}
            {index % 2 === 0 && (
              <>
                <Box
                  style={{
                    paddingRight: '20px',
                    textAlign: 'right',
                    maxHeight: '400px',
                    overflowY: 'auto',
                  }}>
                  <Heading size="lg">{yearData.year}</Heading>
                  {yearData.events.map((event, idx) => (
                    <Box key={idx}>
                      <Text>{event.description}</Text>
                      <Text>{event.period}</Text>
                    </Box>
                  ))}
                </Box>
                <Box
                  style={{
                    width: '1px',
                    backgroundColor: 'black',
                    height: '100%',
                    margin: '0 auto',
                  }}
                />
                <Box />
              </>
            )}
            {/* 오른쪽 연혁 */}
            {index % 2 !== 0 && (
              <>
                <Box />
                <Box
                  style={{
                    width: '1px',
                    backgroundColor: 'black',
                    height: '100%',
                    margin: '0 auto',
                  }}
                />
                <Box
                  style={{
                    paddingLeft: '20px',
                    textAlign: 'left',
                    maxHeight: '400px',
                    overflowY: 'auto',
                  }}>
                  <Heading size="lg">{yearData.year}</Heading>
                  {yearData.events.map((event, idx) => (
                    <Box key={idx}>
                      <Text>{event.description}</Text>
                      <Text>{event.period}</Text>
                    </Box>
                  ))}
                </Box>
              </>
            )}
          </SimpleGrid>
        </Box>
      ))}
    </>
  )
}

export default HistoryTimeline

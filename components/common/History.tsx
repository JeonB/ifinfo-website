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
                <Box style={{ paddingRight: '20px', textAlign: 'right' }}>
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
                <Box style={{ paddingLeft: '20px', textAlign: 'left' }}>
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

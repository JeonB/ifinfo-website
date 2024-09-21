import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'

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
  // 나머지 연혁 데이터 추가
]

const HistoryTimeline = () => {
  return (
    <Box
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1px 1fr',
        alignItems: 'center',
      }}>
      {historyData.map((yearData, index) => (
        <React.Fragment key={index}>
          {/* 왼쪽 연혁 */}
          {index % 2 === 0 && (
            <Box>
              <Heading size="lg">{yearData.year}</Heading>
              {yearData.events.map((event, idx) => (
                <Box key={idx}>
                  <Text>{event.description}</Text>
                  <Text>{event.period}</Text>
                </Box>
              ))}
            </Box>
          )}
          {/* 중앙 선 */}
          <Box
            style={{ width: '1px', backgroundColor: 'black', height: '100%' }}
          />
          {/* 오른쪽 연혁 */}
          {index % 2 !== 0 && (
            <Box>
              <Heading size="lg">{yearData.year}</Heading>
              {yearData.events.map((event, idx) => (
                <Box key={idx}>
                  <Text>{event.description}</Text>
                  <Text>{event.period}</Text>
                </Box>
              ))}
            </Box>
          )}
        </React.Fragment>
      ))}
    </Box>
  )
}

export default HistoryTimeline
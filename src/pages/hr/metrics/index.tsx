import { apiUrl } from '@/models/global';
import { PageContainer } from '@ant-design/pro-layout';
import { Funnel } from '@antv/g2plot';
import { Card, Col, Row, List } from 'antd';
import { FC, useEffect, useState } from 'react';

interface FunnelData {
  applicationsTotal: number;
  applicationsDropped: number;
  testTotal: number;
  testDateBeingLate: number;
  testRenouncement: number;
  interviewTotal: number;
  interviewSkip: number;
  interviewFailed: number;
  offer: number;
  offerRenouncement: number;
  work: number;
}

const HrMetrics: FC = () => {
  const [funnel, setFunnel] = useState<FunnelData | null>(null);

  useEffect(() => {
    fetch(apiUrl + 'Statistic/salesfunnel').then((data) =>
      data.json().then((funnelData: FunnelData) => {
        setFunnel(funnelData);

        let plotData = [
          { stage: 'Заявление', count: funnelData.applicationsTotal },
          { stage: 'Тестирование', count: funnelData.testTotal },
          { stage: 'Собеседование', count: funnelData.interviewTotal },
          { stage: 'Оффер', count: funnelData.offer },
          { stage: 'Работа', count: funnelData.work },
        ];
        const funnelPlot = new Funnel('funnel', {
          data: plotData,
          xField: 'stage',
          yField: 'count',
          legend: false,
          conversionTag: {
            offsetX: 0,
            offsetY: 0,
            style: {},
            formatter: (D) => '   ' + D!['$$percentage$$'] * 100 + '%',
          },
        });

        funnelPlot.render();
      }),
    );
  }, []);
  return (
    <PageContainer title="HR метрики">
      <Row gutter={24}>
        <Col xs={24} md={16}>
          <Card title="Воронка по всем вакансиям">
            <div id="funnel"></div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          {funnel ? (
            <Card title="Детализация воронки">
              <List
                itemLayout="horizontal"
                dataSource={[
                  <Row>
                    <Col>Заявки:</Col>
                    <Col flex="auto">{funnel.applicationsTotal}</Col>
                  </Row>,
                ]}
                // renderItem={(item) => {
                //   return()
                // }}
              />
            </Card>
          ) : (
            ''
          )}
        </Col>
      </Row>
    </PageContainer>
  );
};

export default HrMetrics;

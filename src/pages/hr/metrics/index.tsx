import { apiUrl } from '@/models/global';
import { PageContainer } from '@ant-design/pro-layout';
import { Funnel } from '@antv/g2plot';
import { Card, Col, Row, List, Table } from 'antd';
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
        <Col xs={24} md={16} style={{ marginBottom: '24px' }}>
          <Card title="Воронка по всем вакансиям">
            <div id="funnel"></div>
          </Card>
        </Col>
        <Col xs={24} md={8} style={{ marginBottom: '24px' }}>
          {funnel ? (
            <Card title="Детализация воронки" style={{ height: '100%', marginBottom: '24px' }}>
              <List
                itemLayout="horizontal"
                dataSource={[
                  <div style={{ display: 'grid', gridTemplateColumns: '90% 1fr', width: '100%' }}>
                    <div style={{ fontWeight: 600, color: '#1890ff' }}>Заявки:</div>
                    <div>{funnel.applicationsTotal}</div>
                    <div style={{ color: '#acacac' }}>Отказов от предлагаемых вакансий:</div>
                    <div>{funnel.applicationsDropped}</div>
                  </div>,

                  <div style={{ display: 'grid', gridTemplateColumns: '90% 1fr', width: '100%' }}>
                    <div style={{ fontWeight: 600, color: '#63daab' }}>Тестирование:</div>
                    <div>{funnel.testTotal}</div>
                    <div style={{ color: '#acacac' }}>Пропуск даты сдачи теста:</div>
                    <div>{funnel.testDateBeingLate}</div>
                    <div style={{ color: '#acacac' }}>Отказ от выполнения теста:</div>
                    <div>{funnel.testRenouncement}</div>
                  </div>,

                  <div style={{ display: 'grid', gridTemplateColumns: '90% 1fr', width: '100%' }}>
                    <div style={{ fontWeight: 600, color: '#657798' }}>Собеседование:</div>
                    <div>{funnel.interviewTotal}</div>
                    <div style={{ color: '#acacac' }}>Пропуск собеседования:</div>
                    <div>{funnel.interviewSkip}</div>
                    <div style={{ color: '#acacac' }}>Провал собеседования:</div>
                    <div>{funnel.interviewFailed}</div>
                  </div>,

                  <div style={{ display: 'grid', gridTemplateColumns: '90% 1fr', width: '100%' }}>
                    <div style={{ fontWeight: 600, color: '#f7c122' }}>Оффер:</div>
                    <div>{funnel.offer}</div>
                    <div style={{ color: '#acacac' }}>Отказ от оффера:</div>
                    <div>{funnel.offerRenouncement}</div>
                  </div>,

                  <div style={{ display: 'grid', gridTemplateColumns: '90% 1fr', width: '100%' }}>
                    <div style={{ fontWeight: 600, color: '#7722f7' }}>Выход на работу: :</div>
                    <div>{funnel.offer}</div>
                  </div>,
                ]}
                renderItem={(item: any) => {
                  return <List.Item>{item}</List.Item>;
                }}
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

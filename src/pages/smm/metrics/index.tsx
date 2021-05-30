import { InfoCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Area, Bullet, Line, Liquid } from '@antv/g2plot';
import { Card, Col, Row, Tooltip } from 'antd';
import { FC, useEffect } from 'react';
import { ageData, areaData, bulletData, dataa } from './mocks';

const convertNumber = (num: number) => {
  const newNum = [];
  while (num > 0) {
    newNum.push(num % 1000);
    num = Math.floor(num / 1000);
  }

  return newNum.reverse().join(',');
};

const SmmMetrics: FC = () => {
  useEffect(() => {
    const candArea = new Area('candPlot', {
      data: areaData,
      xField: 'timePeriod',
      yField: 'value',
      height: 25,
      xAxis: false,
      yAxis: false,
      color: 'rgba(133, 67, 224, 0.85)',
      areaStyle: {
        fillOpacity: 1,
      },
    });

    candArea.render();

    const itArea = new Bullet('itPlot', {
      data: bulletData,
      height: 25,
      measureField: 'Доля',
      targetField: 'Цель',
      rangeField: 'ranges',
      xAxis: false,
      yAxis: false,
      xField: 'title',
      bulletStyle: {
        range: {
          fillOpacity: 0,
        },
      },
    });

    itArea.render();

    const highArea = new Area('highPlot', {
      data: areaData,
      xField: 'timePeriod',
      yField: 'value',
      height: 25,
      xAxis: false,
      yAxis: false,
      color: 'rgba(224, 67, 161, 0.85)',
      areaStyle: {
        fillOpacity: 1,
      },
    });

    highArea.render();

    const ageGraph = new Area('age', {
      data: ageData,
      xField: 'date',
      yField: 'value',
      seriesField: 'age',
    });

    ageGraph.render();

    const activityPlot = new Liquid('activity', {
      percent: 0.87,
      outline: {
        border: 4,
        distance: 8,
      },
      wave: {
        length: 128,
      },
    });

    activityPlot.render();

    const coveragePlot = new Line('coverage', {
      data: dataa.slice(500, 700),
      xField: 'year',
      yField: 'value',
      seriesField: 'category',
      point: {},
      smooth: true,
    });

    coveragePlot.render();
  }, []);

  return (
    <PageContainer title="SMM метрики">
      <Row gutter={24}>
        <Col md={24} lg={8} style={{ marginBottom: '24px' }}>
          <Card>
            <Row style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
              <Col>Общее количество участников</Col>
              <Col flex="auto">
                <div style={{ marginLeft: 'auto', display: 'table' }}>
                  <Tooltip title="Что-то показывает">
                    <InfoCircleOutlined />
                  </Tooltip>
                </div>
              </Col>
            </Row>
            <Row>
              <h1>{convertNumber(8846)}</h1>
            </Row>
            <Row id="candPlot"></Row>
          </Card>
        </Col>
        <Col md={24} lg={8} style={{ marginBottom: '24px' }}>
          <Card>
            <Row style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
              <Col>Общее количество участников</Col>
              <Col flex="auto">
                <div style={{ marginLeft: 'auto', display: 'table' }}>
                  <Tooltip title="Что-то показывает">
                    <InfoCircleOutlined />
                  </Tooltip>
                </div>
              </Col>
            </Row>
            <Row>
              <h1>{convertNumber(78)}%</h1>
            </Row>
            <Row id="itPlot"></Row>
          </Card>
        </Col>
        <Col md={24} lg={8} style={{ marginBottom: '24px' }}>
          <Card>
            <Row style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
              <Col>Общее количество участников</Col>
              <Col flex="auto">
                <div style={{ marginLeft: 'auto', display: 'table' }}>
                  <Tooltip title="Что-то показывает">
                    <InfoCircleOutlined />
                  </Tooltip>
                </div>
              </Col>
            </Row>
            <Row>
              <h1>{convertNumber(3245)}</h1>
            </Row>
            <Row id="highPlot"></Row>
          </Card>
        </Col>
      </Row>
      <Row style={{ marginBottom: '24px' }}>
        <Col xs={24}>
          <Card title="География">
            <div id="geography"></div>
          </Card>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xs={24} sm={16} style={{ marginBottom: '24px' }}>
          <Card title="Возраст">
            <div id="age"></div>
          </Card>
        </Col>
        <Col xs={24} sm={8} style={{ marginBottom: '24px' }}>
          <Card title="Активность за неделю">
            <div>
              <Tooltip title="Новые заявки">
                <div id="activity"></div>
              </Tooltip>
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xs={24} sm={16} style={{ marginBottom: '24px' }}>
          <Card title="Охват">
            <div id="coverage"></div>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default SmmMetrics;

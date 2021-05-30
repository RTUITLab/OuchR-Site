import { Candidate, ICandidate } from '@/models/candidate';
import { apiUrl } from '@/models/global';
import { PageContainer } from '@ant-design/pro-layout';
import moment from '@ant-design/pro-utils/node_modules/moment';
import { Avatar, Card, Col, Row, Skeleton } from 'antd';
import { FC, useEffect, useState } from 'react';

const Calendar: FC = () => {
  const [candidate, setCandidate] = useState<ICandidate[]>([]);

  useEffect(() => {
    fetch(apiUrl + 'MyCandidates/waitTimeConfirmation').then((data) => {
      data.json().then((cand: ICandidate[]) => {
        setCandidate(cand);
      });
    });
  }, []);

  return (
    <PageContainer title="Заявки на собеседование">
      <Row gutter={24}>
        {candidate.slice(0, 3).map((C) => (
          <Col xs={24} lg={8} style={{ marginBottom: '24px' }}>
            <Card
              actions={[
                <a style={{ color: '#1890ff' }}>Принято</a>,
                <a style={{ color: 'rgba(0, 0, 0, 0.25)' }}>Отклонено</a>,
              ]}
            >
              <Skeleton loading={false} avatar>
                <Card.Meta
                  avatar={<Avatar src={C.pthotoUrl} />}
                  title={C.name}
                  description={C.currentIntership}
                />
              </Skeleton>
              <Row style={{ marginTop: '8px' }}>
                <Col xs={8} style={{ marginLeft: '48px' }}>
                  <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Время</div>
                  <h1>{moment(C.events[0].date).format('hh:mm')}</h1>
                </Col>
                <Col xs={8}>
                  <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Дата</div>
                  <h1>{moment(C.events[0].date).format('DD.MM')}</h1>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </PageContainer>
  );
};

export default Calendar;

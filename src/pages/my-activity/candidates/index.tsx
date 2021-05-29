import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, Row, Tabs } from 'antd';
import { FC } from 'react';

const ActivityCandidates: FC = () => {
  return (
    <PageContainer>
      <Row>
        <Col md={24}>
          <Card>
            <Tabs defaultActiveKey="1"></Tabs>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default ActivityCandidates;

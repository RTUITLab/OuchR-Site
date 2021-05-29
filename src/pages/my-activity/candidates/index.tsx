import CandidateTable, { Candidate, CandidatesStages } from '@/components/CandidateTable';
import { DownloadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import moment from '@ant-design/pro-utils/node_modules/moment';
import { Card, Col, Row, Tabs } from 'antd';
import { FC, useEffect, useState } from 'react';

const ActivityCandidates: FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    let cand: Candidate[] = [
      {
        id: '123456',
        name: 'Sjdjss',
        stage: CandidatesStages.Application,
        direction: 'Машинное обучение',
        date: '2021-05-29T13:26:07.097Z',
        comment: 'Commmmmmment',
        summary: 'https://google.com',
      },
      {
        id: '1234567',
        name: 'USbrfvhjd sddgfhjkjl',
        stage: CandidatesStages.Application,
        direction: 'asdfghjkl',
        date: '2021-05-29T13:26:07.097Z',
        comment: '',
        summary: 'https://google.com',
      },
      {
        id: '123456',
        name: 'Sjdjss',
        stage: CandidatesStages.Application,
        direction: 'Машинное обучение',
        date: '2021-05-29T13:26:07.097Z',
        comment: 'Commmmmmment',
        summary: 'https://google.com',
      },
      {
        id: '1234567',
        name: 'USbrfvhjd sddgfhjkjl',
        stage: CandidatesStages.Application,
        direction: 'asdfghjkl',
        date: '2021-05-29T13:26:07.097Z',
        comment: '',
        summary: 'https://google.com',
      },
      {
        id: '123456',
        name: 'Sjdjss',
        stage: CandidatesStages.Application,
        direction: 'Машинное обучение',
        date: '2021-05-29T13:26:07.097Z',
        comment: 'Commmmmmment',
        summary: 'https://google.com',
      },
      {
        id: '1234567',
        name: 'USbrfvhjd sddgfhjkjl',
        stage: CandidatesStages.Application,
        direction: 'asdfghjkl',
        date: '2021-05-29T13:26:07.097Z',
        comment: '',
        summary: 'https://google.com',
      },
      {
        id: '123456',
        name: 'Sjdjss',
        stage: CandidatesStages.Testing,
        direction: 'Машинное обучение',
        date: '2021-05-29T13:26:07.097Z',
        comment: 'Commmmmmment',
        summary: 'https://google.com',
      },
      {
        id: '1234567',
        name: 'USbrfvhjd sddgfhjkjl',
        stage: CandidatesStages.Testing,
        direction: 'asdfghjkl',
        date: '2021-05-29T13:26:07.097Z',
        comment: '',
        summary: 'https://google.com',
      },
      {
        id: '123456',
        name: 'Sjdjss',
        stage: CandidatesStages.TechInterview,
        direction: 'Машинное обучение',
        date: '2021-05-29T13:26:07.097Z',
        comment: 'Commmmmmment',
        summary: 'https://google.com',
      },
      {
        id: '1234567',
        name: 'USbrfvhjd sddgfhjkjl',
        stage: CandidatesStages.Offer,
        direction: 'asdfghjkl',
        date: '2021-05-29T13:26:07.097Z',
        comment: '',
        summary: 'https://google.com',
      },
      {
        id: '123456',
        name: 'Sjdjss',
        stage: CandidatesStages.Offer,
        direction: 'Машинное обучение',
        date: '2021-05-29T13:26:07.097Z',
        comment: 'Commmmmmment',
        summary: 'https://google.com',
      },
      {
        id: '1234567',
        name: 'USbrfvhjd sddgfhjkjl',
        stage: CandidatesStages.HrInterview,
        direction: 'asdfghjkl',
        date: '2021-05-29T13:26:07.097Z',
        comment: '',
        summary: 'https://google.com',
      },
      {
        id: '123456',
        name: 'Sjdjss',
        stage: CandidatesStages.HrInterview,
        direction: 'Машинное обучение',
        date: '2021-05-29T13:26:07.097Z',
        comment: 'Commmmmmment',
        summary: 'https://google.com',
      },
      {
        id: '1234567',
        name: 'USbrfvhjd sddgfhjkjl',
        stage: CandidatesStages.HrInterview,
        direction: 'asdfghjkl',
        date: '2021-05-29T13:26:07.097Z',
        comment: '',
        summary: 'https://google.com',
      },
    ];

    cand = cand.map((C) => {
      C.comment = C.comment || '-';
      C.summary = (
        <a style={{ display: 'grid', margin: 'auto' }} href={C.summary.toString()}>
          <DownloadOutlined />
        </a>
      );
      C.date = moment(C.date).format('YYYY-MM-DD hh:mm:ss');
      C.more = (
        <a style={{ display: 'flex', justifyContent: 'center' }} href={C.summary.toString()}>
          ...
        </a>
      );
      return C;
    });
    setCandidates(cand);
  });

  const filterCandidates = (stage: CandidatesStages) => {
    let cands = candidates;

    cands = cands.filter((C) => stage === C.stage);

    return cands;
  };

  return (
    <PageContainer>
      <Row>
        <Col md={24}>
          <Card>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Заявки" key={CandidatesStages.Application}>
                <CandidateTable
                  candidates={filterCandidates(CandidatesStages.Application)}
                ></CandidateTable>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Тестирование" key={CandidatesStages.Testing}>
                <CandidateTable
                  candidates={filterCandidates(CandidatesStages.Testing)}
                ></CandidateTable>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Собеседование с HR" key={CandidatesStages.HrInterview}>
                <CandidateTable
                  candidates={filterCandidates(CandidatesStages.HrInterview)}
                ></CandidateTable>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Техническое собеседование" key={CandidatesStages.TechInterview}>
                <CandidateTable
                  candidates={filterCandidates(CandidatesStages.TechInterview)}
                ></CandidateTable>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Оффер" key={CandidatesStages.Offer}>
                <CandidateTable
                  candidates={filterCandidates(CandidatesStages.Offer)}
                ></CandidateTable>
              </Tabs.TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default ActivityCandidates;

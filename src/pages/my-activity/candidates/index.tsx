import CandidateTable from '@/components/CandidateTable';
import { CandidatesStages, ICandidate } from '@/models/candidate';
import { apiUrl } from '@/models/global';
import { DownloadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import moment from '@ant-design/pro-utils/node_modules/moment';
import { Card, Col, Row, Tabs } from 'antd';
import { FC, useEffect, useState } from 'react';
import UserCard from './user';

const ActivityCandidates: FC = () => {
  const [candidates, setCandidates] = useState<ICandidate[]>([]);
  const [activeCandidate, setActiveCandidate] = useState<ICandidate | null>(null);

  useEffect(() => {
    let user = location.search.split('&').find((p) => p.indexOf('userId')) || '';
    if (user) user = user.split('=')[1] || '';

    fetch(apiUrl + 'MyCandidates').then((data) => {
      data.json().then((cand: ICandidate[]) => {
        cand = cand.map((C) => {
          C.comment = C.comment || '-';
          C.currentStage = C.events[0].stage;
          C.summary = (
            <a style={{ display: 'grid', margin: 'auto' }} href={C.resumeUrl}>
              <DownloadOutlined />
            </a>
          );
          C.date = moment(C.events.find((E) => E.stage === 0)?.date).format('YYYY-MM-DD hh:mm:ss');
          C.more = <a style={{ display: 'flex', justifyContent: 'center' }}>...</a>;
          return C;
        });
        if (user) setActiveCandidate(cand.find((C) => C.userId == user) || null);
        setCandidates(cand);
      });
    });
  }, []);

  const filterCandidates = (stage: CandidatesStages) => {
    let cands = candidates;

    cands = cands.filter((C) => stage === C.currentStage);

    return cands;
  };

  const onSetActive = (id: string) => {
    console.log(id);
    setActiveCandidate(candidates.find((C) => C.userId === id) || null);
  };

  return (
    <PageContainer>
      <Row>
        <Col md={24}>
          <Card style={{ marginBottom: '24px' }}>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Заявки" key={1}>
                <CandidateTable
                  candidates={filterCandidates(CandidatesStages.Application)}
                  onSetActive={onSetActive}
                ></CandidateTable>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Тестирование" key={2}>
                <CandidateTable
                  candidates={filterCandidates(CandidatesStages.Testing)}
                  onSetActive={onSetActive}
                ></CandidateTable>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Собеседование" key={3}>
                <CandidateTable
                  candidates={filterCandidates(CandidatesStages.Interview)}
                  onSetActive={onSetActive}
                ></CandidateTable>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Оффер" key={4}>
                <CandidateTable
                  candidates={filterCandidates(CandidatesStages.Offer)}
                  onSetActive={onSetActive}
                ></CandidateTable>
              </Tabs.TabPane>
            </Tabs>
          </Card>

          {activeCandidate && <UserCard candidate={activeCandidate} />}
        </Col>
      </Row>
    </PageContainer>
  );
};

export default ActivityCandidates;

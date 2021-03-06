import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, Row, Skeleton } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { List } from 'antd';
import { FC, useEffect, useState } from 'react';
import * as styles from './activityMain.less';
import moment from 'moment';
import 'moment/locale/ru';
import { ICandidate } from '@/models/candidate';
import { apiUrl } from '@/models/global';
import { Link, useHistory } from 'react-router-dom';
moment.locale('ru');

const Info: FC<{
  title: React.ReactNode;
  value: React.ReactNode;
  bordered?: boolean;
}> = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);

interface TestTask {
  id: string;
  name: string;
  intership: string;
  pthotoUrl: string;
}

interface Interview {
  id: string;
  name: string;
  intership: string;
  date: string;
  pthotoUrl: string;
}

interface GoingToTest {
  id: string;
  name: string;
  pthotoUrl: string;
}

interface IStatistics {
  work: number;
  interviewNow: number;
  interviewTotal: number;
  potencial: number;
}

const convertNumber = (num: number) => {
  const newNum = [];
  while (num > 0) {
    newNum.push(num % 1000);
    num = Math.floor(num / 1000);
  }

  return newNum.reverse().join(',') || num;
};

const ActivityMain: FC = (props) => {
  const [testTasks, setTestTasks] = useState<TestTask[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [goingToTest, setGoingToTest] = useState<GoingToTest[]>([]);
  const [statistics, setStatistics] = useState<IStatistics | null>(null);

  const history = useHistory();

  useEffect(() => {
    fetch(apiUrl + 'MyCandidates/readyToCheck').then((data) => {
      data.json().then((cand: ICandidate[]) => {
        const task: TestTask[] = cand.map((C) => {
          return {
            id: C.userId,
            name: C.name,
            intership: C.currentIntership || '',
            pthotoUrl: C.pthotoUrl!,
          };
        });

        setTestTasks(task);
      });
    });

    fetch(apiUrl + 'MyCandidates/inProgress').then((data) => {
      data.json().then((cand: ICandidate[]) => {
        const goingToTest: GoingToTest[] = cand.map((C) => {
          return {
            id: C.userId,
            name: C.name,
            pthotoUrl: C.pthotoUrl!,
          };
        });

        setGoingToTest(goingToTest);
      });
    });

    fetch(apiUrl + 'MyCandidates/scheduledConferences').then((data) => {
      data.json().then((cand: ICandidate[]) => {
        const interviews: Interview[] = cand.map((C) => {
          return {
            id: C.userId,
            name: C.name,
            intership: C.currentIntership,
            date: C.events[0].date,
            pthotoUrl: C.pthotoUrl!,
          };
        });

        setInterviews(interviews);
      });
    });

    fetch(apiUrl + 'Statistic/mainNumbers').then((data) => {
      data.json().then((stat: IStatistics) => {
        setStatistics(stat);
      });
    });
  }, []);

  const approveTest = (id: string) => {
    fetch(apiUrl + 'ControlFlow/approveTestResults/' + id, {
      method: 'POST',
    }).then(() => setTestTasks(testTasks.filter((T) => T.id !== id)));
  };

  return (
    <PageContainer
      title=" "
      content={
        <Row>
          <Col xs={24} sm={24} md={12}>
            <div className={styles.avatarHolder}>
              <img alt="" src="/rosatom_logo.png" />
              <div className={styles.signature}>
                <div className={styles.name}>?????????????? ????????????</div>
                <div className={styles.profession}>HR-????????????????????</div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={{ span: '12' }}>
            <Card bordered={false}>
              {statistics ? (
                <Row className={styles.stat}>
                  <Col sm={8} xs={8}>
                    <Info title="??????????????" value={convertNumber(statistics.work)} bordered />
                  </Col>
                  <Col sm={8} xs={8}>
                    <Info
                      title="????????????????????????"
                      value={statistics.interviewNow + ' / ' + statistics.interviewTotal}
                      bordered
                    />
                  </Col>
                  <Col sm={8} xs={8}>
                    <Info title="??????????????????" value={convertNumber(statistics.potencial)} />
                  </Col>
                </Row>
              ) : (
                ''
              )}
            </Card>
          </Col>
        </Row>
      }
    >
      <Row gutter={16}>
        <Col md={24} lg={16}>
          <Card
            title="???????????????? ??????????????"
            extra={<a href="#">??????????????????</a>}
            bordered={false}
            className={styles.tableCard}
          >
            {testTasks.map((task, index) => (
              <>
                {index < 6 && (
                  <Card.Grid className={styles.gridCard} key={index}>
                    <div
                      className={styles.header}
                      onClick={() => history.push('/activity/candidates?userId=' + task.id)}
                    >
                      <Avatar
                        src={task.pthotoUrl!}
                        style={{ marginBottom: '8px', borderRadius: 100 }}
                      ></Avatar>
                      <div>{task.name}</div>
                    </div>

                    <Row>
                      <div>????????????????????: {task.intership}</div>
                    </Row>
                    <Row style={{ marginTop: '8px' }}>
                      <Col>
                        <a onClick={() => approveTest(task.id)}>??????????????</a>
                      </Col>
                      <Col flex="auto">
                        <a
                          style={{
                            marginLeft: 'auto',
                            display: 'table',
                            color: 'rgba(0, 0, 0, 0.25)',
                          }}
                          href="#"
                        >
                          ??????????????????
                        </a>
                      </Col>
                    </Row>
                  </Card.Grid>
                )}
              </>
            ))}
          </Card>
          <Card title="?????????????????????? ??????????????????????????" className={styles.tableCard}>
            <List
              itemLayout="horizontal"
              dataSource={interviews}
              renderItem={(item) => (
                <List.Item
                  onClick={() => history.push('/activity/candidates?userId=' + item.id)}
                  actions={[
                    <div className={styles.date}>
                      <div>{moment(item.date).format('h:mm')}</div>
                      <div>{moment(item.date).format('DD.MM, dddd')}</div>
                    </div>,
                  ]}
                >
                  <Skeleton avatar loading={false} title={false}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.pthotoUrl!}></Avatar>}
                      title={item.name}
                      description={'????????????????????: ' + item.intership}
                    ></List.Item.Meta>
                  </Skeleton>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col md={24} lg={8}>
          <Card title="???????????????? ???????????????? ??????????????">
            <Row>
              <Col md={24}>
                <List
                  dataSource={goingToTest}
                  renderItem={(item) => (
                    <div
                      className={styles.goingListItem}
                      onClick={() => history.push('/activity/candidates?userId=' + item.id)}
                    >
                      <Avatar src={item.pthotoUrl}></Avatar>
                      <div>{item.name}</div>
                    </div>
                  )}
                />
              </Col>
              <Col md={12}></Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default ActivityMain;

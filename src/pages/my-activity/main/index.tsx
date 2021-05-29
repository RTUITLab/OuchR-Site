import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, Row, Skeleton } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { List } from 'antd';
import { FC, useEffect, useState } from 'react';
import * as styles from './activityMain.less';
import moment from 'moment';
import 'moment/locale/ru';
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
}

interface Interview {
  id: string;
  name: string;
  intership: string;
  date: string;
}

interface GoingToTest {
  id: string;
  name: string;
}

const ActivityMain: FC = (props) => {
  const [testTasks, setTestTasks] = useState<TestTask[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [goingToTest, setGoingToTest] = useState<GoingToTest[]>([]);

  useEffect(() => {
    let tasks: TestTask[] = [
      {
        id: '1',
        name: 'Иванов Иван',
        intership: 'Машинное обучение',
      },
      {
        id: '2',
        name: 'Геннадий Горин',
        intership: 'Python-разработчик',
      },
      {
        id: '3',
        name: 'Анна Кубанкова',
        intership: 'Data Science',
      },
      {
        id: '4',
        name: 'Константин Зубарев',
        intership: 'Data Science',
      },
      {
        id: '5',
        name: 'Инга Горелова',
        intership: 'Data Science',
      },
      {
        id: '6',
        name: 'Дмитрий Романов',
        intership: 'Data Science',
      },
      {
        id: '7',
        name: 'N0',
        intership: 'N0',
      },
    ];

    let interviews: Interview[] = [
      {
        id: '1',
        name: 'Иванов Иван',
        intership: 'Машинное обучение',
        date: '2021-05-29T13:26:07.097Z',
      },
      {
        id: '2',
        name: 'Геннадий Горин',
        intership: 'Python-разработчик',
        date: '2021-05-29T13:26:07.097Z',
      },
      {
        id: '3',
        name: 'Анна Кубанкова',
        intership: 'Data Science',
        date: '2021-05-29T13:26:07.097Z',
      },
      {
        id: '4',
        name: 'Константин Зубарев',
        intership: 'Data Science',
        date: '2021-05-29T13:26:07.097Z',
      },
      {
        id: '5',
        name: 'Инга Горелова',
        intership: 'Data Science',
        date: '2021-05-29T13:26:07.097Z',
      },
      {
        id: '6',
        name: 'Дмитрий Романов',
        intership: 'Data Science',
        date: '2021-05-29T13:26:07.097Z',
      },
      {
        id: '7',
        name: 'N0',
        intership: 'N0',
        date: '2021-05-29T13:26:07.097Z',
      },
    ];

    let goingToTest: GoingToTest[] = [
      {
        id: '1',
        name: 'Иванов Иван',
      },
      {
        id: '2',
        name: 'Геннадий Горин',
      },
      {
        id: '3',
        name: 'Анна Кубанкова',
      },
      {
        id: '4',
        name: 'Константин Зубарев',
      },
      {
        id: '5',
        name: 'Инга Горелова',
      },
      {
        id: '6',
        name: 'Дмитрий Романов',
      },
      {
        id: '7',
        name: 'N0',
      },
    ];

    setTestTasks(tasks);
    setInterviews(interviews);
    setGoingToTest(goingToTest);
  });

  return (
    <PageContainer
      title=" "
      content={
        <Row>
          <Col xs={24} sm={24} md={12}>
            <div className={styles.avatarHolder}>
              <img alt="" src="/rosatom_logo.png" />
              <div className={styles.signature}>
                <div className={styles.name}>Зинаида Котова</div>
                <div className={styles.profession}>HR-специалист</div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={{ span: '12' }}>
            <Card bordered={false}>
              <Row className={styles.stat}>
                <Col sm={8} xs={8}>
                  <Info title="Принято" value="56" bordered />
                </Col>
                <Col sm={8} xs={8}>
                  <Info title="Собеседуется" value="8 / 24" bordered />
                </Col>
                <Col sm={8} xs={8}>
                  <Info title="Потенциал" value="2,223" />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      }
    >
      <Row gutter={16}>
        <Col md={24} lg={16}>
          <Card
            title="Тестовые задания"
            extra={<a href="#">Подробнее</a>}
            bordered={false}
            className={styles.tableCard}
          >
            {testTasks.map((task, index) => (
              <>
                {index < 6 && (
                  <Card.Grid className={styles.gridCard}>
                    <div className={styles.header}>
                      <Avatar src="/rosatom_logo.png" style={{ marginBottom: '8px' }}></Avatar>
                      <div>{task.name}</div>
                    </div>

                    <Row>
                      <div>Стажировка: {task.intership}</div>
                    </Row>
                    <Row style={{ marginTop: '8px' }}>
                      <Col>
                        <a href="#">Принять</a>
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
                          Отклонено
                        </a>
                      </Col>
                    </Row>
                  </Card.Grid>
                )}
              </>
            ))}
          </Card>
          <Card title="Предстоящие собеседования" className={styles.tableCard}>
            <List
              itemLayout="horizontal"
              dataSource={interviews}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <div className={styles.date}>
                      <div>{moment(item.date).format('h:mm')}</div>
                      <div>{moment(item.date).format('DD.MM, dddd')}</div>
                    </div>,
                  ]}
                >
                  <Skeleton avatar loading={false} title={false}>
                    <List.Item.Meta
                      avatar={<Avatar src="/rosatom_logo.png"></Avatar>}
                      title={item.name}
                      description={'Стажировка: ' + item.intership}
                    ></List.Item.Meta>
                  </Skeleton>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col md={24} lg={8}>
          <Card title="Проходят тестовое задание">
            <Row>
              <Col md={24}>
                <List
                  dataSource={goingToTest}
                  renderItem={(item) => (
                    <div className={styles.goingListItem}>
                      <Avatar src="/rosatom_logo.png"></Avatar>
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

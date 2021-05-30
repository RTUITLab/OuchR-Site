import { CandidatesStages, ICandidate } from '@/models/candidate';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import moment from '@ant-design/pro-utils/node_modules/moment';
import { Card, Col, Input, Row, Form, DatePicker, Button, Menu, Timeline } from 'antd';
import { FC, useState } from 'react';
import * as styles from './activityCandidates.less';

interface UserCardProps {
  candidate: ICandidate;
}

const UserCard: FC<UserCardProps> = (props) => {
  const [isEditingName, setEdditingName] = useState<Boolean>(false);
  const [candidate, setCandidate] = useState<ICandidate>(props.candidate);

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.setFieldsValue({
      current: 'sdasdas',
    });
  };

  return (
    <Card>
      <Row gutter={144}>
        <Col sm={24} md={16}>
          <div className={styles.avatarHolder}>
            <img alt="" src={props.candidate.pthotoUrl!} style={{ borderRadius: 100 }} />
            <div className={styles.signature}>
              {!isEditingName ? (
                <div className={styles.name}>
                  {props.candidate.name} <EditOutlined onClick={() => setEdditingName(true)} />
                </div>
              ) : (
                <Input value={props.candidate.name} />
              )}
              <div className={styles.summary}>{props.candidate.summary} Скачать резюме</div>
            </div>
          </div>
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            initialValues={{
              education: props.candidate.education,
              // birth: moment(props.candidate.birthday),
              // experience: props.candidate.workExperience,
              // current: props.candidate.currentIntership,
              available: props.candidate.availableInterships,
            }}
          >
            <Form.Item label="Дата рождения" name="birth">
              <DatePicker value={moment(props.candidate.birthday)} />
            </Form.Item>
            <Form.Item label="Образование" name="education">
              <Input />
            </Form.Item>
            <Form.Item label="Опыт работы" name="experience">
              <Input.TextArea rows={3} value={props.candidate.workExperience} />
            </Form.Item>
            <Form.Item label="Доступные вакансии" name="available">
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item
              label="Текущая вакансия"
              name="current"
              tooltip="Для которой проходится собеседование"
            >
              {props.candidate.currentIntership}
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" style={{ marginRight: '16px' }}>
                Сохранить
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Отменить
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col sm={24} md={8}>
          <Menu inlineCollapsed={false} mode="inline">
            <Menu.SubMenu
              style={{ color: '#1890ff', fontSize: '16px' }}
              key="1"
              title={
                'Этап: ' +
                (props.candidate.currentStage === CandidatesStages.Application
                  ? 'Подача заявления'
                  : props.candidate.currentStage === CandidatesStages.Testing
                  ? 'Тестирование'
                  : props.candidate.currentStage === CandidatesStages.Interview
                  ? 'Собеседование'
                  : 'Предложение оффера')
              }
            >
              <Timeline
                style={{ marginTop: '16px' }}
                pending={
                  props.candidate.currentStage === CandidatesStages.Application
                    ? 'Выбор направления'
                    : props.candidate.currentStage === CandidatesStages.Testing
                    ? 'Тестирование'
                    : props.candidate.currentStage === CandidatesStages.Interview
                    ? 'Cобеседование'
                    : 'Оффер'
                }
              >
                {props.candidate.events
                  .reverse()
                  .map(
                    (E) =>
                      (E.stage === CandidatesStages.Application && (
                        <Timeline.Item>
                          Получена заявка {moment(E.date).format('YYYY-MM-DD')}
                        </Timeline.Item>
                      )) ||
                      (E.stage === CandidatesStages.Testing && (
                        <Timeline.Item>
                          Начато тестирование {moment(E.date).format('YYYY-MM-DD')}
                        </Timeline.Item>
                      )) ||
                      (E.stage === CandidatesStages.Interview && (
                        <Timeline.Item>
                          Завершено тестирование {moment(E.date).format('YYYY-MM-DD')}
                        </Timeline.Item>
                      )) ||
                      (E.stage === CandidatesStages.Offer && (
                        <Timeline.Item>
                          Завершено собеседование {moment(E.date).format('YYYY-MM-DD')}
                        </Timeline.Item>
                      )),
                  )}
              </Timeline>
              <a>
                <PlusOutlined style={{ marginRight: '12px' }} />
                {props.candidate.currentStage === CandidatesStages.Application
                  ? 'Выбрать направление'
                  : props.candidate.currentStage === CandidatesStages.Testing
                  ? 'Завершить тестирование'
                  : props.candidate.currentStage === CandidatesStages.Interview
                  ? 'Завершить собеседование'
                  : 'Добавить решение по офферу'}
              </a>
            </Menu.SubMenu>
          </Menu>
        </Col>
      </Row>
    </Card>
  );
};

export default UserCard;

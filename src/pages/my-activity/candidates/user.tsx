import { Candidate } from '@/components/CandidateTable';
import { EditOutlined } from '@ant-design/icons';
import { Card, Col, Input, Row, Form, DatePicker, Button, useForm } from 'antd';
import { FC, useState } from 'react';
import * as styles from './activityCandidates.less';

interface UserCardProps {
  candidate: Candidate;
}

const UserCard: FC<UserCardProps> = (props) => {
  const [isEditingName, setEdditingName] = useState<Boolean>(false);
  const [candidate, setCandidate] = useState<Candidate>(props.candidate);

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.setFieldsValue({
      current: '',
    });
  };

  return (
    <Card>
      <Row gutter={144}>
        <Col sm={24} md={16}>
          <div className={styles.avatarHolder}>
            <img alt="" src="/rosatom_logo.png" />
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
            initialValues={{ birth: 0 }}
          >
            <Form.Item label="Дата рождения" name="birth">
              <DatePicker />
            </Form.Item>
            <Form.Item label="Образование" name="education">
              <Input />
            </Form.Item>
            <Form.Item label="Опыт работы" name="experience">
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item label="Доступные вакансии" name="available">
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item
              label="Текущая вакансия"
              name="current"
              tooltip="Для которой проходится собеседование"
            >
              <Input />
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
          asdasdasd
        </Col>
      </Row>
    </Card>
  );
};

export default UserCard;

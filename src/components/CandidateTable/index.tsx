import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { FC } from 'react';

const columns: ColumnsType<Candidate> = [
  {
    title: 'ФИО',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Направление',
    dataIndex: 'direction',
    key: 'direction',
  },
  {
    title: 'Дата подачи зявки',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Комментарий',
    dataIndex: 'comment',
    key: 'comment',
  },
  {
    title: 'Резюме',
    dataIndex: 'summary',
    key: 'summary',
    width: 100,
  },
  {
    title: 'Подробнее',
    dataIndex: 'more',
    key: 'more',
    width: 110,
  },
];

export enum CandidatesStages {
  'Application',
  'Testing',
  'HrInterview',
  'TechInterview',
  'Offer',
}

export interface Candidate {
  id: string;
  name: string;
  stage: CandidatesStages;
  direction: string;
  date: string;
  comment: string;
  summary: string | JSX.Element;
  more?: JSX.Element;
}

interface CandidateTableProps {
  candidates: Candidate[];
}

const CandidateTable: FC<CandidateTableProps> = (props) => {
  return (
    <Table
      columns={columns}
      dataSource={props.candidates}
      className="dassdsda"
      scroll={{ x: 1000 }}
    ></Table>
  );
};

export default CandidateTable;

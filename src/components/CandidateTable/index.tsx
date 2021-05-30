import { ICandidate } from '@/models/candidate';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { FC } from 'react';

const columns: ColumnsType<ICandidate> = [
  {
    title: 'ФИО',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Направление',
    dataIndex: 'currentIntership',
    key: 'currentIntership',
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

interface CandidateTableProps {
  candidates: ICandidate[];
  onSetActive: Function;
}

const CandidateTable: FC<CandidateTableProps> = (props) => {
  return (
    <Table
      columns={columns}
      dataSource={props.candidates}
      scroll={{ x: 1000 }}
      onRow={(record) => {
        return {
          onClick: () => {
            props.onSetActive(record.userId);
          },
        };
      }}
    ></Table>
  );
};

export default CandidateTable;

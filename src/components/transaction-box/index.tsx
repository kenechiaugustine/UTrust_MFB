import React from 'react';
// import './index.css';
import { FaCircle } from 'react-icons/fa6';
import { currencyFormatter } from '../../utils/helpers';
import moment from 'moment';

interface TransactionBoxProps {
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  viewBalance?: boolean;
}

const TransactionBox: React.FC<TransactionBoxProps> = ({ type, amount, description, date }) => {
  return (
    <div className="transaction_details_box">
      <FaCircle className="icon" />
      <div className="transaction_details_desc">
        <p>
          {description} - {type} <br />
          <span>{moment(date).format('DD, MMMM YYYY hh:mmA')}</span>
        </p>
      </div>
      <div className="transaction_details_type">
        <p className={type === 'credit' ? 'green' : 'red'}>
          {type === 'credit' ? '+' : '-'}
          {currencyFormatter(amount ?? 0)}
        </p>
      </div>
    </div>
  );
};

export default TransactionBox;

import React, { useEffect, useState } from 'react';
import './index.css';
import { FaCircle, FaClone, FaEye, FaPlus, FaEyeSlash } from 'react-icons/fa6';
import { currencyFormatter, getAuthToken } from '../../utils/helpers';
import { useAppSelector } from '../../store/hooks';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { DepositModal } from '../../components/modal/deposit-modal';
import { WithdrawModal } from '../../components/modal/withdraw-modal';
import { TransferModal } from '../../components/modal/transfer-modal';
import TransactionBox from '../../components/transaction-box';
import { useGetTransactionsQuery } from '../../store/transactions/transactionsApi';
import { Loader } from '../../components/loader';
import { showInfoToast } from '../../utils/toast';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [viewBalance, setViewBalance] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  // const { user: loggedInUser } = useAppSelector((state) => state.auth);
  const loggedInUser: IUser | null = JSON.parse(localStorage.getItem('LOGGED_IN_USER') ?? '{}');

  useEffect(() => {
    const isLoggedIn = getAuthToken();
    const userFromLocalStorage = localStorage.getItem('LOGGED_IN_USER');
    if (!isLoggedIn || !userFromLocalStorage || !loggedInUser) {
      navigate('/login');
    } else {
      setIsLoadingPage(false);
    }
  }, [navigate]);

  const { data: transactions, refetch } = useGetTransactionsQuery({ user: loggedInUser?._id as string, limit: 5 });

  const handleViewBalance = () => {
    setViewBalance((prev) => !prev);
  };

  const triggerTransactionRefetch = () => {
    refetch();
  };

  const handleLogout = () => {
    localStorage.removeItem('LOGGED_IN_USER');
    localStorage.removeItem('loggedInUser:authToken');
    navigate('/login');
  };

  const handleCopyAccountNumber = () => {
    if (loggedInUser?.accountNumber) {
      navigator.clipboard
        .writeText(loggedInUser.accountNumber)
        .then(() => {
          showInfoToast('Account number copied to clipboard');
        })
        .catch((err) => {
          console.error('Failed to copy account number: ', err);
        });
    }
  };

  return (
    <>
      {isLoadingPage ? (
        <Loader />
      ) : (
        <div className="Dashboard-Page">
          <div className="Dashboard-Section">
            <div className="Nav_Section">
              <div>
                <FaCircle size={35} />
              </div>
              <div>
                <img width={50} height={50} src="/Utrustbank_logo.png" alt="" />
              </div>
              <div>
                <FaSignOutAlt onClick={handleLogout} size={25} />
                {/* <FaEllipsisVertical  /> */}
              </div>
            </div>

            <div className="Profile_Section">
              <div className="profile_details">
                <h1>{loggedInUser?.lastName + ' ' + loggedInUser?.firstName}</h1>
                <p>
                  <a href="#">Transaction History</a>
                </p>
              </div>

              <div className="account_number_details">
                <p>
                  Account number:{' '}
                  <span onClick={handleCopyAccountNumber}>
                    {loggedInUser?.accountNumber} <FaClone size={20} />
                  </span>
                </p>
              </div>

              <div className="balance_details">
                <div className="balance_details_text">
                  <p onClick={handleViewBalance}>{viewBalance ? `${currencyFormatter(loggedInUser?.accountBalance ?? 0)}` : '******'}</p>
                  <span onClick={handleViewBalance} className="balance_details_text_icon">
                    {viewBalance ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                  </span>
                </div>

                <div className="balance_details_top_up_btn">
                  <FaPlus size={20} />
                </div>
              </div>
            </div>

            <div className="Features_Section">
              <DepositModal onTransactionComplete={triggerTransactionRefetch} />

              <WithdrawModal onTransactionComplete={triggerTransactionRefetch} />

              <TransferModal onTransactionComplete={triggerTransactionRefetch} />
            </div>

            <div className="Transactions_Section">
              <div className="transaction_header">
                <h2>Transaction history ({transactions?.data?.length ?? 0})</h2>
                <a href="#">see more</a>
              </div>

              <div className="transaction_details_section">
                {!transactions || !transactions?.data?.length ? (
                  <p>No transactions found</p>
                ) : (
                  transactions?.data.map((transaction, index) => (
                    <TransactionBox
                      key={index}
                      type={transaction.transactionType}
                      amount={transaction.amount}
                      description={transaction.modeOfTransaction}
                      date={transaction.createdAt}
                      viewBalance={viewBalance}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import Modal from '..';
import { CustomInput } from '../../custom-input';
import Button from '../../custom-button';
import { useFormik } from 'formik';
import { useAppDispatch } from '../../../redux/hooks';
import { useTransferMutation, useVerifyAccountMutation } from '../../../redux/account/accountApi';
import { BiTransfer } from 'react-icons/bi';
import { showErrorToast, showSuccessToast } from '../../../utils/toast';
import { setUser } from '../../../redux/auth/authSlice';

export const TransferModal: React.FC<{ onTransactionComplete: () => void }> = ({ onTransactionComplete }) => {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [verifiedAccountName, setVerifiedAccountName] = useState('');

  const dispatch = useAppDispatch();

  // const { user: loggedInUser } = useAppSelector((state) => state.auth);
  const loggedInUser: IUser | null = JSON.parse(localStorage.getItem('LOGGED_IN_USER') ?? '{}');

  const [transfer, { isLoading }] = useTransferMutation();
  const [verifyAccount, { isLoading: verifyLoading }] = useVerifyAccountMutation();

  const verifyAccountHandler = (accountNumber: string) => {
    verifyAccount({ accountNumber })
      .unwrap()
      .then((result) => {
        setVerifiedAccountName(result?.data?.accountName);
      })
      .catch((error) => {
        // errors.errorsValues = error?.data?.message;
        showErrorToast(error?.data?.message);
      });
  };

  const onSubmit = () => {
    const payload = {
      senderId: loggedInUser?._id as string,
      receiverAccountNumber: Number(values.receiverAccountNumber),
      amount: values.amount,
    };

    transfer(payload)
      .unwrap()
      .then((result) => {
        dispatch(setUser(result?.data));
        setIsTransferModalOpen(false);
        showSuccessToast(result?.message);
        onTransactionComplete();
        setVerifiedAccountName('');
      })
      .catch((error) => {
        // console.log(error?.data?.message[0]);
        // errors.errorsValues = error?.data?.message;
        showErrorToast(error?.data?.message);
      });
  };

  const { values, handleChange, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      //   senderId: '',
      amount: '',
      receiverAccountNumber: '',
      errorsValues: '',
    },
    onSubmit,
  });

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const accountNumber = e.target.value;
    setFieldValue('receiverAccountNumber', accountNumber);
    setVerifiedAccountName('');

    if (accountNumber.length === 10) {
      verifyAccountHandler(accountNumber);
    }

    console.log({
      accountNumberLength: accountNumber.length,
    });
  };

  return (
    <React.Fragment>
      <a onClick={() => setIsTransferModalOpen(true)}>
        <BiTransfer className="icon" />
        <br />
        <span>Transfer</span>
      </a>

      {/* Modals */}
      <Modal isOpen={isTransferModalOpen} onClose={() => setIsTransferModalOpen(false)}>
        <h2>Transfer Funds</h2>
        <br />
        <p>Make a transfer to a user account</p>

        {errors.errorsValues && <p className="red-text">{errors.errorsValues}</p>}

        <CustomInput
          placeholder="Enter recipient account number"
          value={values.receiverAccountNumber}
          labelText="Enter recipient account number"
          onChange={handleAccountNumberChange}
          //   errorMessage={touched.receiverAccountNumber ? errors.receiverAccountNumber : ''}
        />

        {verifyLoading ? (
          <span className="align-right">Loading...</span>
        ) : (
          <span className="align-right">
            {/* <MdVerified />  */}
            {verifiedAccountName}
          </span>
        )}

        <CustomInput
          placeholder="Enter amount"
          value={values.amount}
          labelText="Enter amount"
          onChange={handleChange('amount')}
          //   errorMessage={touched.amount ? errors.amount : ''}
        />

        <Button
          onClick={() => {
            handleSubmit();
          }}
          isLoading={isLoading}
          text="Transfer"
          type="submit"
        />
      </Modal>
    </React.Fragment>
  );
};

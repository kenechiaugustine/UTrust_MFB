import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import Modal from '..';
import { CustomInput } from '../../custom-input';
import Button from '../../custom-button';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useDepositMutation } from '../../../store/account/accountApi';
import { setUser } from '../../../store/auth';
import { showErrorToast, showSuccessToast } from '../../../utils/toast';

export const DepositModal: React.FC<{ onTransactionComplete: () => void }> = ({ onTransactionComplete }) => {
  // const { user: loggedInUser } = useAppSelector((state) => state.auth);
  const loggedInUser: IUser | null = JSON.parse(localStorage.getItem('LOGGED_IN_USER') ?? '{}');

  const [deposit, { isLoading }] = useDepositMutation();
  const dispatch = useAppDispatch();

  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const onSubmit = () => {
    const payload = {
      userId: loggedInUser?._id as string,
      amount: values.amount,
    };

    deposit(payload)
      .unwrap()
      .then((result) => {
        dispatch(setUser(result?.data));
        showSuccessToast(result?.message);
        setIsDepositModalOpen(false);
        onTransactionComplete();
        values.amount = '';
      })
      .catch((error) => {
        showErrorToast(error?.data?.message);
      });
  };

  const { values, handleChange, touched, errors, handleSubmit } = useFormik({
    initialValues: {
      amount: '',
    },
    onSubmit,
  });

  return (
    <React.Fragment>
      <a onClick={() => setIsDepositModalOpen(true)}>
        <FaPlus className="icon" />
        <br />

        <span>Deposit</span>
      </a>

      {/* Modals */}
      <Modal isOpen={isDepositModalOpen} onClose={() => setIsDepositModalOpen(false)}>
        <h2>Deposit Funds</h2>
        <br />
        <p>Make a deposit to your account</p>
        <form>
          <CustomInput
            placeholder="Enter amount"
            value={values.amount}
            labelText="Enter amount"
            onChange={handleChange('amount')}
            errorMessage={touched.amount ? errors.amount : ''}
          />

          <Button
            onClick={() => {
              handleSubmit();
            }}
            isLoading={isLoading}
            text="Deposit"
            type="submit"
          />
        </form>
      </Modal>
    </React.Fragment>
  );
};

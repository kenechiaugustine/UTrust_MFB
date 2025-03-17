import React, { useState } from 'react';
import Modal from '..';
import { CustomInput } from '../../custom-input';
import Button from '../../custom-button';
import { useFormik } from 'formik';
import { useAppDispatch } from '../../../redux/hooks';
import { useWithdrawMutation } from '../../../redux/account/accountApi';
import { setUser } from '../../../redux/auth/authSlice';
import { CiBank } from 'react-icons/ci';
import { showErrorToast, showSuccessToast } from '../../../utils/toast';

export const WithdrawModal: React.FC<{ onTransactionComplete: () => void }> = ({ onTransactionComplete }) => {
  // const { user: loggedInUser } = useAppSelector((state) => state.auth);
  const loggedInUser: IUser | null = JSON.parse(localStorage.getItem('LOGGED_IN_USER') ?? '{}');
  const [withdraw, { isLoading }] = useWithdrawMutation();
  const dispatch = useAppDispatch();

  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const onSubmit = () => {
    const payload = {
      userId: loggedInUser?._id as string,
      amount: values.amount,
    };

    withdraw(payload)
      .unwrap()
      .then((result) => {
        dispatch(setUser(result?.data));
        showSuccessToast(result?.message);
        setIsWithdrawModalOpen(false);
        onTransactionComplete();
        values.amount = '';
      })
      .catch((error) => {
        // console.log(error?.data?.message[0]);
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
      <a onClick={() => setIsWithdrawModalOpen(true)}>
        <CiBank className="icon" />
        <br />
        <span>Withdraw</span>
      </a>

      {/* Modals */}
      <Modal isOpen={isWithdrawModalOpen} onClose={() => setIsWithdrawModalOpen(false)}>
        <h2>Withdraw Funds</h2>
        <br />
        <p>Make a withdraw to your account</p>

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
          text="Withdraw"
          type="submit"
        />
      </Modal>
    </React.Fragment>
  );
};

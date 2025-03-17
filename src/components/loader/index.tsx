import { ImSpinner9 } from 'react-icons/im';
import './index.css';

export const Loader = () => {
  const style = {
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  return (
    <div style={style}>
      <span>
        <ImSpinner9 className={'loader'} size={35} />
      </span>
    </div>
  );
};

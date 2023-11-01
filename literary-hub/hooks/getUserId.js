import { useSelector } from 'react-redux';

const getUserId = () => {
  const user = useSelector((state) => state.user.user);
  return user ? user.id : null;
};

export default getUserId;

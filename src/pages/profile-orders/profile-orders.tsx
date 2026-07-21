import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrdersApi } from '../../services/slices/feedSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const userOrders = useSelector((state) => state.feed.userOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrdersApi());
  }, []);

  return <ProfileOrdersUI orders={userOrders} />;
};

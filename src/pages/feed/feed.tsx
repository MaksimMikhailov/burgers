import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const { feed } = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeed());
  }, []);
  if (!feed.orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={feed.orders}
      handleGetFeeds={() => {
        dispatch(fetchFeed());
      }}
    />
  );
};

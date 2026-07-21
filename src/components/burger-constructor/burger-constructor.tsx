import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  closeCurrentOrder,
  fetchOrderBurger
} from '../../services/slices/feedSlice';
import { clearIngredients } from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const { ingredients, bun } = useSelector((state) => state.burgerConstructor);

  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const constructorItems = {
    bun,
    ingredients
  };

  const { loading, currentOrder } = useSelector((state) => state.feed);

  const onOrderClick = () => {
    if (!isAuth) {
      return navigate('/login');
    }
    if (!bun || loading) return;
    const ids = [bun._id, ...ingredients.map((el) => el._id), bun._id];
    dispacth(fetchOrderBurger(ids)).then(() => dispacth(clearIngredients()));
  };
  const closeOrderModal = () => {
    dispacth(closeCurrentOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={loading}
      constructorItems={constructorItems}
      orderModalData={currentOrder}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

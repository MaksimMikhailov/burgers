import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  delIngredients,
  replaceIngredients
} from 'src/services/slices/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const handleMoveDown = () => {
      if (totalItems > index) {
        return;
      }
      dispatch(replaceIngredients({ fromIndex: index, toIndex: index + 1 }));
    };

    const handleMoveUp = () => {
      if (0 > index) {
        return;
      }
      dispatch(replaceIngredients({ fromIndex: index, toIndex: index - 1 }));
    };

    const handleClose = () => {
      dispatch(delIngredients(ingredient._id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);

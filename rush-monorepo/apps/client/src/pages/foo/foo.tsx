import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, AppStateType } from '~src/root/store';
import { actions as fooActions, FetchState } from './slice';

export type PropTypes = {
  id: number;
};

const Foo: FC<PropTypes> = ({ id }: PropTypes) => {
  const dispatch = useDispatch<AppDispatch>();

  const data = useSelector((state: AppStateType) => {
    const out = state?.foo?.[id];
    return out;
  });

  const pageFetchState = useSelector((state: AppStateType) => {
    const out = state?.foo?.fooState;
    return out;
  });

  useEffect(() => {
    void dispatch(fooActions.fetchFoo({ id }));
    return () => {
      dispatch(fooActions.resetState());
    };
  }, []);

  return (
    <>
      <div data-testid={`${id}`}>
        {pageFetchState === FetchState.LOADING ? (
          <p>Loading</p>
        ) : (
          <div>{JSON.stringify(data)}</div>
        )}
      </div>
    </>
  );
};

export default Foo;

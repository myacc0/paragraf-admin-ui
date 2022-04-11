import { all } from 'redux-saga/effects';
import authSagas from '@iso/redux/auth/saga';
import profileSaga from '@iso/redux/profile/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    profileSaga(),
  ]);
}

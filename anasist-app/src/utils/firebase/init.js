import * as firebase from 'firebase'
import { config } from './config'

export const init = () => {
  firebase.initializeApp(config)
};
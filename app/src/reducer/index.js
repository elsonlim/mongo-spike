import {combineReducers} from 'redux';
import geoData from './GeoData';
import global from './Global';

export default combineReducers({
  geoData,
  global,
})
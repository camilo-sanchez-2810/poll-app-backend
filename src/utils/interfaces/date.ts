import {
  digitstype,
  monthtype,
} from '../types/date';

export interface IDateConf {
  year: digitstype;
  month: monthtype;
  day: digitstype;
  hour: digitstype;
  minute: digitstype;
  second: digitstype;
  timeZone: string;
}

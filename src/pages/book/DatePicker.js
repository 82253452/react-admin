import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

export default function({ tags, onChange, max, value }) {
  function handleChange(date, dateString) {
    onChange && onChange(dateString);
  }

  return (
    <DatePicker
      format="YYYY-MM-DD HH:mm:ss"
      showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
      onChange={handleChange}
      value={value ? moment(value) : null}
    />
  );
}

import React from "react";
import {DateRangePicker} from "rsuite";
import {date, datetime} from "../utils/functions";

export default props => {
  const [dates, setDates] = React.useState(props.value || []);

  React.useEffect(() => {
    props.onChange([datetime(dates[0]), dates[1] ? date(dates[1]) + ' 23:59:59' : '']);
  }, [dates]);

  return <DateRangePicker {...props} value={dates} onChange={value => setDates(value)} />
}

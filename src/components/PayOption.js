import React, { useState } from "react";
import {
  FormModal,
  Combobox,
  integerRangeToArray,
  getCurrentYear,
} from "zzz-react-components";

const PayOption = ({ initialEntity, onAccept, open, onCancel }) => {
  const [cy] = useState(getCurrentYear());
  const initialYears = integerRangeToArray(initialEntity.fromyear, cy + 3);
  const initialQtr = (initialYears[0] === initialEntity.billtoyear ? initialEntity.fromqtr : 1 )
  const [years] = useState(initialYears);
  const [qtrs, setQtrs] = useState(integerRangeToArray(initialQtr, 4));

  const handleAccept = (data) => {
    onAccept(data);
  };

  const updateQtrs = (billtoyear, form) => {
    if (billtoyear === initialEntity.fromyear) {
      setQtrs(integerRangeToArray(initialEntity.fromqtr, 4));
    } else {
      setQtrs([1, 2, 3, 4]);
    }
    form.change("billtoqtr", 4)
  };

  return (
    <FormModal
      initialEntity={initialEntity}
      open={open}
      caption="Pay Options"
      onAccept={handleAccept}
      onCancel={onCancel}
      maxWidth={100}
    >
      <Combobox caption="Year to Bill" name="billtoyear" items={years} listener={updateQtrs} />
      <Combobox caption="Quarter to Bill" name="billtoqtr" items={qtrs} />
    </FormModal>
  );
};

export default PayOption;

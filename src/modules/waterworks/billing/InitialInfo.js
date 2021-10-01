import React, { useState } from "react";
import {
  Text,
  Title,
  ActionBar,
  Subtitle,
  Spacer,
  Service,
  Error,
  BackLink,
  useEntity,
  Card,
  Form,
  SubmitButton
} from "zzz-react-components";

const InitialInfo = ({ title, partner, moveNextStep, movePrevStep }) => {
  const [entity, setEntity] = useEntity();
  const [error, setError] = useState();

  const loadBill = (entity, form, callback) => {
    setError(null);
    const svc = Service.lookup(`${partner.id}:OnlineWaterworksBillingService`,"waterworks");
    const params = { txntype: entity.txntype, refno: entity.refno };
    svc.invoke("getBilling", params, (err, bill) => {
      if (err) {
        callback(err.toString());
        //TODO: get error from "form"
        setError(err.toString());
      } else {
        setEntity(draft => {
          draft.refno = entity.refno;
          draft.bill = bill;
          return draft;
        });
        moveNextStep();
        callback();
      }
    });
  };

  return (
    <Form
      initialEntity={entity}
      onSubmit={loadBill}
      render={() => (
        <Card>
          <Title>{title}</Title>
          <Subtitle>Initial Information</Subtitle>
          <Spacer />
          <Error msg={error} />
          <Text
            caption="Account No."
            name="refno"
            autoFocus={true}
            required={true}
          />
          <ActionBar>
            <BackLink caption="Back" variant="text" action={movePrevStep} />
            <SubmitButton caption="Next" />
          </ActionBar>
        </Card>
      )}
    />
  );
};

export default InitialInfo;

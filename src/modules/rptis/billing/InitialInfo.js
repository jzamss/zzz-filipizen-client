import React, { useState } from "react";
import {
  Form,
  Text,
  Title,
  ActionBar,
  Subtitle,
  Spacer,
  Service,
  Error,
  BackLink,
  Integer,
  Panel,
  Card,
  SubmitButton,
  useEntity,
} from "zzz-react-components";

const InitialInfo = ({ title, partner, moveNextStep, onCancel }) => {
  const [entity, setEntity] = useEntity();
  const [mode, setMode] = useState("initial");
  const [error, setError] = useState();

  const currentYear = new Date().getFullYear();

  const loadBill = (entity, form, callback) => {
    if (mode === "initial-advance") {
      if (entity.billtoyear <= currentYear) {
        setError("Advance year to pay should be greater than " + currentYear);
        return;
      }
    }

    const params = { txntype: entity.txntype, refno: entity.refno }
    if (mode === "initial-advance") {
      params.billtoyear = entity.billtoyear;
    }
    const svc = Service.lookup(`${partner.id}:OnlineLandTaxBillingService`, "rpt")
    svc.invoke("getBilling", params, (err, bill) => {
      if (err) {
        let errorMsg = err.toString();
        if (/unpaid|full/gi.test(err)) {
          setMode("initial-advance");
          errorMsg = `Ledger is fully paid for the year ${params.billtoyear ? params.billtoyear : currentYear}`;
        }
        callback(errorMsg);
        setError(errorMsg);
      } else {
        setEntity(draft => {
          draft.refno = entity.refno;
          draft.bill = bill.info;
          draft.bill.barcode = draft.bill.billno;
          return draft;
        });
        moveNextStep();
        callback();
      }
    });
  }

  

  return (
    <Form
      initialEntity={entity}
      onSubmit={loadBill}
      render={() => (
        <Card>
          <Panel style={{ minWidth: 400 }}>
            <Title>{title}</Title>
            <Subtitle>Initial Information</Subtitle>
            <Spacer />
            <Error msg={error} />
            <Panel visibleWhen={mode === "initial"}>
              <Text
                caption="Tax Declaration No."
                name="refno"
                autoFocus={true}
                required={true}
              />
            </Panel>

            <Panel visibleWhen={mode === "initial-advance"}>
              <p>
                The associated ledger is fully paid for the current year.
                <br />
                To pay in advance, specify the year and click Next button.
              </p>
              <Spacer />
              <Panel>
                <Text
                  caption="Tax Declaration No."
                  name="refno"
                  disabled={true}
                />
                <Integer
                  caption="Advance Year to Pay"
                  name="billtoyear"
                  thousandSeparator={false}
                  autoFocus={true}
                  required={true}
                  textAlign="left"
                />
              </Panel>
            </Panel>
          </Panel>
          <ActionBar>
            <BackLink caption="Back" variant="text" action={onCancel} />
            <SubmitButton caption="Next" />
          </ActionBar>
        </Card>
      )}
    />
  );
};

export default InitialInfo;

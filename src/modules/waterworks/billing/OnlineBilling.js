import React from 'react'
import {
  Card,
  Panel,
  Text,
  ActionBar,
  Spacer,
  Subtitle,
  Title,
  BackLink,
  useEntity,
  Table,
  currencyFormat,
  Form,
  SubmitButton
} from "zzz-react-components"
import "./OnlineBilling.css";

const OnlineBilling = ({
  title,
  partner,
  moveNextStep, 
  movePrevStep,
}) => {
  const [entity, setEntity] = useEntity();

  const checkoutPayment = (bill) => {
    setEntity(draft => {
      draft.bill.origin = entity.origin;
      draft.bill.refno = entity.refno;
      draft.bill.txntype = entity.txntype;
      draft.bill.orgcode = partner.id;
      draft.bill.billtoyear = bill.billtoyear;
      draft.bill.billtoqtr = bill.billtoqtr;
      draft.bill.paidbyaddress = bill.paidbyaddress;
      draft.bill.amount = bill.amount;
      draft.bill.info =  {data: bill};
      draft.bill.particulars = `Wateworks Account No. ${bill.acctno}`;
      return draft;
    });
    moveNextStep();
  }

  return (
    <Form
      onSubmit={checkoutPayment}
      initialEntity={entity.bill}
      render={({values:bill}) => (
        <Card>
          <Title>{title}</Title>
          <Subtitle>Billing Information</Subtitle>
          <Spacer />
          <Panel>
            <Text name="acctno" caption="Account No." readOnly />
            <Text name="acctname" caption="Account Name" readOnly />
            <Text name="address.text" caption="Address" readOnly />
            <Text name="classificationid" caption="Classification" readOnly />
            <Text name="billno" caption="Last Bill Period" readOnly />
            <Panel row>
              <Text name="monthname" caption="Bill Month" readOnly />
              <Text name="year" caption="Bill Year" readOnly />
            </Panel>
            <Panel row>
              <Text name="meter.size.title" caption="Meter Size" readOnly />
              <Text name="consumption.prev.reading" caption="Previous Reading" readOnly />
              <Text name="consumption.reading" caption="Current Reading" readOnly />
              <Text name="consumption.volume" caption="Consumption" readOnly />
            </Panel>
            <Spacer />
            <h4>Bill Details</h4>
            <Table items={bill.items} showPagination={false}>
              <Table.Item expr="item.title" caption="Account" />
              <Table.Item expr="remarks" caption="Particulars" />
              <Table.Item
                expr={item =>  currencyFormat(item.amount)}
                caption="Amount Due"
                type="decimal"
                align="right"
              />
            </Table>
            <Panel className="totalContainer">
              <h4 className="total">TOTAL</h4>
              <h4 className="amount">{currencyFormat(bill.amount)}</h4>
            </Panel>
          </Panel>
          <ActionBar>
            <BackLink caption='Back' action={movePrevStep} />
            <SubmitButton caption='Confirm Payment' disabled={entity.bill.amount === 0} />
          </ActionBar>
          <pre>{JSON.stringify(bill, null, 2)}</pre>
        </Card>
      )} 
    />
  )
}

export default OnlineBilling

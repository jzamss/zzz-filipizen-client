import React, { useState } from 'react'
import {
  Card,
  Panel,
  Text,
  Button,
  SubmitButton,
  Form,
  ActionBar,
  Spacer,
  Service,
  Error,
  Subtitle,
  Title,
  Decimal,
  BackLink,
  useEntity
} from 'zzz-react-components'

import PayOption from '../../components/PayOption'

const OnlineBilling = ({
  title,
  page,
  partner,
  moveNextStep, 
  movePrevStep,
}) => {
  const [entity, setEntity] = useEntity();
  const [error, setError] = useState();
  const [showPayOption, setShowPayOption] = useState(false);

  const getBilling = async (billOptions = {}) => {
    const svc = await Service.lookupAsync(`${partner.id}:OnlineLandTaxBillingService`, "rpt")
    const params = { txntype: entity.txntype, refno: entity.refno, ...billOptions }
    return await svc.invoke("getBilling", params);
  }

  const loadBill = (billOptions = {}) => {
    setError(null);
    getBilling(billOptions).then(bill => {
      setEntity(draft => {draft.bill = bill.info});
    }).catch(err => {
      setError(err.toString());
    })
  }

  const payOptionHandler = (billOption) => {
    setShowPayOption(false)
    loadBill(billOption)
  }

  const checkoutPayment = (bill) => {
    setEntity(draft => {
      draft.bill.origin = entity.origin;
      draft.bill.refno = entity.refno;
      draft.bill.txntype = entity.txntype;
      draft.bill.orgcode = partner.id;
      draft.bill.particulars = `Real Property Tax Payment for TD No. ${bill.tdno} (${bill.billperiod})`;
      draft.bill.info =  {data: bill};
      return draft;
    });
    moveNextStep();
  }

  const visibleContactInfo = !entity.contact.email ? false : entity.contact.email === entity.bill.email;

  return (
    <Card>
      <Title>{title}</Title>
      <Subtitle>{page.caption}</Subtitle>
      <Spacer />
      <Error msg={error} />
      <Form initialEntity={entity.bill} onSubmit={checkoutPayment}>
        <Panel style={{width: 500}}>
          <Text name='billno' caption='Bill No.' readOnly={true} />
          <Text name='billdate' caption='Bill Date' readOnly={true} />
          <Text name='tdno' caption='TD No.' readOnly={true} />
          <Text name='fullpin' caption='PIN' readOnly={true} />
          <Text name='taxpayer.name' caption='Property Owner' readOnly={true} visible={visibleContactInfo} />
          <Text name='taxpayer.address' caption='Owner Address' readOnly={true} visible={visibleContactInfo} />
          <Text name='billperiod' caption='Bill Period' readOnly={true} />
          <Decimal name='amount' caption='Amount Due' readOnly={true} textAlign="left" />
          <ActionBar>
            <BackLink caption='Back' action={movePrevStep} />
            <Panel row>
              <Button caption='Pay Option' action={() => setShowPayOption(true)} variant="outlined" />
              <SubmitButton caption='Confirm Payment' disabled={entity.bill.amount === 0} />
            </Panel>
          </ActionBar>
        </Panel>
      </Form>
      
      <PayOption
        initialEntity={{
            billtoyear: entity.bill.billtoyear,
            billtoqtr: entity.bill.billtoqtr,
            fromyear: entity.bill.fromyear,
            fromqtr: entity.bill.fromqtr,
          }}
        open={showPayOption}
        onAccept={payOptionHandler}
        onCancel={() => setShowPayOption(false)}
      />
    </Card>
  )
}

export default OnlineBilling

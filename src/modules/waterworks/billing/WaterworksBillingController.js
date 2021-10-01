import React from "react";
import { AppContext, PageFlow } from "zzz-react-components";
import { ContactVerification, EPayment, usePartnerFromLocation } from "zzz-filipizen-components";

import InitialInfo from "./InitialInfo";
import OnlineBilling from "./OnlineBilling";

const pages = [
  { name: "verification", caption: "Contact Verification", Component: ContactVerification },
  { name: "initial", caption: "Initial Information", Component: InitialInfo },
  { name: "billing", caption: "Billing Information", Component: OnlineBilling },
  { name: "payment", caption: "Payment", Component: EPayment },
];

const WaterworksBillingController = (props) => {
  const { location } = props;
  const [partner] = usePartnerFromLocation(location);

  return (
    <AppContext
      initialEntity={{
        origin: "filipizen",
        txntype: "waterworks",
        txntypename: "Waterworks",
        refno: null,
        contact: {},
        bill: {},
        po: {},
      }}
    >
      <PageFlow
        title="Waterworks Online Billing"
        partner={partner}
        pages={pages}
        {...props}
      />
    </AppContext>
  );
};

export default WaterworksBillingController;

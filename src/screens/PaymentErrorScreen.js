import React, { useState, useEffect } from "react";
import { Content, useSessionStorage, getUrlParameter, Service } from "zzz-react-components";
import { EPaymentError } from "zzz-filipizen-components";
import LguMasterTemplate from "../templates/LguMasterTemplate";

const PaymentErrorScreen = ({history, ...rest}) => {
  const location = rest.location || window.location;
  const orgcode = getUrlParameter(location, "orgcode");
  const [partner] = useSessionStorage(orgcode);

  const gotoPartnerService = () => {
    if (partner && partner.name) {
      history.replace({
        pathname: `/partner/${partner.name}/services`,
        state: { partner },
      });
    } else {
      history.replace({
        pathname: `/partners`,
        state: { partner },
      });
    }
  };

  return (
    <LguMasterTemplate partner={partner}>
      <Content center>
        <EPaymentError
          onClose={gotoPartnerService}
          partner={partner}
          location={location}
          history={history}
        />
      </Content>
    </LguMasterTemplate>
  );
};

export default PaymentErrorScreen;

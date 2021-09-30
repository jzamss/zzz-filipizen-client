import React from "react";
import { Content, useSessionStorage, getUrlParameter } from "zzz-react-components";
import { EPaymentSuccess } from "zzz-filipizen-components";
import LguMasterTemplate from "../templates/LguMasterTemplate";

const PaymentSuccessScreen = ({history, ...rest}) => {
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
        <EPaymentSuccess
          onClose={gotoPartnerService}
          partner={partner}
          location={location}
          history={history}
        />
      </Content>
    </LguMasterTemplate>
  );
};

export default PaymentSuccessScreen;

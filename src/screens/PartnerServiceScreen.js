import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import LguMasterTemplate from "../templates/LguMasterTemplate";
import { getService, getServiceComponent } from "../modules";
import { PartnerContext, UserContext } from "zzz-filipizen-components";
import { usePartner } from "../hooks";

const PartnerServiceScreen = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [partner, setPartner, isPartnerError] = usePartner(location);
  const [service, setService] = useState();
  const [user, setUser] = useState({ name: "juan" });

  useEffect(() => {
    if (!partner) return;
    const service = getService({ partner, location });
    if (service) {
      setService(service);
    } else {
      history.push("/partners");
    }
  }, [partner]);

  useEffect(() => {
    if (isPartnerError) {
      history.push("/partners");
    }
  }, [isPartnerError, history]);

  if (!partner || !service) return null;

  const ServiceComponent = getServiceComponent(service);
  return (
    <PartnerContext.Provider value={[partner, setPartner]}>
      <UserContext.Provider value={[user, setUser]}>
        <LguMasterTemplate partner={partner}>
          <ServiceComponent {...props} />
        </LguMasterTemplate>
      </UserContext.Provider>
    </PartnerContext.Provider>
  );
};

export default PartnerServiceScreen;

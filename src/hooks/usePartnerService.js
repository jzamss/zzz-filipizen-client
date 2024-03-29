import React, { useState, useEffect } from "react";
import { Service } from "zzz-react-components";
import { getModules } from "../modules";

const getPartnerFromLocation = (location) => {
  return new Promise((resolve, reject) => {
    const pathname = location.pathname;
    const matches = pathname.match("/partner/(.*)_(.*)/services");
    if (!matches || matches.length < 3) {
      reject("Invalid path");
    }

    let groupName = matches[1];
    let partnerName = matches[2];

    const svc = Service.lookup("CloudPartnerService", "partner");
    svc.invoke(
      "findByGroupAndName",
      { groupname: groupName, name: partnerName },
      (err, partner) => {
        if (!err) {
          if (partner.isonline !== "0") {
            resolve(partner);
          } else {
            reject("Partner is offline.");
          }
        } else {
          reject(`Partner ${partnerName} does not exist. ${err}`);
        }
      }
    );
  });
};

const usePartnerService = ({ location }) => {
  const [partner, setPartner] = useState();
  const [modules, setModules] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let partner = location.state ? location.state.partner : null;
    if (partner) {
      setPartner(partner);
      setModules(getModules(partner));
    } else {
      setError(false);
      getPartnerFromLocation(location)
        .then((partner) => {
          setPartner(partner);
          setModules(getModules(partner));
        })
        .catch((err) => setError(true));
    }
  }, [location]);

  return [partner, modules, error];
};

export default usePartnerService;

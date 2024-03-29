/* return partner information from location*/
import { Service } from "zzz-react-components";

export const getPartnerFromLocation = (location) => {
  return new Promise((resolve, reject) => {
    const pathname = location.pathname;
    const tokens = pathname.split("/");
    if (tokens.length < 3) return reject("Invalid path");
    
    const matches = tokens[2].match("(.*)_(.*)");
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

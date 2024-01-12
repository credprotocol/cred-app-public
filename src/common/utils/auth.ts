import axios from "axios";

import { getApiUrl } from "./string";

export const getSignatureMessage = async (address) => {
  return await axios
    .get(getApiUrl({ address, endpoint: "signature/address/" }))
    .then((res) => res.data)
    .then((data) => data.message || "");
};

export const getAuthToken = async ({ address, message, signature }) => {
  const payload = {
    address,
    message,
    signature,
  };
  return await axios
    .post(
      getApiUrl({ address: "", endpoint: "token/jwt/dapp/create/" }),
      JSON.stringify(payload)
    )
    .then((res) => res.data);
};

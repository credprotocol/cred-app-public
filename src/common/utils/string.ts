interface shortenWalletAddressType {
  walletAddress: string;
  beginningLength?: number;
  endLength?: number;
}

export const shortenWalletAddress = ({
  walletAddress,
  beginningLength = 5,
  endLength = 5,
}: shortenWalletAddressType) => {
  const beginning = walletAddress.substring(0, beginningLength);
  const end = walletAddress.substring(
    walletAddress.length - endLength,
    walletAddress.length
  );
  return `${beginning}...${end}`;
};

export const getApiUrl = ({
  address,
  endpoint,
  sandbox = false,
}: {
  address: string;
  endpoint: string;
  sandbox?: boolean;
}) => {
  const url = sandbox
    ? process.env.NEXT_PUBLIC_API_URL + "sandbox/"
    : process.env.NEXT_PUBLIC_API_URL;
  return `${url + endpoint + address}`;
};

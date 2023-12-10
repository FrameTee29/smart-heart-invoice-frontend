export const truncateAddress = (address?: string, length: number = 4) => {
  if (length === 99) {
    return address;
  }
  if (address) {
    const left = address.slice(0, length);
    const right = address.slice(address.length - length, address.length);
    return `${left}...${right}`;
  }
  return "";
};

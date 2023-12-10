import TokenBalance from "./TokenBalance";
import useInvoiceCCIP from "@/hooks/useInvoiceCCIP";

const Dashboard = () => {
  const { data: balanceOfBnM } = useInvoiceCCIP().getBalances("CCIP-BnM");
  const { data: balanceOfLnM } = useInvoiceCCIP().getBalances("CCIP-LnM");

  return (
    <div>
      <section className="space-y-10">
        <div className="flex w-full justify-between">
          {balanceOfBnM?.map((v, bnmIdx) => {
            return (
              <TokenBalance
                key={bnmIdx}
                symbol="CCIP-BnM"
                chainId={v.chainId}
                index={bnmIdx}
                balance={v.balance?.toString() || "0"}
              />
            );
          })}
        </div>

        <div className="flex w-full justify-between">
          {balanceOfLnM?.map((v, lnmIdx) => {
            return (
              <TokenBalance
                key={lnmIdx}
                symbol="CCIP-LnM"
                chainId={v.chainId}
                index={lnmIdx}
                balance={v.balance?.toString() || "0"}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

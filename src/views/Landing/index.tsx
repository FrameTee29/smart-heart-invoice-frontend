import Image from "next/image";
import { useConnectModal } from "@rainbow-me/rainbowkit";

import { Button } from "@/components/ui/button";

const LandingPage = () => {
  const { openConnectModal } = useConnectModal();

  return (
    <div className="flex flex-row w-full min-h-screen items-center relative">
      <div className="flex flex-col md:flex-row items-start justify-around w-full container z-10">
        <section id="content">
          <Image
            src={"/assets/logo.png"}
            width={208}
            height={48}
            alt="smart-heart-invoice-logo"
            priority={true}
          />
          <div className="uppercase text-4xl md:text-8xl font-extrabold mt-12">
            <h1>smart heart</h1>
            <h1>invoice</h1>
          </div>
          <Button
            variant="default"
            size="getStart"
            className="mt-5 shadow-blue-format1"
            onClick={openConnectModal}
          >
            Get Started {">"}
          </Button>
        </section>

        <section id="invoice-pdf">
          <picture>
            <Image
              src={"/assets/landing/pdf_invoice.png"}
              width={377}
              height={533}
              className="shadow-black-format1"
              alt="smart-heart-invoice-pdf"
              priority={true}
            />
          </picture>
        </section>
      </div>

      <Image
        fill
        src={"/assets/landing/line.png"}
        className="absolute"
        alt="line"
        objectFit="contain"
        sizes="100vw"
      />
    </div>
  );
};

export default LandingPage;

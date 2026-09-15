import Image from "next/image";

type CloudPupProps = {
  className?: string;
  compact?: boolean;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function CloudPup({ className = "" }: CloudPupProps) {
  return (
    <Image
      className={className}
      src={`${basePath}/images/cinnamoroll-party.png`}
      width={233}
      height={145}
      sizes="(max-width: 680px) 74vw, 320px"
      alt="Cinnamoroll carrying ice cream and birthday treats"
    />
  );
}
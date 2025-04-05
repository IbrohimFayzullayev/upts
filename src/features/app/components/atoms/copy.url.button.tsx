import { FC, useState } from "react";
import copy from "clipboard-copy";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { useTranslation } from "react-i18next";

type Props = {
  url: string;
};
const CopyUrlButton: FC<Props> = ({ url }) => {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const handleCopyClick = async (url: string) => {
    try {
      await copy(url as string);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } catch (error) {}
  };
  return (
    <button
      onClick={() => handleCopyClick(url)}
      className="cursor-pointer text-gray-500 hover:text-gray-700 flex items-center gap-1"
    >
      {copied ? (
        <>
          <LuCopyCheck className="text-green-500" />
          {t("copied")}
        </>
      ) : (
        <>
          <LuCopy />
          {t("copy_link")}
        </>
      )}
    </button>
  );
};

export default CopyUrlButton;

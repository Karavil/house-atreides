import { cN } from "../../util/style";

const CARD_PADDING = "px-4 py-5 sm:px-6";

export const Card = ({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
}) => (
  <div className="bg-white shadow overflow-hidden rounded-lg w-full">
    <div className={cN(CARD_PADDING, "border-b border-slate-200")}>
      <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
      <p className="max-w-[60ch] mt-1 text-sm text-slate-500">{description}</p>
    </div>
    <div className={cN(CARD_PADDING)}>{children}</div>
  </div>
);

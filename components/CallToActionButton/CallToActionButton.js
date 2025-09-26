import { ButtonLink } from "components/ButtonLink";

export const CallToActionButton = ({
  align = "left",
  buttonLabel,
  destination,
  color,
  url,
  openInNewTab,
  transparency
}) => {
  const alignMap = {
    left: "text-align",
    center: "text-center",
    right: "text-right",
  };
  return (
    <div className={`${alignMap[align]} text-nowrap`}>
      <ButtonLink
        url={url}
        openInNewTab={openInNewTab}
        destination={destination}
        label={buttonLabel}
        color={color}
        transparency={transparency}
      />
    </div>
  );
};

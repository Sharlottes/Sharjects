import type { CustomNextPage } from "../_app";

const TimelineContent: CustomNextPage<React.PropsWithChildren> = ({
  children,
}) => <div style={{ marginLeft: "min(3vw, 20px)" }}>{children}</div>;

TimelineContent.notPage = true;

export default TimelineContent;

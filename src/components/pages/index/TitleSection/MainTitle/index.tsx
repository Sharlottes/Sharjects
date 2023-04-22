import React from "react";
import ProgressiveTypography from "src/components/ProgressiveTypography";
import { MainTitleContainer } from "./styled";

const MainTitle: React.FC = () => (
  <MainTitleContainer>
    <ProgressiveTypography
      variant="h1"
      label="Sharlotte"
      fontWeight="bold"
      fontSize="max(4rem, 10vw)"
    />
  </MainTitleContainer>
);

export default MainTitle;

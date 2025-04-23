const fontGenerator = (
  weight: string,
  size: number,
  lineHeight: number,
  fontFamily: string,
) => `
  font-weight: ${weight};
  font-size: ${size}rem;
  line-height: ${lineHeight}%;
  font-family: ${fontFamily}, -apple-system;
`;

export const Pretendard = {
  LargeTitle: fontGenerator("bold", 2.125, 140, "Pretendard-Regular"),
  Title1: fontGenerator("Bold", 1.75, 140, "Pretendard-Regular"),
  Title2: fontGenerator("bold", 1.5, 140, "Pretendard-Regular"),
  Headline: fontGenerator("Semibold", 1.25, 140, "Pretendard-Regular"),
  Body1: fontGenerator("Medium", 1.125, 150, "Pretendard-Regular"),
  Body2: fontGenerator("Medium", 1, 150, "Pretendard-Regular"),
  Body3: fontGenerator("Medium", 0.875, 150, "Pretendard-Regular"),
  callout: fontGenerator("Regular", 1, 150, "Pretendard-Regular"),
  caption: fontGenerator("Medium", 0.75, 150, "Pretendard-Regular"),
  Bnt1: fontGenerator("Semibold", 1.125, 100, "Pretendard-Regular"),
  Bnt2: fontGenerator("Semibold", 1, 100, "Pretendard-Regular"),
  Bnt3: fontGenerator("Medium", 0.875, 100, "Pretendard-Regular"),
};

export const toArabicNums = (num: string | number): string => {
  if (num === null || num === undefined) return "";

  const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

  return num.toString().replace(/[0-9]/g, (w) => arabicNumbers[parseInt(w)]);
};

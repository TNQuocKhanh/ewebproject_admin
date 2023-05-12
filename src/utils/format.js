export const formatDateTime = (value, isShowTime = true) => {
  const a = new Date(value).toString().split(/\s/);
  if (isShowTime) {
    return (
      a[2] +
      "/" +
      {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12",
      }[a[1]] +
      "/" +
      a[3] +
      " " +
      a[4]
    );
  } else {
    return (
      a[2] +
      "/" +
      {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12",
      }[a[1]] +
      "/" +
      a[3]
    );
  }
};

export const formatPrice = (value) => {
  const result = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
  return result;
};

export const getNow = () => {
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const monthWithOffset = dateNow.getUTCMonth() + 1;
  const month =
    monthWithOffset.toString().length < 2
      ? `0${monthWithOffset}`
      : monthWithOffset;
  const date =
    dateNow.getUTCDate().toString().length < 2
      ? `0${dateNow.getUTCDate()}`
      : dateNow.getUTCDate();

  return `${year}-${month}-${date}`;
};

export const getPreviousNow = () => {
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const monthWithOffset = dateNow.getUTCMonth();
  const month =
    monthWithOffset.toString().length < 2
      ? `0${monthWithOffset}`
      : monthWithOffset;
  const date =
    dateNow.getUTCDate().toString().length < 2
      ? `0${dateNow.getUTCDate()}`
      : dateNow.getUTCDate();

  return `${year}-${month}-${date}`;
}

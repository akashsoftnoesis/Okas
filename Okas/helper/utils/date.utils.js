import moment from "moment";

const dateValue = (date, noDay) => {
  const dateFormat = noDay ? moment(date).format("Do MMMM YYYY") : moment(date).format("dddd, Do MMMM YYYY");
  return dateFormat.replace(/(\d)(st|nd|rd|th)/g, "$1<sup>$2</sup>");
};

export const DisplayDate = (date, noDay) => (
  <a dangerouslySetInnerHTML={{ __html: dateValue(date, noDay) }}></a>
);

export const DisplayFormatDate = (date) => (
  <a
    dangerouslySetInnerHTML={{
      __html: moment(date)
        .format("DD MMMM YYYY")
        .replace(/(\d)(st|nd|rd|th)/g, "$1<sup>$2</sup>"),
    }}
  ></a>
);

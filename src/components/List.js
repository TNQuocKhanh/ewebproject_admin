import React from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { MobileList } from "./MobileList";
import { DefaultList } from "./DefaultList";

export default function List({
  data,
  title,
  columns,
  filter,
  resource,
  isCreate = true,
  isBlock = false,
  dataCsv,
  columnAction = true,
}) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {!isSmall ? (
        <DefaultList
          title={title}
          filter={filter}
          data={data}
          columns={columns}
          resource={resource}
          isCreate={isCreate}
          isBlock={isBlock}
          dataCsv={dataCsv}
          columnAction={columnAction}
        />
      ) : (
        <MobileList
          title={title}
          filter={filter}
          data={data}
          columns={columns}
          resource={resource}
          isCreate={isCreate}
          isBlock={isBlock}
          columnAction={columnAction}
        />
      )}
    </>
  );
}

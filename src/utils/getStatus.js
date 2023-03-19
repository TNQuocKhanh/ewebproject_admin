export const getStatus = (value) => {
  switch (value) {
    case "STATUS_ACTIVE":
      return { text: "Hoạt động", color: "#eaf6f9" };
    case "STATUS_LOGOUT":
      return { text: "Đã đăng xuất", color: "#a2dea7" };
    case "STATUS_BLOCKED":
      return { text: "Đã khoá", color: "#a2dea7" };
    case "STATUS_INITIAL":
      return { text: "Khởi tạo", color: "#a2dea7" };
    case "true":
      return { text: "Hoạt động", color: "#eaf6f9" };
    case "false":
      return { text: "Không hoạt động", color: "#d7d8da" };
    default:
      return { text: "Không xác định", color: "#d7d8da" };
  }
};

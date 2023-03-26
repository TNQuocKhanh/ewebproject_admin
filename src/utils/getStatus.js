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
    case "NEW":
      return { text: "NEW", color: "#eaf6f9" };
    case "PAID":
      return { text: "PAID", color: "#eaf6f9" };
    case "DELIVERED":
      return { text: "DELIVERED", color: "#eaf6f9" };
    case "PROCESSING":
      return { text: "PROCESSING", color: "#eaf6f9" };
    case "PACKAGED":
      return { text: "PACKAGED", color: "#eaf6f9" };
    case "SHIPPING":
      return { text: "SHIPPING", color: "#eaf6f9" };
    default:
      return { text: "Không xác định", color: "#d7d8da" };
  }
};

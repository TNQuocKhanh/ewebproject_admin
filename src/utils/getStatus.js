export const getStatus = (value) => {
  switch (value) {
    case "STATUS_ACTIVE":
      return { text: "Hoạt động", color: "#eaf6f9" };
    case "STATUS_LOGOUT":
      return { text: "Đã đăng xuất", color: "#a2dea7" };
    case "STATUS_BLOCKED":
      return { text: "Đã khoá", color: "#d9534f" };
    case "STATUS_INITIAL":
      return { text: "Khởi tạo", color: "#5cb85c" };
    case "true":
      return { text: "Hoạt động", color: "#eaf6f9" };
    case "false":
      return { text: "Không hoạt động", color: "#d7d8da" };
    case true:
      return { text: "Hoạt động", color: "#eaf6f9" };
    case false:
      return { text: "Không hoạt động", color: "#d7d8da" };
    case "NEW":
      return { text: "Chờ xác nhận", color: "#eaf6f9" };
    case "PAID":
      return { text: "Đã thanh toán", color: "#5bc0de" };
    case "DELIVERED":
      return { text: "Đã giao hàng", color: "##5cb85c" };
    case "PROCESSING":
      return { text: "Đang xử lý", color: "#f0ad4e" };
    case "PACKAGED":
      return { text: "Đang xử lý", color: "#f0ad4e" };
    case "SHIPPING":
      return { text: "Đang giao hàng", color: "#b5b1cd" };
    case "CANCELED":
      return { text: "Đã huỷ", color: "#d9534f" };
    case "REFUND_PENDING":
      return { text: "Đang chờ hoàn tiền", color: "#eaf6f9" };
    default:
      return { text: "Không xác định", color: "#d7d8da" };
  }
};

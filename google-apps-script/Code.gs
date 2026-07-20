const SHEET_NAME = "DangKyQuanTam";

function doPost(e) {
  const sheet = getOrCreateSheet_();
  const data = JSON.parse(e.postData.contents || "{}");
  sheet.appendRow([
    new Date(),
    data.name || "",
    data.phone || "",
    data.email || "",
    data.customerType || "",
    data.interest || "",
    data.message || "",
    data.submittedAt || ""
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: "The Green Seed Form" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "Thời gian",
      "Họ tên",
      "Số điện thoại",
      "Email",
      "Nhóm khách hàng",
      "Nhu cầu",
      "Nội dung",
      "Thời gian từ website"
    ]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

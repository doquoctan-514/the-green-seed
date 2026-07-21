const SHEET_NAME = "DangKyQuanTam";
const HEADERS = [
  "Thời gian",
  "Họ tên",
  "Số điện thoại",
  "Email",
  "Nhóm khách hàng",
  "Nhu cầu",
  "Nội dung",
  "Thời gian từ website",
  "Mã gửi",
  "Sản phẩm",
  "Nguồn CTA",
  "Trang gửi",
  "Trang giới thiệu",
  "UTM Source",
  "UTM Medium",
  "UTM Campaign",
  "UTM Content",
  "UTM Term",
  "Đồng ý dữ liệu"
];

const CUSTOMER_TYPES = ["Cá nhân", "Quán / nhà hàng", "Doanh nghiệp", "Đối tác khác"];
const INTEREST_TYPES = [
  "Quan tâm sản phẩm",
  "Đăng ký trải nghiệm sớm",
  "Đăng ký dùng thử",
  "Liên hệ tư vấn",
  "Hợp tác / phân phối",
  "Yêu cầu về dữ liệu cá nhân"
];

function doPost(e) {
  try {
    const data = parsePayload_(e);
    if (data.website) return respond_({ ok: true });

    const clean = normalizePayload_(data);
    validatePayload_(clean);

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = getOrCreateSheet_();
      if (submissionExists_(sheet, clean.submissionId)) {
        rememberSubmission_(clean.submissionId);
        return respond_({ ok: true, duplicate: true, submissionId: clean.submissionId });
      }

      enforceRateLimit_(clean);
      sheet.appendRow([
        new Date(),
        safeCell_(clean.name),
        safeCell_(clean.phone),
        safeCell_(clean.email),
        safeCell_(clean.customerType),
        safeCell_(clean.interest),
        safeCell_(clean.message),
        safeCell_(clean.submittedAt),
        safeCell_(clean.submissionId),
        safeCell_(clean.product),
        safeCell_(clean.source),
        safeCell_(clean.pageUrl),
        safeCell_(clean.referrer),
        safeCell_(clean.utmSource),
        safeCell_(clean.utmMedium),
        safeCell_(clean.utmCampaign),
        safeCell_(clean.utmContent),
        safeCell_(clean.utmTerm),
        safeCell_(clean.consent)
      ]);
      rememberSubmission_(clean.submissionId);
      rememberRateLimit_(clean);
    } finally {
      lock.releaseLock();
    }

    return respond_({ ok: true, submissionId: clean.submissionId });
  } catch (error) {
    console.error("The Green Seed form error", error);
    return respond_({ ok: false, error: String(error && error.message || error) });
  }
}

function doGet(e) {
  const params = e && e.parameter || {};
  if (params.action === "verify") {
    const submissionId = limit_(params.submissionId, 120);
    const found = submissionId ? isSubmissionRemembered_(submissionId) || submissionExists_(getOrCreateSheet_(), submissionId) : false;
    return respond_({ ok: true, found: found }, params.callback);
  }
  return respond_({ ok: true, service: "The Green Seed Form" }, params.callback);
}

function parsePayload_(e) {
  if (!e) return {};
  const raw = e.postData && e.postData.contents || "";
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (error) {
      // Hỗ trợ form URL-encoded nếu phương thức gửi thay đổi trong tương lai.
    }
  }
  return e.parameter || {};
}

function normalizePayload_(data) {
  const normalizedInterest = data.interest === "Đăng ký dùng thử" ? "Đăng ký trải nghiệm sớm" : data.interest;
  return {
    name: limit_(data.name, 80),
    phone: limit_(data.phone, 20),
    email: limit_(data.email, 120),
    customerType: allow_(data.customerType, CUSTOMER_TYPES, "Cá nhân"),
    interest: allow_(normalizedInterest, INTEREST_TYPES, "Quan tâm sản phẩm"),
    message: limit_(data.message, 1000),
    submittedAt: limit_(data.submittedAt, 40),
    submissionId: limit_(data.submissionId, 120),
    product: limit_(data.product, 40),
    source: limit_(data.source, 80),
    pageUrl: limit_(data.pageUrl, 500),
    referrer: limit_(data.referrer, 500),
    utmSource: limit_(data.utmSource, 160),
    utmMedium: limit_(data.utmMedium, 160),
    utmCampaign: limit_(data.utmCampaign, 200),
    utmContent: limit_(data.utmContent, 200),
    utmTerm: limit_(data.utmTerm, 200),
    consent: data.consent === "yes" ? "yes" : "no",
    website: limit_(data.website, 200)
  };
}

function validatePayload_(data) {
  if (data.name.length < 2) throw new Error("Tên không hợp lệ.");
  const phoneDigits = data.phone.replace(/\D/g, "");
  if (phoneDigits.length < 9 || phoneDigits.length > 12) throw new Error("Số điện thoại không hợp lệ.");
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) throw new Error("Email không hợp lệ.");
  if (!data.submissionId) throw new Error("Thiếu mã gửi.");
  if (data.consent !== "yes") throw new Error("Chưa đồng ý xử lý dữ liệu.");
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.setFrozenRows(1);
  return sheet;
}

function submissionExists_(sheet, submissionId) {
  if (!submissionId || sheet.getLastRow() < 2) return false;
  const idColumn = HEADERS.indexOf("Mã gửi") + 1;
  return Boolean(sheet.getRange(2, idColumn, sheet.getLastRow() - 1, 1)
    .createTextFinder(submissionId)
    .matchEntireCell(true)
    .findNext());
}

function enforceRateLimit_(data) {
  const key = rateKey_(data);
  if (CacheService.getScriptCache().get(key)) {
    throw new Error("Vui lòng chờ trước khi gửi lại.");
  }
}

function rememberRateLimit_(data) {
  CacheService.getScriptCache().put(rateKey_(data), "1", 60);
}

function rateKey_(data) {
  const identity = `${data.phone}|${data.email}`.toLowerCase();
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, identity);
  return "rate:" + Utilities.base64EncodeWebSafe(digest).slice(0, 40);
}

function rememberSubmission_(submissionId) {
  CacheService.getScriptCache().put("submission:" + submissionId, "1", 21600);
}

function isSubmissionRemembered_(submissionId) {
  return CacheService.getScriptCache().get("submission:" + submissionId) === "1";
}

function safeCell_(value) {
  const text = String(value || "").trim();
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function limit_(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function allow_(value, allowed, fallback) {
  const clean = String(value || "").trim();
  return allowed.indexOf(clean) >= 0 ? clean : fallback;
}

function respond_(payload, callback) {
  const json = JSON.stringify(payload);
  const safeCallback = /^[A-Za-z_$][0-9A-Za-z_$.]{0,80}$/.test(callback || "") ? callback : "";
  return ContentService
    .createTextOutput(safeCallback ? `${safeCallback}(${json});` : json)
    .setMimeType(safeCallback ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON);
}

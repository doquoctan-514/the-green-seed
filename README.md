# THE GREEN SEED — Website bản 1

Website tĩnh nhiều trang, thiết kế mobile-first, không dùng framework và không cần cài đặt.

## Xem website trên máy

Cách nhanh:
1. Giải nén thư mục.
2. Mở `index.html`.

Cách nên dùng để tránh lỗi trình duyệt:
```bash
python -m http.server 8080
```
Sau đó mở `http://localhost:8080`.

## Các trang

- `index.html`: Trang chủ
- `san-pham.html`: Sản phẩm và combo dự kiến
- `cong-nghe.html`: Công nghệ / quy trình
- `cau-chuyen.html`: Câu chuyện thương hiệu
- `tac-dong.html`: Tác động bền vững
- `faq.html`: FAQ
- `lien-he.html`: Form quan tâm / dùng thử
- `quyen-rieng-tu.html`: Cách thu thập, sử dụng và xóa dữ liệu đăng ký

## Chỉnh nội dung nhanh

Mở `assets/js/content.js` để sửa:
- Tên thương hiệu / slogan
- Email, SĐT, địa chỉ
- Link Google Apps Script
- Giá sản phẩm

Giá và quy cách trong `content.js` được đồng bộ vào các thẻ có `data-product-index` và `data-combo-index` khi trang tải.

Nội dung dài của từng trang nằm trực tiếp trong file HTML tương ứng.

## Kết nối form với Google Sheet

1. Tạo Google Sheet mới.
2. Vào **Extensions → Apps Script**.
3. Xóa code cũ, dán nội dung trong `google-apps-script/Code.gs`.
4. Chọn **Deploy → New deployment → Web app**.
5. Execute as: Me.
6. Who has access: Anyone.
7. Copy Web app URL.
8. Mở `assets/js/content.js`.
9. Dán URL vào:
```js
googleAppsScriptUrl: "URL_CUA_BAN"
```

Khi URL đang để trống, form chạy ở chế độ demo và chưa lưu dữ liệu.

Sau mỗi lần sửa `google-apps-script/Code.gs`, cần tạo phiên bản triển khai mới trong Apps Script và cập nhật deployment đang dùng. Bản Code.gs hiện tại bổ sung:

- validation phía server
- mã gửi để chống ghi trùng
- honeypot và giới hạn gửi lặp trong 60 giây
- làm sạch dữ liệu có nguy cơ trở thành công thức trong Google Sheet
- xác minh submission bằng JSONP trước khi website hiển thị trạng thái thành công
- lưu nguồn CTA và UTM

Nếu chưa redeploy Apps Script mới, website sẽ giữ dữ liệu trên form và hiển thị trạng thái “chưa xác nhận lưu”, không giả vờ đã lưu thành công.

## Tracking

Website phát các event qua `window.dataLayer` và sự kiện `tgs:analytics`:

- `tgs_page_view`
- `tgs_cta_click`
- `tgs_form_start`
- `tgs_form_submit`
- `tgs_form_submit_success`
- `tgs_form_submit_error`
- `tgs_contact_click`

Chưa có GA4/Meta Pixel ID nên các event mới ở trạng thái sẵn sàng tích hợp, chưa gửi sang nền tảng quảng cáo bên ngoài.

## Chế độ chưa public

Tất cả trang có:
```html
<meta name="robots" content="noindex,nofollow,noarchive">
```

File `robots.txt` cũng đang chặn toàn bộ bot.

Khi sẵn sàng public:
1. Đổi meta robots thành `index,follow`.
2. Xóa dòng `Disallow: /` trong `robots.txt`.
3. Kết nối domain.
4. Thêm ảnh thật, thông tin liên hệ và tài liệu kiểm nghiệm.

## Thay logo

Thay:
- `assets/images/logo-full.png`
- `assets/images/logo-mark.png`
- `assets/images/favicon.png`

Giữ nguyên tên file để không cần sửa code.

## Deploy miễn phí

### Netlify
Kéo toàn bộ thư mục `the-green-seed` vào Netlify Drop.

### Vercel
Import thư mục qua GitHub hoặc dùng Vercel CLI.

## Checklist trước khi gửi link

- Kiểm tra trên điện thoại thật
- Kiểm tra form
- Thay logo designer xuất
- Rà lại giá, quy cách
- Ẩn/xóa ảnh mô phỏng khi đã có ảnh thật
- Điền email và SĐT
- Chỉ công bố đặc tính khi có bằng chứng phù hợp

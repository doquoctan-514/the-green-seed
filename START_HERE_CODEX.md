# CODEX / WORK HANDOFF — THE GREEN SEED

## Mục tiêu

Tiếp tục hoàn thiện website nhiều trang cho thương hiệu **THE GREEN SEED** — màng bọc thực phẩm sinh học từ hạt nhãn.

Deadline mục tiêu: **07:00 ngày 22/07, múi giờ Việt Nam**.

Website này không chỉ để dự thi. Nếu dự án thành công, nó sẽ được public và phát triển thành website thương hiệu thật.

## Trạng thái hiện tại

Source đã có bản V1 bằng HTML/CSS/JavaScript thuần, không dùng framework.

Các trang:
- `index.html`
- `san-pham.html`
- `cong-nghe.html`
- `cau-chuyen.html`
- `tac-dong.html`
- `faq.html`
- `lien-he.html`

Các file chính:
- `assets/css/styles.css`
- `assets/js/content.js`
- `assets/js/site.js`
- `google-apps-script/Code.gs`
- `README.md`

## Yêu cầu bắt buộc

### 1. Mobile-first

Thiết kế và kiểm tra từ màn hình nhỏ trước:
- 360px
- 390px
- 430px

Sau đó kiểm tra:
- tablet 768px
- laptop 1280px
- desktop 1440px

Không được chỉ thu nhỏ layout desktop.

### 2. Hướng UI

Kết hợp:
- Thiên nhiên cao cấp
- Công nghệ xanh, khoa học

Tỷ lệ tham khảo:
- 60% premium organic
- 25% eco technology
- 15% startup innovation

Màu chủ đạo:
- xanh rừng
- xanh lá non
- kem ngà
- nâu hạt nhãn

Tránh:
- giao diện giống poster
- nhét quá nhiều chữ
- gradient lòe loẹt
- animation nặng
- phong cách cửa hàng rau sạch đại trà

### 3. Mục tiêu UX

Ưu tiên theo thứ tự:
1. Người xem hiểu sản phẩm trong 5–10 giây.
2. Hiểu vấn đề và giải pháp.
3. Cảm nhận thương hiệu có tính khoa học, minh bạch và cao cấp.
4. Thực hiện CTA:
   - Đăng ký quan tâm
   - Đăng ký dùng thử
   - Liên hệ tư vấn

Đảm bảo CTA rõ trên mobile, không spam nút.

### 4. Đối tượng chính

- Người tiêu dùng sống xanh
- Quán ăn / nhà hàng / doanh nghiệp F&B

### 5. Trạng thái sản phẩm

- Đã có sản phẩm mẫu thử.
- Chưa bán chính thức.
- Chưa có giấy kiểm nghiệm hoặc chứng nhận công khai.
- Không được viết các đặc tính chưa kiểm nghiệm như sự thật tuyệt đối.

Cách viết phù hợp:
- “Được phát triển theo định hướng phân hủy sinh học.”
- “Hướng tới hạn chế vi nhựa.”
- “Khai thác tiềm năng kháng khuẩn và chống oxy hóa từ nguyên liệu.”
- “Các đặc tính đang trong quá trình hoàn thiện và kiểm nghiệm.”

Không viết:
- “An toàn 100%.”
- “Đã chứng minh kháng khuẩn.”
- “Chắc chắn phân hủy hoàn toàn trong 1–6 tháng.”

### 6. Nội dung thương hiệu

Tên:
**THE GREEN SEED**

Slogan chính:
**Từ hạt nhãn – Vì tương lai xanh**

Thông điệp có thể dùng:
- Dùng rác để thay thế rác.
- Biến phế phẩm thành giải pháp xanh.
- Mỗi cuộn màng bọc là một hành động nhỏ vì một hành tinh xanh.

Sản phẩm:
**Màng bọc thực phẩm sinh học từ hạt nhãn.**

Quy trình công khai ở mức tổng quát:
Hạt nhãn → sơ chế → sấy/nghiền → phối trộn hệ vật liệu sinh học → tạo màng → tối ưu mẫu.

Không công bố:
- tỷ lệ phối trộn
- thông số xử lý
- công thức chi tiết
- bí quyết sản xuất

### 7. Giá và quy cách dự kiến

- Cuộn 200g: 39.000đ — 30cm × 30m
- Cuộn 500g: 79.000đ — 30cm × 80m
- Cuộn 1kg: 129.000đ — 30cm × 150m

Combo:
- 2 cuộn 200g: 70.000đ
- 3 cuộn 500g: 189.000đ
- 2 cuộn 1kg: 237.000đ

Ba quy cách trên đã được nhóm xác nhận ngày 21/07/2026.
Tất cả phải ghi là **giá bán dự kiến**.

### 8. Hình ảnh

Ảnh hiện tại là ảnh mô phỏng / infographic và sẽ được thay bằng ảnh thật sau.

Yêu cầu:
- Tạo component/layout dễ thay ảnh.
- Không phụ thuộc vào chữ nằm trong ảnh.
- Không dùng ảnh poster làm phần nội dung chính trên mobile.
- Tối ưu crop bằng `object-position`.
- Dùng lazy-loading cho ảnh dưới màn hình đầu tiên.
- Không làm tăng dung lượng vô lý.

### 9. Logo

Logo hiện tại đã được nhóm xác nhận là logo chính thức.

Sau này designer sẽ cung cấp:
- logo ngang
- logo dọc
- icon
- PNG nền trong
- SVG
- bản màu
- bản trắng
- bản đơn sắc

Code phải cho phép thay logo mà không phải sửa nhiều file.

### 10. Form

Form cần:
- Họ tên
- Số điện thoại
- Email
- Cá nhân / Quán nhà hàng / Doanh nghiệp
- Quan tâm / Dùng thử / Liên hệ tư vấn / Hợp tác
- Nội dung thêm

Dữ liệu gửi về Google Sheet qua Google Apps Script. URL Apps Script đã được cấu hình trong `assets/js/content.js`.

Chỉ hiển thị thành công sau khi mã gửi được endpoint xác nhận. Nếu deployment Apps Script chưa được cập nhật hoặc không xác minh được, phải giữ dữ liệu trên form và hiển thị trạng thái chưa xác nhận.

### 11. Riêng tư

Hiện website:
- Ai có link đều xem được.
- Không cần mật khẩu.
- Không cho Google index.

Giữ:
- `meta robots=noindex`
- `robots.txt`
- `X-Robots-Tag`

Chỉ bỏ khi người dùng yêu cầu public chính thức.

### 12. Quản lý nội dung

Trước mắt chưa cần CMS.

Ưu tiên:
- gom cấu hình hay thay đổi vào file riêng
- giá, CTA, liên hệ dễ sửa
- code có cấu trúc rõ
- có thể nâng cấp CMS sau

Không tự chuyển sang framework nếu không mang lại lợi ích rõ ràng trước deadline.

## Nhiệm vụ Codex cần làm

1. Đọc toàn bộ repo và `README.md`.
2. Chạy website local.
3. Audit UX/UI trên mobile trước.
4. Sửa lỗi layout, overflow, typography, spacing, contrast và tap target.
5. Kiểm tra menu mobile.
6. Kiểm tra tất cả đường link nội bộ.
7. Kiểm tra form ở chế độ demo.
8. Kiểm tra console không có lỗi.
9. Tối ưu ảnh và hiệu năng cơ bản.
10. Đảm bảo các trang có visual consistency.
11. Không thay đổi claim khoa học thành khẳng định tuyệt đối.
12. Không xóa chế độ noindex.
13. Tạo một báo cáo ngắn:
   - đã sửa gì
   - còn thiếu gì
   - rủi ro trước khi public
14. Dừng lại để người dùng review trước khi thay đổi kiến trúc lớn.

## Tiêu chí hoàn thành

- Không có horizontal scroll ở 360px.
- Menu mobile dùng được bằng touch.
- Nút tối thiểu khoảng 44px.
- Nội dung quan trọng dễ đọc ở 360–430px.
- CTA chính xuất hiện rõ ở hero và cuối trang.
- Website hoạt động khi mở qua local server.
- Không có link chết.
- Không có lỗi console nghiêm trọng.
- Lighthouse mobile ở mức hợp lý cho website tĩnh.
- Các claim chưa kiểm nghiệm được ghi chú minh bạch.
- Source dễ chỉnh sửa tiếp.

## Prompt bắt đầu cho Codex

Đọc file `START_HERE_CODEX.md`, sau đó audit và hoàn thiện repo này theo đúng yêu cầu trong file.

Ưu tiên tuyệt đối mobile-first. Hãy chạy local server, kiểm tra lần lượt ở viewport 360px, 390px, 430px, 768px và 1440px. Tự sửa các lỗi UX/UI, responsive, navigation, form, accessibility cơ bản và performance mà không làm thay đổi thông điệp thương hiệu.

Không đưa website lên public, không xóa noindex, không thêm claim khoa học chưa được kiểm chứng, và không thay đổi kiến trúc lớn nếu chưa hỏi lại.

Sau khi hoàn thành, cung cấp:
1. Danh sách file đã sửa.
2. Tóm tắt thay đổi.
3. Các vấn đề còn thiếu dữ liệu.
4. Checklist trước khi deploy.

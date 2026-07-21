# PROMPT CHO CODEX — THÊM SỐ LIỆU THỊ TRƯỜNG VÀO THE GREEN SEED

Bạn đang làm việc trong repository website THE GREEN SEED.

Đọc trước:
- `the-green-seed-evidence.json`
- `THE_GREEN_SEED_EVIDENCE_PACK.md`
- README/AGENTS và các hướng dẫn hiện có.

## Quy tắc an toàn

1. Xác nhận branch hiện tại; không sửa hoặc push trực tiếp lên `main`.
2. Tạo checkpoint commit trước khi thay đổi.
3. Giữ `noindex`.
4. Không thay giá, quy cách sản phẩm, form hoặc tích hợp Google Sheet.
5. Không tự thêm số liệu ngoài evidence pack.
6. Không biến nghiên cứu của bên thứ ba thành kết quả kiểm nghiệm của sản phẩm.
7. Không diễn đạt phép tính minh họa thành lượng nguyên liệu đã thu gom thực tế.

## Mục tiêu

Cải thiện câu chuyện Problem → Opportunity → Solution trên website bằng dữ liệu có nguồn, visual và motion nhẹ.

## Trang chủ `index.html`

### A. Thêm section “Bài toán cần thay đổi”
Đặt sau hero hoặc sau phần giới thiệu ngắn đầu tiên.

Hiển thị ba stat:
- 3,1 triệu tấn
- Hơn 60%
- Ít nhất 10%

Lấy chính xác label, caveat và source trong `the-green-seed-evidence.json`.

Copy section dùng nội dung tại:
`copy.problem_section`

### B. Thêm section “Nguồn nguyên liệu bị bỏ quên”
Hiển thị:
- 110.000 tấn sản lượng nhãn quý II/2023
- 11,8–17% tỷ lệ khối lượng hạt trong các nghiên cứu
- Phép tính 13.000–18.700 tấn chỉ là “ước tính minh họa”

Không dùng 13.000–18.700 tấn như headline độc lập nếu không có caveat ngay cạnh.

Copy dùng:
`copy.feedstock_section`

### C. Thêm section “Giải pháp đang được phát triển”
Dùng ba card trong:
`copy.solution_section.cards`

Không dùng từ “đã chứng minh”, “100%”, “an toàn tuyệt đối” hoặc “phân hủy trong 30 ngày”.

### D. Thêm section “Tín hiệu từ thị trường”
Hiển thị 54% với wording chính xác:
“người tham gia khảo sát tại Việt Nam…”

Thêm policy timeline ngắn:
- 2026
- Sau 2030

Không viết rằng Việt Nam đã cấm toàn bộ nhựa dùng một lần.

## Trang `tac-dong.html`

Bổ sung dashboard/visual:
- 94% theo số vật phẩm
- 71% theo khối lượng
- hơn 80% đến từ 10 nhóm vật phẩm
- khoảng 33% tái chế của bốn loại nhựa chủ chốt
- 2,2–2,9 tỷ USD giá trị vật liệu mất mỗi năm

Giải thích rõ phạm vi của từng số; không gom chúng thành một kết luận mới.

## Trang `cong-nghe.html`

Thêm section “Nghiên cứu nền tảng”.

Mỗi research card cần:
- tên nghiên cứu
- năm
- tạp chí
- mô tả ngắn
- nút “Xem nghiên cứu”
- disclaimer chung

Disclaimer bắt buộc:
“Các nghiên cứu được trích dẫn là bằng chứng nền tảng về tiềm năng của nguyên liệu hạt nhãn. Chúng không phải kết quả kiểm nghiệm của sản phẩm The Green Seed.”

## Motion và visual

### Count-up
- Chạy một lần khi vào viewport.
- Thời lượng 900–1200 ms.
- Không bounce.
- Không random.
- Giá trị cuối có sẵn trong DOM.
- `prefers-reduced-motion: reduce` hiển thị ngay giá trị cuối.
- Decimal 3,1 phải hiển thị đúng định dạng tiếng Việt.

### Visual
- 3,1 triệu tấn: lưới chấm/lớp tích lũy.
- Hơn 60%: donut hoặc 100 vật phẩm.
- Ít nhất 10%: path từ đất liền ra đường thủy.
- 11,8–17%: mặt cắt quả nhãn.
- 54%: gauge hoặc nhóm người.

Không thêm Three.js hoặc WebGL.
Ưu tiên SVG, CSS và IntersectionObserver.
Nếu project đã dùng GSAP thì có thể tái sử dụng; không thêm dependency chỉ để làm count-up.

## Source UX

Mỗi số liệu phải có:
- nguồn
- năm
- link
- tooltip hoặc note cho caveat

Thêm nút “Xem nguồn dữ liệu” mở panel/modal hoặc dẫn đến khu vực nguồn ở cuối trang.

Link ngoài:
- `target="_blank"`
- `rel="noopener noreferrer"`

## Accessibility

- Không phụ thuộc animation để truyền tải số liệu.
- SVG có `aria-hidden="true"` nếu chỉ trang trí.
- Màu sắc không phải tín hiệu duy nhất.
- Contrast đạt mức đọc được.
- Tooltip dùng được bằng bàn phím.
- Nút/link có focus visible.

## QA

Kiểm tra:
- 360, 390, 430, 768, 1280 và 1440px
- không horizontal overflow
- không lỗi console
- build thành công
- menu/form không hỏng
- nguồn mở đúng
- số không chạy lặp vô hạn
- reduced motion hoạt động
- nội dung claim không vượt evidence pack

Sau khi hoàn tất:
1. Commit theo nhóm thay đổi.
2. Push branch hiện tại.
3. Không merge.
4. Báo file đã sửa.
5. Cung cấp screenshot mobile và desktop.
6. Cung cấp preview URL.

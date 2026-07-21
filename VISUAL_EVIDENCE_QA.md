# Visual & Evidence QA — The Green Seed

## Phạm vi cập nhật

- Bổ sung dữ liệu thị trường có nguồn và ghi rõ phạm vi diễn giải.
- Thêm dữ liệu nội bộ duy nhất đã được nhóm xác nhận: mua 10 kg hạt nhãn cho một đợt thử nghiệm trước.
- Tạo bốn ảnh minh họa riêng để tránh lặp ảnh giữa các dòng sản phẩm và phần công nghệ.
- Sửa lỗi form bị chật, tràn và cắt nội dung ở kích thước laptop/tablet.
- Giữ nguyên `noindex`, mức giá, quy cách sản phẩm và tích hợp biểu mẫu.

## Nguồn dữ liệu đã dùng

- [World Bank — lộ trình giảm nhựa dùng một lần tại Việt Nam](https://www.worldbank.org/vi/news/press-release/2022/07/25/a-roadmap-to-stop-single-use-plastic-pollution-in-vietnam)
- [World Bank — thị trường tuần hoàn nhựa tại Việt Nam](https://www.worldbank.org/en/country/vietnam/publication/market-study-for-vietnam-plastics-circularity-opportunities-and-barriers)
- [PwC Việt Nam — Voice of the Consumer Survey 2024](https://www.pwc.com/vn/vn/publications/vietnam-publications/voice-of-consumer-2024.html)
- [Vietnam Agriculture — sản lượng nhãn quý II/2023](https://vietnamagriculture.nongnghiep.vn/it-takes-30-days-for-lychees-to-reach-us-consumers-d352796.html)
- [Thai Agricultural Research Journal — tỷ lệ hạt của giống nhãn Daw](https://li01.tci-thaijo.org/index.php/thaiagriculturalresearch/article/view/91815)
- [Food Chemistry — nghiên cứu polyphenol từ hạt nhãn](https://doi.org/10.1016/j.foodchem.2009.02.059)
- [PubMed — màng từ tinh bột hạt nhãn và anthocyanin](https://pubmed.ncbi.nlm.nih.gov/37595722/)
- [ACS Food Science & Technology — hệ màng có thành phần từ hạt nhãn](https://pubs.acs.org/doi/10.1021/acsfoodscitech.4c00207)
- [Nghị định 08/2022/NĐ-CP](https://vanban.chinhphu.vn/?classid=1&docid=205092&orggroupid=2&pageid=27160)

Các nghiên cứu khoa học được trình bày như bằng chứng nền tảng về nguyên liệu, không phải kết quả kiểm nghiệm của sản phẩm The Green Seed.

## Prompt ảnh đã dùng

1. `product-200-home.webp`: ảnh sản phẩm editorial chân thực trong bếp gia đình, cuộn nhỏ màu ngà, hộp kraft kem, nhãn và lá nhãn; không claim, chứng nhận, kích thước hoặc watermark.
2. `product-500-cafe.webp`: ảnh quầy chuẩn bị của café/quán nhỏ, cuộn cỡ vừa mở trên hộp kraft thấp; ánh sáng tự nhiên, không claim hoặc chứng nhận.
3. `product-1kg-fnb.webp`: ảnh khu chuẩn bị chuyên nghiệp, cuộn lớn và hộp dài trong bếp F&B; không claim, kích thước hoặc biểu tượng chứng nhận.
4. `research-materials-lab.webp`: ảnh phòng nghiên cứu vật liệu sạch với hạt nhãn, nguyên liệu nghiền, bột và các mẫu màng; không công thức, phép đo hay tuyên bố thử nghiệm.

Ảnh dùng để minh họa định hướng sản phẩm; hình dáng bao bì và mẫu vật liệu cuối cùng vẫn cần được thay bằng ảnh thật khi nhóm chốt thiết kế.

## Kết quả QA

- Viewport đã kiểm tra: 360, 390, 430, 768, 1280 và 1440 px.
- Không phát hiện horizontal overflow.
- Menu mobile mở/đóng đúng trạng thái `aria-expanded` và có thể đóng lại bằng nút.
- Form ở 390, 768 và 1440 px không còn lấn hoặc cắt trường nhập.
- Link và tài nguyên nội bộ đều tồn tại.
- Tám trang HTML vẫn giữ `noindex,nofollow,noarchive`.
- Không có warning hoặc error trong console khi duyệt các trang chính.
- `assets/js/site.js` vượt qua kiểm tra cú pháp Node.

## Screenshot

- `qa/screenshots/landing-390.png`
- `qa/screenshots/evidence-390.png`
- `qa/screenshots/products-390.png`
- `qa/screenshots/form-768.png`
- `qa/screenshots/landing-1440.png`

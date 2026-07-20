(function () {
  const cfg = window.TGS_CONFIG || {};
  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  const icon = (name) => {
    const paths = {
      menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
      close: '<path d="M6 6l12 12M18 6 6 18"/>',
      arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
      leaf: '<path d="M20 4C10 4 4 10 4 20c10 0 16-6 16-16Z"/><path d="M4 20c4-5 8-8 13-11"/>',
      check: '<path d="m5 12 4 4L19 6"/>',
      mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'
    };
    return `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.leaf}</svg>`;
  };

  function renderHeader() {
    const host = document.querySelector("[data-site-header]");
    if (!host) return;
    const links = (cfg.nav || []).map(item => {
      const active = current === item.href.toLowerCase();
      return `<a class="nav-link${active ? " is-active" : ""}" href="${item.href}"${active ? ' aria-current="page"' : ""}>${item.label}</a>`;
    }).join("");

    host.innerHTML = `
      <div class="announcement">
        <div class="container announcement-inner">
          <span>Mẫu thử đang được hoàn thiện</span>
          <a href="lien-he.html#form">Đăng ký quan tâm sớm ${icon("arrow")}</a>
        </div>
      </div>
      <header class="site-header">
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="The Green Seed - Trang chủ">
            <img src="assets/images/logo-mark.png" width="128" height="126" alt="">
            <span class="brand-copy"><strong>THE GREEN SEED</strong><small>Từ hạt nhãn – Vì tương lai xanh</small></span>
          </a>
          <button class="nav-toggle" type="button" aria-label="Mở menu" aria-controls="site-navigation" aria-expanded="false">
            <span class="toggle-open">${icon("menu")}</span>
            <span class="toggle-close">${icon("close")}</span>
          </button>
          <nav class="site-nav" id="site-navigation" aria-label="Điều hướng chính">
            <div class="nav-list">${links}</div>
            <a class="button button-small button-primary nav-cta" href="lien-he.html#form">Đăng ký dùng thử</a>
          </nav>
        </div>
      </header>
    `;

    const toggle = host.querySelector(".nav-toggle");
    const nav = host.querySelector(".site-nav");
    const mobileNav = matchMedia("(max-width: 979px)");
    const navFocusables = () => [toggle, ...nav.querySelectorAll("a")].filter(Boolean);

    const updateNavPosition = () => {
      const header = host.querySelector(".site-header");
      if (!header || !mobileNav.matches) return;
      nav.style.setProperty("--nav-top", `${Math.round(header.getBoundingClientRect().bottom)}px`);
    };

    const setMenuState = (open, restoreFocus = false) => {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
      document.body.classList.toggle("nav-open", open);

      if (open) {
        updateNavPosition();
        nav.querySelector(".nav-link")?.focus();
      } else if (restoreFocus) {
        toggle.focus();
      }
    };

    toggle?.addEventListener("click", () => {
      setMenuState(!nav.classList.contains("is-open"), true);
    });
    nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      setMenuState(false);
    }));

    document.addEventListener("keydown", event => {
      if (!nav.classList.contains("is-open")) return;
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuState(false, true);
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = navFocusables();
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    mobileNav.addEventListener("change", event => {
      if (!event.matches) setMenuState(false);
    });
    addEventListener("resize", () => {
      if (nav.classList.contains("is-open")) updateNavPosition();
    }, { passive: true });
  }

  function renderFooter() {
    const host = document.querySelector("[data-site-footer]");
    if (!host) return;
    const b = cfg.brand || {};
    const contactItems = [
      b.email ? `<a href="mailto:${b.email}">${b.email}</a>` : "",
      b.phone ? `<a href="tel:${String(b.phone).replace(/\s/g,"")}">${b.phone}</a>` : "",
      b.address ? `<span>${b.address}</span>` : ""
    ].filter(Boolean).join("");
    host.innerHTML = `
      <footer class="footer">
        <div class="container footer-grid">
          <div class="footer-brand">
            <a class="footer-logo" href="index.html">
              <span class="footer-mark"><img src="assets/images/logo-mark.png" width="128" height="126" alt="" loading="lazy" decoding="async"></span>
              <span><strong>THE GREEN SEED</strong><small>Từ hạt nhãn – Vì tương lai xanh</small></span>
            </a>
            <p>Biến phụ phẩm nông nghiệp thành giải pháp vật liệu sinh học có giá trị.</p>
          </div>
          <div>
            <h2 class="footer-title">Khám phá</h2>
            <a href="san-pham.html">Sản phẩm</a>
            <a href="cong-nghe.html">Công nghệ</a>
            <a href="cau-chuyen.html">Câu chuyện thương hiệu</a>
            <a href="tac-dong.html">Tác động bền vững</a>
          </div>
          <div>
            <h2 class="footer-title">Hỗ trợ</h2>
            <a href="faq.html">Câu hỏi thường gặp</a>
            <a href="lien-he.html#form">Đăng ký dùng thử</a>
            <a href="lien-he.html">Liên hệ tư vấn</a>
          </div>
          <div>
            <h2 class="footer-title">Liên hệ</h2>
            ${contactItems || '<p class="muted">Thông tin sẽ được cập nhật.</p>'}
          </div>
        </div>
        <div class="container footer-bottom">
          <span>© ${new Date().getFullYear()} The Green Seed.</span>
          <span>Các đặc tính sản phẩm đang trong quá trình hoàn thiện và kiểm nghiệm.</span>
        </div>
      </footer>
    `;
  }

  function initFaq() {
    document.querySelectorAll(".faq-button").forEach((btn, index) => {
      const itemId = `faq-${index + 1}`;
      const panel = btn.closest(".faq-item")?.querySelector(".faq-panel");
      btn.type = "button";
      btn.id = `${itemId}-button`;
      btn.setAttribute("aria-controls", `${itemId}-panel`);
      if (panel) {
        panel.id = `${itemId}-panel`;
        panel.setAttribute("role", "region");
        panel.setAttribute("aria-labelledby", btn.id);
      }
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        const activePanel = item?.querySelector(".faq-panel");
        const open = item?.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", String(Boolean(open)));
        if (activePanel) activePanel.hidden = !open;
      });
    });
  }

  function initReveal() {
    const els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach(el => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => observer.observe(el));
  }

  function restoreHashTarget() {
    if (!location.hash) return;

    let id = location.hash.slice(1);
    try {
      id = decodeURIComponent(id);
    } catch (err) {
      // Keep the raw fragment when it is not valid URI-encoded text.
    }

    const target = document.getElementById(id);
    if (!target) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
    });
  }

  function initForm() {
    const form = document.querySelector("[data-interest-form]");
    if (!form) return;
    const status = form.querySelector("[data-form-status]");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const submit = form.querySelector('button[type="submit"]');
      if (status) {
        status.className = "form-status";
        status.textContent = "";
      }
      const data = Object.fromEntries(new FormData(form).entries());
      data.submittedAt = new Date().toISOString();

      if (!cfg.googleAppsScriptUrl) {
        if (status) {
          status.classList.add("is-demo");
          status.textContent = "Đây là bản demo: thông tin chưa được gửi hoặc lưu. Bạn có thể tiếp tục chỉnh sửa nội dung trong form.";
        }
        return;
      }

      submit.disabled = true;
      submit.textContent = "Đang gửi...";

      try {
        await fetch(cfg.googleAppsScriptUrl, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(data)
        });
        form.reset();
        if (status) {
          status.classList.add("is-success");
          status.textContent = "Yêu cầu đã được gửi đi. The Green Seed sẽ liên hệ sau khi hệ thống xác nhận tiếp nhận thành công.";
        }
      } catch (err) {
        if (status) {
          status.classList.add("is-error");
          status.textContent = "Chưa gửi được. Vui lòng thử lại hoặc liên hệ trực tiếp.";
        }
      } finally {
        submit.disabled = false;
        submit.textContent = "Gửi đăng ký";
      }
    });
  }

  renderHeader();
  renderFooter();
  initFaq();
  initReveal();
  initForm();
  restoreHashTarget();
  addEventListener("hashchange", restoreHashTarget);
})();

(function () {
  const cfg = window.TGS_CONFIG || {};
  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

  const icon = (name) => {
    const paths = {
      menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
      close: '<path d="M6 6l12 12M18 6 6 18"/>',
      arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
      leaf: '<path d="M20 4C10 4 4 10 4 20c10 0 16-6 16-16Z"/><path d="M4 20c4-5 8-8 13-11"/>',
      check: '<path d="m5 12 4 4L19 6"/>',
      mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
      plus: '<path d="M12 5v14M5 12h14"/>',
      tiktok: '<path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>'
    };
    return `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.leaf}</svg>`;
  };

  function renderHeader() {
    const host = document.querySelector("[data-site-header]");
    if (!host) return;
    const b = cfg.brand || {};
    const links = (cfg.nav || []).map(item => {
      const active = current === item.href.toLowerCase();
      return `<a class="nav-link${active ? " is-active" : ""}" href="${item.href}"${active ? ' aria-current="page"' : ""}>${item.label}</a>`;
    }).join("");

    host.innerHTML = `
      <div class="announcement" role="region" aria-label="Thông báo">
        <div class="container announcement-inner">
          <span>Mẫu thử đang được hoàn thiện và kiểm nghiệm</span>
          <a href="lien-he.html?interest=trial&source=announcement#form">Đăng ký trải nghiệm sớm ${icon("arrow")}</a>
        </div>
      </div>
      <header class="site-header">
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="The Green Seed - Trang chủ">
            <img src="assets/images/logo-mark.png" width="128" height="126" alt="">
            <span class="brand-copy"><strong>${b.name || "THE GREEN SEED"}</strong><small>${b.slogan || "Từ hạt nhãn – Vì tương lai xanh"}</small></span>
          </a>
          <button class="nav-toggle" type="button" aria-label="Mở menu" aria-controls="site-navigation" aria-expanded="false">
            <span class="toggle-open">${icon("menu")}</span>
            <span class="toggle-close">${icon("close")}</span>
          </button>
          <nav class="site-nav" id="site-navigation" aria-label="Điều hướng chính">
            <div class="nav-list">${links}</div>
            <a class="button button-small button-primary nav-cta" href="lien-he.html?interest=trial&source=header#form">Đăng ký trải nghiệm sớm</a>
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

    const header = host.querySelector(".site-header");
    let scrollFrame = 0;
    const updateHeaderState = () => {
      scrollFrame = 0;
      header?.classList.toggle("is-scrolled", scrollY > 12);
    };
    addEventListener("scroll", () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(updateHeaderState);
    }, { passive: true });
    updateHeaderState();
  }

  function renderFooter() {
    const host = document.querySelector("[data-site-footer]");
    if (!host) return;
    const b = cfg.brand || {};
    const contactItems = [
      b.email ? `<a href="mailto:${b.email}">${b.email}</a>` : "",
      b.phone ? `<a href="tel:${String(b.phone).replace(/\s/g,"")}">${b.phone}</a>` : "",
      b.tiktok ? `<a href="${b.tiktok}" target="_blank" rel="noopener noreferrer">TikTok @thegreenseedvn</a>` : "",
      b.address ? `<span>${b.address}</span>` : "",
      b.organization ? `<span>${b.organization}</span>` : ""
    ].filter(Boolean).join("");
    host.innerHTML = `
      <footer class="footer">
        <div class="container footer-grid">
          <div class="footer-brand">
            <a class="footer-logo" href="index.html">
              <span class="footer-mark"><img src="assets/images/logo-mark.png" width="128" height="126" alt="" loading="lazy" decoding="async"></span>
              <span><strong>${b.name || "THE GREEN SEED"}</strong><small>${b.slogan || "Từ hạt nhãn – Vì tương lai xanh"}</small></span>
            </a>
            <p>Biến phụ phẩm nông nghiệp thành giải pháp vật liệu sinh học có giá trị.</p>
            $\{b.tiktok ? \<div class=\"footer-social\"><a href=\"\\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"TikTok The Green Seed\">\</a></div>\ : \\\}
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
            <a href="lien-he.html?interest=trial&source=footer#form">Đăng ký trải nghiệm sớm</a>
            <a href="lien-he.html">Liên hệ tư vấn</a>
            <a href="quyen-rieng-tu.html">Quyền riêng tư</a>
          </div>
          <div>
            <h2 class="footer-title">Liên hệ</h2>
            ${contactItems || '<p class="muted">Kênh liên hệ đang được cập nhật.</p>'}
          </div>
        </div>
        <div class="container footer-bottom">
          <span>© ${new Date().getFullYear()} ${b.name || "The Green Seed"}.</span>
          <span>Các đặc tính sản phẩm đang trong quá trình hoàn thiện và kiểm nghiệm.</span>
        </div>
      </footer>
    `;
  }

  function initFaq() {
    document.querySelectorAll(".faq-button").forEach((btn, index) => {
      const itemId = `faq-${index + 1}`;
      const panel = btn.closest(".faq-item")?.querySelector(".faq-panel");
      const indicator = document.createElement("span");
      indicator.className = "faq-icon";
      indicator.setAttribute("aria-hidden", "true");
      indicator.innerHTML = icon("plus");
      btn.append(indicator);
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
        const open = btn.getAttribute("aria-expanded") !== "true";
        item?.classList.toggle("is-open", open);
        btn.setAttribute("aria-expanded", String(open));
        if (!activePanel) return;

        activePanel.getAnimations?.().forEach(animation => animation.cancel());
        if (reducedMotion.matches || !activePanel.animate) {
          activePanel.hidden = !open;
          return;
        }

        activePanel.hidden = false;
        const panelHeight = activePanel.scrollHeight;
        const animation = activePanel.animate(
          open
            ? [
                { height: "0px", opacity: 0, transform: "translateY(-4px)" },
                { height: `${panelHeight}px`, opacity: 1, transform: "translateY(0)" }
              ]
            : [
                { height: `${panelHeight}px`, opacity: 1, transform: "translateY(0)" },
                { height: "0px", opacity: 0, transform: "translateY(-4px)" }
              ],
          {
            duration: open ? 260 : 190,
            easing: "cubic-bezier(.22,1,.36,1)",
            fill: "both"
          }
        );
        animation.addEventListener("finish", () => {
          if (!open && btn.getAttribute("aria-expanded") === "false") {
            activePanel.hidden = true;
          }
          animation.cancel();
        }, { once: true });
      });
    });
  }

  function initReveal() {
    const els = [...document.querySelectorAll("[data-reveal]")];
    if (!els.length) return;
    if (!("IntersectionObserver" in window) || reducedMotion.matches) {
      els.forEach(el => el.classList.add("is-visible"));
      return;
    }

    const staggerGroups = [
      ".stats-grid",
      ".card-grid",
      ".product-grid",
      ".impact-grid",
      ".process-line",
      ".timeline",
      ".faq-list",
      ".steps"
    ];
    document.querySelectorAll(staggerGroups.join(",")).forEach(group => {
      [...group.children].filter(el => el.matches("[data-reveal]")).forEach((el, index) => {
        el.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 60}ms`);
      });
    });
    document.querySelector(".hero-visual[data-reveal]")?.style.setProperty("--reveal-delay", "100ms");
    document.querySelector(".page-hero-grid > :nth-child(2)[data-reveal]")?.style.setProperty("--reveal-delay", "80ms");

    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
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

  function renderConfiguredContent() {
    document.querySelectorAll("[data-product-index]").forEach(card => {
      const product = (cfg.products || [])[Number(card.dataset.productIndex)];
      if (!product) return;
      const values = {
        "[data-product-name]": product.name,
        "[data-product-price]": product.price,
        "[data-product-size]": product.size
      };
      Object.entries(values).forEach(([selector, value]) => {
        const target = card.querySelector(selector);
        if (target) target.textContent = value || "Đang cập nhật";
      });
      const cta = card.querySelector("[data-product-cta]");
      if (cta) {
        cta.href = `lien-he.html?interest=trial&product=${encodeURIComponent(product.id)}&source=product-card#form`;
      }
    });

    document.querySelectorAll("[data-combo-index]").forEach(card => {
      const combo = (cfg.combos || [])[Number(card.dataset.comboIndex)];
      if (!combo) return;
      card.querySelector("[data-combo-name]")?.replaceChildren(combo.name);
      card.querySelector("[data-combo-price]")?.replaceChildren(combo.price);
      card.querySelector("[data-combo-discount]")?.replaceChildren(combo.discount);
      const cta = card.querySelector("[data-combo-cta]");
      if (cta) {
        cta.href = `lien-he.html?interest=trial&product=${encodeURIComponent(combo.id)}&source=combo-card#form`;
      }
    });
  }

  function getAttribution() {
    const params = new URLSearchParams(location.search);
    let stored = {};
    try {
      stored = JSON.parse(sessionStorage.getItem("tgs_attribution") || "{}");
    } catch (err) {
      stored = {};
    }
    const attribution = {
      utmSource: params.get("utm_source") || stored.utmSource || "",
      utmMedium: params.get("utm_medium") || stored.utmMedium || "",
      utmCampaign: params.get("utm_campaign") || stored.utmCampaign || "",
      utmContent: params.get("utm_content") || stored.utmContent || "",
      utmTerm: params.get("utm_term") || stored.utmTerm || ""
    };
    if (Object.values(attribution).some(Boolean)) {
      try {
        sessionStorage.setItem("tgs_attribution", JSON.stringify(attribution));
      } catch (err) {
        // Tracking vẫn hoạt động trong phiên hiện tại nếu storage bị chặn.
      }
    }
    return attribution;
  }

  function trackEvent(name, details = {}) {
    const eventData = {
      event: `tgs_${name}`,
      page_path: location.pathname,
      ...details
    };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventData);
    dispatchEvent(new CustomEvent("tgs:analytics", { detail: eventData }));
  }

  function initTracking() {
    const attribution = getAttribution();
    trackEvent("page_view", attribution);
    document.addEventListener("click", event => {
      const link = event.target.closest("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (href.includes("lien-he.html")) {
        trackEvent("cta_click", {
          cta_text: link.textContent.trim().replace(/\s+/g, " ").slice(0, 80),
          cta_href: href,
          cta_location: link.dataset.trackLocation || link.closest("section")?.className || "shared"
        });
      } else if (href.startsWith("tel:") || href.startsWith("mailto:") || link.hostname.includes("tiktok.com")) {
        const contactType = link.hostname.includes("tiktok.com") ? "tiktok" : href.split(":")[0];
        trackEvent("contact_click", { contact_type: contactType || "social" });
      }
    });
  }

  function verifySubmission(submissionId, timeout = 6500) {
    return new Promise((resolve, reject) => {
      const callback = `__tgsVerify_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const script = document.createElement("script");
      const timer = setTimeout(() => cleanup(() => reject(new Error("verification-timeout"))), timeout);
      const cleanup = done => {
        clearTimeout(timer);
        script.remove();
        try {
          delete window[callback];
        } catch (err) {
          window[callback] = undefined;
        }
        done();
      };
      window[callback] = payload => cleanup(() => resolve(Boolean(payload?.ok && payload?.found)));
      script.onerror = () => cleanup(() => reject(new Error("verification-unavailable")));
      const query = new URLSearchParams({
        action: "verify",
        submissionId,
        callback,
        _: String(Date.now())
      });
      script.src = `${cfg.googleAppsScriptUrl}?${query}`;
      document.head.append(script);
    });
  }

  function initForm() {
    const form = document.querySelector("[data-interest-form]");
    if (!form) return;
    const status = form.querySelector("[data-form-status]");
    const submit = form.querySelector('button[type="submit"]');
    const phone = form.elements.phone;
    const params = new URLSearchParams(location.search);
    const attribution = getAttribution();
    const interestMap = {
      info: "Quan tâm sản phẩm",
      trial: "Đăng ký trải nghiệm sớm",
      consult: "Liên hệ tư vấn",
      partner: "Hợp tác / phân phối",
      privacy: "Yêu cầu về dữ liệu cá nhân"
    };
    const setField = (name, value) => {
      if (form.elements[name]) form.elements[name].value = value || "";
    };
    const applyContext = () => {
      const requestedInterest = interestMap[params.get("interest")];
      if (requestedInterest && form.elements.interest) form.elements.interest.value = requestedInterest;
      setField("product", params.get("product"));
      setField("source", params.get("source") || "direct");
      setField("pageUrl", location.href);
      setField("referrer", document.referrer);
      Object.entries(attribution).forEach(([name, value]) => setField(name, value));
    };
    applyContext();

    if (status) {
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      status.setAttribute("aria-atomic", "true");
    }

    const setStatus = (type, message) => {
      if (!status) return;
      status.className = "form-status";
      if (type) status.classList.add(`is-${type}`);
      status.textContent = message;
    };

    const validatePhone = () => {
      if (!phone) return true;
      const digits = phone.value.replace(/\D/g, "");
      const valid = digits.length >= 9 && digits.length <= 12;
      phone.setCustomValidity(valid || !phone.value ? "" : "Vui lòng nhập số điện thoại từ 9 đến 12 chữ số.");
      return valid;
    };
    phone?.addEventListener("input", validatePhone);

    let formStarted = false;
    form.addEventListener("input", () => {
      if (formStarted) return;
      formStarted = true;
      trackEvent("form_start", { form_name: "interest" });
    }, { once: true });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      setStatus("", "");
      validatePhone();
      if (!form.checkValidity()) {
        form.reportValidity();
        trackEvent("form_submit_error", { form_name: "interest", error_type: "validation" });
        return;
      }

      const data = Object.fromEntries(new FormData(form).entries());
      data.submittedAt = new Date().toISOString();
      data.consent = form.elements.consent?.checked ? "yes" : "no";
      const submissionField = form.elements.submissionId;
      const submissionId = submissionField?.value || (crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`);
      data.submissionId = submissionId;
      if (submissionField) submissionField.value = submissionId;

      if (data.website) {
        setStatus("success", "Cảm ơn bạn. Yêu cầu đã được ghi nhận.");
        return;
      }

      if (!cfg.googleAppsScriptUrl) {
        setStatus("demo", "Đây là bản demo: thông tin chưa được gửi hoặc lưu. Dữ liệu trên form vẫn được giữ lại.");
        return;
      }

      submit.disabled = true;
      submit.classList.add("is-loading");
      submit.setAttribute("aria-busy", "true");
      submit.textContent = "Đang gửi...";
      trackEvent("form_submit", { form_name: "interest", interest: data.interest, product: data.product || "" });

      try {
        await fetch(cfg.googleAppsScriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(data)
        });
        submit.textContent = "Đang xác nhận...";
        let verified = false;
        try {
          verified = await verifySubmission(submissionId);
        } catch (verifyError) {
          verified = false;
        }

        if (verified) {
          form.reset();
          applyContext();
          formStarted = false;
          setStatus("success", "Đã ghi nhận đăng ký. Nhóm sẽ phản hồi qua email hoặc số điện thoại trong 1–3 ngày làm việc. Đăng ký không bắt buộc mua.");
          trackEvent("form_submit_success", { form_name: "interest", interest: data.interest, product: data.product || "" });
        } else {
          setStatus("warning", "Yêu cầu đã được chuyển nhưng website chưa nhận được xác nhận lưu từ hệ thống. Dữ liệu trên form vẫn được giữ lại; vui lòng thử lại sau hoặc chờ nhóm phản hồi trong 1–3 ngày làm việc.");
          trackEvent("form_submit_error", { form_name: "interest", error_type: "unverified" });
        }
      } catch (err) {
        setStatus("error", "Chưa gửi được. Dữ liệu trên form vẫn được giữ lại để bạn thử lại.");
        trackEvent("form_submit_error", { form_name: "interest", error_type: "network" });
      } finally {
        submit.disabled = false;
        submit.classList.remove("is-loading");
        submit.removeAttribute("aria-busy");
        submit.textContent = "Gửi đăng ký";
      }
    });
  }

  renderHeader();
  renderFooter();
  renderConfiguredContent();
  initTracking();
  initFaq();
  initReveal();
  initForm();
  restoreHashTarget();
  addEventListener("hashchange", restoreHashTarget);
})();

// =============================================================
// SCRIPT.JS — Site de Casamento Maria Julia & Luís Francisco
// Módulos:
//   1. Init
//   2. Navbar
//   3. Countdown
//   4. Nossa História (Timeline)
//   5. Galeria + Lightbox
//   6. Cerimônia
//   7. Dress Code
//   8. RSVP
//   9. Presentes + Modal de pagamento
//  10. Mural
//  11. Scroll Reveal
//  12. Smooth Scroll + Nav Ativa
//  13. Footer
// =============================================================

document.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  setupNavbar();
  initCountdown();
  renderHistoria();
  renderGaleria();
  initLightbox();
  setupCerimonia();
  setupDresscode();
  setupRSVP();
  renderPresentes();
  initPixModal();
  renderMural();
  initScrollReveal();
  setupSmoothScroll();
  setupFooter();
}


// ─────────────────────────────────────────────────────────────
// 2. NAVBAR
// ─────────────────────────────────────────────────────────────
function setupNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  // Efeito scroll
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menu hambúrguer
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Fechar menu ao clicar em link
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Fechar menu ao clicar fora
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}


// ─────────────────────────────────────────────────────────────
// 3. COUNTDOWN
// ─────────────────────────────────────────────────────────────
function initCountdown() {
  const alvo    = new Date(CONFIG.dataCasamento).getTime();
  const elDays  = document.getElementById('days');
  const elHours = document.getElementById('hours');
  const elMins  = document.getElementById('minutes');
  const elSecs  = document.getElementById('seconds');

  if (!elDays) return;

  function atualizar() {
    const agora = Date.now();
    const diff  = alvo - agora;

    if (diff <= 0) {
      elDays.textContent  = '000';
      elHours.textContent = '00';
      elMins.textContent  = '00';
      elSecs.textContent  = '00';
      return;
    }

    const dias   = Math.floor(diff / 86400000);
    const horas  = Math.floor((diff % 86400000) / 3600000);
    const minutos= Math.floor((diff % 3600000)  / 60000);
    const segs   = Math.floor((diff % 60000)    / 1000);

    elDays.textContent  = String(dias).padStart(3, '0');
    elHours.textContent = String(horas).padStart(2, '0');
    elMins.textContent  = String(minutos).padStart(2, '0');
    elSecs.textContent  = String(segs).padStart(2, '0');
  }

  atualizar();
  setInterval(atualizar, 1000);
}


// ─────────────────────────────────────────────────────────────
// 4. NOSSA HISTÓRIA — TIMELINE
// ─────────────────────────────────────────────────────────────
function renderHistoria() {
  const container = document.getElementById('timeline');
  if (!container) return;

  container.innerHTML = CONFIG.historia.map((item, i) => `
    <div class="timeline-item reveal" style="transition-delay: ${i * 0.1}s">
      <div class="timeline-texto">
        <p class="timeline-data">${item.data}</p>
        <h3 class="timeline-titulo">${item.titulo}</h3>
        <p class="timeline-desc">${item.texto}</p>
      </div>
      <div class="timeline-dot" aria-hidden="true"></div>
      <div class="timeline-foto">
        <img src="${item.foto}" alt="${item.titulo}" loading="lazy" style="object-position: ${item.foco || 'center'}">
      </div>
    </div>
  `).join('');
}


// ─────────────────────────────────────────────────────────────
// 5. GALERIA + LIGHTBOX
// ─────────────────────────────────────────────────────────────
function renderGaleria() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  grid.innerHTML = CONFIG.galeria.map((img, i) => `
    <div class="gallery-item reveal" role="listitem" style="transition-delay: ${(i % 6) * 0.06}s">
      <img src="${img.src}" alt="${img.alt}" loading="lazy" data-index="${i}">
    </div>
  `).join('');

  grid.querySelectorAll('.gallery-item').forEach((item, i) => {
    item.addEventListener('click', () => abrirLightbox(i));
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrirLightbox(i); }
    });
  });
}

let lightboxIndex = 0;

function initLightbox() {
  const lb       = document.getElementById('lightbox');
  const backdrop = document.getElementById('lightboxBackdrop');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn  = document.getElementById('lightboxPrev');
  const nextBtn  = document.getElementById('lightboxNext');

  if (!lb) return;

  closeBtn.addEventListener('click', fecharLightbox);
  backdrop.addEventListener('click', fecharLightbox);
  prevBtn.addEventListener('click', () => navegarLightbox(-1));
  nextBtn.addEventListener('click', () => navegarLightbox(1));

  document.addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape')      fecharLightbox();
    if (e.key === 'ArrowLeft')   navegarLightbox(-1);
    if (e.key === 'ArrowRight')  navegarLightbox(1);
  });

  // Swipe touch
  let touchX = 0;
  lb.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend',   e => {
    const delta = e.changedTouches[0].clientX - touchX;
    if (Math.abs(delta) > 50) navegarLightbox(delta < 0 ? 1 : -1);
  });
}

function abrirLightbox(index) {
  lightboxIndex = index;
  const lb      = document.getElementById('lightbox');
  const img     = document.getElementById('lightboxImg');
  const counter = document.getElementById('lightboxCounter');
  const total   = CONFIG.galeria.length;

  img.src = CONFIG.galeria[index].src;
  img.alt = CONFIG.galeria[index].alt;
  counter.textContent = `${index + 1} / ${total}`;

  lb.hidden = false;
  document.body.style.overflow = 'hidden';
  document.getElementById('lightboxClose').focus();
}

function fecharLightbox() {
  const lb = document.getElementById('lightbox');
  lb.hidden = true;
  document.body.style.overflow = '';
}

function navegarLightbox(direcao) {
  const total = CONFIG.galeria.length;
  lightboxIndex = (lightboxIndex + direcao + total) % total;
  abrirLightbox(lightboxIndex);
}


// ─────────────────────────────────────────────────────────────
// 6. CERIMÔNIA
// ─────────────────────────────────────────────────────────────
function setupCerimonia() {
  const c = CONFIG.cerimonia;
  const enderecoCompleto = [
    c.endereco,
    c.bairro,
    c.cidade,
    c.cep
  ].filter(Boolean).join('<br>');

  setText('cerimonia-local',    c.local);
  setText('cerimonia-endereco', enderecoCompleto);
  setText('cerimonia-horario',  c.horario);
  setText('cerimonia-obs',      c.observacoes);

  const section = document.getElementById('cerimonia');
  if (section && c.foto) {
    section.style.setProperty('--evento-bg', `url("${c.foto}")`);
  }

  const mapsBtn = document.getElementById('cerimonia-maps');
  if (mapsBtn) mapsBtn.href = c.mapsUrl;

  function setText(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }
}


// ─────────────────────────────────────────────────────────────
// 7. DRESS CODE
// ─────────────────────────────────────────────────────────────
function setupDresscode() {
  const dc = CONFIG.dresscode;

  const titulo    = document.getElementById('dresscode-titulo');
  const descricao = document.getElementById('dresscode-descricao');
  if (titulo)    titulo.textContent    = dc.traje;
  if (descricao) {
    const orientacoes = Array.isArray(dc.orientacoes) ? dc.orientacoes : [];
    descricao.innerHTML = `
      <span class="dresscode-intro">${escapeHtml(dc.descricao)}</span>
      ${orientacoes.map(item => `
        <span class="dresscode-orientacao">
          <strong>${escapeHtml(item.titulo)}:</strong>
          ${escapeHtml(item.texto)}
        </span>
      `).join('')}
    `;
  }

  const containerEvitar= document.getElementById('cores-evitar');

  if (containerEvitar) {
    containerEvitar.innerHTML = dc.coresEvitar.map(cor => `
      <div class="cor-item">
        <div style="position:relative; display:inline-block;">
          <div class="cor-bolinha" style="background:${cor.hex}" title="${cor.nome}"></div>
          <div class="cor-x" style="position:absolute;bottom:-2px;right:-2px">✕</div>
        </div>
        <span class="cor-nome">${cor.nome}</span>
        <span class="cor-motivo">${cor.motivo}</span>
      </div>
    `).join('');
  }
}


// ─────────────────────────────────────────────────────────────
// 8. RSVP
// ─────────────────────────────────────────────────────────────
function setupRSVP() {
  const form        = document.getElementById('rsvpForm');
  const selectAcomp = document.getElementById('rsvp-acompanhantes');
  const containerAc = document.getElementById('acompanhantes-container');
  const inputsAc    = document.getElementById('acompanhantes-inputs');
  const success     = document.getElementById('rsvp-success');
  const errorEl     = document.getElementById('rsvp-error');

  if (!form) return;

  // Renderizar campos de acompanhantes dinamicamente
  selectAcomp.addEventListener('change', () => {
    const n = Math.min(parseInt(selectAcomp.value, 10) || 0, 1);
    containerAc.hidden = n === 0;
    inputsAc.innerHTML = '';

    for (let i = 1; i <= n; i++) {
      const div = document.createElement('div');
      div.className = 'form-group';
      div.innerHTML = `
        <label for="acomp-${i}">Nome do acompanhante</label>
        <input type="text" id="acomp-${i}" name="acompanhante_${i}"
          placeholder="Nome completo do acompanhante" required>
      `;
      inputsAc.appendChild(div);
    }
  });

  // Submit
  form.addEventListener('submit', async e => {
    e.preventDefault();
    mostrarErroRSVP('');

    const nome = document.getElementById('rsvp-nome').value.trim();
    if (!nome) {
      mostrarErroRSVP('Preencha seu nome completo.');
      document.getElementById('rsvp-nome').focus();
      return;
    }

    const telefone = document.getElementById('rsvp-telefone').value.trim();
    if (!telefone) {
      mostrarErroRSVP('Preencha seu telefone/WhatsApp.');
      document.getElementById('rsvp-telefone').focus();
      return;
    }

    const n = Math.min(parseInt(selectAcomp.value, 10) || 0, 1);
    let acompanhante = '';
    for (let i = 1; i <= n; i++) {
      const el = document.getElementById(`acomp-${i}`);
      if (el) acompanhante = el.value.trim();
    }

    if (n === 1 && !acompanhante) {
      mostrarErroRSVP('Preencha o nome do acompanhante.');
      const inputAcompanhante = document.getElementById('acomp-1');
      if (inputAcompanhante) inputAcompanhante.focus();
      return;
    }

    const dados = {
      id:            Date.now(),
      nome,
      telefone,
      acompanhante,
      mensagem:      document.getElementById('rsvp-mensagem').value.trim(),
      dataConfirmacao: new Date().toISOString()
    };

    const endpoint = CONFIG.googleSheets && CONFIG.googleSheets.rsvpEndpoint;
    if (!endpoint) {
      mostrarErroRSVP('A integração com Google Sheets ainda não foi configurada.');
      return;
    }

    try {
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
      }

      await enviarRSVPParaGoogleSheets(endpoint, dados);

      // Manter cópia local como backup do envio.
      const existentes = JSON.parse(localStorage.getItem('rsvp_confirmados') || '[]');
      existentes.push(dados);
      localStorage.setItem('rsvp_confirmados', JSON.stringify(existentes));
      localStorage.setItem('rsvp_ultimo_confirmado', JSON.stringify(dados));

      form.querySelectorAll('.form-group, .form-row, .form-actions').forEach(el => {
        el.style.display = 'none';
      });
      success.hidden = false;
    } catch (error) {
      mostrarErroRSVP('Não foi possível enviar agora. Confira a conexão e tente novamente.');
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Confirmar Presença';
      }
    }
  });

  function mostrarErroRSVP(mensagem) {
    if (!errorEl) return;
    errorEl.textContent = mensagem;
    errorEl.hidden = !mensagem;
  }
}

async function enviarRSVPParaGoogleSheets(endpoint, dados) {
  const payload = {
    nome: dados.nome,
    telefone: dados.telefone,
    acompanhante: dados.acompanhante,
    mensagem: dados.mensagem
  };

  await fetch(endpoint, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload)
  });
}


// ─────────────────────────────────────────────────────────────
// 9. PRESENTES + MODAL DE PAGAMENTO
// ─────────────────────────────────────────────────────────────
const giftCart = new Map();
let currentGiftIntentId = null;
let giftBuyerName = "";

function renderPresentes() {
  const grid = document.getElementById('presentesGrid');
  if (!grid) return;

  grid.innerHTML = CONFIG.presentes.map((p, i) => `
    <article class="presente-card reveal" role="listitem" style="transition-delay: ${(i % 4) * 0.08}s">
      <div class="presente-foto">
        <img src="${p.foto}" alt="${p.nome}" loading="lazy">
        <div class="presente-icone-overlay" aria-hidden="true">${p.icone}</div>
      </div>
      <div class="presente-corpo">
        <h3 class="presente-nome">${p.nome}</h3>
        <p class="presente-desc">${p.descricao}</p>
        <div class="presente-rodape">
          <div class="presente-valor">
            <small>Valor sugerido</small>
            R$ ${p.valor.toLocaleString('pt-BR')}
          </div>
          <button class="btn btn-primary" onclick="abrirPixModal(${p.id})" type="button">
            Presentear
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

function initPixModal() {
  const modal      = document.getElementById('pixModal');
  const backdrop   = document.getElementById('pixModalBackdrop');
  const closeBtn   = document.getElementById('pixModalClose');
  const obrigado   = document.getElementById('pixObrigado');

  if (!modal) return;

  closeBtn.addEventListener('click', fecharPixModal);
  backdrop.addEventListener('click', fecharPixModal);

  document.addEventListener('keydown', e => {
    if (!modal.hidden && e.key === 'Escape') fecharPixModal();
  });

  modal.addEventListener('click', e => {
    const cartButton = e.target.closest('[data-cart-action]');
    if (cartButton) {
      handleCartAction(cartButton.dataset.cartAction, Number(cartButton.dataset.giftId || 0));
      return;
    }

    const copyButton = e.target.closest('[data-copy-payment]');
    if (!copyButton) return;
    copiarTexto(copyButton.dataset.copyPayment, mostrarObrigado);
  });

  function mostrarObrigado() {
    obrigado.hidden    = false;
  }
}

function abrirPixModal(presenteId) {
  const presente = CONFIG.presentes.find(p => p.id === presenteId);
  if (!presente) return;

  const modal = document.getElementById('pixModal');
  addGiftToCart(presenteId);

  document.getElementById('pixObrigado').hidden  = true;
  renderGiftCart();

  modal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function addGiftToCart(presenteId) {
  const current = giftCart.get(presenteId) || 0;
  giftCart.set(presenteId, current + 1);
  currentGiftIntentId = null;
}

function getCartItems() {
  return [...giftCart.entries()]
    .map(([id, quantidade]) => ({
      presente: CONFIG.presentes.find(item => item.id === id),
      quantidade
    }))
    .filter(item => item.presente && item.quantidade > 0);
}

function getCartTotal() {
  return getCartItems().reduce((total, item) => total + item.presente.valor * item.quantidade, 0);
}

function renderGiftCart() {
  const tabs = document.getElementById('paymentTabs');
  const body = document.getElementById('paymentBody');
  if (!tabs || !body) return;

  const items = getCartItems();
  const total = getCartTotal();

  document.getElementById('pixPresenteIcone').textContent = '🧺';
  document.getElementById('pixModalTitle').textContent = 'Carrinho de Presentes';
  document.getElementById('pixPresenteValor').textContent = `Total: R$ ${total.toLocaleString('pt-BR')}`;
  document.getElementById('pixObrigado').hidden = true;

  tabs.innerHTML = '';
  body.innerHTML = `
    <div class="cart-panel">
      <p class="payment-note">Você pode escolher mais de um presente simbólico ou repetir o mesmo presente.</p>
      <div class="cart-items">
        ${items.map(({ presente, quantidade }) => `
          <div class="cart-item">
            <div>
              <strong>${escapeHtml(presente.nome)}</strong>
              <span>R$ ${presente.valor.toLocaleString('pt-BR')} cada</span>
            </div>
            <div class="cart-controls">
              <button type="button" data-cart-action="decrease" data-gift-id="${presente.id}" aria-label="Diminuir quantidade">−</button>
              <span>${quantidade}</span>
              <button type="button" data-cart-action="increase" data-gift-id="${presente.id}" aria-label="Aumentar quantidade">+</button>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="cart-total">
        <span>Total dos presentes</span>
        <strong>R$ ${total.toLocaleString('pt-BR')}</strong>
      </div>
      <div class="cart-actions">
        <button class="btn btn-outline" type="button" data-cart-action="continue">Continuar escolhendo</button>
        <button class="btn btn-primary" type="button" data-cart-action="checkout">Ir para pagamento</button>
      </div>
      <p class="cart-error" id="cart-error" hidden></p>
    </div>
  `;
}

async function handleCartAction(action, giftId) {
  if (action === 'increase') {
    addGiftToCart(giftId);
    renderGiftCart();
    return;
  }

  if (action === 'decrease') {
    const current = giftCart.get(giftId) || 0;
    if (current <= 1) giftCart.delete(giftId);
    else giftCart.set(giftId, current - 1);
    currentGiftIntentId = null;

    if (!giftCart.size) fecharPixModal();
    else renderGiftCart();
    return;
  }

  if (action === 'continue') {
    fecharPixModal();
    return;
  }

  if (action === 'checkout') {
    const comprador = getCompradorSalvo();
    if (!comprador.nome) {
      renderBuyerNameStep();
      return;
    }

    giftBuyerName = comprador.nome;
    await registrarPresentePendente();
    renderPaymentMethods();
    return;
  }

  if (action === 'confirm-buyer') {
    const input = document.getElementById('gift-buyer-name');
    const nome = input ? input.value.trim() : '';
    if (!nome) {
      showCartError('Preencha seu nome para seguir para o pagamento.');
      if (input) input.focus();
      return;
    }

    giftBuyerName = nome;
    localStorage.setItem('presente_nome_comprador', nome);
    await registrarPresentePendente();
    renderPaymentMethods();
    return;
  }

  if (action === 'back-cart') {
    renderGiftCart();
  }
}

function showCartError(message) {
  const error = document.getElementById('cart-error');
  if (!error) return;
  error.textContent = message;
  error.hidden = false;
}

function renderBuyerNameStep() {
  const tabs = document.getElementById('paymentTabs');
  const body = document.getElementById('paymentBody');
  if (!tabs || !body) return;

  tabs.innerHTML = '';
  document.getElementById('pixModalTitle').textContent = 'Identificação';
  document.getElementById('pixPresenteValor').textContent = `Total: R$ ${getCartTotal().toLocaleString('pt-BR')}`;

  body.innerHTML = `
    <div class="cart-panel">
      <p class="payment-note">Informe seu nome para associarmos o presente ao pagamento pendente.</p>
      <div class="form-group">
        <label for="gift-buyer-name">Seu nome</label>
        <input type="text" id="gift-buyer-name" placeholder="Nome completo" autocomplete="name">
      </div>
      <div class="cart-actions">
        <button class="btn btn-outline" type="button" data-cart-action="back-cart">Voltar ao carrinho</button>
        <button class="btn btn-primary" type="button" data-cart-action="confirm-buyer">Continuar para pagamento</button>
      </div>
      <p class="cart-error" id="cart-error" hidden></p>
    </div>
  `;

  setTimeout(() => document.getElementById('gift-buyer-name')?.focus(), 0);
}

async function registrarPresentePendente() {
  if (currentGiftIntentId) return currentGiftIntentId;

  const endpoint = CONFIG.googleSheets && CONFIG.googleSheets.rsvpEndpoint;
  if (!endpoint || !giftCart.size) return null;

  const comprador = getCompradorSalvo();
  const intentId = `gift-${Date.now()}`;
  const nome = giftBuyerName || comprador.nome || localStorage.getItem('presente_nome_comprador') || '';
  const itens = getCartItems().flatMap(({ presente, quantidade }) =>
    Array.from({ length: quantidade }, () => ({
      id: presente.id,
      nomePresente: presente.nome,
      valor: presente.valor
    }))
  );

  const payload = {
    tipo: 'presente',
    id: intentId,
    nome,
    valor: getCartTotal(),
    validacao: 'PENDENTE',
    itens
  };

  await fetch(endpoint, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload)
  });

  currentGiftIntentId = intentId;
  return intentId;
}

function getCompradorSalvo() {
  try {
    const ultimo = JSON.parse(localStorage.getItem('rsvp_ultimo_confirmado') || 'null');
    if (ultimo && ultimo.nome) return ultimo;

    const todos = JSON.parse(localStorage.getItem('rsvp_confirmados') || '[]');
    return todos[todos.length - 1] || {};
  } catch {
    return {};
  }
}

function renderPaymentMethods() {
  const tabs = document.getElementById('paymentTabs');
  const body = document.getElementById('paymentBody');
  if (!tabs || !body) return;

  const total = getCartTotal();
  document.getElementById('pixPresenteIcone').textContent = '💝';
  document.getElementById('pixModalTitle').textContent = 'Forma de Pagamento';
  document.getElementById('pixPresenteValor').textContent = `Total: R$ ${total.toLocaleString('pt-BR')}`;

  const methods = [
    { id: 'pix', label: 'PIX', active: CONFIG.pagamentos?.pix?.ativo, render: () => renderPixPayment() },
    { id: 'ted', label: 'TED', active: CONFIG.pagamentos?.ted?.ativo, render: () => renderTedPayment() }
  ].filter(method => method.active);

  tabs.innerHTML = methods.map((method, index) => `
    <button class="payment-tab ${index === 0 ? 'active' : ''}" type="button" data-payment-method="${method.id}">
      ${method.label}
    </button>
  `).join('');

  const activate = id => {
    const method = methods.find(item => item.id === id) || methods[0];
    tabs.querySelectorAll('.payment-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.paymentMethod === method.id);
    });
    body.innerHTML = method.render();
    if (method.id === 'pix') gerarQrCodePix();
  };

  tabs.onclick = event => {
    const tab = event.target.closest('[data-payment-method]');
    if (tab) activate(tab.dataset.paymentMethod);
  };

  activate(methods[0]?.id);
}

function renderPixPayment() {
  const pix = CONFIG.pagamentos?.pix || CONFIG.pix;
  const total = getCartTotal();
  const pixDinamico = CONFIG.pagamentos?.pixDinamico;

  if (pixDinamico?.ativo && pixDinamico.endpoint) {
    setTimeout(() => criarPixDinamico(), 0);
  }

  return `
    <button class="payment-back" type="button" data-cart-action="back-cart">← Voltar ao carrinho</button>
    <p class="payment-note">Valor total selecionado: <strong>R$ ${total.toLocaleString('pt-BR')}</strong></p>
    <div class="modal-pix-body">
      <div class="pix-qr-side">
        <div class="pix-qr-container" id="pixQRCode" aria-label="QR Code PIX"></div>
        <p class="pix-scan-hint">Escaneie o QR Code com seu banco</p>
      </div>
      <div class="pix-info-side">
        ${renderPaymentField(pixDinamico?.ativo ? 'Pix copia e cola' : 'Chave PIX', pix.chave)}
        ${renderPaymentField('Favorecido', pix.favorecido)}
        ${renderPaymentField('Banco', pix.banco)}
        <button class="btn btn-primary btn-full" type="button" data-copy-payment="${escapeHtml(pix.chave)}" id="copyPixPayment">
          ${pixDinamico?.ativo ? 'Copiar Pix Copia e Cola' : 'Copiar Chave PIX'}
        </button>
        ${pixDinamico?.ativo && !pixDinamico.endpoint ? '<p class="payment-muted">Pix dinâmico ainda sem endpoint configurado.</p>' : ''}
      </div>
    </div>
  `;
}

async function criarPixDinamico() {
  const pixDinamico = CONFIG.pagamentos?.pixDinamico;
  const qrContainer = document.getElementById('pixQRCode');
  const copyButton = document.getElementById('copyPixPayment');
  if (!pixDinamico?.endpoint || !qrContainer || !copyButton) return;

  qrContainer.innerHTML = '<p style="font-size:0.75rem;color:#9E8E82;text-align:center;padding:20px">Gerando PIX...</p>';

  try {
    const response = await fetch(pixDinamico.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        valor: getCartTotal(),
        itens: getCartItems().map(({ presente, quantidade }) => ({
          id: presente.id,
          nome: presente.nome,
          valor: presente.valor,
          quantidade
        }))
      })
    });

    const data = await response.json();
    const payload = data.payload || data.copiaCola || data.pixCopiaECola;
    const image = data.encodedImage || data.qrCodeImage || data.qrCodeBase64;

    if (image) {
      qrContainer.innerHTML = `<img src="${image.startsWith('data:') ? image : `data:image/png;base64,${image}`}" alt="QR Code PIX">`;
    } else if (payload) {
      qrContainer.innerHTML = '';
      new QRCode(qrContainer, {
        text: payload,
        width: 160,
        height: 160,
        colorDark: '#3D3028',
        colorLight: '#FFFFFF',
        correctLevel: QRCode.CorrectLevel.M
      });
    }

    if (payload) {
      const value = document.querySelector('.pix-field-value');
      if (value) value.textContent = payload;
      copyButton.dataset.copyPayment = payload;
    }
  } catch (error) {
    qrContainer.innerHTML = '<p style="font-size:0.75rem;color:#9E8E82;text-align:center;padding:20px">Não foi possível gerar o PIX dinâmico.</p>';
  }
}

function gerarQrCodePix() {
  const pix = CONFIG.pagamentos?.pix || CONFIG.pix;
  const qrContainer = document.getElementById('pixQRCode');
  if (!qrContainer) return;
  qrContainer.innerHTML = '';
  try {
    new QRCode(qrContainer, {
      text:        pix.chave,
      width:       160,
      height:      160,
      colorDark:   '#3D3028',
      colorLight:  '#FFFFFF',
      correctLevel: QRCode.CorrectLevel.M
    });
  } catch (err) {
    qrContainer.innerHTML =
      `<p style="font-size:0.75rem;color:#9E8E82;text-align:center;padding:20px">QR Code<br>${pix.chave}</p>`;
  }
}

function renderTedPayment() {
  const ted = CONFIG.pagamentos.ted;
  const total = getCartTotal();
  const dados = [
    `Valor: R$ ${total.toLocaleString('pt-BR')}`,
    `Favorecido: ${ted.favorecido}`,
    `Banco: ${ted.banco}`,
    `Agência: ${ted.agencia}`,
    `Conta: ${ted.conta}`,
    `Tipo: ${ted.tipoConta}`,
    `CPF/CNPJ: ${ted.cpfCnpj}`
  ].join('\n');

  return `
    <div class="payment-panel">
      <button class="payment-back" type="button" data-cart-action="back-cart">← Voltar ao carrinho</button>
      <p class="payment-note">Valor total selecionado: <strong>R$ ${total.toLocaleString('pt-BR')}</strong>. Use estes dados para TED ou transferência bancária.</p>
      ${renderPaymentField('Favorecido', ted.favorecido)}
      ${renderPaymentField('Banco', ted.banco)}
      ${renderPaymentField('Agência', ted.agencia)}
      ${renderPaymentField('Conta', ted.conta)}
      ${renderPaymentField('Tipo de conta', ted.tipoConta)}
      ${renderPaymentField('CPF/CNPJ', ted.cpfCnpj)}
      <button class="btn btn-primary btn-full" type="button" data-copy-payment="${escapeHtml(dados)}">
        Copiar Dados Bancários
      </button>
    </div>
  `;
}

function renderPaymentField(label, value) {
  return `
    <div class="pix-field">
      <span class="pix-field-label">${label}</span>
      <span class="pix-field-value">${escapeHtml(value || '')}</span>
    </div>
  `;
}

function fecharPixModal() {
  const modal = document.getElementById('pixModal');
  modal.hidden = true;
  document.body.style.overflow = '';
}

function copiarTexto(texto, onSuccess) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(texto).then(onSuccess);
    return;
  }

  const tmp = document.createElement('textarea');
  tmp.value = texto;
  tmp.style.cssText = 'position:fixed;top:-9999px';
  document.body.appendChild(tmp);
  tmp.select();
  try { document.execCommand('copy'); onSuccess(); } catch {}
  document.body.removeChild(tmp);
}


// ─────────────────────────────────────────────────────────────
// 10. MURAL
// ─────────────────────────────────────────────────────────────
function renderMural() {
  const grid = document.getElementById('muralGrid');
  if (!grid) return;

  if (!CONFIG.mural.length) {
    grid.innerHTML = `
      <div class="mural-empty reveal">
        <p>Nenhuma foto enviada ainda.</p>
        <span>Depois da celebração, este espaço será preenchido com registros dos convidados.</span>
      </div>
    `;
    return;
  }

  grid.innerHTML = CONFIG.mural.map((src, i) => `
    <div class="mural-item reveal" role="listitem" style="transition-delay: ${(i % 4) * 0.07}s">
      <img src="${src}" alt="Foto do mural ${i + 1}" loading="lazy">
    </div>
  `).join('');
}


// ─────────────────────────────────────────────────────────────
// 12. SCROLL REVEAL
// ─────────────────────────────────────────────────────────────
function initScrollReveal() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  // Observar todos os elementos reveal após renderizar o conteúdo dinâmico
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }, 50);
}


// ─────────────────────────────────────────────────────────────
// 13. SMOOTH SCROLL + NAV ATIVA
// ─────────────────────────────────────────────────────────────
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const alvo = document.querySelector(href);
      if (!alvo) return;
      e.preventDefault();
      const offset = document.getElementById('navbar')?.offsetHeight || 70;
      const top    = alvo.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Marcar seção ativa no scroll
  const secoes  = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link:not(.nav-cta)');

  const ioNav = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.35 });

  secoes.forEach(s => ioNav.observe(s));
}


// ─────────────────────────────────────────────────────────────
// 14. FOOTER
// ─────────────────────────────────────────────────────────────
function setupFooter() {
  const wa = document.getElementById('footer-whatsapp');
  if (wa && CONFIG.social.whatsapp)  wa.href = CONFIG.social.whatsapp;
}


// ─────────────────────────────────────────────────────────────
// UTILITÁRIO: escapeHtml (evitar HTML inseguro em conteúdo dinâmico)
// ─────────────────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#39;');
}


// ─────────────────────────────────────────────────────────────
// PONTO DE EXTENSÃO — Futuros gateways de pagamento
// Para integrar Mercado Pago, Stripe, PagSeguro, etc.,
// substitua a função abrirPixModal por uma que chame a API
// do gateway escolhido e renderize o checkout no modal.
//
// Exemplo:
// async function abrirGateway(presenteId) {
//   const response = await fetch('/api/create-payment', {
//     method: 'POST',
//     body: JSON.stringify({ presenteId, gateway: CONFIG.paymentGateway.provider })
//   });
//   const { checkoutUrl } = await response.json();
//   window.open(checkoutUrl, '_blank');
// }
// ─────────────────────────────────────────────────────────────

# Maria Julia & Luís Francisco — Site de Casamento

Site elegante e responsivo para casamento, construído em HTML, CSS e JavaScript puro.

## Estrutura de Arquivos

```
/casamento
├── index.html          — Estrutura principal do site
├── style.css           — Estilos (variáveis, layout, animações)
├── script.js           — Lógica interativa (countdown, galeria, RSVP, PIX)
├── config.js           — ⚙️  EDITE AQUI todas as configurações
└── assets/
    ├── imagens/        — Fotos do casal, hero, galeria
    ├── icones/         — Ícones SVG personalizados
    └── fonts/          — Fontes locais (opcional)
```

## Como Personalizar

### 1. Editar `config.js`

Todas as informações editáveis estão em `config.js`:

| Campo | Descrição |
|-------|-----------|
| `noivos` | Nomes e monograma |
| `dataCasamento` | Data/hora do casamento (formato ISO) |
| `cerimonia` | Local, endereço, horário e link Google Maps |
| `festa` | Local, horário e observações da festa |
| `pix` | Chave PIX, favorecido e banco |
| `social.instagram` | Link do Instagram |
| `social.whatsapp` | Link do WhatsApp |
| `dresscode` | Traje, descrição, cores |
| `historia` | Itens da timeline (título, data, texto, foto) |
| `galeria` | Array de fotos para a galeria |
| `presentes` | Lista de presentes (nome, descrição, valor, foto) |

### 2. Trocar a foto do Hero

No `style.css`, localize o seletor `.hero` e substitua a URL:

```css
.hero {
  background-image:
    linear-gradient(...),
    url('assets/imagens/hero.jpg'); /* ← sua foto aqui */
}
```

### 3. Adicionar fotos à galeria

Coloque as fotos em `assets/imagens/` e atualize o array `CONFIG.galeria` em `config.js`:

```js
galeria: [
  { src: "assets/imagens/foto1.jpg", alt: "Descrição" },
  { src: "assets/imagens/foto2.jpg", alt: "Descrição" },
  // ...
]
```

### 4. Configurar o PIX

Em `config.js`, preencha:

```js
pix: {
  chave:      "sua-chave-pix",     // CPF, CNPJ, e-mail, celular ou chave aleatória
  favorecido: "Nome Completo",
  banco:      "Nome do Banco"
}
```

O QR Code é gerado automaticamente a partir da chave PIX.

## Seções do Site

| # | Seção | Descrição |
|---|-------|-----------|
| 1 | Hero | Foto de fundo, monograma, nomes, contador regressivo |
| 2 | Nossa História | Timeline com fotos e textos editáveis |
| 3 | Galeria | Grid responsivo com lightbox |
| 4 | Cerimônia & Festa | Cards com informações dos eventos |
| 5 | Dress Code | Traje sugerido com paleta de cores |
| 6 | RSVP | Formulário com localStorage |
| 7 | Presentes | Lista de presentes com pagamento direto via PIX |
| 8 | Mensagens | Recado dos convidados com localStorage |
| 9 | Mural | Espaço para fotos dos convidados |
| 10 | Rodapé | Redes sociais e créditos |

## Dados Locais

- **Confirmações (RSVP)**: salvas em `localStorage` com a chave `rsvp_confirmados`
- **Mensagens**: salvas em `localStorage` com a chave `mensagens_noivos`
- Para exportar, abra o console do navegador e execute:
  ```js
  JSON.parse(localStorage.getItem('rsvp_confirmados'))
  ```

## Integração com Backend (futuro)

O código está estruturado para suportar integração com:

- **RSVP**: substituir o `localStorage` por um `fetch()` para sua API
- **Mensagens**: conectar com Firebase Firestore ou backend Python/Node
- **Pagamentos**: substituir o modal PIX pela API do gateway escolhido
  - Mercado Pago, Stripe, PagSeguro, Asaas, OpenPix
  - Ver comentário no final de `script.js` para o padrão de extensão

## Fontes Utilizadas

- **Cormorant Garamond** (títulos) — Google Fonts
- **Josefin Sans** (texto) — Google Fonts
- **Great Vibes** (decorativo/script) — Google Fonts

## Dependências CDN

- [QRCodeJS](https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js) — geração do QR Code PIX

---

Feito com amor ❤️ para Maria Julia & Luís Francisco

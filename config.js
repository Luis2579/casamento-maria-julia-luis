// =============================================================
// CONFIG.JS — Configurações editáveis do site de casamento
// Edite este arquivo para personalizar todas as informações
// =============================================================

const CONFIG = {

  noivos: {
    nome1: "Maria Julia",
    nome2: "Luís Francisco",
    nomesCompletos: "Maria Julia & Luís Francisco",
    monograma: "MJ & LF"
  },

  // Formato: "YYYY-MM-DDTHH:MM:SS"
  dataCasamento: "2028-10-07T17:00:00",

  cerimonia: {
    local: "Águas da Prata",
    endereco: "Rua Soldado Antônio da Silveira, 28",
    bairro: "Rio da Prata - Campo Grande",
    cidade: "Rio de Janeiro - RJ",
    cep: "23017-454",
    horario: "17h00",
    observacoes: "Cerimônia e festa acontecerão no mesmo local.",
    foto: "assets/imagens/aguas-da-prata.jpeg",
    mapsUrl: "https://www.google.com/maps/place/%C3%81guas+da+Prata+Eventos/@-22.9246085,-43.5169632,17z/data=!3m1!4b1!4m6!3m5!1s0x9be0d2c4a93faf:0xb02e4075e0441053!8m2!3d-22.9246085!4d-43.5143883!16s%2Fg%2F11cp7g01rk?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D"
  },

  festa: {
    local: "Águas da Prata",
    horario: "Após a cerimônia",
    observacoes: "A recepção será realizada no mesmo endereço da cerimônia."
  },

  // Dados para o pagamento via PIX
  pix: {
    chave: "11999999999",
    favorecido: "Maria Julia Souza",
    banco: "Nubank"
  },

  pagamentos: {
    pix: {
      ativo: true,
      chave: "11999999999",
      favorecido: "Maria Julia Souza",
      banco: "Nubank"
    },
    ted: {
      ativo: true,
      favorecido: "Maria Julia Souza",
      banco: "Nubank",
      agencia: "0001",
      conta: "00000000-0",
      tipoConta: "Conta corrente",
      cpfCnpj: "000.000.000-00"
    },
    pixDinamico: {
      ativo: false,
      endpoint: ""
    }
  },

  // Links das redes sociais
  social: {
    whatsapp: "https://wa.me/5521991438242"
  },

  // Cole aqui a URL do Web App do Google Apps Script para gravar o RSVP na planilha.
  googleSheets: {
    rsvpEndpoint: "https://script.google.com/macros/s/AKfycbwqpf-TuLI_8nGWV4WF0RX4xH-M1xf-rnN9M-ls8spWlkf0aa_EoB4vKwgGYC3XoXAksw/exec"
  },

  dresscode: {
    traje: "Esporte Fino",
    descricao: "Sonhamos com uma celebração elegante, acolhedora e repleta de boas lembranças. Para criar essa atmosfera especial, convidamos você a prestigiar nosso casamento com traje esporte fino, priorizando peças sofisticadas e confortáveis.",
    orientacoes: [
      {
        titulo: "Homens",
        texto: "Camisa social e calça de alfaiataria, com blazer ou terno opcional. Gravata opcional."
      },
      {
        titulo: "Mulheres",
        texto: "Vestidos midi ou longos, macacões ou conjuntos elegantes."
      }
    ],
    coresEvitar: [
      { nome: "Branco Total", hex: "#FFFFFF", motivo: "Reservado à noiva" },
      { nome: "Amarelo", hex: "#E8C45C", motivo: "Cor destinada às madrinhas" },
      { nome: "Azul", hex: "#4D6F9F", motivo: "Cor destinada aos padrinhos" },
      { nome: "Roxo", hex: "#8B63A8", motivo: "Reservado às daminhas" }
    ]
  },

  historia: [
    {
      titulo: "Primeira Interação",
      data: "17 Agosto, 2022",
      texto: "Tudo começou em um dia aparentemente comum, daqueles que não dão nenhum sinal de que podem mudar uma vida inteira. Francisco havia ido à academia apenas para acompanhar seu amigo Bernardo, que treinaria após a faculdade. Como não pretendia treinar naquele dia, estava vestido de forma simples, usando uma calça jeans e uma camiseta básica. Já Maju seguia sua rotina habitual e estava focada em seu treino de pernas, vestida com roupas apropriadas para a academia. Em determinado momento, enquanto realizava seus exercícios, ela avistou Francisco ao longe treinando com o amigo e decidiu se aproximar. Foi então que aconteceu o primeiro encontro entre os dois, uma conversa simples e despretensiosa que marcou a primeira vez em que Maju e Francisco se conheceram. Naquele instante, nenhum dos dois imaginava tudo o que ainda estava por vir. Embora aquele tenha sido o começo de tudo, ainda não era o momento em que a história deles realmente iria começar. O destino ainda preparava alguns capítulos antes que seus caminhos se cruzassem de forma definitiva.",
      foto: "assets/imagens/historia/01-primeira-interacao.jpg",
      foco: "center 24%"
    },
    {
      titulo: "Primeiro Beijo & Primeiro Encontro",
      data: "24 Setembro, 2022",
      texto: "Algum tempo após a primeira interação entre eles, Maju estava a caminho de uma festa com uma amiga e outras pessoas quando recebeu a notícia de que fariam uma parada para dar carona a um amigo antes de seguirem para o evento. Quando esse amigo entrou no carro, ela teve uma surpresa: era Francisco, o cara de jeans da academia que já havia chamado sua atenção. Durante o trajeto, os dois trocaram olhares discretos, mas cheios de interesse, criando uma conexão que parecia cada vez mais evidente. Determinada e sem vontade de deixar aquela oportunidade passar, ela resolveu tomar a iniciativa e foi ao encontro dele. Surpreso com sua coragem e espontaneidade, Francisco finalmente se permitiu viver aquele momento, e os dois ficaram juntos pela primeira vez. Foi naquela noite que aconteceu o primeiro beijo do casal e, desde então, eles nunca mais se desgrudaram. Algumas semanas depois, tiveram o primeiro encontro oficial no Restaurante Na Colônia Trattoria. Em meio a conversas, risadas e a certeza de que algo especial estava nascendo, perceberam que queriam continuar escrevendo aquela história lado a lado. Foi ali que decidiram que não queriam mais se separar e que estavam prontos para viver tudo o que o futuro lhes reservava. E foi assim que começou a linda história de amor de Maju e Francisco.",
      foto: "assets/imagens/historia/02-primeiro-beijo-encontro.jpg"
    },
    {
      titulo: "Pedido de Namoro",
      data: "07 Outubro, 2022",
      texto: "Semanas após o primeiro encontro, o casal percebeu que o sentimento entre eles crescia a cada dia e decidiu que era hora de dar o primeiro grande passo na construção da sua história. Juntos, planejaram o pedido de namoro e escolheram os anéis que simbolizariam o início daquela nova fase. No entanto, Francisco fez questão de guardar para si a escolha do momento e do local onde faria o pedido oficial. E assim aconteceu. Diante do chafariz do Shopping Downtown, em um momento repleto de emoção e significado, ele declarou que a vida sozinho já não fazia mais sentido e perguntou se Maju aceitava ser sua namorada. Com o coração transbordando felicidade e sem hesitar, ela respondeu o primeiro e inesquecível sim, dando início a uma linda história de amor que continuaria crescendo e se fortalecendo a cada novo capítulo.",
      foto: "assets/imagens/historia/03-pedido-namoro.jpg"
    },
    {
      titulo: "Pedido de Casamento",
      data: "20 Novembro, 2023",
      texto: "Após um ano de namoro, iria ocorrer o show da Taylor Swift, de quem Maju é superfã, e Francisco viu uma oportunidade de pedi-la em casamento durante a música Love Story. Ele preparou tudo em complô com Ana Clara, irmã da noiva, para fazer uma surpresa. Quando chegou a data prevista para o show, ele foi cancelado, mas Francisco se manteve firme na decisão. Com o show remarcado, conseguiram ingresso para que Ana Clara pudesse estar presente. Depois de sete músicas, ele aguardava ansiosamente, prestando atenção para pedir no momento certo enquanto ela nem desconfiava. Então, durante o clímax da música, ele se ajoelhou e disse que a amava, que queria passar o resto da vida com ela, e perguntou se ela aceitava se casar com ele. Em meio às lágrimas, ela prontamente disse sim.",
      foto: "assets/imagens/historia/04-pedido-casamento.jpg",
      foco: "center 22%"
    },
    {
      titulo: "O Grande Dia",
      data: "07 Outubro, 2028",
      texto: "Depois de muito planejamento, organização e inúmeros sonhos compartilhados, o casal decidiu que queria tornar seu casamento ainda mais especial, escolhendo para esse momento único o mesmo dia em que completam seis anos juntos. Seis anos desde o primeiro sim, aquele que marcou o início de uma linda história construída com amor, cumplicidade, respeito e parceria. Ao longo dessa trajetória, viveram momentos inesquecíveis, superaram desafios, celebraram conquistas e fortaleceram, dia após dia, os laços que os unem. Por isso, a escolha dessa data carrega um significado profundo: ela simboliza não apenas a celebração de tudo o que viveram até aqui, mas também a renovação da promessa de continuarem caminhando lado a lado. No mesmo dia em que deram o primeiro passo rumo a essa história de amor, decidiram dar um novo e ainda mais importante passo, encerrando um capítulo repleto de memórias, aprendizados e felicidade para iniciar um novo e lindo capítulo, agora como marido e mulher.",
      foto: "assets/imagens/historia/05-grande-dia.jpg",
      foco: "center 18%"
    }
  ],

  galeria: [
    { src: "assets/imagens/galeria/foto-01.jpg", alt: "Foto da galeria 1" },
    { src: "assets/imagens/galeria/foto-02.jpg", alt: "Foto da galeria 2" },
    { src: "assets/imagens/galeria/foto-03.jpg", alt: "Foto da galeria 3" },
    { src: "assets/imagens/galeria/foto-04.jpg", alt: "Foto da galeria 4" },
    { src: "assets/imagens/galeria/foto-05.jpg", alt: "Foto da galeria 5" },
    { src: "assets/imagens/galeria/foto-06.jpg", alt: "Foto da galeria 6" },
    { src: "assets/imagens/galeria/foto-07.jpg", alt: "Foto da galeria 7" },
    { src: "assets/imagens/galeria/foto-08.jpg", alt: "Foto da galeria 8" },
    { src: "assets/imagens/galeria/foto-09.jpg", alt: "Foto da galeria 9" },
    { src: "assets/imagens/galeria/foto-10.jpg", alt: "Foto da galeria 10" },
    { src: "assets/imagens/galeria/foto-11.jpg", alt: "Foto da galeria 11" },
    { src: "assets/imagens/galeria/foto-12.jpg", alt: "Foto da galeria 12" }
  ],

  presentes: [
    {
      id: 1,
      nome: "Jantar em um restaurante de três estrelas Michelin",
      descricao: "Uma experiência gastronômica inesquecível para os noivos celebrarem com muito sabor.",
      valor: 500,
      foto: "assets/imagens/presentes/01-jantar-michelin.png",
      icone: "🍽️"
    },
    {
      id: 2,
      nome: "Academia para os noivos entrarem em forma depois da lua de mel",
      descricao: "Uma forcinha simbólica para o casal voltar da lua de mel com motivação para treinar.",
      valor: 420,
      foto: "assets/imagens/presentes/02-academia.jpg",
      icone: "🏋️"
    },
    {
      id: 3,
      nome: "Acessórios de limpeza para limpar os pelos do cachorro",
      descricao: "Porque o amor também mora nos detalhes, inclusive nos pelos espalhados pela casa.",
      valor: 45,
      foto: "assets/imagens/presentes/03-limpeza-pelos-cachorro.jpg",
      icone: "🧹"
    },
    {
      id: 4,
      nome: "Passe para obrigar a noiva a ir em mais jogos do Vasco",
      descricao: "Um presente ousado para fortalecer o casamento e testar os limites do amor em dia de jogo.",
      valor: 800,
      foto: "assets/imagens/presentes/04-jogos-vasco.jpg",
      icone: "⚽"
    },
    {
      id: 5,
      nome: "Faqueiro",
      descricao: "Para servir as primeiras refeições da casa nova com charme e mesa posta.",
      valor: 190,
      foto: "assets/imagens/presentes/05-faqueiro.jpg",
      icone: "🍴"
    },
    {
      id: 6,
      nome: "Conjunto de panelas pra quebrar na cabeça do noivo",
      descricao: "Brincadeiras à parte, panelas lindas para muitas receitas e histórias na cozinha.",
      valor: 440,
      foto: "assets/imagens/presentes/06-conjunto-panelas.jpg",
      icone: "🍳"
    },
    {
      id: 7,
      nome: "Chaleira elétrica",
      descricao: "Para cafés, chás e conversas demoradas nos dias tranquilos da vida a dois.",
      valor: 120,
      foto: "assets/imagens/presentes/07-chaleira-eletrica.jpg",
      icone: "🫖"
    },
    {
      id: 8,
      nome: "Massagem relaxante para o noivo depois de ver a conta do casamento",
      descricao: "Um cuidado necessário para aliviar a tensão pós-planilha, pós-orçamento e pós-sustos.",
      valor: 300,
      foto: "assets/imagens/presentes/08-massagem-noivo.png",
      icone: "💆"
    },
    {
      id: 9,
      nome: "1 Mês de ração do cachorro",
      descricao: "Uma contribuição para manter o verdadeiro dono da casa muito bem alimentado.",
      valor: 150,
      foto: "assets/imagens/presentes/09-racao-cachorro.jpg",
      icone: "🐶"
    },
    {
      id: 10,
      nome: "Alexa",
      descricao: "Para tocar músicas, lembrar compromissos e talvez mediar pequenas decisões do casal.",
      valor: 380,
      foto: "assets/imagens/presentes/10-alexa.jpg",
      icone: "🔊"
    },
    {
      id: 11,
      nome: "Kit churrasco pro noivo ver jogo e comer uma carninha",
      descricao: "A combinação oficial de jogo, churrasco e felicidade doméstica.",
      valor: 200,
      foto: "assets/imagens/presentes/11-kit-churrasco.jpg",
      icone: "🥩"
    },
    {
      id: 12,
      nome: "Lava-louças pra evitar as brigas de quem é a vez de lavar",
      descricao: "Um presente pela paz conjugal e por uma cozinha sem debates depois do jantar.",
      valor: 1000,
      foto: "assets/imagens/presentes/12-lava-loucas.jpg",
      icone: "🍽️"
    },
    {
      id: 13,
      nome: "Microondas",
      descricao: "Para salvar refeições, esquentar café e facilitar a rotina da casa nova.",
      valor: 400,
      foto: "assets/imagens/presentes/13-microondas.jpg",
      icone: "📦"
    },
    {
      id: 14,
      nome: "Hotel 5 estrelas pro cachorro ficar durante a lua de mel",
      descricao: "Porque o cachorro também merece férias de luxo enquanto os noivos viajam.",
      valor: 600,
      foto: "assets/imagens/presentes/14-hotel-cachorro.jpg",
      icone: "🏨"
    },
    {
      id: 15,
      nome: "Máquina pra lavar a roupa",
      descricao: "Para a vida real do casal começar com roupa limpa e menos acúmulo no cesto.",
      valor: 2000,
      foto: "assets/imagens/presentes/15-maquina-lavar.jpg",
      icone: "🧺"
    },
    {
      id: 16,
      nome: "Secadora",
      descricao: "Para os dias corridos, chuvosos e para a roupa sair pronta sem drama.",
      valor: 1500,
      foto: "assets/imagens/presentes/16-secadora.jpg",
      icone: "🌬️"
    },
    {
      id: 17,
      nome: "Robô aspirador",
      descricao: "Um pequeno ajudante para circular pela casa enquanto os noivos fingem que organizaram tudo.",
      valor: 400,
      foto: "assets/imagens/presentes/17-robo-aspirador.jpg",
      icone: "🤖"
    }
  ],

  mural: []

};

// Ponto de extensão para futuros gateways de pagamento
// Substitua paymentGateway para integrar com Mercado Pago, Stripe, PagSeguro, etc.
CONFIG.paymentGateway = {
  provider: "pix", // "pix" | "mercadopago" | "stripe" | "pagseguro" | "asaas" | "openpix"
  enabled: true
};

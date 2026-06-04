const GUEST_SHEET_NAME = "Convidados";
const GIFTS_SHEET_NAME = "Presentes";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const data = JSON.parse(e.postData.contents || "{}");

    if (data.tipo === "presente") {
      saveGiftIntent(data);
    } else {
      saveGuest(data);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function saveGuest(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(GUEST_SHEET_NAME);
  const row = getNextEmptyRowByColumn(sheet, 1);

  sheet.getRange(row, 1, 1, 4).setValues([[
    data.nome || "",
    data.telefone || "",
    data.acompanhante || "",
    data.mensagem || ""
  ]]);
}

function saveGiftIntent(data) {
  const sheet = getOrCreateSheet(GIFTS_SHEET_NAME, [
    "Nome",
    "Valor",
    "Validação",
    "Nome Presente"
  ]);

  const itens = Array.isArray(data.itens) && data.itens.length
    ? data.itens
    : [{
      nomePresente: data.nomePresente || "",
      valor: Number(data.valor || 0)
    }];

  const rows = itens.map(item => [
    data.nome || "",
    Number(item.valor || 0),
    data.validacao || "PENDENTE",
    item.nomePresente || item.nome || ""
  ]);

  const row = getNextEmptyRowByColumn(sheet, 1);
  sheet.getRange(row, 1, rows.length, 4).setValues(rows);
}

function getOrCreateSheet(name, headers) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(name);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
  }

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  return sheet;
}

function getNextEmptyRowByColumn(sheet, column) {
  const lastRow = Math.max(sheet.getLastRow(), 1);
  const values = sheet.getRange(1, column, lastRow, 1).getValues();

  for (let index = 1; index < values.length; index++) {
    if (!String(values[index][0]).trim()) return index + 1;
  }

  return lastRow + 1;
}

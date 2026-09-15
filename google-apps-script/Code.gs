const SPREADSHEET_ID = "1t0JVsrHtHA-SLVMUDiTfk0fEcb4UJLpbFaSumHNXWEM";
const SHEET_NAME = "RSVP Responses";
const HEADERS = [
  "Timestamp",
  "Submission ID",
  "Name",
  "Contact",
  "Attendance",
  "Guests",
  "Message",
];

function doGet() {
  return jsonResponse_({ ok: true, service: "Samantha RSVP" });
}

function doPost(event) {
  const lock = LockService.getScriptLock();

  try {
    const submission = normalizeSubmission_(event && event.parameter ? event.parameter : {});

    // Silently accept the honeypot so automated submitters receive no useful signal.
    if (submission.website) {
      return jsonResponse_({ ok: true });
    }

    const validationError = validateSubmission_(submission);
    if (validationError) {
      return jsonResponse_({ ok: false, error: validationError });
    }

    if (!lock.tryLock(10000)) {
      return jsonResponse_({ ok: false, error: "The guest list is busy. Please try again." });
    }

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = getResponseSheet_(spreadsheet);
    const duplicateRow = findSubmissionRow_(sheet, submission.submissionId);

    if (duplicateRow) {
      return jsonResponse_({ ok: true, duplicate: true });
    }

    const nextRow = sheet.getLastRow() + 1;
    sheet.getRange(nextRow, 1, 1, HEADERS.length).setValues([[
      new Date(),
      safeText_(submission.submissionId),
      safeText_(submission.fullName),
      safeText_(submission.contact),
      submission.attending === "yes" ? "Yes" : "No",
      submission.guests,
      safeText_(submission.message),
    ]]);
    SpreadsheetApp.flush();

    return jsonResponse_({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse_({ ok: false, error: "We could not save this RSVP. Please try again." });
  } finally {
    if (lock.hasLock()) {
      lock.releaseLock();
    }
  }
}

function normalizeSubmission_(parameters) {
  return {
    submissionId: String(parameters.submissionId || "").trim(),
    fullName: String(parameters.fullName || "").trim(),
    contact: String(parameters.contact || "").trim(),
    attending: String(parameters.attending || "").trim().toLowerCase(),
    guests: Number(parameters.guests),
    message: String(parameters.message || "").trim(),
    website: String(parameters.website || "").trim(),
    startedAt: Number(parameters.startedAt),
  };
}

function validateSubmission_(submission) {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submission.submissionId)) {
    return "This submission could not be identified. Please refresh and try again.";
  }
  if (submission.fullName.length < 2 || submission.fullName.length > 80) {
    return "Enter a name between 2 and 80 characters.";
  }
  if (submission.contact.length > 30 || submission.contact.replace(/\D/g, "").length < 7) {
    return "Enter a valid contact number.";
  }
  if (submission.attending !== "yes" && submission.attending !== "no") {
    return "Choose whether you will attend.";
  }
  if (!Number.isInteger(submission.guests) || submission.guests < 1 || submission.guests > 20) {
    return "Guests must be a whole number from 1 to 20.";
  }
  if (submission.message.length > 500) {
    return "Keep the message to 500 characters or fewer.";
  }
  if (!Number.isFinite(submission.startedAt) || Date.now() - submission.startedAt < 1500) {
    return "Please take a moment to review your RSVP and try again.";
  }
  return "";
}

function getResponseSheet_(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    return sheet;
  }

  const existingHeaders = sheet.getRange(1, 1, 1, HEADERS.length).getDisplayValues()[0];
  if (existingHeaders.join("|") !== HEADERS.join("|")) {
    throw new Error(`The ${SHEET_NAME} tab has unexpected columns.`);
  }

  return sheet;
}

function findSubmissionRow_(sheet, submissionId) {
  if (sheet.getLastRow() < 2) {
    return null;
  }

  return sheet
    .getRange(2, 2, sheet.getLastRow() - 1, 1)
    .createTextFinder(submissionId)
    .matchEntireCell(true)
    .findNext();
}

function safeText_(value) {
  const cleanValue = String(value || "").replace(/\u0000/g, "");
  return /^[=+\-@\t\r]/.test(cleanValue) ? `'${cleanValue}` : cleanValue;
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
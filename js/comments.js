(function () {
  'use strict';

  var FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSeyTomxDWjwn0h6ukmYo0K9bLud1F1gz5ieGlxFdVycCGfdZw/formResponse';
  var CSV_URL = 'https://docs.google.com/spreadsheets/d/13bRk34SpK9AXniddyHjK-JOBvAOm9QizsNuRivEtlrc/export?format=csv';
  var ENTRY_NAME = 'entry.381222489';
  var ENTRY_BOOK = 'entry.359135325';
  var ENTRY_COMMENT = 'entry.1455783240';

  var bookTitle = window.BOOK_TITLE;
  var root = document.getElementById('comments-root');
  if (!root || !bookTitle) return;

  function parseCSV(text) {
    var rows = [];
    var row = [];
    var field = '';
    var inQuotes = false;
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (inQuotes) {
        if (c === '"') {
          if (text[i + 1] === '"') { field += '"'; i++; }
          else { inQuotes = false; }
        } else {
          field += c;
        }
      } else if (c === '"') {
        inQuotes = true;
      } else if (c === ',') {
        row.push(field);
        field = '';
      } else if (c === '\r') {
        // skip
      } else if (c === '\n') {
        row.push(field);
        rows.push(row);
        row = [];
        field = '';
      } else {
        field += c;
      }
    }
    if (field.length > 0 || row.length > 0) {
      row.push(field);
      rows.push(row);
    }
    return rows;
  }

  function buildUI() {
    var list = document.createElement('div');
    list.className = 'comment-list';
    list.id = 'comment-list';

    var form = document.createElement('form');
    form.className = 'comment-form';
    form.id = 'comment-form';
    form.method = 'POST';
    form.action = FORM_ACTION;
    form.target = 'comment-form-target';

    var bookField = document.createElement('input');
    bookField.type = 'hidden';
    bookField.name = ENTRY_BOOK;
    bookField.value = bookTitle;

    var nameLabel = document.createElement('label');
    nameLabel.className = 'form-label';
    nameLabel.htmlFor = 'comment-name';
    nameLabel.textContent = 'Your name';

    var nameInput = document.createElement('input');
    nameInput.className = 'form-input';
    nameInput.type = 'text';
    nameInput.id = 'comment-name';
    nameInput.name = ENTRY_NAME;
    nameInput.autocomplete = 'off';

    var textLabel = document.createElement('label');
    textLabel.className = 'form-label';
    textLabel.htmlFor = 'comment-text';
    textLabel.textContent = 'Your comment';

    var textArea = document.createElement('textarea');
    textArea.className = 'form-input comment-textarea';
    textArea.id = 'comment-text';
    textArea.name = ENTRY_COMMENT;
    textArea.rows = 3;

    var submitBtn = document.createElement('button');
    submitBtn.className = 'form-submit';
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Post Comment';

    form.appendChild(bookField);
    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(textLabel);
    form.appendChild(textArea);
    form.appendChild(submitBtn);

    var iframe = document.createElement('iframe');
    iframe.name = 'comment-form-target';
    iframe.className = 'idea-form-target';
    iframe.title = 'submission';

    root.appendChild(list);
    root.appendChild(form);
    root.appendChild(iframe);

    var submitted = false;
    form.addEventListener('submit', function () {
      submitted = true;
    });
    iframe.addEventListener('load', function () {
      if (!submitted) return;
      submitted = false;
      var name = nameInput.value.trim() || 'Anonymous';
      var text = textArea.value.trim();
      if (text) {
        prependComment(name, text);
      }
      form.reset();
    });

    return list;
  }

  function makeCommentItem(name, text) {
    var item = document.createElement('div');
    item.className = 'comment-item';

    var nameEl = document.createElement('p');
    nameEl.className = 'comment-name';
    nameEl.textContent = name;

    var textEl = document.createElement('p');
    textEl.className = 'comment-text';
    textEl.textContent = text;

    item.appendChild(nameEl);
    item.appendChild(textEl);
    return item;
  }

  var listEl = buildUI();

  function showEmptyState() {
    var empty = document.createElement('p');
    empty.className = 'comment-empty';
    empty.id = 'comment-empty';
    empty.textContent = 'No comments yet. Be the first to say something!';
    listEl.appendChild(empty);
  }

  function prependComment(name, text) {
    var empty = document.getElementById('comment-empty');
    if (empty) empty.remove();
    listEl.insertBefore(makeCommentItem(name, text), listEl.firstChild);
  }

  var loading = document.createElement('p');
  loading.className = 'comment-empty';
  loading.textContent = 'Loading comments...';
  listEl.appendChild(loading);

  fetch(CSV_URL)
    .then(function (r) { return r.text(); })
    .then(function (csv) {
      loading.remove();
      var rows = parseCSV(csv);
      if (rows.length < 2) {
        showEmptyState();
        return;
      }
      var header = rows[0];
      var bookIdx = header.indexOf('Book');
      var nameIdx = header.indexOf('Name');
      var commentIdx = header.indexOf('Comment');
      var matches = [];
      for (var i = 1; i < rows.length; i++) {
        var r = rows[i];
        if (r[bookIdx] === bookTitle && r[commentIdx]) {
          matches.push(r);
        }
      }
      if (matches.length === 0) {
        showEmptyState();
        return;
      }
      matches.reverse().forEach(function (r) {
        listEl.appendChild(makeCommentItem(r[nameIdx] || 'Anonymous', r[commentIdx]));
      });
    })
    .catch(function () {
      loading.textContent = 'Comments couldn’t load right now.';
    });
})();

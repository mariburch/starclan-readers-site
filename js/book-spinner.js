(function () {
  'use strict';

  // Same 30 titles/order as list.html (book 1.jpg ... book 30.jpg), with
  // author/series/synopsis pulled from the book club's own picker-wheel data.
  var BOOKS = [
    { title: "The Last Dragon on Mars", author: "Scott Reintgen", series: "Book 1 of 2", cover: "book 3.jpg",
      synopsis: "Young Martian salvager Lunar Jones discovers a dormant dragon in a restricted zone that bonds with him, launching him into a conflict spanning the solar system." },
    { title: "Amari and the Night Brothers", author: "B.B. Alston", series: "Book 1 of 5", cover: "book 4.jpg",
      synopsis: "Thirteen-year-old Amari Peters discovers a secret world of magic and monsters while searching for her missing brother, joining the Bureau of Supernatural Affairs." },
    { title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", series: "Book 1 of 6", cover: "book 5.jpg",
      synopsis: "Minutes before Earth is demolished for a hyperspace bypass, Arthur Dent is rescued by his friend Ford Prefect, a secret alien researcher, beginning a wild galactic adventure." },
    { title: "The Lion of Mars", author: "Jennifer L. Holm", series: "Standalone", cover: "book 8.jpg",
      synopsis: "Eleven-year-old Bell has lived his whole life in an isolated US colony on Mars. When a mysterious virus incapacitates all the adults, Bell and the other kids must break rules, contact foreign settlements, and unite to save their community." },
    { title: "The Lost Library", author: "Rebecca Stead & Wendy Mass", series: "Standalone", cover: "book 9.jpg",
      synopsis: "When a mysterious free little library appears in town, 11-year-old Evan takes two books that spark a quest to solve a long-ago library fire." },
    { title: "The Goose Girl", author: "Shannon Hale", series: "Book 1 of 4", cover: "book 10.jpg",
      synopsis: "Princess Ani can speak to birds but struggles with human expectations. Betrayed on her journey, her identity is stolen by her lady-in-waiting, forcing Ani to hide as a humble goose girl." },
    { title: "The Beast Player", author: "Nahoko Uehashi", series: "Book 1 of 2", cover: "book 13.jpg",
      synopsis: "Elin grows up caring for fierce water serpents used in war. After her mother is executed, Elin escapes and develops a unique connection with Royal Beasts, winged apex predators." },
    { title: "The Wild Robot", author: "Peter Brown", series: "Book 1 of 3", cover: "book 14.jpg",
      synopsis: "Intelligent robot Roz washes ashore on a remote island. To survive, she must observe and mimic local wildlife, learn animal communication, and adopt an orphaned gosling." },
    { title: "Impossible Creatures", author: "Katherine Rundell", series: "Book 1 of 3", cover: "book 15.jpg",
      synopsis: "Christopher discovers a portal to the Archipelago, hidden islands where mythic beasts live. He teams up with Mal, a girl who can fly, to embark on a dangerous quest." },
    { title: "Star in the Forest", author: "Laura Resau", series: "Standalone", cover: "book 16.jpg",
      synopsis: "When 11-year-old Zitlally's father is arrested and deported to Mexico, her family attempts to bring him back, only to learn he has been kidnapped for ransom. Seeking comfort, Zitlally rescues a stray white dog with a star-shaped patch over its eye, and becomes convinced that keeping Star safe will help her father find his way back home." },
    { title: "The Millicent Quibb School of Etiquette for Young Ladies of Mad Science", author: "Kate McKinnon", series: "Book 1 of 3", cover: "book 17.jpg",
      synopsis: "In 1911, three eccentric sisters expelled from etiquette school are recruited by mad scientist Millicent Quibb to stop a villainous plot involving giant mutant worms." },
    { title: "The Legend of Greg", author: "Chris Rylander", series: "Book 1 of 3", cover: "book 18.jpg",
      synopsis: "Thirteen-year-old Greg Belmont leads an ordinary life until his dad is kidnapped by a troll and he learns he is actually a dwarf, pulled into a hidden underground world of monsters and magic." },
    { title: "The Maze Runner", author: "James Dashner", series: "Book 1 of 6", cover: "book 21.jpg",
      synopsis: "Thomas wakes in an elevator with no memory and arrives in the Glade, a courtyard surrounded by massive shifting walls. He must become a Runner to find escape." },
    { title: "TBH, This Is SO Awkward", author: "Lisa Greenwald", series: "Book 1 of 8", cover: "book 23.jpg",
      synopsis: "Told entirely through text messages and emojis, middle schoolers navigate social dynamics, cyber-drama, and shifting friendships." },
    { title: "The Rithmatist", author: "Brandon Sanderson", series: "Book 1 of 2", cover: "book 24.jpg",
      synopsis: "In an alternate steampunk America, Joel is a non-magical student obsessed with Rithmatics, the art of bringing 2D chalk drawings to life. When students begin disappearing, Joel investigates." },
    { title: "Inkheart", author: "Cornelia Funke", series: "Book 1 of 4", cover: "book 25.jpg",
      synopsis: "Twelve-year-old Meggie's father Mo can read book characters into the real world. When the villain Capricorn captures Mo, Meggie must find her own courage." },
    { title: "Please Pay Attention", author: "Jamie Sumner", series: "Standalone", cover: "book 27.jpg",
      synopsis: "After a frightening lockdown drill at her middle school, sixth-grader Bea, who has cerebral palsy, must navigate the aftermath and find healing." },
    { title: "Three Keys", author: "Kelly Yang", series: "Front Desk Book 2 of 6", cover: "three keys.png",
      synopsis: "Sixth-grader Mia Tang thinks she is set for the best year ever. Her family now proudly owns the Calivista Motel, she runs the front desk with her best friend Lupe, and her writing skills are improving." },
    { title: "The Runaway King", author: "Jennifer A. Nielsen", series: "Book 2 of 5", cover: "the runaway king.png",
      synopsis: "Just weeks after Jaron has taken the throne, an assassination attempt forces him into a deadly situation. Rumors of a coming war are winding their way between the castle walls, and Jaron feels the pressure quietly mounting within Carthya." },
    { title: "Riding Freedom", author: "Pam Munoz Ryan", series: "Standalone", cover: "book 30.jpg",
      synopsis: "Orphaned as a toddler and raised in a boys' orphanage, Charlotte Parkhurst discovers an exceptional talent for horses. She disguises herself as a boy named Charley to pursue her dream of driving stagecoaches, becoming a legendary driver and secretly the first woman to vote in a U.S. election." }
  ];

  var WEDGE_COLORS = [
    '#e63946', '#f4a261', '#2a9d8f', '#264653', '#e9c46a',
    '#6a4c93', '#1982c4', '#8ac926', '#ff595e', '#ffca3a',
    '#457b9d', '#bc6c25', '#606c38', '#d62828', '#4361ee',
    '#7209b7', '#3a0ca3', '#4cc9f0', '#f72585', '#b5838d',
    '#6d6875', '#e07a5f', '#3d405b', '#81b29a', '#f2cc8f',
    '#023047', '#fb8500', '#8ecae6', '#219ebc', '#ffb703'
  ];

  // Sergio Trendy's punctuation glyphs (& ' / ? ! : ; - ( ) " 0 etc.) are
  // corrupted placeholder shapes in this font file, not missing outlines.
  // Since this copy is data-driven, patch it automatically instead of by hand.
  var BROKEN_GLYPHS = /[&'‘’"“”/?!:;\-—()0%*+@#]/g;

  function patchGlyphs(str) {
    // Note: not html-escaping first. None of this data contains literal
    // < or > and the fallback span wrapping needs to see the raw & to
    // patch it correctly, otherwise escaping first would double it up.
    return str.replace(BROKEN_GLYPHS, function (ch) {
      return '<span class="glyph-fallback">' + ch + '</span>';
    });
  }

  var canvas = document.getElementById('wheel');
  var ctx = canvas.getContext('2d');
  var size = canvas.width;
  var center = size / 2;
  var radius = center - 4;
  var segAngle = (2 * Math.PI) / BOOKS.length;
  var rotation = 0;
  var spinning = false;

  function drawWheel() {
    ctx.clearRect(0, 0, size, size);
    BOOKS.forEach(function (book, i) {
      var start = rotation + i * segAngle;
      var end = start + segAngle;
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, start, end);
      ctx.closePath();
      ctx.fillStyle = WEDGE_COLORS[i % WEDGE_COLORS.length];
      ctx.fill();
      ctx.strokeStyle = '#292929';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(start + segAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px sans-serif';
      var label = book.title.length > 20 ? book.title.slice(0, 18) + '…' : book.title;
      ctx.fillText(label, radius - 10, 3);
      ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(center, center, 30, 0, 2 * Math.PI);
    ctx.fillStyle = '#292929';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(center, center, 25, 0, 2 * Math.PI);
    ctx.fillStyle = '#fc89b2';
    ctx.fill();
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#292929';
    ctx.textAlign = 'center';
    ctx.fillText('SPIN', center, center + 4);
  }

  function getSelectedIndex() {
    var pointerAngle = (3 * Math.PI / 2 - rotation) % (2 * Math.PI);
    var normalized = ((pointerAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    return Math.floor(normalized / segAngle) % BOOKS.length;
  }

  var audioContext = null;
  function getAudioContext() {
    if (!audioContext) {
      try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        audioContext = null;
      }
    }
    return audioContext;
  }

  function playTickSound() {
    var ac = getAudioContext();
    if (!ac) return;
    if (ac.state === 'suspended') ac.resume();
    var now = ac.currentTime;
    var noise = ac.createBufferSource();
    var buffer = ac.createBuffer(1, ac.sampleRate * 0.08, ac.sampleRate);
    var data = buffer.getChannelData(0);
    for (var i = 0; i < buffer.length; i++) data[i] = Math.random() * 2 - 1;
    noise.buffer = buffer;
    var gain = ac.createGain();
    noise.connect(gain);
    gain.connect(ac.destination);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    noise.start(now);
  }

  function playTadaSound() {
    var ac = getAudioContext();
    if (!ac) return;
    if (ac.state === 'suspended') ac.resume();
    var now = ac.currentTime;
    var master = ac.createGain();
    master.connect(ac.destination);
    master.gain.setValueAtTime(0.5, now);

    var chords = [
      { notes: [262, 330, 392], duration: 0.25 },
      { notes: [294, 370, 440], duration: 0.25 },
      { notes: [330, 415, 494], duration: 0.25 },
      { notes: [392, 494, 587], duration: 0.4 }
    ];
    var t = 0;
    chords.forEach(function (chord) {
      chord.notes.forEach(function (freq) {
        var osc = ac.createOscillator();
        var gain = ac.createGain();
        osc.connect(gain);
        gain.connect(master);
        osc.type = 'sawtooth';
        osc.frequency.value = freq;
        var start = now + t;
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.4, start + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.02, start + chord.duration);
        osc.start(start);
        osc.stop(start + chord.duration);
      });
      t += chord.duration + 0.06;
    });

    var finalStart = now + t;
    var finalDur = 1.0;
    [262, 330, 392, 523].forEach(function (freq, idx) {
      var osc = ac.createOscillator();
      var gain = ac.createGain();
      osc.connect(gain);
      gain.connect(master);
      osc.type = idx === 3 ? 'sine' : 'sawtooth';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, finalStart);
      gain.gain.linearRampToValueAtTime(0.4, finalStart + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, finalStart + finalDur);
      osc.start(finalStart);
      osc.stop(finalStart + finalDur);
    });
  }

  function createConfetti() {
    var count = 120;
    var container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);

    for (var i = 0; i < count; i++) {
      var piece = document.createElement('div');
      var x = Math.random() * window.innerWidth;
      var startY = -20 - Math.random() * 200;
      var sz = Math.random() * 10 + 6;
      var color = WEDGE_COLORS[Math.floor(Math.random() * WEDGE_COLORS.length)];
      var duration = Math.random() * 1.2 + 1.6;
      var delay = Math.random() * 0.3;
      var round = Math.random() > 0.5;

      piece.className = 'confetti-piece';
      piece.style.left = x + 'px';
      piece.style.top = startY + 'px';
      piece.style.width = sz + 'px';
      piece.style.height = sz + 'px';
      piece.style.background = color;
      piece.style.borderRadius = round ? '50%' : '2px';
      piece.style.animationDuration = duration + 's';
      piece.style.animationDelay = delay + 's';
      container.appendChild(piece);
    }

    setTimeout(function () { container.remove(); }, 3500);
  }

  function spin() {
    if (spinning) return;
    spinning = true;
    document.getElementById('book-info').hidden = true;

    var totalRotation = Math.PI * 2 * (6 + Math.random() * 4);
    var duration = 6000;
    var startRotation = rotation;
    var startTime = null;
    var lastTick = 0;
    var tickInterval = 80;

    function animate(now) {
      if (!startTime) startTime = now;
      var elapsed = now - startTime;
      var t = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - t, 4);
      rotation = startRotation + totalRotation * eased;
      drawWheel();

      if (now - lastTick > tickInterval) {
        playTickSound();
        lastTick = now;
        tickInterval = 80 + t * 220;
      }

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        spinning = false;
        revealBook();
      }
    }
    requestAnimationFrame(animate);
  }

  function revealBook() {
    var book = BOOKS[getSelectedIndex()];
    document.getElementById('book-cover').src = './assets/' + book.cover;
    document.getElementById('book-cover').alt = book.title + ' cover';
    document.getElementById('book-title').innerHTML = patchGlyphs(book.title);
    document.getElementById('book-author').innerHTML = patchGlyphs(book.author);
    document.getElementById('book-series').innerHTML = patchGlyphs(book.series);
    document.getElementById('book-synopsis').innerHTML = patchGlyphs(book.synopsis);

    var info = document.getElementById('book-info');
    info.hidden = false;
    playTadaSound();
    createConfetti();
  }

  document.getElementById('spin-btn').addEventListener('click', spin);
  canvas.addEventListener('click', spin);
  drawWheel();
})();

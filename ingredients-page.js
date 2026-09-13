(function () {
  "use strict";

  var REPO_BASE = "https://raw.githubusercontent.com/hessennasser/moknh-ingredients/main/ingredients/";

  var GROUPS = [
    { key: "vitamins", label: "الفيتامينات والمعادن", count: 21 },
    { key: "probiotics", label: "البكتيريا النافعة", count: 14 },
    { key: "greens", label: "الخضروات الفائقة", count: 14 },
    { key: "fruits", label: "الفواكه الفائقة", count: 9 },
    { key: "herbs", label: "الفطر والأعشاب", count: 7 },
    { key: "enzymes", label: "الإنزيمات الهاضمة", count: 5 }
  ];

  // group -> [{slug, tag, title, sci}]
  var ITEMS = {
    vitamins: [
      ["potassium", "معدن أساسي", "البوتاسيوم", "Dipotassium Phosphate"],
      ["biotin", "فيتامين ب", "البيوتين", "Biotin"],
      ["thiamin", "فيتامين ب", "الثيامين (فيتامين B1)", "Thiamine HCl"],
      ["iron", "معدن أساسي", "الحديد", "Ferrous Fumarate"],
      ["riboflavin", "فيتامين ب", "الريبوفلافين (فيتامين B2)", "Riboflavin"],
      ["zinc", "معدن أساسي", "الزنك", "Zinc Glycinate"],
      ["selenium", "معدن أساسي", "السيلينيوم", "L-Selenomethionine"],
      ["phosphorus", "معدن أساسي", "الفوسفور", "Dipotassium Phosphate"],
      ["calcium", "معدن أساسي", "الكالسيوم", "Calcium Carbonate"],
      ["chromium", "معدن أساسي", "الكروم", "Chromium Picolinate"],
      ["choline", "عنصر غذائي", "الكولين", "Choline Bitartrate"],
      ["magnesium", "معدن أساسي", "المغنيسيوم", "Magnesium Glycinate"],
      ["niacin", "فيتامين ب", "النياسين (فيتامين B3)", "Niacinamide"],
      ["iodine", "معدن أساسي", "اليود", "Potassium Iodide"],
      ["pantothenic-acid", "فيتامين ب", "حمض البانتوثينيك (فيتامين B5)", "D-Calcium Pantothenate"],
      ["folate", "فيتامين ب", "حمض الفوليك (فولات)", "L-5-Methyltetrahydrofolate"],
      ["vitamin-a", "فيتامين أساسي", "فيتامين A", "Retinyl Palmitate"],
      ["vitamin-b12", "فيتامين ب", "فيتامين B12", "Methylcobalamin"],
      ["vitamin-b6", "فيتامين ب", "فيتامين B6", "Pyridoxine HCl"],
      ["vitamin-c", "مضاد أكسدة", "فيتامين C", "Ascorbic Acid &amp; Acerola Cherry Extract"],
      ["vitamin-e", "مضاد أكسدة", "فيتامين E", "D-Alpha Tocopheryl Acetate"]
    ],
    probiotics: [
      ["b-infantis", "بروبيوتيك", "بيفيدوباكتيريوم إنفانتيس", "Bifidobacterium infantis"],
      ["b-breve", "بروبيوتيك", "بيفيدوباكتيريوم بريف", "Bifidobacterium breve"],
      ["b-bifidum", "بروبيوتيك", "بيفيدوباكتيريوم بيفيدوم", "Bifidobacterium bifidum"],
      ["b-lactis", "بروبيوتيك", "بيفيدوباكتيريوم لاكتيس", "Bifidobacterium lactis"],
      ["b-longum", "بروبيوتيك", "بيفيدوباكتيريوم لونغوم", "Bifidobacterium longum"],
      ["s-thermophilus", "بروبيوتيك", "ستربتوكوكوس ثيرموفيلوس", "Streptococcus thermophilus"],
      ["l-acidophilus", "بروبيوتيك", "لاكتوباسيلوس أسيدوفيلوس", "Lactobacillus acidophilus"],
      ["l-paracasei", "بروبيوتيك", "لاكتوباسيلوس باراكازيي", "Lactobacillus paracasei"],
      ["l-plantarum", "بروبيوتيك", "لاكتوباسيلوس بلانتاروم", "Lactobacillus plantarum"],
      ["l-rhamnosus", "بروبيوتيك", "لاكتوباسيلوس رامنوسوس", "Lactobacillus rhamnosus"],
      ["l-salivarius", "بروبيوتيك", "لاكتوباسيلوس ساليفاريوس", "Lactobacillus salivarius"],
      ["l-gasseri", "بروبيوتيك", "لاكتوباسيلوس غاسيري", "Lactobacillus gasseri"],
      ["l-fermentum", "بروبيوتيك", "لاكتوباسيلوس فيرمنتوم", "Lactobacillus fermentum"],
      ["l-casei", "بروبيوتيك", "لاكتوباسيلوس كازيي", "Lactobacillus casei"]
    ],
    greens: [
      ["alfalfa-leaf", "ورقة نباتية", "أوراق الفالفا", "Medicago sativa L."],
      ["moringa-leaf", "ورقة نباتية", "أوراق المورينجا", "Moringa oleifera"],
      ["broccoli", "خضار صليبي", "البروكلي", "Brassica oleracea var. italica"],
      ["beet-root", "جذر نباتي", "جذور الشمندر", "Beta vulgaris"],
      ["spinach", "خضار ورقي", "سبانخ", "Spinacia oleracea"],
      ["spirulina", "طحلب مجهري", "سبيرولينا", "Arthrospira platensis"],
      ["dulse", "طحلب بحري", "طحالب الدلس", "Palmaria palmata"],
      ["tomato", "ثمرة نباتية", "طماطم", "Solanum lycopersicum"],
      ["barley-grass", "عشب أخضر", "عشب الشعير", "Hordeum vulgare L."],
      ["barley-grass-juice", "عصير عشبي", "عصير عشب الشعير", "Hordeum vulgare L."],
      ["oat-grass-juice", "عصير عشبي", "عصير عشب الشوفان", "Avena sativa"],
      ["alfalfa-grass-juice", "عصير عشبي", "عصير عشب الفالفا", "Medicago sativa L."],
      ["wheatgrass-juice", "عصير عشبي", "عصير عشب القمح", "Triticum aestivum"],
      ["kamut-grass-juice", "عصير عشبي", "عصير عشب الكاموت", "Triticum sp."]
    ],
    fruits: [
      ["red-raspberry", "توت فائق", "توت أحمر (رازبيري)", "Rubus idaeus"],
      ["blueberry", "توت فائق", "توت أزرق", "Vaccinium corymbosum"],
      ["acai-berry", "توت فائق", "توت أساي", "Euterpe oleracea"],
      ["blackberry", "توت فائق", "توت أسود", "Rubus fruticosus"],
      ["goji-berry", "توت فائق", "توت غوجي", "Lycium barbarum"],
      ["strawberry", "فاكهة فائقة", "فراولة", "Fragaria × ananassa"],
      ["acerola-cherry", "كرز فائق", "كرز أسيرولا", "Malpighia emarginata"],
      ["maqui-berry", "توت فائق", "ماكي توت", "Aristotelia chilensis"],
      ["apple-cider-vinegar", "مسحوق فاكهي", "مسحوق خل التفاح", "Malus domestica"]
    ],
    herbs: [
      ["lemon-balm", "عشب مهدّئ", "بلسم الليمون", "Melissa officinalis"],
      ["panax-ginseng", "عشب تكيفي", "جنسنغ باناكس", "Panax ginseng C.A. Mey."],
      ["rhodiola", "عشب تكيفي", "روديولا الوردية", "Rhodiola rosea L."],
      ["reishi", "فطر تكيفي", "فطر الريشي", "Ganoderma lucidum"],
      ["cordyceps", "فطر وظيفي", "فطر الكورديسيبس", "Cordyceps militaris"],
      ["turkey-tail", "فطر وظيفي", "فطر ذيل الديك الرومي", "Coriolus versicolor"],
      ["lions-mane", "فطر وظيفي", "فطر عرف الأسد", "Hericium erinaceus"]
    ],
    enzymes: [
      ["alpha-amylase", "إنزيم هاضم", "ألفا أميليز", "Alpha Amylase"],
      ["neutral-protease", "إنزيم هاضم", "بروتياز متعادل", "Neutral Protease"],
      ["cellulase", "إنزيم هاضم", "سيلولاز", "Cellulase"],
      ["lactase", "إنزيم هاضم", "لاكتاز", "Lactase"],
      ["lipase", "إنزيم هاضم", "ليباز", "Lipase"]
    ]
  };

  var STYLE = "" +
    "#moknh-ing-app{--g:#4CAF50;--gl:#8BC34A;--gd:#2E7D32;--gp:#E8F5E9;--bk:#1B1B1C;--mu:#777;--line:#ededed;--f:'IBM Plex Sans Arabic',sans-serif;font-family:var(--f);direction:rtl;color:var(--bk);font-size:14px;line-height:1.8}" +
    "#moknh-ing-app *{box-sizing:border-box}" +
    "#moknh-ing-app h1,#moknh-ing-app h2,#moknh-ing-app h3{font-weight:700;margin:0}" +
    "#moknh-ing-app p,#moknh-ing-app ul,#moknh-ing-app ol{margin:0}" +
    "#moknh-ing-app .wrap{max-width:1080px;margin:0 auto;padding:0 20px}" +
    "#moknh-ing-app .intro-hero{padding:8px 0 32px;text-align:center}" +
    "#moknh-ing-app .intro-kicker{display:inline-block;background:var(--gp);color:var(--gd);font-size:11px;font-weight:700;padding:5px 14px;border-radius:100px;margin-bottom:14px}" +
    "#moknh-ing-app .intro-hero h2{font-size:26px;margin-bottom:12px}" +
    "#moknh-ing-app .intro-hero p{font-size:14px;color:#555;line-height:1.9;max-width:640px;margin:0 auto}" +
    "#moknh-ing-app .tech{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:14px;overflow:hidden;margin:0 0 28px}" +
    "#moknh-ing-app .tech-cell{background:#fff;padding:18px 16px;text-align:center}" +
    "#moknh-ing-app .tech-label{font-size:11px;color:var(--mu);margin-bottom:6px}" +
    "#moknh-ing-app .tech-value{font-size:15px;font-weight:700;color:var(--gd)}" +
    "#moknh-ing-app .tech-value.ltr{direction:ltr}" +
    "#moknh-ing-app .filters{background:#fff;padding:12px 0;border-bottom:1px solid var(--line);display:flex;flex-wrap:wrap;gap:8px;justify-content:center}" +
    "#moknh-ing-app .chip{cursor:pointer;background:#fff;border:1px solid var(--line);color:var(--mu);font-family:var(--f);font-size:12px;font-weight:600;padding:8px 16px;border-radius:100px;transition:.2s}" +
    "#moknh-ing-app .chip span{color:#bbb}" +
    "#moknh-ing-app .chip:hover{border-color:var(--g);color:var(--gd)}" +
    "#moknh-ing-app .chip.active{background:var(--g);border-color:var(--g);color:#fff}" +
    "#moknh-ing-app .chip.active span{color:rgba(255,255,255,.75)}" +
    "#moknh-ing-app .group-section{padding:28px 0}" +
    "#moknh-ing-app .group-section+.group-section{border-top:1px solid var(--line)}" +
    "#moknh-ing-app .group-title{font-size:18px;margin-bottom:18px;display:flex;align-items:center;gap:10px}" +
    "#moknh-ing-app .group-title::before{content:\"\";width:5px;height:20px;background:var(--g);border-radius:3px}" +
    "#moknh-ing-app .group-count{font-size:12px;font-weight:400;color:var(--mu)}" +
    "#moknh-ing-app .grid-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:14px}" +
    "#moknh-ing-app .card{display:block;width:100%;text-align:right;border:1px solid var(--line);border-radius:14px;padding:18px 16px;text-decoration:none;color:var(--bk);transition:.2s;background:#fff;font-family:var(--f)}" +
    "#moknh-ing-app .card:hover{border-color:var(--g);box-shadow:0 6px 18px rgba(76,175,80,.12);transform:translateY(-2px)}" +
    "#moknh-ing-app .card-tag{display:inline-block;background:var(--gp);color:var(--gd);font-size:10px;font-weight:700;padding:3px 10px;border-radius:100px;margin-bottom:10px}" +
    "#moknh-ing-app .card h3{font-size:15px;margin-bottom:4px}" +
    "#moknh-ing-app .card-sci{font-size:11px;color:var(--mu);font-style:italic;direction:ltr;text-align:right;margin-bottom:10px}" +
    "#moknh-ing-app .card-more{font-size:12px;color:var(--g);font-weight:700;display:flex;align-items:center;gap:4px}" +
    "#moknh-ing-app .card-more span{transition:.2s}" +
    "#moknh-ing-app .card:hover .card-more span{transform:translateX(-3px)}" +
    "#moknh-ing-app .hidden{display:none!important}" +
    "#moknh-ing-app .prod{background:var(--gp);border-radius:20px;padding:32px;margin:8px 0 36px;text-align:center}" +
    "#moknh-ing-app .prod h2{font-size:22px;margin-bottom:8px;color:var(--gd)}" +
    "#moknh-ing-app .prod p{font-size:14px;color:#555;margin-bottom:20px;max-width:520px;margin-left:auto;margin-right:auto;line-height:1.9}" +
    "#moknh-ing-app .prod-btn{background:var(--g);color:#fff;padding:15px 36px;border-radius:100px;font-size:16px;font-weight:700;border:none;font-family:var(--f);text-decoration:none;display:inline-block}" +
    "#moknh-ing-app .disc{font-size:11px;color:#aaa;line-height:1.8;padding:0 0 24px;text-align:center;max-width:700px;margin:0 auto}" +
    "#moknh-ing-app .back-link{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--gd);text-decoration:none;padding:16px 0}" +
    "#moknh-ing-app .hero{display:flex;gap:32px;align-items:center;padding:0 0 28px;border-bottom:1px solid var(--line);margin-bottom:24px}" +
    "@media(max-width:680px){#moknh-ing-app .hero{flex-direction:column;gap:20px;text-align:center}}" +
    "#moknh-ing-app .hero-img{width:160px;height:190px;border-radius:16px;background:#fafafa;border:1px solid var(--line);display:flex;align-items:center;justify-content:center;color:#ccc;font-size:13px;flex-shrink:0;text-align:center;padding:12px}" +
    "#moknh-ing-app .hero-info{flex:1;min-width:0}" +
    "#moknh-ing-app .hero-kicker{display:inline-block;background:var(--gp);color:var(--gd);font-size:11px;font-weight:700;padding:5px 14px;border-radius:100px;margin-bottom:12px}" +
    "#moknh-ing-app .hero h1{font-size:24px;margin-bottom:6px}" +
    "#moknh-ing-app .hero-sci{font-size:14px;color:var(--mu);font-style:italic;direction:ltr;text-align:right;margin-bottom:14px}" +
    "@media(max-width:680px){#moknh-ing-app .hero-sci{text-align:center}}" +
    "#moknh-ing-app .hero p{font-size:14px;color:#555;line-height:1.9}" +
    "#moknh-ing-app .sec{padding:24px 0;border-bottom:1px solid var(--line)}" +
    "#moknh-ing-app .sec h2{font-size:18px;margin-bottom:16px;display:flex;align-items:center;gap:10px}" +
    "#moknh-ing-app .sec h2::before{content:\"\";width:5px;height:20px;background:var(--g);border-radius:3px}" +
    "#moknh-ing-app .benefits{list-style:none;display:flex;flex-direction:column;gap:12px;padding:0}" +
    "#moknh-ing-app .benefits li{display:flex;gap:12px;align-items:flex-start;font-size:14px;color:#444;line-height:1.8}" +
    "#moknh-ing-app .benefits li svg{width:20px;height:20px;color:var(--g);flex-shrink:0;margin-top:2px}" +
    "#moknh-ing-app .why p{font-size:14px;color:#555;line-height:2;margin-bottom:12px}" +
    "#moknh-ing-app .why .stat{background:var(--gp);border-radius:12px;padding:18px 20px;margin:16px 0;font-size:14px;color:var(--gd);font-weight:600;line-height:1.9}" +
    "#moknh-ing-app .cites{list-style:none;counter-reset:c;display:flex;flex-direction:column;gap:12px;padding:0}" +
    "#moknh-ing-app .cites li{counter-increment:c;position:relative;padding-right:34px;font-size:12px;color:var(--mu);line-height:1.7;direction:ltr;text-align:left}" +
    "#moknh-ing-app .cites li::before{content:counter(c);position:absolute;right:0;top:0;width:24px;height:24px;background:var(--gp);color:var(--gd);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700}" +
    "#moknh-ing-app .cites a{color:var(--mu);text-decoration:none;border-bottom:1px dashed #ccc;padding-bottom:1px}" +
    "#moknh-ing-app .cites a:hover{color:var(--gd);border-bottom-color:var(--gd)}" +
    "#moknh-ing-app .ing-detail-body .wrap{max-width:none;padding:0;margin:0}" +
    "#moknh-ing-app .ing-state{padding:60px 20px;text-align:center;color:var(--mu);font-size:14px}" +
    "#moknh-ing-app .ing-state .retry-btn{margin-top:14px;background:var(--g);color:#fff;border:none;padding:9px 22px;border-radius:100px;font-family:var(--f);font-size:13px;font-weight:700;cursor:pointer}";

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function buildGridHTML(basePath) {
    var html = "";
    GROUPS.forEach(function (g) {
      var items = ITEMS[g.key] || [];
      html += '<div class="group-section" data-group-section="' + g.key + '">';
      html += '<h2 class="group-title">' + g.label + ' <span class="group-count">(' + items.length + ')</span></h2>';
      html += '<div class="grid-cards">';
      items.forEach(function (it) {
        var slug = it[0], tag = it[1], title = it[2], sci = it[3];
        html += '<a class="card" href="' + basePath + '/' + slug + '" data-ingredient="' + slug + '" data-group="' + g.key + '">' +
          '<span class="card-tag">' + tag + '</span>' +
          "<h3>" + title + "</h3>" +
          '<div class="card-sci">' + sci + "</div>" +
          '<div class="card-more">التفاصيل <span>←</span></div>' +
          "</a>";
      });
      html += "</div></div>";
    });
    return html;
  }

  function slugMeta(slug) {
    for (var g in ITEMS) {
      for (var i = 0; i < ITEMS[g].length; i++) {
        if (ITEMS[g][i][0] === slug) return { group: g, tag: ITEMS[g][i][1], title: ITEMS[g][i][2] };
      }
    }
    return null;
  }

  function init() {
    var mount =
      (document.currentScript && document.currentScript.parentElement) ||
      document.querySelector(".content-entry") ||
      document.body;

    var app = document.createElement("div");
    app.id = "moknh-ing-app";
    app.setAttribute("dir", "rtl");

    var totalCount = GROUPS.reduce(function (n, g) { return n + g.count; }, 0);

    var chipsHTML = '<button type="button" class="chip active" data-filter="all">الكل <span>(' + totalCount + ')</span></button>';
    GROUPS.forEach(function (g) {
      chipsHTML += '<button type="button" class="chip" data-filter="' + g.key + '">' + g.label + ' <span>(' + g.count + ')</span></button>';
    });

    var rawPath = location.pathname.replace(/\/$/, "");
    var rawLastSeg = rawPath.slice(rawPath.lastIndexOf("/") + 1);
    var basePath = slugMeta(rawLastSeg) ? rawPath.slice(0, rawPath.length - rawLastSeg.length - 1) : rawPath;

    app.innerHTML =
      "<style>" + STYLE + "</style>" +
      '<div id="ing-view-index">' +
        '<div class="wrap intro-hero">' +
          '<span class="intro-kicker">دليل المكونات</span>' +
          "<h2>كل ما يدخل في مزيج مُكنة</h2>" +
          "<p>مزيج مُكنة يجمع " + totalCount + ' مكوناً طبيعياً في سكوب واحد يومياً. تصفّح كل مكوّن بالتفصيل: اسمه العلمي، الجزء المستخدم منه، ودوره المعروف — مدعومة بمصادر علمية موثوقة.</p>' +
        "</div>" +
        '<div class="wrap">' +
          '<div class="tech">' +
            '<div class="tech-cell"><div class="tech-label">إجمالي المكونات</div><div class="tech-value">' + totalCount + ' مكوناً</div></div>' +
            '<div class="tech-cell"><div class="tech-label">المجموعات الغذائية</div><div class="tech-value">' + GROUPS.length + ' مجموعات</div></div>' +
            '<div class="tech-cell"><div class="tech-label">طريقة الاستخدام</div><div class="tech-value">سكوب واحد يومياً</div></div>' +
          "</div>" +
          '<div class="filters" id="ing-filters">' + chipsHTML + "</div>" +
        "</div>" +
        '<div class="wrap">' + buildGridHTML(basePath) + "</div>" +
        '<div class="wrap">' +
          '<div class="prod">' +
            "<h2>جرّب مزيج مُكنة المتكامل</h2>" +
            "<p>" + totalCount + ' مكوناً طبيعياً من الفيتامينات والمعادن والبكتيريا النافعة والخضروات والفواكه الفائقة في سكوب واحد، عادة صحية يومية بنكهة فواكه استوائية منعشة.</p>' +
            '<a href="/moknh-daily-greens/p1129001055" class="prod-btn">اكتشف مزيج مُكنة — ٣٥٠ ر.س</a>' +
          "</div>" +
        "</div>" +
        '<div class="wrap">' +
          '<p class="disc">هذه المعلومات مقدّمة لأغراض تثقيفية فقط ولا تُغني عن استشارة الطبيب أو المختص. لم تُقيَّم هذه العبارات من قِبل الجهات الصحية، ومزيج مُكنة ليس مخصصاً لتشخيص أو علاج أو شفاء أو الوقاية من أي مرض. إذا كان لديك حالة صحية أو تتناول أدوية، استشر طبيبك قبل الاستخدام.</p>' +
        "</div>" +
      "</div>" +
      '<div id="ing-view-detail" class="hidden">' +
        '<div class="wrap">' +
          '<a href="' + basePath + '" class="back-link" id="ing-back-link">→ <span>الرجوع لكل المكونات</span></a>' +
          '<div id="ing-detail-body"></div>' +
        "</div>" +
      "</div>";

    mount.innerHTML = "";
    mount.appendChild(app);

    var viewIndex = app.querySelector("#ing-view-index");
    var viewDetail = app.querySelector("#ing-view-detail");
    var detailBody = app.querySelector("#ing-detail-body");
    var backLink = app.querySelector("#ing-back-link");
    var originalTitle = document.title;
    var cache = {};

    function renderState(html) {
      detailBody.innerHTML = '<div class="ing-state">' + html + "</div>";
    }

    function showDetail(slug) {
      viewIndex.classList.add("hidden");
      viewDetail.classList.remove("hidden");
      var meta = slugMeta(slug);
      document.title = meta ? meta.title + " | مُكنة" : originalTitle;

      if (cache[slug]) {
        detailBody.innerHTML = cache[slug];
        window.scrollTo(0, 0);
        return;
      }
      renderState("جارِ التحميل...");
      fetch(REPO_BASE + slug + ".html")
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          return res.text();
        })
        .then(function (html) {
          cache[slug] = html;
          detailBody.innerHTML = html;
          window.scrollTo(0, 0);
        })
        .catch(function () {
          renderState(
            "تعذّر تحميل بيانات هذا المكوّن. تحقق من الاتصال وحاول مرة أخرى.<br>" +
            '<button type="button" class="retry-btn" id="ing-retry">إعادة المحاولة</button>'
          );
          var retryBtn = detailBody.querySelector("#ing-retry");
          if (retryBtn) retryBtn.addEventListener("click", function () { delete cache[slug]; showDetail(slug); });
        });
    }

    function showIndex() {
      viewDetail.classList.add("hidden");
      viewIndex.classList.remove("hidden");
      document.title = originalTitle;
      window.scrollTo(0, 0);
    }

    function slugFromPath(path) {
      if (path.indexOf(basePath + "/") !== 0) return null;
      var rest = path.slice(basePath.length + 1).replace(/\/$/, "");
      if (!rest || rest.indexOf("/") !== -1) return null;
      return slugMeta(rest) ? rest : null;
    }

    function navigate(slug, push) {
      var path = slug ? basePath + "/" + slug : basePath;
      if (push) history.pushState({ slug: slug || null }, "", path);
      if (slug) showDetail(slug); else showIndex();
    }

    app.addEventListener("click", function (e) {
      var card = e.target.closest("[data-ingredient]");
      if (card) {
        e.preventDefault();
        navigate(card.getAttribute("data-ingredient"), true);
        return;
      }
      if (e.target.closest("#ing-back-link")) {
        e.preventDefault();
        navigate(null, true);
      }
    });

    window.addEventListener("popstate", function (e) {
      var slug = (e.state && e.state.slug) || slugFromPath(location.pathname);
      if (slug) showDetail(slug); else showIndex();
    });

    var chips = app.querySelectorAll(".chip");
    var sections = app.querySelectorAll(".group-section");
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        var filter = chip.getAttribute("data-filter");
        sections.forEach(function (sec) {
          if (filter === "all" || sec.getAttribute("data-group-section") === filter) sec.classList.remove("hidden");
          else sec.classList.add("hidden");
        });
      });
    });

    // initial route: prefer a real path segment (matches pretty URLs), fall back to
    // hash/query so a link shared as #ingredient-x or ?ingredient=x still survives a hard reload
    var initialSlug = slugFromPath(location.pathname);
    if (!initialSlug) {
      var hashMatch = /^#ingredient-([a-z0-9-]+)$/.exec(location.hash);
      var queryMatch = /[?&]ingredient=([a-z0-9-]+)/.exec(location.search);
      var candidate = (hashMatch && hashMatch[1]) || (queryMatch && queryMatch[1]);
      if (candidate && slugMeta(candidate)) {
        initialSlug = candidate;
        history.replaceState({ slug: initialSlug }, "", basePath + "/" + initialSlug);
      }
    } else {
      history.replaceState({ slug: initialSlug }, "", location.pathname);
    }

    if (initialSlug) showDetail(initialSlug); else showIndex();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

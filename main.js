// ==================== main.js ====================
// 数智文言 —— 高中古诗文学习助手（纯前端骨架，无构建）

// 1. 数据：古诗文假数据（5 篇）
const POEMS_RAW = [
  {
    id: "shuo-shi",
    title: "师说",
    author: "韩愈",
    dynasty: "唐",
    form: "文",
    level: "高考真题",
    comment: "以“道之所存，师之所存”破“耻相师”之蔽，文气纵横，论辩铿锵。"
  },
  {
    id: "deng-gao",
    title: "登高",
    author: "杜甫",
    dynasty: "唐",
    form: "诗",
    level: "高考真题",
    comment: "万里悲秋常作客，百年多病独登台，一联十四字写尽晚年孤愁。"
  },
  {
    id: "chi-bi-fu",
    title: "赤壁赋",
    author: "苏轼",
    dynasty: "宋",
    form: "赋",
    level: "高考真题",
    comment: "以水月喻变与不变，化悲慨为旷达，文赋之峰。"
  },
  {
    id: "pi-pa-xing",
    title: "琵琶行",
    author: "白居易",
    dynasty: "唐",
    form: "诗",
    level: "高考真题",
    comment: "同是天涯沦落人，一声琵琶勾出迁谪之声，情与器交融。"
  },
  {
    id: "deng-yue-yang-lou",
    title: "登岳阳楼",
    author: "杜甫",
    dynasty: "唐",
    form: "诗",
    level: "模拟题",
    comment: "吴楚东南坼，乾坤日夜浮，以磅礴气象反衬身世之悲。"
  },
  {
    id: "quan-xue",
    title: "劝学",
    author: "荀子",
    dynasty: "先秦",
    form: "文",
    level: "高考真题",
    comment: "以木受绳则直、金就砺则利，论积累与专一之学道。"
  },
  {
    id: "li-sao",
    title: "离骚",
    author: "屈原",
    dynasty: "先秦",
    form: "诗",
    level: "高考真题",
    comment: "长句蹇脩，香草美人，抒忠而被谤之孤愤，骚体之宗。"
  },
  {
    id: "duan-ge-xing",
    title: "短歌行",
    author: "曹操",
    dynasty: "汉魏",
    form: "诗",
    level: "高考真题",
    comment: "对酒当歌，求贤若渴；青青子衿，化用《诗经》写丞相襟怀。"
  },
  {
    id: "gui-yuan-tian-ju",
    title: "归园田居",
    author: "陶渊明",
    dynasty: "汉魏",
    form: "诗",
    level: "高考真题",
    comment: "少无适俗韵，性本爱丘山；羁鸟恋旧林，池鱼思故渊。"
  },
  {
    id: "meng-you-tian-lao",
    title: "梦游天姥吟留别",
    author: "李白",
    dynasty: "唐",
    form: "诗",
    level: "高考真题",
    comment: "以梦境之瑰丽写声名之拒倨，安能摧眉折腰事权贵。"
  },
  {
    id: "shu-dao-nan",
    title: "蜀道难",
    author: "李白",
    dynasty: "唐",
    form: "诗",
    level: "高考真题",
    comment: "蜀道之难难于上青天，三叠咏叹，歌行体之极。"
  },
  {
    id: "jin-se",
    title: "锦瑟",
    author: "李商隐",
    dynasty: "唐",
    form: "诗",
    level: "高考真题",
    comment: "锦瑟无端五十弦，庄生梦蝶，沧海月明，今人莫解其中意。"
  },
  {
    id: "nian-nu-jiao-chi-bi",
    title: "念奴娇·赤壁怀古",
    author: "苏轼",
    dynasty: "宋",
    form: "词",
    level: "高考真题",
    comment: "大江东去，浪淘尽千古风流人物；物是人非，一尊还酹江月。"
  },
  {
    id: "yong-yu-le-jiang-ku",
    title: "永遇乐·京口北固亭怀古",
    author: "辛弃疾",
    dynasty: "宋",
    form: "词",
    level: "高考真题",
    comment: "斜阳草树，寻常巷陌；凭谁问，廉颇老矣，尚能饭否。"
  },
  {
    id: "sheng-sheng-man",
    title: "声声慢",
    author: "李清照",
    dynasty: "宋",
    form: "词",
    level: "高考真题",
    comment: "寻寻觅觅，冷冷清清，凄凄惨惨戚戚；梧桐细雨，点点滴滴。"
  },
  {
    id: "liu-guo-lun",
    title: "六国论",
    author: "苏洵",
    dynasty: "宋",
    form: "文",
    level: "高考真题",
    comment: "六国破灭，弊在赂秦；以史为鉴，讽当世之策。"
  }
];

// 标题清洗：去掉首尾非中文可见字符（?、空格、BOM、零宽字符等）
function cleanTitle(s) {
  return (s || "").replace(/^[^\u4e00-\u9fff]+|[^\u4e00-\u9fff]+$/g, "");
}
const POEMS = POEMS_RAW.map((p) => ({ ...p, title: cleanTitle(p.title) }));

// 错题本数据（运行时累积）
const mistakes = [];

// 2. 页面切换
const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");

function switchPage(pageId) {
  // 当前导航高亮
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.page === pageId);
  });
  // 对应 section 显示，其他隐藏
  pages.forEach((section) => {
    section.classList.toggle("is-visible", section.id === pageId);
  });
  // 同步 hash（便于刷新定位）
  history.replaceState(null, "", "#" + pageId);
  // 切换到错题本时渲染错题列表
  if (pageId === "page-mistakes") renderMistakes();
  if (pageId === "page-profile") renderProfile();
}

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    switchPage(link.dataset.page);
  });
});

// 3. 知识库渲染卡片 + 搜索/筛选
const knowledgeContainer = document.getElementById("page-knowledge");

function buildKnowledgeToolbar() {
  let toolbar = knowledgeContainer.querySelector(".knowledge-toolbar");
  if (toolbar) toolbar.remove();
  toolbar = document.createElement("div");
  toolbar.className = "knowledge-toolbar";

  // 从 POEMS_RAW 自动去重生成朝代下拉（按"先秦→汉魏→唐→宋"时间序展示，新朝代自动追加到末尾）
  const dynOrder = [];
  POEMS_RAW.forEach((p) => {
    const d = p.dynasty;
    if (!d || dynOrder.indexOf(d) !== -1) return;
    dynOrder.push(d);
  });
  const dynPreferred = ["先秦", "汉魏", "唐", "宋"];
  dynOrder.sort((a, b) => {
    const ia = dynPreferred.indexOf(a);
    const ib = dynPreferred.indexOf(b);
    if (ia === -1 && ib === -1) return 0;
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
  const dynOptions = dynOrder
    .map((d) => '<option value="' + d + '">' + d + "</option>")
    .join("");

  toolbar.innerHTML =
    '<input type="search" class="search-input knowledge-search" placeholder="搜索篇目、作者或赏析" />' +
    '<select class="knowledge-dynasty" aria-label="按朝代筛选">' +
    '<option value="">全部</option>' +
    dynOptions +
    "</select>" +
    '<select class="knowledge-form" aria-label="按体裁筛选">' +
    '<option value="">全部</option>' +
    '<option value="诗">诗</option>' +
    '<option value="词">词</option>' +
    '<option value="赋">赋</option>' +
    '<option value="文">文</option>' +
    "</select>";

    '<option value="">全部</option>' +
    '<option value="诗">诗</option>' +
    '<option value="词">词</option>' +
    '<option value="赋">赋</option>' +
    '<option value="文">文</option>' +
    "</select>";
  // 放在 h1 之后
  const h1 = knowledgeContainer.querySelector("h1");
  if (h1) {
    knowledgeContainer.insertBefore(toolbar, h1.nextSibling);
  } else {
    knowledgeContainer.insertBefore(toolbar, knowledgeContainer.firstChild);
  }
  const search = toolbar.querySelector(".knowledge-search");
  const dyn = toolbar.querySelector(".knowledge-dynasty");
  const form = toolbar.querySelector(".knowledge-form");
  const onChange = () => filterAndRenderKnowledge();
  search.addEventListener("input", onChange);
  dyn.addEventListener("change", onChange);
  form.addEventListener("change", onChange);
  return { search, dyn, form };
}

function renderKnowledge(list) {
  knowledgeContainer.querySelectorAll(".page-grid, .no-result, .knowledge-toolbar").forEach((el) => el.remove());
  buildKnowledgeToolbar();
  if (!list || list.length === 0) {
    const p = document.createElement("p");
    p.className = "no-result";
    p.textContent = "没有找到相关篇目";
    knowledgeContainer.appendChild(p);
    return;
  }
  const grid = document.createElement("div");
  grid.className = "page-grid";
  list.forEach((poem) => {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.poem = poem.title;
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    const baseTag = poem.dynasty && poem.form ? poem.dynasty + " · " + poem.form : (poem.dynasty || "");
    card.innerHTML =
      '<div class="card-meta">' +
      '<span class="dian">' + poem.dynasty + "</span>" +
      '<span class="author"> ' + poem.author + "</span>" +
      "</div>" +
      '<h2 class="card-title">' + (poem.title || "").toString().trim() + "</h2>" +
      '<div class="card-tags">' +
        '<span class="card-tag card-tag-base">' + baseTag + "</span>" +
        (poem.level ? '<span class="card-tag card-tag-level">' + poem.level + "</span>" : "") +
      "</div>" +
      '<p class="card-desc">' + poem.comment + "</p>";
    const go = () => openChatWithPoem(poem);
    card.addEventListener("click", go);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        go();
      }
    });
    grid.appendChild(card);
  });
  knowledgeContainer.appendChild(grid);
}

function filterAndRenderKnowledge() {
  const toolbar = knowledgeContainer.querySelector(".knowledge-toolbar");
  if (!toolbar) {
    renderKnowledge(POEMS);
    return;
  }
  const q = (toolbar.querySelector(".knowledge-search").value || "").trim().toLowerCase();
  const dyn = toolbar.querySelector(".knowledge-dynasty").value;
  const form = toolbar.querySelector(".knowledge-form").value;
  const filtered = POEMS.filter((p) => {
    if (dyn && p.dynasty !== dyn) return false;
    if (form && p.form !== form) return false;
    if (q) {
      const title = (p.title || "").toLowerCase();
      const author = (p.author || "").toLowerCase();
      const comment = (p.comment || "").toLowerCase();
      if (title.indexOf(q) === -1 && author.indexOf(q) === -1 && comment.indexOf(q) === -1) return false;
    }
    return true;
  });
  renderKnowledge(filtered);
}

// 4. 问答页：展示当前所选诗的标题
const chatSection = document.getElementById("page-chat");

function openChatWithPoem(poem) {
  // 切换页面
  switchPage("page-chat");

  // 在问答页顶部插入 / 更新当前诗标题
  let chip = chatSection.querySelector(".chat-poem-chip");
  if (!chip) {
    chip = document.createElement("div");
    chip.className = "chat-poem-chip card";
    chatSection.insertBefore(chip, chatSection.querySelector("h1")?.nextElementSibling || null);
  }
  chip.innerHTML =
    '<div class="card-meta"><span class="dian">' + poem.dynasty + "</span>" +
    "<span class=\"author\">" + poem.author + "</span></div>" +
    '<h2 class="card-title">' + poem.title + "</h2>" +
    '<p class="card-desc">围绕《' + poem.title + "》提问，获取诗词赏析。</p>";

  // 若当前是《登高》，在题目下方渲染渐进式提示题（只给线索，不出现答案原文）
  let quizBox = chatSection.querySelector(".quiz-box");
  if (poem.title === "登高") {
    if (!quizBox) {
      quizBox = document.createElement("div");
      quizBox.className = "quiz-box card";
      // 放在 chip/说明之后、其他内容之前
      const h1 = chatSection.querySelector("h1");
      const h1Next = h1?.nextElementSibling || null;
      chatSection.insertBefore(quizBox, h1Next || null);
    }
    renderQuiz(quizBox, DENGGAO_QUIZ);
  } else if (quizBox) {
    quizBox.remove();
  }
}

// 5. 登高·高考真题：渐进式提示（三次答错后显示答案）
const DENGGAO_QUIZ = {
  source: "2022年全国甲卷（高考真题）",
  poemTitle: "登高",
  stem:
    "杜甫《登高》中“________，________”两句都使用了叠字，从听觉、视觉上突出了对景伤怀的感受。",
  answer: "无边落木萧萧下，不尽长江滚滚来",
  // 答案的「只露露面」判定（不区分空格/标点）
  answerKey: "无边落木萧萧下不尽长江滚滚来",
  hints: [
    "这首诗写的是秋天登高所见。想一想，诗人站在高处，听到了什么声音？看到了什么景象？",
    "诗的前两句各有一个叠字词，一个从听觉写，一个从视觉写。找找看，是哪两个叠词？",
    "这两句是对仗的：上句写“风、天、猿”，下句写“渚、沙、鸟”。按这个结构，试着把两句补完整。"
  ],
  errorTags: ["背景常识缺失", "字词释义偏差"],
  maxWrongBeforeAnswer: 3
};

// 6. 师说·高考真题（2025 新课标 I 卷）
const SHUOSHE_QUIZ_1 = {
  source: "2025新课标Ⅰ卷（高考真题）",
  poemTitle: "shuo-shi-1",
  stem:
    "在毕业典礼上，柳教授谦逊地引用韩愈《师说》中的“________，________”两句，勉励学生们青出于蓝而胜于蓝。",
  answer: "弟子不必不如师，师不必贤于弟子",
  // 判分用无标点版；学生答案里写了"是故"三字由 normalize 自动剥掉
  answerKey: "弟子不必不如师师不必贤于弟子",
  hints: [
    "讲师生能力高低没有固定定论，学生可以超过老师。",
    "阐释师生关系，核心观点是学生不一定比不上老师。",
    "句子开头可以带“是故”，两句对比弟子和老师谁更有才能。"
  ],
  errorTags: ["背景常识缺失", "审题逻辑疏漏"],
  maxWrongBeforeAnswer: 3
};


function renderQuiz(box, quiz) {
  const state = { wrong: 0, hint: 0, solved: false, revealed: false, revealingHint: false, lastWrong: "" };
  const isRetrain = quiz && quiz.__isRetrain === true;

  const parts = [];
  // 出处徽章
  parts.push('<div class="quiz-source">' + quiz.source + "</div>");
  // 错因标签
  parts.push(
    '<div class="quiz-tags">' +
      quiz.errorTags.map((t) => '<span class="quiz-tag">' + t + "</span>").join("") +
      "</div>"
  );
  // 题干
  parts.push('<p class="quiz-stem">' + quiz.stem + "</p>");
  // 作答区
  parts.push(
    '<form class="quiz-form">' +
      '<input type="text" class="quiz-input" placeholder="请输入你的答案（两个分句之间用逗号或空格分隔）" autocomplete="off" />' +
      '<div class="quiz-actions">' +
        '<button type="submit" class="btn btn-primary">提交</button>' +
        '<button type="button" class="btn btn-jade quiz-hint-btn">提示（剩 ' +
          (quiz.hints.length - state.hint) + " 次）</button>" +
      "</div>" +
      '<p class="quiz-msg" role="status" hidden></p>' +
    "</form>"
  );
  // 渐进提示容器（每次点击「提示」追加一段）
  parts.push('<div class="quiz-hints"></div>');
  // 答案区域（默认隐藏）
  parts.push(
    '<details class="quiz-answer" hidden>' +
      "<summary>查看答案</summary>" +
      '<div class="quiz-answer-text">' + quiz.answer + "</div>" +
      "</details>"
  );

  box.innerHTML = parts.join("");

  const input = box.querySelector(".quiz-input");
  const form = box.querySelector("form.quiz-form");
  const msg = box.querySelector(".quiz-msg");
  const hintsBox = box.querySelector(".quiz-hints");
  const hintBtn = box.querySelector(".quiz-hint-btn");
  const answerBox = box.querySelector(".quiz-answer");

  function normalize(s) {
    return (s || "").replace(/[\s，,、．。；;]/g, "");
  }

  // 反馈消息：初始隐藏，只有调用时显示
  function showMsg(text) {
    msg.textContent = text;
    msg.removeAttribute("hidden");
  }

  function revealNow() {
    if (state.revealed) return;
    state.revealed = true;
    state.solved = false;
    answerBox.removeAttribute("hidden");
    answerBox.open = true;
    showMsg("已显示参考答案。");
    input.disabled = true;
    hintBtn.disabled = true;
    form.querySelector('button[type="submit"]').disabled = true;
    // 记入错题本（同一题再次答错：wrongCount+1，并更新 wrongAnswer；否则新增）
    const existing = mistakes.find((m) => m.poem === quiz.poemTitle && m.question === quiz.stem);
    if (existing) {
      existing.wrongCount = (existing.wrongCount || 0) + 1;
      existing.wrongAnswer = state.lastWrong || existing.wrongAnswer || "";
    } else {
      mistakes.push({
        poem: quiz.poemTitle,
        question: quiz.stem,
        answer: quiz.answer,
        source: quiz.source,
        tags: quiz.errorTags,
        wrongAnswer: state.lastWrong || "",
        wrongCount: 1
      });
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const raw = (input.value || "").trim();
    if (!raw) {
      showMsg("请先填写你的答案。");
      return;
    }
    // 命中判分：去掉空格/标点后包含完整答案原文
    if (normalize(raw).includes(quiz.answerKey)) {
      state.solved = true;
      if (isRetrain) {
        const idx = mistakes.findIndex((m) => m.poem === quiz.poemTitle && m.question === quiz.stem);
        if (idx !== -1) mistakes.splice(idx, 1);
        showMsg("已掌握，移出错题本");
      } else {
        showMsg("回答正确！");
      }
      msg.classList.remove("wrong");
      msg.classList.add("right");
      input.disabled = true;
      form.querySelector('button[type="submit"]').disabled = true;
      hintBtn.disabled = true;
      return;
    }
    // 答错：累计；答错次数超过提示条数后才显示答案
    state.wrong += 1;
    state.lastWrong = raw;
    if (state.wrong > quiz.hints.length) {
      revealNow();
    } else {
      showMsg("还差一点，再想想。已尝试 " + state.wrong + " 次。");
      msg.classList.remove("right");
      msg.classList.add("wrong");
      // 答错时追加下一条提示（若还有剩余）
      if (state.hint < quiz.hints.length) {
        pushHint();
      }
    }
  });

  function pushHint() {
    if (state.hint >= quiz.hints.length) return;
    const text = quiz.hints[state.hint];
    const p = document.createElement("p");
    p.className = "quiz-hint-item";
    p.textContent = "提示 " + (state.hint + 1) + "：" + text;
    hintsBox.appendChild(p);
    state.hint += 1;
    hintBtn.textContent = "提示（剩 " + (quiz.hints.length - state.hint) + " 次）";
    if (state.hint >= quiz.hints.length) hintBtn.disabled = true;
  }

  hintBtn.addEventListener("click", () => {
    if (state.revealed || state.solved || state.revealingHint) return;
    state.revealingHint = true;
    pushHint();
    state.revealingHint = false;
  });
}

// 7a. 错题重练：构造一个临时 quiz 投回问答页作答
function normalizeForAnswer(s) {
  return (s || "").replace(/[\s，,、．。；;]/g, "");
}

function retrainQuiz(m) {
  const fallbackPoem = {
    id: "retrain",
    title: m.poem,
    author: m.author || "重练",
    dynasty: m.dynasty || "",
    comment: "来自错题本重练"
  };
  const byTitle = POEMS.find((p) => p.title === m.poem);
  openChatWithPoem(byTitle || fallbackPoem);

  // 重练标记挂到 window 上，避免渲染 DENGGAO_QUIZ 抢走 quiz 槽
  window.__RETRAIN_QUIZ__ = {
    source: m.source || "错题本重练",
    poemTitle: m.poem,
    stem: m.question,
    answer: m.answer,
    answerKey: normalizeForAnswer(m.answer),
    hints: (m.hints && m.hints.length) ? m.hints : [],
    errorTags: m.tags || [],
    maxWrongBeforeAnswer: 1,
    __isRetrain: true
  };

  // 等下一帧（switchPage 已切到 page-chat，chip 已插入），强制清空再建 quiz-box
  let quizBox = chatSection.querySelector(".quiz-box");
  if (!quizBox) {
    quizBox = document.createElement("div");
    quizBox.className = "quiz-box card";
    quizBox.style.marginTop = "16px";
    const h1 = chatSection.querySelector("h1");
    const h1Next = h1?.nextElementSibling || null;
    chatSection.insertBefore(quizBox, h1 ? h1Next : quizBox ? null : chatSection.firstChild);
  } else {
    quizBox.innerHTML = "";
    quizBox.style.marginTop = "16px";
  }
  renderQuiz(quizBox, window.__RETRAIN_QUIZ__);
  const inp = quizBox.querySelector(".quiz-input");
  if (inp) { inp.focus(); }
}

// 7. 错题本渲染
const mistakesContainer = document.getElementById("page-mistakes");

function renderMistakes() {
  mistakesContainer.querySelectorAll(".mistake-list, .mistakes-empty, .mistakes-tip").forEach((el) => el.remove());

  const tip = document.createElement("p");
  tip.className = "mistakes-tip";
  tip.textContent = "点击卡片展开查看错解；点「查看正确答案」才显示答案";
  mistakesContainer.appendChild(tip);

  if (mistakes.length === 0) {
    const p = document.createElement("p");
    p.className = "mistakes-empty";
    p.textContent = "暂无错题，继续加油";
    mistakesContainer.appendChild(p);
    return;
  }

  const grid = document.createElement("div");
  grid.className = "mistake-list";
  mistakes.forEach((m) => {
    const card = document.createElement("article");
    card.className = "card mistake-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-expanded", "false");
    const wrongCount = m.wrongCount || 1;
    const wrongAnswer = m.wrongAnswer || "（无记录）";
    card.innerHTML =
      '<h2 class="card-title">' + m.poem +
      '<span class="wrong-count">错 ' + wrongCount + " 次</span></h2>" +
      '<p class="mistake-question">' + m.question + "</p>" +
      '<div class="card-meta"><span class="mistake-source">' + m.source + "</span></div>" +
      '<div class="mistake-detail" hidden>' +
        '<div class="mistake-wrong">我的错解：' + wrongAnswer + "</div>" +
        '<div class="mistake-answer-wrap" hidden>' +
          '<div class="mistake-answer">正确答案：' + m.answer + "</div>" +
          '<div class="quiz-tags">' + (m.tags || []).map((t) => '<span class="quiz-tag">' + t + "</span>").join("") + "</div>" +
        "</div>" +
        '<button type="button" class="mistake-reveal">查看正确答案</button>' +
        '<button type="button" class="mistake-retry">重练这道题</button>' +
      "</div>";

    const detail = card.querySelector(".mistake-detail");
    const answerWrap = card.querySelector(".mistake-answer-wrap");
    const revealBtn = card.querySelector(".mistake-reveal");
    const retryBtn = card.querySelector(".mistake-retry");

    function toggleCard() {
      const expanded = card.getAttribute("aria-expanded") === "true";
      card.setAttribute("aria-expanded", String(!expanded));
      if (expanded) {
        detail.setAttribute("hidden", "");
      } else {
        detail.removeAttribute("hidden");
      }
    }
    function toggleAnswer() {
      const shown = !answerWrap.hasAttribute("hidden");
      if (shown) {
        answerWrap.setAttribute("hidden", "");
        revealBtn.textContent = "查看正确答案";
      } else {
        answerWrap.removeAttribute("hidden");
        revealBtn.textContent = "收起答案";
      }
    }

    card.addEventListener("click", (e) => {
      if (e.target === revealBtn || e.target === retryBtn) return;
      toggleCard();
    });
    card.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && e.target === card) {
        e.preventDefault();
        toggleCard();
      }
    });
    revealBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleAnswer();
    });
    retryBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      retrainQuiz(m);
    });

    grid.appendChild(card);
  });
  mistakesContainer.appendChild(grid);
}

// 8. 学情画像：四维雷达图
const profileContainer = document.getElementById("page-profile");
const TAG_COUNT_KEYS = ["字词释义偏差", "句法结构误解", "背景常识缺失", "审题逻辑疏漏"];

function countTags() {
  const counts = {};
  TAG_COUNT_KEYS.forEach((k) => (counts[k] = 0));
  mistakes.forEach((m) => {
    (m.tags || []).forEach((t) => {
      if (Object.prototype.hasOwnProperty.call(counts, t)) counts[t] += 1;
    });
  });
  return counts;
}

function buildRadarSVG(scores) {
  const size = 400;
  const cx = size / 2;
  const cy = size / 2 + 12;
  const radius = 130;
  const levels = [20, 40, 60, 80, 100];
  const dims = [
    { name: "识记", angle: -90, value: scores["识记"] },
    { name: "理解", angle: 0, value: scores["理解"] },
    { name: "鉴赏", angle: 90, value: scores["鉴赏"] },
    { name: "表达", angle: 180, value: scores["表达"] }
  ];
  const toXY = (angleDeg, scale) => {
    const rad = (angleDeg * Math.PI) / 180;
    const r = (radius * scale) / 100;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };
  const gridPolys = levels
    .map((lv) => {
      const p = dims
        .map((d) => toXY(d.angle, lv))
        .map((pt) => pt.join(","))
        .join(" ");
      return '<polygon class="radar-grid" points="' + p + '"></polygon>';
    })
    .join("");
  const axes = dims
    .map((d) => {
      const [x, y] = toXY(d.angle, 100);
      return '<line class="radar-axis" x1="' + cx + '" y1="' + cy + '" x2="' + x + '" y2="' + y + '"></line>';
    })
    .join("");
  const dataPts = dims
    .map((d) => toXY(d.angle, d.value))
    .map((pt) => pt.map((n) => n.toFixed(2)).join(","))
    .join(" ");
  const dataDots = dims
    .map((d) => {
      const [x, y] = toXY(d.angle, d.value);
      return '<circle class="radar-center" cx="' + x.toFixed(2) + '" cy="' + y.toFixed(2) + '" r="4"></circle>';
    })
    .join("");
  const labels = dims
    .map((d) => {
      const [x, y] = (() => {
        const rad = (d.angle * Math.PI) / 180;
        const lr = radius + 26;
        return [cx + lr * Math.cos(rad), cy + lr * Math.sin(rad)];
      })();
      const cos = Math.cos((d.angle * Math.PI) / 180);
      const sin = Math.sin((d.angle * Math.PI) / 180);
      const anchor = Math.abs(cos) < 0.01 ? "middle" : cos > 0 ? "start" : "end";
      const baseline = Math.abs(sin) < 0.01 ? "middle" : sin > 0 ? "hanging" : "auto";
      return (
        '<text class="radar-label" x="' + x.toFixed(2) + '" y="' + y.toFixed(2) +
        '" text-anchor="' + anchor + '" dominant-baseline="' + baseline + '">' +
        d.name + " " + d.value + "</text>"
      );
    })
    .join("");
  const titleText =
    '<text class="radar-label" x="' + cx + '" y="22" text-anchor="middle" font-size="15" font-weight="700">学情四维画像</text>';
  return (
    '<svg class="profile-svg" viewBox="0 0 ' + size + " " + size + '" width="100%" height="' + size + '" role="img" aria-label="学情四维雷达图" preserveAspectRatio="xMidYMid meet">' +
    titleText +
    gridPolys +
    axes +
    '<polygon class="radar-data" points="' + dataPts + '"></polygon>' +
    dataDots +
    labels +
    "</svg>"
  );
}

function renderProfile() {
  profileContainer.querySelectorAll(".profile-grid, .profile-summary").forEach((el) => el.remove());
  const c = countTags();
  let scores;
  if (mistakes.length === 0) {
    scores = { 识记: 60, 理解: 60, 鉴赏: 60, 表达: 60 };
  } else {
    scores = {
      识记: Math.max(30, 100 - c["字词释义偏差"] * 10),
      理解: Math.max(30, 100 - c["句法结构误解"] * 10),
      鉴赏: Math.max(30, 100 - c["背景常识缺失"] * 10),
      表达: Math.max(30, 100 - c["审题逻辑疏漏"] * 10)
    };
  }
  const grid = document.createElement("div");
  grid.className = "profile-grid";
  const wrap = document.createElement("div");
  wrap.className = "profile-svg-wrap";
  wrap.innerHTML = buildRadarSVG(scores);
  grid.appendChild(wrap);
  profileContainer.appendChild(grid);

  const summary = document.createElement("p");
  summary.className = "profile-summary";
  summary.textContent = "已练习 " + mistakes.length + " 道题，错题 " + mistakes.length + " 道。";
  profileContainer.appendChild(summary);
}

// 初始化
document.addEventListener("DOMContentLoaded", () => {
  renderKnowledge(POEMS);
  // 若 URL hash 已定位到某页，按该页打开
  const hash = window.location.hash.replace("#", "");
  const validPages = ["page-knowledge", "page-chat", "page-mistakes", "page-profile"];
  if (validPages.includes(hash)) {
    switchPage(hash);
  }
});

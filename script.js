const STORAGE_KEY = "house-solver-sop-state-v1";

const stages = [
  ["intake", "接案", "👥"],
  ["measure", "丈量", "📏"],
  ["design", "對客設計", "✎"],
  ["quote", "報價", "▤"],
  ["contract", "簽約", "🤝"],
  ["build", "施工", "⌁"],
  ["acceptance", "驗收", "☑"],
  ["aftercare", "售後", "☎"],
];

const taskTemplates = [
  ["intake", "需求訪談", "記錄空間需求、家庭成員與使用情境。"],
  ["intake", "預算範圍", "確認可接受總預算與彈性區間。"],
  ["intake", "案場基本資料", "建立地址、屋齡、坪數與聯絡資訊。"],
  ["intake", "風格偏好", "蒐集參考圖、材質偏好與禁忌元素。"],
  ["intake", "時程期待", "確認入住、施工與決策節點。"],
  ["intake", "簽訂設計合約", "確認設計合約版本、簽署狀態與付款條件。"],
  ["measure", "現場尺寸", "完成牆面、樑柱、開口與天花尺寸。"],
  ["measure", "樑柱/管線/開口紀錄", "標示排水、電箱、冷氣與窗門位置。"],
  ["measure", "照片歸檔", "依區域命名並上傳專案資料夾。"],
  ["measure", "屋況問題", "記錄壁癌、漏水、地坪落差與修繕風險。"],
  ["measure", "丈量圖確認", "丈量圖與照片交叉確認後鎖版。"],
  ["design", "現況平面含水電圖", "完成現況平面、水電位置與限制條件確認。"],
  ["design", "平面配置圖", "完成對客版平面配置與主要尺寸標註。"],
  ["design", "假設工程圖", "標示臨時保護、施工假設與前置工程範圍。"],
  ["design", "拆除圖", "確認拆除牆體、設備、地坪與天花範圍。"],
  ["design", "汙工工程圖", "確認泥作、砌牆、粉刷與相關工程範圍。"],
  ["design", "門窗圖(平立面)", "完成門窗平面與立面尺寸、開向、材質標註。"],
  ["design", "新建隔間圖", "標示新建牆體、隔間材質與厚度。"],
  ["design", "天花板造型圖", "完成天花高度、造型、維修孔與燈具關係。"],
  ["design", "燈光工程圖", "確認照明形式、迴路邏輯與施工需求。"],
  ["design", "立面索引圖", "建立立面編號、視角與圖面索引。"],
  ["design", "塗料圖", "確認塗料範圍、色號與特殊塗裝需求。"],
  ["design", "地坪飾材圖", "確認地坪材質、分界、收邊與鋪設方向。"],
  ["design", "外飾材圖", "確認外部或外露面飾材範圍與規格。"],
  ["design", "電路配置圖", "確認插座、專迴、弱電與設備用電位置。"],
  ["design", "燈具開關迴路圖", "確認燈具與開關對應關係。"],
  ["design", "燈具配置點位圖", "確認燈具點位、間距與安裝條件。"],
  ["design", "水路和瓦斯配置圖", "確認給排水、瓦斯管線與設備接口。"],
  ["design", "空調管線圖", "確認室內外機、冷媒管、排水與維修路徑。"],
  ["quote", "工程項目拆分", "依工種拆項並避免漏列拆除與保護。"],
  ["quote", "材料規格", "確認板材、石材、磁磚、塗料與五金等級。"],
  ["quote", "追加減項", "標註選配項、備選方案與可調整範圍。"],
  ["quote", "付款節點", "確認訂金、開工、工程進度與尾款比例。"],
  ["quote", "報價單確認", "客戶確認版本、有效期限與附件圖面。"],
  ["contract", "合約內容", "確認服務範圍、工程範圍與雙方責任。"],
  ["contract", "圖面附件", "附上簽約版圖面、報價單與材料清單。"],
  ["contract", "付款條件", "確認匯款資訊、發票方式與付款期限。"],
  ["contract", "工期", "排定開工日、主要里程碑與完工目標。"],
  ["contract", "變更流程", "說明追加減、圖面變更與書面確認規則。"],
  ["build", "開工前保護", "確認公共區域、電梯、門框與地坪保護。"],
  ["build", "工班排程", "依拆除、水電、泥作、木作、油漆排程。"],
  ["build", "現場巡檢", "每週更新進度照片、問題與待確認事項。"],
  ["build", "材料進場", "核對數量、規格、批號與瑕疵狀況。"],
  ["build", "施工異常紀錄", "記錄現場變更、延誤原因與處理方式。"],
  ["acceptance", "完工清潔", "完成細清並移除臨時保護。"],
  ["acceptance", "缺失清單", "逐區拍照記錄並標示負責工種。"],
  ["acceptance", "修繕確認", "缺失完成後複查並留下前後照片。"],
  ["acceptance", "尾款資料", "提供尾款請款、發票與付款資訊。"],
  ["acceptance", "交屋文件", "整理保固、設備說明、圖面與材料資料。"],
  ["aftercare", "保固說明", "交付保固範圍、期限與不保固項目。"],
  ["aftercare", "維修窗口", "建立維修通報方式與回覆時限。"],
  ["aftercare", "回訪紀錄", "入住後一個月追蹤使用狀況。"],
  ["aftercare", "客戶滿意度", "收集評分、推薦意願與改善建議。"],
  ["aftercare", "案例照片整理", "確認授權並歸檔完工照片。"],
];

const defaultMembers = [
  ["member-1", "林育萱", "專案經理", true],
  ["member-2", "周柏翰", "業務窗口", true],
  ["member-3", "張家豪", "工務主任", true],
  ["member-4", "主設計師", "設計部", true],
  ["member-5", "估價專員", "估價部", true],
  ["member-6", "財務", "行政財務", true],
  ["member-7", "客服", "售後服務", true],
];

const seedProjects = [
  ["project-1", "A001 林宅｜信義區老屋翻新", "林育萱", "主設計師", "張家豪", "進行中", "管線位置待水電師傅二次確認。"],
  ["project-2", "A002 陳宅｜新成屋客變", "周柏翰", "主設計師", "張家豪", "進行中", "客戶希望壓低預算，需要主管協助決策材料替代。"],
  ["project-3", "A003 何宅｜商空接待中心", "林育萱", "主設計師", "張家豪", "待確認", "消防法規與天花高度仍需確認。"],
  ["project-4", "A004 王宅｜親子宅設計", "周柏翰", "主設計師", "工務主任", "進行中", "收納量增加，平面配置需再討論。"],
  ["project-5", "A005 李宅｜中古屋翻修", "林育萱", "主設計師", "張家豪", "進行中", "浴室漏水源頭待抓漏廠商回覆。"],
  ["project-6", "A006 黃宅｜退休宅", "周柏翰", "主設計師", "工務主任", "待確認", "無障礙需求需與家屬再次確認。"],
  ["project-7", "A007 張宅｜小坪數收納", "林育萱", "主設計師", "張家豪", "進行中", "系統櫃深度與走道尺度需取捨。"],
  ["project-8", "A008 吳宅｜預售屋客變", "周柏翰", "主設計師", "張家豪", "進行中", "建商客變期限較近，需要優先處理。"],
  ["project-9", "A009 趙宅｜毛胚屋", "林育萱", "主設計師", "張家豪", "待確認", "空調與新風系統報價等待廠商提供。"],
  ["project-10", "A010 精品辦公室", "周柏翰", "主設計師", "工務主任", "進行中", "會議室隔音方案需主管確認預算。"],
];

const state = {
  view: "overview",
  activeProjectId: "project-1",
  filters: {
    overviewSearch: "",
    overviewStatus: "all",
    overviewStage: "all",
    archivedSearch: "",
    taskOwner: "all",
    taskStatus: "todo",
  },
  openStages: new Set(["intake", "measure"]),
  data: null,
  supabase: null,
  usingCloud: false,
};

const els = {
  toolbar: document.querySelector("#toolbar"),
  viewPanel: document.querySelector("#viewPanel"),
  summaryGrid: document.querySelector("#summaryGrid"),
  viewLabel: document.querySelector("#viewLabel"),
  viewTitle: document.querySelector("#viewTitle"),
  navItems: document.querySelectorAll(".nav-item"),
  syncMode: document.querySelector("#syncMode"),
  syncHint: document.querySelector("#syncHint"),
};

init();

async function init() {
  state.supabase = createSupabaseClient();
  state.data = await loadData();
  normalizeData();
  if (state.usingCloud) await syncCloudData();
  await saveData();
  bindGlobalEvents();
  render();
}

function createSupabaseClient() {
  const config = window.SOP_SUPABASE_CONFIG || {};
  if (!config.url || !config.anonKey || !window.supabase) return null;
  return window.supabase.createClient(config.url, config.anonKey);
}

async function loadData() {
  if (state.supabase) {
    try {
      const [projects, members, tasks, documents] = await Promise.all([
        state.supabase.from("projects").select("*").order("updated_at", { ascending: false }),
        state.supabase.from("team_members").select("*").order("name"),
        state.supabase.from("project_tasks").select("*"),
        state.supabase.from("documents").select("*").order("updated_at", { ascending: false }),
      ]);
      if (!projects.error && !members.error && !tasks.error && !documents.error) {
        state.usingCloud = true;
        if (!projects.data.length) {
          const seeded = createSeedData();
          await seedCloudData(seeded);
          return seeded;
        }
        return {
          projects: projects.data,
          teamMembers: members.data,
          tasks: tasks.data,
          documents: documents.data,
        };
      }
    } catch {
      state.usingCloud = false;
    }
  }

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.projects && saved?.teamMembers && saved?.tasks) return saved;
  } catch {
    // Use seed data below.
  }

  return createSeedData();
}

async function seedCloudData(data) {
  await Promise.all([
    state.supabase.from("projects").upsert(data.projects),
    state.supabase.from("team_members").upsert(data.teamMembers),
    state.supabase.from("project_tasks").upsert(data.tasks.map((task) => toCloudRecord("project_tasks", task))),
    state.supabase.from("documents").upsert(data.documents),
  ]);
}

async function syncCloudData() {
  await Promise.all([
    state.supabase.from("projects").upsert(state.data.projects),
    state.supabase.from("team_members").upsert(state.data.teamMembers),
    state.supabase.from("project_tasks").upsert(state.data.tasks.map((task) => toCloudRecord("project_tasks", task))),
    state.supabase.from("documents").upsert(state.data.documents),
  ]);
}

function createSeedData() {
  const teamMembers = defaultMembers.map(([id, name, role, active]) => ({
    id,
    name,
    role,
    active,
    updated_at: now(),
  }));
  const projects = seedProjects.map(([id, name, consultant, designer, engineer, status, help], index) => ({
    id,
    name,
    consultant,
    designer,
    engineer,
    status,
    help,
    archived: false,
    updated_at: now(index),
  }));
  const tasks = projects.flatMap((project, projectIndex) =>
    taskTemplates.map(([stage_id, title, note], taskIndex) => ({
      id: `${project.id}-task-${taskIndex + 1}`,
      project_id: project.id,
      stage_id,
      title,
      done: taskIndex < projectIndex % 14,
      owner: defaultTaskOwner(stage_id, project),
      due_date: dueDate(projectIndex, taskIndex),
      note,
      updated_at: now(projectIndex + taskIndex),
    })),
  );
  const documents = projects.slice(0, 4).map((project, index) => ({
    id: `document-${index + 1}`,
    project_id: project.id,
    name: `${project.name} 報價單`,
    type: "報價",
    url: "",
    note: "待上傳正式連結。",
    updated_at: now(index),
  }));
  return { projects, teamMembers, tasks, documents };
}

function normalizeData() {
  state.data.projects ||= [];
  state.data.teamMembers ||= [];
  state.data.tasks ||= [];
  state.data.documents ||= [];

  if (!state.data.projects.length) {
    state.data = createSeedData();
  }

  state.data.projects.forEach((project) => {
    project.consultant ||= project.pm || activeMembers()[0]?.name || "";
    project.designer ||= project.pm === "主設計師" ? project.pm : "主設計師";
    project.engineer ||= ["張家豪", "工務主任"].find((name) => activeMembers().some((member) => member.name === name)) || activeMembers()[0]?.name || "";
    delete project.client;
    delete project.address;
    delete project.pm;
  });
  reconcileTasksWithTemplates();
  state.activeProjectId = state.data.projects.find((project) => project.id === state.activeProjectId)?.id || state.data.projects[0]?.id;
}

function reconcileTasksWithTemplates() {
  const templateKeys = new Set(taskTemplates.map(([stageId, title]) => `${stageId}::${title}`));
  state.data.tasks = state.data.tasks.filter((task) => templateKeys.has(`${task.stage_id}::${task.title}`));
  state.data.projects.forEach((project) => {
    taskTemplates.forEach(([stage_id, title, note], index) => {
      const exists = state.data.tasks.some((task) => task.project_id === project.id && task.stage_id === stage_id && task.title === title);
      if (!exists) {
        state.data.tasks.push({
          id: `${project.id}-${stage_id}-${slugify(title)}`,
          project_id: project.id,
          stage_id,
          title,
          done: false,
          owner: defaultTaskOwner(stage_id, project),
          due_date: null,
          note,
          updated_at: now(index),
        });
      }
    });
  });
}

async function saveData() {
  updateSyncStatus();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
}

async function persistRecord(table, record) {
  record.updated_at = now();
  if (state.supabase && state.usingCloud) {
    try {
      await state.supabase.from(table).upsert(toCloudRecord(table, record));
    } catch {
      state.usingCloud = false;
    }
  }
  await saveData();
}

function toCloudRecord(table, record) {
  if (table !== "project_tasks") return record;
  return { ...record, due_date: record.due_date || null };
}

async function deleteRecord(table, id) {
  if (state.supabase && state.usingCloud) {
    try {
      await state.supabase.from(table).delete().eq("id", id);
    } catch {
      state.usingCloud = false;
    }
  }
  await saveData();
}

function bindGlobalEvents() {
  els.navItems.forEach((item) => {
    item.addEventListener("click", () => {
      state.view = item.dataset.view;
      render();
    });
  });
  els.viewPanel.addEventListener("change", handlePanelChange);
  els.viewPanel.addEventListener("blur", handlePanelBlur, true);
  els.viewPanel.addEventListener("click", handlePanelClick);
}

function handlePanelChange(event) {
  handleProjectFieldChange(event);
  handleTaskChange(event);
  handleDocumentChange(event);
  handleMemberChange(event);
}

function handlePanelBlur(event) {
  handleProjectFieldChange(event);
  handleTaskChange(event);
  handleDocumentChange(event);
  handleMemberChange(event);
}

function handlePanelClick(event) {
  handleProjectAction(event);
  handleWorkflowClick(event);
  handleDocumentDelete(event);
}

function render() {
  els.navItems.forEach((item) => item.classList.toggle("active", item.dataset.view === state.view));
  const renderers = {
    overview: renderOverview,
    archived: renderArchived,
    workflow: renderWorkflow,
    tasks: renderTasks,
    calendar: renderCalendar,
    documents: renderDocuments,
    team: renderTeam,
  };
  renderers[state.view]();
}

function renderChrome(label, title, toolbar = "") {
  els.viewLabel.textContent = label;
  els.viewTitle.textContent = title;
  els.toolbar.innerHTML = toolbar;
}

function renderSummary(cards) {
  els.summaryGrid.innerHTML = cards
    .map(
      (card) => `
        <article class="summary-card">
          <p>${card.label}</p>
          <strong>${card.value}</strong>
          <span class="summary-note">${card.note}</span>
        </article>
      `,
    )
    .join("");
}

function renderOverview() {
  renderChrome(
    "專案總覽",
    "所有案件進度",
    `
      <label class="search-field"><span>⌕</span><input id="overviewSearch" type="search" placeholder="搜尋案件、負責人、求助內容" value="${escapeAttr(state.filters.overviewSearch)}" /></label>
      <select id="overviewStatus"><option value="all">全部狀態</option>${projectStatusOptions(state.filters.overviewStatus)}</select>
      <select id="overviewStage"><option value="all">全部階段</option>${stageOptions(state.filters.overviewStage)}</select>
      <button class="primary-button" id="addProjectBtn" type="button">新增案件</button>
    `,
  );

  const activeProjects = state.data.projects.filter((project) => !project.archived);
  const filtered = activeProjects.filter((project) => {
    const progress = projectProgress(project.id);
    const text = `${project.name} ${project.consultant} ${project.designer} ${project.engineer} ${project.help}`.toLowerCase();
    return (
      (!state.filters.overviewSearch || text.includes(state.filters.overviewSearch.toLowerCase())) &&
      (state.filters.overviewStatus === "all" || project.status === state.filters.overviewStatus) &&
      (state.filters.overviewStage === "all" || progress.currentStageId === state.filters.overviewStage)
    );
  });

  const avg = activeProjects.length
    ? Math.round(activeProjects.reduce((sum, project) => sum + projectProgress(project.id).percent, 0) / activeProjects.length)
    : 0;
  const needsHelp = activeProjects.filter((project) => project.help.trim()).length;
  renderSummary([
    { label: "進行中案件", value: activeProjects.length, note: "不含封存案件" },
    { label: "平均完成率", value: `${avg}%`, note: "依 SOP 勾選計算" },
    { label: "需要主管協助", value: needsHelp, note: "困難/求助欄位有內容" },
    { label: "團隊成員", value: activeMembers().length, note: "可被指派的人員" },
  ]);

  els.viewPanel.innerHTML = `
    <section class="panel-card">
      <div class="panel-header">
        <h2 class="panel-title">案件清單</h2>
        <span class="summary-note">點選「進入 SOP」查看單案流程</span>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>案件名稱</th>
              <th>顧問</th>
              <th>設計</th>
              <th>工程</th>
              <th>目前階段</th>
              <th>完成率</th>
              <th>狀態</th>
              <th>困難 / 需要協助</th>
              <th>最後更新</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>${filtered.map(projectRow).join("")}</tbody>
        </table>
      </div>
    </section>
  `;

  bindOverviewEvents();
}

function projectRow(project) {
  const progress = projectProgress(project.id);
  return `
    <tr data-project-id="${project.id}">
      <td class="name-cell"><input class="compact-input" data-field="name" value="${escapeAttr(project.name)}" /></td>
      <td><select class="compact-select" data-field="consultant">${memberOptions(project.consultant)}</select></td>
      <td><select class="compact-select" data-field="designer">${memberOptions(project.designer)}</select></td>
      <td><select class="compact-select" data-field="engineer">${memberOptions(project.engineer)}</select></td>
      <td><span class="pill pending">${progress.currentStage}</span></td>
      <td class="progress-cell"><div class="meter"><span style="width:${progress.percent}%"></span></div><span class="summary-note">${progress.done} / ${progress.total}</span></td>
      <td><select class="compact-select" data-field="status">${projectStatusOptions(project.status)}</select></td>
      <td><textarea class="compact-textarea" data-field="help">${escapeHtml(project.help)}</textarea></td>
      <td><span class="summary-note">${formatDate(project.updated_at)}</span></td>
      <td>
        <button class="text-button" data-action="open-project" type="button">進入 SOP</button>
        <button class="text-button" data-action="archive-project" type="button">封存</button>
      </td>
    </tr>
  `;
}

function bindOverviewEvents() {
  document.querySelector("#overviewSearch").addEventListener("input", (event) => {
    state.filters.overviewSearch = event.target.value;
    renderOverview();
  });
  document.querySelector("#overviewStatus").addEventListener("change", (event) => {
    state.filters.overviewStatus = event.target.value;
    renderOverview();
  });
  document.querySelector("#overviewStage").addEventListener("change", (event) => {
    state.filters.overviewStage = event.target.value;
    renderOverview();
  });
  document.querySelector("#addProjectBtn").addEventListener("click", addProject);
}

function renderArchived() {
  renderChrome(
    "封存案件",
    "已封存案件",
    `<label class="search-field"><span>⌕</span><input id="archivedSearch" type="search" placeholder="搜尋封存案件、負責人、求助內容" value="${escapeAttr(state.filters.archivedSearch)}" /></label>`,
  );

  const archivedProjects = state.data.projects.filter((project) => project.archived);
  const filtered = archivedProjects.filter((project) => {
    const text = `${project.name} ${project.consultant} ${project.designer} ${project.engineer} ${project.help}`.toLowerCase();
    return !state.filters.archivedSearch || text.includes(state.filters.archivedSearch.toLowerCase());
  });

  renderSummary([
    { label: "封存案件", value: archivedProjects.length, note: "不顯示在專案總覽" },
    { label: "可還原案件", value: filtered.length, note: "依目前搜尋結果" },
    { label: "已完成案件", value: archivedProjects.filter((project) => project.status === "已完成").length, note: "封存中的完成案" },
    { label: "資料狀態", value: state.usingCloud ? "雲端" : "本機", note: state.usingCloud ? "Supabase" : "尚未連 Supabase" },
  ]);

  els.viewPanel.innerHTML = `
    <section class="panel-card">
      <div class="panel-header">
        <h2 class="panel-title">封存清單</h2>
        <span class="summary-note">可還原後重新出現在專案總覽</span>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>案件名稱</th>
              <th>顧問</th>
              <th>設計</th>
              <th>工程</th>
              <th>封存前階段</th>
              <th>完成率</th>
              <th>狀態</th>
              <th>困難 / 需要協助</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>${filtered.length ? filtered.map(archivedProjectRow).join("") : `<tr><td colspan="9">${empty("目前沒有封存案件。")}</td></tr>`}</tbody>
        </table>
      </div>
    </section>
  `;

  document.querySelector("#archivedSearch").addEventListener("input", (event) => {
    state.filters.archivedSearch = event.target.value;
    renderArchived();
  });
}

function archivedProjectRow(project) {
  const progress = projectProgress(project.id);
  return `
    <tr data-project-id="${project.id}">
      <td class="name-cell">${escapeHtml(project.name)}</td>
      <td>${escapeHtml(project.consultant || "未指派")}</td>
      <td>${escapeHtml(project.designer || "未指派")}</td>
      <td>${escapeHtml(project.engineer || "未指派")}</td>
      <td><span class="pill archived">${progress.currentStage}</span></td>
      <td class="progress-cell"><div class="meter"><span style="width:${progress.percent}%"></span></div><span class="summary-note">${progress.done} / ${progress.total}</span></td>
      <td><span class="pill archived">${escapeHtml(project.status)}</span></td>
      <td>${escapeHtml(project.help || "無")}</td>
      <td>
        <button class="text-button" data-action="restore-project" type="button">還原</button>
        <button class="text-button" data-action="open-project" type="button">查看 SOP</button>
      </td>
    </tr>
  `;
}

async function handleProjectFieldChange(event) {
  const input = event.target.closest("[data-field]");
  if (!input) return;
  const row = input.closest("[data-project-id]");
  const project = findProject(row.dataset.projectId);
  project[input.dataset.field] = input.value;
  await persistRecord("projects", project);
  renderSummaryAfterLightEdit();
}

function renderSummaryAfterLightEdit() {
  updateSyncStatus();
}

async function handleProjectAction(event) {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  if (!["open-project", "archive-project", "restore-project"].includes(button.dataset.action)) return;
  const row = button.closest("[data-project-id]");
  if (!row) return;
  const project = findProject(row.dataset.projectId);
  if (button.dataset.action === "open-project") {
    state.activeProjectId = project.id;
    if (button.dataset.stageId) state.openStages.add(button.dataset.stageId);
    state.view = "workflow";
    render();
  }
  if (button.dataset.action === "archive-project") {
    project.archived = true;
    await persistRecord("projects", project);
    renderOverview();
  }
  if (button.dataset.action === "restore-project") {
    project.archived = false;
    await persistRecord("projects", project);
    renderArchived();
  }
}

async function addProject() {
  const id = crypto.randomUUID();
  const project = {
    id,
    name: `新案件 ${state.data.projects.length + 1}`,
    consultant: activeMembers()[0]?.name || "",
    designer: activeMembers()[1]?.name || activeMembers()[0]?.name || "",
    engineer: activeMembers()[2]?.name || activeMembers()[0]?.name || "",
    status: "待確認",
    help: "",
    archived: false,
    updated_at: now(),
  };
  state.data.projects.unshift(project);
  const newTasks = taskTemplates.map(([stage_id, title, note], index) => ({
    id: `${id}-task-${index + 1}`,
    project_id: id,
    stage_id,
    title,
    done: false,
    owner: defaultTaskOwner(stage_id, project),
    due_date: null,
    note,
    updated_at: now(),
  }));
  state.data.tasks.push(...newTasks);
  state.activeProjectId = id;
  await persistRecord("projects", project);
  if (state.supabase && state.usingCloud) {
    try {
      await state.supabase.from("project_tasks").upsert(newTasks.map((task) => toCloudRecord("project_tasks", task)));
    } catch {
      state.usingCloud = false;
    }
  }
  await saveData();
  renderOverview();
}

function renderWorkflow() {
  const project = activeProject();
  const progress = projectProgress(project.id);
  renderChrome(
    "SOP 工作流程",
    project.name,
    `
      <select id="workflowProject">${state.data.projects.map((item) => `<option value="${item.id}" ${item.id === project.id ? "selected" : ""}>${escapeHtml(item.name)}${item.archived ? "（封存）" : ""}</option>`).join("")}</select>
      <button class="secondary-button" id="expandAllBtn" type="button">全部展開</button>
      <button class="secondary-button" id="collapseAllBtn" type="button">全部收合</button>
    `,
  );
  renderSummary([
    { label: "案件完成率", value: `${progress.percent}%`, note: `${progress.done} / ${progress.total} 個檢查項目` },
    { label: "目前階段", value: progress.currentStage, note: project.status },
    { label: "顧問", value: project.consultant || "未指派", note: `設計：${project.designer || "未指派"}` },
    { label: "工程", value: project.engineer || "未指派", note: project.status },
    { label: "需要協助", value: project.help ? "有" : "無", note: project.help || "目前沒有求助內容" },
  ]);

  els.viewPanel.innerHTML = `
    <section class="stage-rail">${stages.map((stage) => railItem(stage, project.id, progress.currentStageId)).join("")}</section>
    <section class="accordion-list">${stages.map((stage, index) => stageCard(stage, index, project.id)).join("")}</section>
  `;

  document.querySelector("#workflowProject").addEventListener("change", (event) => {
    state.activeProjectId = event.target.value;
    renderWorkflow();
  });
  document.querySelector("#expandAllBtn").addEventListener("click", () => {
    state.openStages = new Set(stages.map(([id]) => id));
    renderWorkflow();
  });
  document.querySelector("#collapseAllBtn").addEventListener("click", () => {
    state.openStages.clear();
    renderWorkflow();
  });
}

function railItem(stage, projectId, currentStageId) {
  const [stageId, title, icon] = stage;
  const progress = stageProgress(projectId, stageId);
  return `
    <button class="rail-item ${stageId === currentStageId ? "active" : ""}" type="button" data-stage-target="${stageId}">
      <span class="rail-icon">${icon}</span>
      <span class="rail-title">${title}</span>
      <span class="rail-count">${progress.done} / ${progress.total}</span>
    </button>
  `;
}

function stageCard(stage, index, projectId) {
  const [stageId, title, icon] = stage;
  const progress = stageProgress(projectId, stageId);
  const open = state.openStages.has(stageId);
  return `
    <article class="stage-card ${open ? "open" : ""}" data-stage-id="${stageId}">
      <button class="stage-header" type="button" data-action="toggle-stage">
        <span class="stage-number">${index + 1}</span>
        <span>${icon}</span>
        <span class="stage-title">${title}</span>
        <span class="stage-count">${progress.done} / ${progress.total}</span>
        <span class="stage-status ${progress.done === progress.total ? "done" : progress.done ? "active" : ""}">${stageStatus(progress)}</span>
        <span class="chevron"></span>
      </button>
      <div class="stage-panel">
        <div class="task-head"><span>檢核項目</span><span>負責人</span><span>狀態</span><span>預計完成</span><span>備註</span></div>
        <div class="task-list">${projectTasks(projectId).filter((task) => task.stage_id === stageId).map(taskRow).join("")}</div>
      </div>
    </article>
  `;
}

function taskRow(task) {
  return `
    <div class="task-row" data-task-id="${task.id}">
      <span class="task-main" data-label="檢核項目">
        <input type="checkbox" data-task-field="done" ${task.done ? "checked" : ""} />
        <span class="task-title">${escapeHtml(task.title)}</span>
      </span>
      <span data-label="負責人"><select data-task-field="owner">${memberOptions(task.owner, true)}</select></span>
      <span data-label="狀態"><span class="pill ${task.done ? "done" : "pending"}">${task.done ? "已完成" : "待處理"}</span></span>
      <span data-label="預計完成"><input type="date" data-task-field="due_date" value="${escapeAttr(task.due_date || "")}" /></span>
      <span data-label="備註"><textarea data-task-field="note">${escapeHtml(task.note || "")}</textarea></span>
    </div>
  `;
}

function handleWorkflowClick(event) {
  const stageButton = event.target.closest("[data-action='toggle-stage']");
  const railButton = event.target.closest("[data-stage-target]");
  if (stageButton) {
    const id = stageButton.closest("[data-stage-id]").dataset.stageId;
    if (state.openStages.has(id)) state.openStages.delete(id);
    else state.openStages.add(id);
    renderWorkflow();
  }
  if (railButton) {
    state.openStages.add(railButton.dataset.stageTarget);
    renderWorkflow();
    document.querySelector(`[data-stage-id="${railButton.dataset.stageTarget}"]`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

async function handleTaskChange(event) {
  const field = event.target.closest("[data-task-field]");
  if (!field) return;
  const task = findTask(field.closest("[data-task-id]").dataset.taskId);
  task[field.dataset.taskField] = field.type === "checkbox" ? field.checked : field.value;
  await persistRecord("project_tasks", task);
  if (field.dataset.taskField === "done" || field.dataset.taskField === "owner") render();
}

function renderTasks() {
  renderChrome(
    "我的任務",
    "跨案件待辦",
    `
      <select id="taskOwnerFilter"><option value="all">全部負責人</option>${memberOptions(state.filters.taskOwner)}</select>
      <select id="taskStatusFilter">
        <option value="todo" ${state.filters.taskStatus === "todo" ? "selected" : ""}>待處理</option>
        <option value="done" ${state.filters.taskStatus === "done" ? "selected" : ""}>已完成</option>
        <option value="all" ${state.filters.taskStatus === "all" ? "selected" : ""}>全部任務</option>
      </select>
    `,
  );
  const tasks = state.data.tasks.filter((task) => {
    const project = findProject(task.project_id);
    return (
      project &&
      !project.archived &&
      (state.filters.taskOwner === "all" || task.owner === state.filters.taskOwner) &&
      (state.filters.taskStatus === "all" || (state.filters.taskStatus === "done" ? task.done : !task.done))
    );
  });
  renderSummary([
    { label: "任務數", value: tasks.length, note: "依目前篩選" },
    { label: "逾期未完成", value: overdueTasks().length, note: "日期早於今天" },
    { label: "負責人", value: state.filters.taskOwner === "all" ? "全部" : state.filters.taskOwner, note: "可從右上切換" },
    { label: "顯示狀態", value: taskStatusLabel(state.filters.taskStatus), note: "跨所有未封存案件" },
  ]);
  els.viewPanel.innerHTML = `<section class="panel-card"><div class="panel-header"><h2 class="panel-title">任務清單</h2></div><div class="task-list-page">${tasks.length ? tasks.map(taskListItem).join("") : empty("目前沒有符合條件的任務。")}</div></section>`;
  document.querySelector("#taskOwnerFilter").addEventListener("change", (event) => {
    state.filters.taskOwner = event.target.value;
    renderTasks();
  });
  document.querySelector("#taskStatusFilter").addEventListener("change", (event) => {
    state.filters.taskStatus = event.target.value;
    renderTasks();
  });
}

function taskListItem(task) {
  const project = findProject(task.project_id);
  const stage = stageName(task.stage_id);
  return `
    <article class="list-item">
      <div>
        <h3>${escapeHtml(task.title)}</h3>
        <div class="meta-line">${escapeHtml(project.name)} · ${stage} · ${escapeHtml(task.owner || "未指派")}</div>
        <div class="meta-line">${escapeHtml(task.note || "")}</div>
      </div>
      <button class="secondary-button" type="button" onclick="openProjectFromInline('${project.id}')">進入 SOP</button>
    </article>
  `;
}

window.openProjectFromInline = (projectId) => {
  state.activeProjectId = projectId;
  state.view = "workflow";
  render();
};

function renderCalendar() {
  renderChrome("專案行事曆", "預計完成日", `<button class="secondary-button" type="button" id="todayBtn">回到近期任務</button>`);
  const datedTasks = state.data.tasks
    .filter((task) => task.due_date && findProject(task.project_id) && !findProject(task.project_id).archived)
    .sort((a, b) => a.due_date.localeCompare(b.due_date));
  renderSummary([
    { label: "有日期任務", value: datedTasks.length, note: "跨所有案件" },
    { label: "今日以前未完成", value: overdueTasks().length, note: "需要追蹤" },
    { label: "最近日期", value: datedTasks[0]?.due_date || "無", note: "最早排程" },
    { label: "最晚日期", value: datedTasks.at(-1)?.due_date || "無", note: "最後排程" },
  ]);
  els.viewPanel.innerHTML = `<section class="panel-card"><div class="panel-header"><h2 class="panel-title">行事曆清單</h2></div><div class="calendar-list">${datedTasks.length ? datedTasks.map(calendarItem).join("") : empty("目前沒有設定預計完成日。")}</div></section>`;
}

function calendarItem(task) {
  const project = findProject(task.project_id);
  return `
    <button class="list-item calendar-entry" data-project-id="${project.id}" data-stage-id="${task.stage_id}" data-action="open-project" type="button">
      <div>
        <h3>${escapeHtml(task.due_date)}｜${escapeHtml(task.title)}</h3>
        <div class="meta-line">${escapeHtml(project.name)} · ${stageName(task.stage_id)} · ${escapeHtml(task.owner || "未指派")}</div>
      </div>
      <span class="pill ${task.done ? "done" : "pending"}">${task.done ? "已完成" : "待處理"}</span>
    </button>
  `;
}

function renderDocuments() {
  renderChrome("文件中心", "案件文件與連結", `<button class="primary-button" id="addDocumentBtn" type="button">新增文件</button>`);
  renderSummary([
    { label: "文件數", value: state.data.documents.length, note: "連結與備註管理" },
    { label: "案件數", value: state.data.projects.filter((project) => !project.archived).length, note: "可選擇歸屬案件" },
    { label: "文件類型", value: new Set(state.data.documents.map((doc) => doc.type)).size, note: "報價、合約、圖面等" },
    { label: "資料保存", value: state.usingCloud ? "雲端" : "本機", note: state.usingCloud ? "Supabase" : "尚未填 Supabase" },
  ]);
  els.viewPanel.innerHTML = `
    <section class="panel-card">
      <div class="panel-header"><h2 class="panel-title">文件列表</h2></div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>案件</th><th>文件名稱</th><th>類型</th><th>連結</th><th>備註</th><th>操作</th></tr></thead>
          <tbody>${state.data.documents.map(documentRow).join("")}</tbody>
        </table>
      </div>
    </section>
  `;
  document.querySelector("#addDocumentBtn").addEventListener("click", addDocument);
}

function documentRow(documentItem) {
  return `
    <tr data-document-id="${documentItem.id}">
      <td><select data-document-field="project_id">${state.data.projects.map((project) => `<option value="${project.id}" ${project.id === documentItem.project_id ? "selected" : ""}>${escapeHtml(project.name)}</option>`).join("")}</select></td>
      <td><input class="compact-input" data-document-field="name" value="${escapeAttr(documentItem.name)}" /></td>
      <td><input class="compact-input" data-document-field="type" value="${escapeAttr(documentItem.type)}" /></td>
      <td><input class="compact-input" data-document-field="url" value="${escapeAttr(documentItem.url || "")}" placeholder="https://" /></td>
      <td><textarea class="compact-textarea" data-document-field="note">${escapeHtml(documentItem.note || "")}</textarea></td>
      <td><button class="text-button" data-action="delete-document" type="button">刪除</button></td>
    </tr>
  `;
}

async function addDocument() {
  state.data.documents.unshift({
    id: crypto.randomUUID(),
    project_id: state.activeProjectId,
    name: "新文件",
    type: "圖面",
    url: "",
    note: "",
    updated_at: now(),
  });
  await saveData();
  renderDocuments();
}

async function handleDocumentChange(event) {
  const field = event.target.closest("[data-document-field]");
  if (!field) return;
  const documentItem = state.data.documents.find((item) => item.id === field.closest("[data-document-id]").dataset.documentId);
  documentItem[field.dataset.documentField] = field.value;
  await persistRecord("documents", documentItem);
}

async function handleDocumentDelete(event) {
  const button = event.target.closest("[data-action='delete-document']");
  if (!button) return;
  const id = button.closest("[data-document-id]").dataset.documentId;
  state.data.documents = state.data.documents.filter((item) => item.id !== id);
  await deleteRecord("documents", id);
  renderDocuments();
}

function renderTeam() {
  renderChrome("團隊管理", "負責人名單", `<button class="primary-button" id="addMemberBtn" type="button">新增人員</button>`);
  renderSummary([
    { label: "啟用成員", value: activeMembers().length, note: "會出現在負責人選單" },
    { label: "停用成員", value: state.data.teamMembers.filter((member) => !member.active).length, note: "保留歷史任務顯示" },
    { label: "總人數", value: state.data.teamMembers.length, note: "可改名與職務" },
    { label: "資料來源", value: state.usingCloud ? "雲端" : "本機", note: state.usingCloud ? "多人共用" : "尚未連 Supabase" },
  ]);
  els.viewPanel.innerHTML = `
    <section class="panel-card">
      <div class="panel-header"><h2 class="panel-title">團隊成員</h2></div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>姓名</th><th>職務</th><th>狀態</th><th>最後更新</th></tr></thead>
          <tbody>${state.data.teamMembers.map(memberRow).join("")}</tbody>
        </table>
      </div>
    </section>
  `;
  document.querySelector("#addMemberBtn").addEventListener("click", addMember);
}

function memberRow(member) {
  return `
    <tr data-member-id="${member.id}">
      <td><input class="compact-input" data-member-field="name" value="${escapeAttr(member.name)}" /></td>
      <td><input class="compact-input" data-member-field="role" value="${escapeAttr(member.role || "")}" /></td>
      <td>
        <select data-member-field="active">
          <option value="true" ${member.active ? "selected" : ""}>啟用</option>
          <option value="false" ${!member.active ? "selected" : ""}>停用</option>
        </select>
      </td>
      <td><span class="summary-note">${formatDate(member.updated_at)}</span></td>
    </tr>
  `;
}

async function addMember() {
  state.data.teamMembers.push({
    id: crypto.randomUUID(),
    name: "新成員",
    role: "",
    active: true,
    updated_at: now(),
  });
  await saveData();
  renderTeam();
}

async function handleMemberChange(event) {
  const field = event.target.closest("[data-member-field]");
  if (!field) return;
  const member = state.data.teamMembers.find((item) => item.id === field.closest("[data-member-id]").dataset.memberId);
  const oldName = member.name;
  member[field.dataset.memberField] = field.dataset.memberField === "active" ? field.value === "true" : field.value;
  if (field.dataset.memberField === "name") {
    state.data.projects.forEach((project) => {
      if (project.consultant === oldName) project.consultant = member.name;
      if (project.designer === oldName) project.designer = member.name;
      if (project.engineer === oldName) project.engineer = member.name;
    });
    state.data.tasks.forEach((task) => {
      if (task.owner === oldName) task.owner = member.name;
    });
  }
  await persistRecord("team_members", member);
  renderTeam();
}

function activeProject() {
  return findProject(state.activeProjectId) || state.data.projects[0];
}

function findProject(id) {
  return state.data.projects.find((project) => project.id === id);
}

function findTask(id) {
  return state.data.tasks.find((task) => task.id === id);
}

function projectTasks(projectId) {
  return state.data.tasks.filter((task) => task.project_id === projectId);
}

function activeMembers() {
  return state.data.teamMembers.filter((member) => member.active);
}

function projectProgress(projectId) {
  const tasks = projectTasks(projectId);
  const done = tasks.filter((task) => task.done).length;
  const total = tasks.length || 1;
  const currentStageId = stages.find(([stageId]) => tasks.some((task) => task.stage_id === stageId && !task.done))?.[0] || stages.at(-1)[0];
  return { done, total, percent: Math.round((done / total) * 100), currentStageId, currentStage: stageName(currentStageId) };
}

function stageProgress(projectId, stageId) {
  const tasks = projectTasks(projectId).filter((task) => task.stage_id === stageId);
  const done = tasks.filter((task) => task.done).length;
  return { done, total: tasks.length };
}

function stageStatus(progress) {
  if (progress.done === progress.total) return "已完成";
  if (progress.done > 0) return "進行中";
  return "尚未開始";
}

function stageName(stageId) {
  return stages.find(([id]) => id === stageId)?.[1] || stageId;
}

function stageOptions(selected) {
  return stages.map(([id, name]) => `<option value="${id}" ${selected === id ? "selected" : ""}>${name}</option>`).join("");
}

function memberOptions(selected, includeInactive = false) {
  const members = includeInactive ? state.data.teamMembers : activeMembers();
  const names = members.map((member) => member.name);
  if (selected && selected !== "all" && !names.includes(selected)) names.unshift(selected);
  return names.map((name) => `<option value="${escapeAttr(name)}" ${selected === name ? "selected" : ""}>${escapeHtml(name)}</option>`).join("");
}

function projectStatusOptions(selected) {
  return ["待確認", "進行中", "暫停", "已完成"].map((status) => `<option value="${status}" ${selected === status ? "selected" : ""}>${status}</option>`).join("");
}

function defaultTaskOwner(stageId, project) {
  if (["intake", "quote", "contract", "aftercare"].includes(stageId)) return project.consultant || activeMembers()[0]?.name || "";
  if (stageId === "design") return project.designer || project.consultant || activeMembers()[0]?.name || "";
  return project.engineer || project.consultant || activeMembers()[0]?.name || "";
}

function overdueTasks() {
  const today = new Date().toISOString().slice(0, 10);
  return state.data.tasks.filter((task) => task.due_date && task.due_date < today && !task.done);
}

function taskStatusLabel(value) {
  return { todo: "待處理", done: "已完成", all: "全部" }[value] || value;
}

function dueDate(projectIndex, taskIndex) {
  const date = new Date();
  date.setDate(date.getDate() + projectIndex * 2 + taskIndex - 5);
  return date.toISOString().slice(0, 10);
}

function now(offset = 0) {
  const date = new Date();
  date.setMinutes(date.getMinutes() - offset);
  return date.toISOString();
}

function slugify(value) {
  let hash = 0;
  String(value).split("").forEach((char) => {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  });
  return hash.toString(36);
}

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("zh-TW", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function empty(text) {
  return `<div class="empty-state">${text}</div>`;
}

function updateSyncStatus() {
  els.syncMode.textContent = state.usingCloud ? "Supabase 雲端" : "本機模式";
  els.syncHint.textContent = state.usingCloud ? "所有開啟同一網址的人會讀寫同一份資料。" : "目前先保存在這台瀏覽器；填入 Supabase 後可多人共用。";
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value = "") {
  return escapeHtml(value);
}

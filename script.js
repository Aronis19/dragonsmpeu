const app = document.querySelector("#app");
const menuPanel = document.querySelector("#mobilePanel");
const menuToggle = document.querySelector("#menuToggle");
const menuClose = document.querySelector("#menuClose");
const themeButtons = document.querySelectorAll("#themeToggle, .panel-theme-toggle");
const header = document.querySelector(".site-header");

const routeNames = {
  domu: "Zevyx.eu",
  "nas-tym": "Náš tým",
  pravidla: "Pravidla",
  "zakladni-informace": "Základní informace",
};

const asset = {
  hestreng: "./assets/zevyxpostava.png",
  wumpus: "https://cdn.rajce.pro/assets/renders/wumpus.png",
  survival: "https://cdn.rajce.pro/assets/servers/survival.webp",
  anarchy: "https://cdn.rajce.pro/assets/servers/anarchy.webp",
  pokeland: "https://cdn.rajce.pro/assets/servers/pokeland.webp",
};

const teamGroups = [
  {
    title: "Vedení serveru",
    members: [["KarelHabsbursky", "Majitel"]["Kacatkobenzii", "Spolu - Majitel"]],
  },
  {
    title: "Vedení týmu",
    members: [],
  },
  {
    title: "Technický tým",
    members: [],
  },
  {
    title: "Builder tým",
    members: [],
  },
  {
    title: "Helper tým",
    members: [],
  },
];

const minecraftRules = [
  ["Obecné informace", ["Respektuj pokyny členů týmu.", "Neznalost pravidel neomlouvá a tresty se řeší podle závažnosti situace."]],
  ["Obecná pravidla serveru", ["Nepoužívej chyby hry ani serveru ve svůj prospěch.", "Nekaz hru ostatním a neobcházej udělená omezení."]],
  ["Váš účet", ["Za svůj účet zodpovídáš ty.", "Heslo nesdílej s ostatními hráči a při problému kontaktuj podporu."]],
  ["Herní klient", ["Zakázané jsou úpravy klienta, které dávají neférovou výhodu. (viz.: Zakázané Mody)", "Povolené jsou jen běžné vizuální a výkonnostní úpravy bez zásahu do hry."]],
  ["Zakázané Mody", ["Xray", "Accurate Block Placement", "Armor Hotswap", "Autoswitch", "Quickcraft", "Auto Clicker", "Freecam", "Geyser", "Tweakeroo", "Click Crystals", "InvMove", "Fluidlogged", "Bridging Mod", "AutoTotem", "D-hand mod", "Tick Rate", "Multi Key Bindings", "A další módy nebo úpravy, které výrazně mění charakter hry nebo poskytují hráči neférovou výhodu."]],
  ["Pravidla komunikace", ["Chovej se slušně v chatu i soukromých zprávách.", "Spam, nadávky, reklama a provokace mohou vést k trestu."]],
  ["Gameplay", ["Hraj fér, nevyužívej dupování, bugy ani automatizaci mimo povolené limity.", "PvP a ekonomika mají zůstat férové pro všechny."]],
  ["Žádost o vrácení věcí", ["Žádosti řeš přes podporu a přidej co nejvíc důkazů.", "Nárok na vrácení není automatický."]],
  ["Voicechat", ["Ve voicechatu platí stejná pravidla jako v textové komunikaci.", "Nevhodný obsah nebo rušení ostatních se trestá."]],
];

const discordRules = [
  ["Obecné informace", ["Discord slouží pro komunitu, podporu a oznámení serveru.", "Členové týmu mohou zasáhnout i u situací, které nejsou přesně vypsané."]],
  ["Obecná pravidla serveru", ["Neposílej škodlivé odkazy, reklamu ani obsah mimo téma.", "Respektuj členy komunity i tým."]],
  ["Pravidla komunikace", ["Bez urážek, spamu, vyvolávání hádek a obtěžování.", "Spor řeš klidně nebo přes ticket."]],
  ["Discord podpora", ["Podporu využívej pro konkrétní problém a popiš ho věcně.", "Jeden problém řeš v jednom ticketu."]],
  ["Nahlášení hráče s důkazem v ticketech", ["Přilož jméno hráče, popis situace a důkazy.", "Bez důkazů se případ nemusí dát vyřešit."]],
  ["Dočasné místnosti", ["Místnosti používej k hraní a komunikaci s ostatními.", "Nevhodné názvy nebo rušivé chování mohou vést k odebrání přístupu."]],
];

const faq = [
  "Nedošel mi zakoupený produkt z obchodu, co mám dělat?",
  "Chci se stát členem Admin-Týmu, jak na to?",
  "Mohu si migrovat VIP na jiný účet?",
  "Jak zapnout autologin na serveru?",
  "Omylem jsem zapnul autologin a nemám origo, co mám dělat?",
  "Dostal jsem trest neprávem, co mám dělat?",
  "Dostal jsem trest neprávem a nemohu ho řešit, protože mám aktivní trest na discordu.",
  "Chtěl bych se stát Creatorem, co musím udělat?",
  "Nenačetl se mi resource pack, co s tím?",
  "Jak mám postupovat, když jsem zapomněl heslo a potřebuji unregister?",
  "Nevidím svůj skin, co s tím?",
  "Kde mohu vidět přehled, co se aktuálně na serveru děje?",
  "Jak vytvořím ticket?",
  "Jak si změním heslo?",
];

function hero(title) {
  return `
    <section class="hero">
      <div class="hero-content">
        <h1>${title}</h1>
        <button class="server-pill copy-ip" type="button" aria-label="Zkopírovat IP adresu serveru">
          <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z"/></svg>
          <span>mc.zevyx.eu</span>
        </button>
      </div>
    </section>
  `;
}

function titleBlock(text) {
  return `<h2 class="section-title">${text}</h2>`;
}

function renderHome() {
  return `
    ${hero("Zevyx.eu")}
    <section class="section">
      <div class="section-inner">
        ${titleBlock("O nás")}
        <div class="about-grid">
          <div class="render-wrap">
            <img src="${asset.hestreng}" alt="Minecraft postava Zevyx.eu" />
          </div>
          <div class="content-copy">
            <h2>O <span>Zevyx.eu</span></h2>
            <p>Zevyx.eu je moderní československý Minecraft server zaměřený na oddechové hraní, vlastní obsah a propracovaný herní mód. Na serveru tě čeká SMP s custom mod itemy!.</p>
          </div>
        </div>
      </div>
    </section>
    <section class="section alt">
      <div class="section-inner">
        ${titleBlock("Začleň se do komunity")}
        <div class="community-grid">
          <div class="content-copy">
            <h3>Chceš být mezi prvními, kteří budou vědět o novinkách?</h3>
            <ul>
              <li>Využívej podporu a ticket systém.</li>
              <li>Komunikuj s týmem i hráči ve veřejných místnostech.</li>
              <li>S VIP můžeš používat soukromé místnosti.</li>
              <li>Na Discordu se řeší hraní, oznámení i eventy.</li>
              <li>Novinky se často objeví nejdřív právě tam.</li>
            </ul>
            <a class="primary-button" href="https://discord.gg/zevyxeu" target="_blank" rel="noreferrer">
              <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20.3 4.4A17.1 17.1 0 0 0 16 3l-.2.4c1.5.4 2.3 1 3.1 1.7a12.6 12.6 0 0 0-10 0c.8-.7 1.8-1.3 3.1-1.7L11.8 3c-1.5.2-3 .7-4.3 1.4C4.8 8.4 4 12.2 4.4 16a17 17 0 0 0 5.2 2.7l.9-1.5c-.5-.2-1-.5-1.5-.8l.4-.3c2.9 1.4 6 1.4 8.8 0l.4.3c-.5.3-1 .6-1.5.8l.9 1.5A17 17 0 0 0 23.2 16c.5-4.3-.8-8.1-2.9-11.6ZM10 14.3c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z"/></svg>
              Chci se přidat
            </a>
          </div>
          <div class="render-wrap">
            <img src="${asset.wumpus}" alt="Discord render Zevyx.eu" />
          </div>
        </div>
      </div>
    </section>
  `;
}

function modeCard(src, alt, text) {
  const href = alt === "Pokeland" ? ' href="https://pokeland.zevyx.eu/instalace" target="_blank" rel="noreferrer"' : "";
  const tag = href ? "a" : "article";
  return `
    <${tag} class="mode-card"${href}>
      <img src="${src}" alt="${alt}" />
      <p>${text}</p>
    </${tag}>
  `;
}

function avatarUrl(name) {
  return `https://rajce.pro/dungeons/${encodeURIComponent(name)}/bust`;
}

function renderTeam() {
  return `
    ${hero("Náš tým")}
    <section class="section">
      <div class="section-inner">
        ${teamGroups.map(renderTeamGroup).join("")}
      </div>
    </section>
  `;
}

function renderTeamGroup(group) {
  return `
    <section class="team-section">
      ${titleBlock(group.title)}
      ${
        group.members.length
          ? `<div class="team-grid">
              ${group.members
                .map(
                  ([name, role]) => `
                    <article class="member-card">
                      <img src="${avatarUrl(name)}" alt="Avatar ${name}" loading="lazy" />
                      <div class="member-name">${name}</div>
                      <div class="role-badge ${roleClass(role)}">${role}</div>
                    </article>
                  `,
                )
                .join("")}
            </div>`
          : `<div class="empty-team">---</div>`
      }
    </section>
  `;
}

function roleClass(role) {
  const normalized = role.toLowerCase();
  if (normalized.includes("majitel")) return "role-owner";
  if (normalized.includes("admin")) return "role-admin";
  if (normalized.includes("qa")) return "role-qa";
  if (normalized.includes("helper")) return "role-helper";
  if (normalized.includes("technik")) return "role-tech";
  if (normalized.includes("builder")) return "role-builder";
  if (normalized.includes("designer")) return "role-designer";
  return "role-admin";
}

function renderRules() {
  return `
    ${hero("Pravidla")}
    <section class="section">
      <div class="section-inner">
        <div class="rules-block">
          ${titleBlock("Minecraft pravidla")}
          <p class="intro-copy">Hraním na Zevyx.eu souhlasíš s pravidly serveru. Tým může zasáhnout i u situací, které nejsou doslova vypsané, pokud poškozují férovou hru nebo komunitu.</p>
          <div class="fold-list">${minecraftRules.map(renderFold).join("")}</div>
        </div>
        <div class="rules-block">
          ${titleBlock("Discord pravidla")}
          <p class="intro-copy">Na komunitním Discordu platí slušné chování, respekt k ostatním a používání správných kanálů pro podporu, nahlášení i běžnou komunikaci.</p>
          <div class="fold-list">${discordRules.map(renderFold).join("")}</div>
        </div>
      </div>
    </section>
  `;
}

function renderFold([title, items]) {
  return `
    <details class="fold">
      <summary>${title}</summary>
      <div class="fold-content">
        <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>
    </details>
  `;
}

function renderInfo() {
  return `
    ${hero("Základní informace")}
    <section class="section">
      <div class="section-inner">
        <section class="info-block">
          ${titleBlock("Kontakt")}
          <div class="info-list">
            <div>
              <h3>Kontaktní e-mailové adresy</h3>
              <ul><li><a href="mailto:podpora@zevyx.eu">podpora@zevyx.eu</a> (kontaktní e-mail)</li></ul>
            </div>
            <div>
              <h3>Sociální sítě</h3>
              <ul>
                <li>Discord: <a href="https://discord.gg/zevyxeu" target="_blank" rel="noreferrer">https://discord.gg/zevyxeu</a></li>
                <li>Instagram: <a href="https://instagram.zevyx.eu/" target="_blank" rel="noreferrer">zevyx.eu</a></li>
                <li>TikTok: <a href="https://tiktok.zevyx.eu/" target="_blank" rel="noreferrer">@zevyx.eu</a></li>
                <li>YouTube: <a href="https://youtube.zevyx.eu/" target="_blank" rel="noreferrer">zevyxeu</a></li>
              </ul>
            </div>
            <div>
              <h3>Stránky, na kterých je možné pro nás hlasovat</h3>
              <ul>
                <li><a href="https://craftlist.org/zevyx?nick=Va%C5%A1e%20hern%C3%AD%20jm%C3%A9no" target="_blank" rel="noreferrer">Craftlist.org</a></li>
                <li><a href="https://czech-craft.eu/server/zevyx-eu/vote" target="_blank" rel="noreferrer">Czech-Craft.eu</a></li>
                <li><a href="https://minecraftservery.eu/server/zevyxeu/vote/" target="_blank" rel="noreferrer">MinecraftServery.eu</a></li>
              </ul>
            </div>
          </div>
        </section>

        <section class="info-block">
          ${titleBlock("Jak se připojit")}
          <div class="step-list">
            <div class="step-item">1. Spusťte Minecraft a vyberte verzi 1.21.4 - 1.21.11</div>
            <div class="step-item">2. V nabídce vyberte Multiplayer / Hra více hráčů</div>
            <div class="step-item">3. Klikněte na Add server / Přidat server</div>
            <div class="step-item">4. Do adresy serveru napište mc.zevyx.eu</div>
            <div class="step-item">5. Po připojení použijte /register heslo a příště /login heslo</div>
          </div>
        </section>

        <section class="info-block">
          ${titleBlock("Jak se stát Creatorem")}
          <div class="creator-grid">
            ${creatorCard("YouTuber", ["alespoň 1000 odběratelů", "věk 16+", "aktivní videa ze serveru", "slušná reprezentace komunity"])}
            ${creatorCard("TikToker", ["alespoň 1000 sledujících", "věk 16+", "aktivita u videí", "minimálně několik videí ze serveru"])}
            ${creatorCard("Streamer", ["minimálně 500 followerů", "věk 16+", "odpovídající sledovanost", "pravidelné streamy ze serveru"])}
            ${creatorCard("Výhody Creatora na serveru", ["prefix Creator a Discord role", "VIP výhody", "možnost sebepropagace", "vlastní eventy a soutěže"])}
          </div>
        </section>

        <section class="info-block">
          ${titleBlock("Často kladené dotazy")}
          <div class="fold-list">
            ${faq.map((question) => renderFold([question, ["Nejrychlejší řešení najdeš přes Discord podporu nebo ticket se stručným popisem situace."]])).join("")}
          </div>
        </section>
      </div>
    </section>
  `;
}

function creatorCard(title, items) {
  return `
    <article class="creator-card">
      <h3>${title}</h3>
      <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
    </article>
  `;
}

const renderers = {
  domu: renderHome,
  "nas-tym": renderTeam,
  pravidla: renderRules,
  "zakladni-informace": renderInfo,
};

function currentRoute() {
  const hash = decodeURIComponent(location.hash.replace("#", ""));
  return Object.prototype.hasOwnProperty.call(routeNames, hash) ? hash : "domu";
}

function renderRoute(options = {}) {
  const route = currentRoute();
  app.innerHTML = renderers[route]();
  document.title = route === "domu" ? "Zevyx.eu" : `${routeNames[route]} | Zevyx.eu`;
  document.querySelectorAll("[data-route]").forEach((link) => {
    link.classList.toggle("active", link.dataset.route === route);
  });
  closeMenu();
  if (options.scroll !== false) {
    window.scrollTo({ top: 0, behavior: options.smooth ? "smooth" : "auto" });
  }
}

function closeMenu() {
  document.body.classList.remove("menu-open");
  menuPanel.setAttribute("aria-hidden", "true");
  menuToggle.setAttribute("aria-label", "Otevřít hlavní menu");
}

function openMenu() {
  document.body.classList.add("menu-open");
  menuPanel.setAttribute("aria-hidden", "false");
  menuToggle.setAttribute("aria-label", "Zavřít hlavní menu");
}

function setTheme(light) {
  document.body.classList.toggle("light", light);
  localStorage.setItem("zevyx-theme", light ? "light" : "dark");
  themeButtons.forEach((button) => {
    button.setAttribute("aria-label", light ? "Nastavit vzhled na tmavý" : "Nastavit vzhled na světlý");
  });
}

function initTheme() {
  const saved = localStorage.getItem("zevyx-theme");
  setTheme(saved === "light");
}

document.addEventListener("click", async (event) => {
  const routeLink = event.target.closest("[data-route]");
  if (routeLink) {
    event.preventDefault();
    const next = routeLink.dataset.route;
    if (currentRoute() === next) {
      renderRoute({ smooth: true });
    } else {
      location.hash = next;
    }
    return;
  }

  const copyButton = event.target.closest(".copy-ip");
  if (copyButton) {
    const label = copyButton.querySelector("span");
    const original = label.textContent;
    try {
      await navigator.clipboard.writeText("mc.zevyx.eu");
      label.textContent = "Zkopírováno";
    } catch {
      label.textContent = "mc.zevyx.eu";
    }
    copyButton.classList.add("copied");
    window.setTimeout(() => {
      label.textContent = original;
      copyButton.classList.remove("copied");
    }, 1200);
  }
});

menuToggle.addEventListener("click", () => {
  if (document.body.classList.contains("menu-open")) {
    closeMenu();
  } else {
    openMenu();
  }
});

menuClose.addEventListener("click", closeMenu);

menuPanel.addEventListener("click", (event) => {
  if (event.target === menuPanel) {
    closeMenu();
  }
});

themeButtons.forEach((button) => {
  button.addEventListener("click", () => setTheme(!document.body.classList.contains("light")));
});

window.addEventListener("hashchange", () => renderRoute({ smooth: true }));

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 16);
});

initTheme();
if (!location.hash) {
  history.replaceState(null, "", "#domu");
}
renderRoute({ scroll: false });


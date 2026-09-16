// Pagefind generates its search index and its web components after Zola has
// run, so none of it exists at template time and the bundle is fetched on the
// first search rather than on every page view: the component bundle is over
// 200KB, and most visits never search.
//
// Upstream owns the modal itself. This module owns only the navbar trigger,
// the two keyboard shortcuts, and the lazy load.

const trigger = document.getElementById("search-button");
const modal = document.querySelector("pagefind-modal");
const bundlePath = document
  .querySelector("pagefind-config")
  .getAttribute("bundle-path");

// One shared promise, so closing and reopening during a slow load cannot
// append a second copy of the script and stylesheet.
let bundle = null;
// True while an open is waiting on that load. Closing clears it, which is how
// a cancelled open stays cancelled once the bundle lands.
let pending = false;

function fetching(element) {
  return new Promise((resolve, reject) => {
    element.addEventListener("load", () => resolve());
    element.addEventListener("error", () =>
      reject(new Error(`could not load ${element.src || element.href}`)),
    );
    document.head.append(element);
  });
}

function loadBundle() {
  if (bundle) return bundle;
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = `${bundlePath}pagefind-component-ui.css`;
  const script = document.createElement("script");
  script.type = "module";
  script.src = `${bundlePath}pagefind-component-ui.js`;
  // The elements are already in the page, so defining the components upgrades
  // them; whenDefined is what tells us modal.open() exists.
  bundle = Promise.all([fetching(stylesheet), fetching(script)]).then(() =>
    customElements.whenDefined("pagefind-modal"),
  );
  return bundle;
}

// A disabled button drops out of the tab order, which would put the only
// explanation of the failure somewhere a keyboard user cannot reach. The
// button stays focusable and reports itself unavailable instead.
let broken = false;

function unavailable(error) {
  broken = true;
  const message = "Search is unavailable: this site has no search index.";
  trigger.setAttribute("aria-disabled", "true");
  trigger.setAttribute("aria-label", message);
  trigger.title = message;
  console.error("pagefind:", error);
}

// Pagefind hands focus back to its own trigger component on close, and this
// theme uses its own navbar button instead, so the button has to take focus
// back itself or it lands on the body. The same event restores the button's
// expanded state. The modal is a real <dialog>, whose close event covers
// every way out: Escape, the mobile close button, and a backdrop click.
function wireCloseHandling() {
  const dialog = modal.querySelector("dialog");
  if (!dialog || dialog.dataset.searchWired) return;
  dialog.dataset.searchWired = "true";
  dialog.addEventListener("close", () => {
    trigger.setAttribute("aria-expanded", "false");
    trigger.focus();
  });
}

async function open() {
  if (broken || modal.isOpen) return;
  pending = true;
  try {
    await loadBundle();
  } catch (error) {
    pending = false;
    unavailable(error);
    return;
  }
  if (!pending) return;
  pending = false;
  modal.open();
  trigger.setAttribute("aria-expanded", "true");
  wireCloseHandling();
}

function close() {
  pending = false;
  if (modal.isOpen) modal.close();
}

function isTyping(element) {
  return (
    element.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(element.tagName)
  );
}

trigger.addEventListener("click", open);

document.addEventListener("keydown", (event) => {
  if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
    event.preventDefault();
    if (modal.isOpen || pending) close();
    else open();
    return;
  }
  // The modal handles Escape once it is up; this only covers the gap where the
  // bundle is still loading and there is nothing on screen to dismiss.
  if (event.key === "Escape" && pending) {
    close();
    return;
  }
  // "/" is a bare key, so it means "search" only when it is not being typed
  // into something, which includes the modal's own field.
  if (event.key === "/" && !modal.isOpen && !isTyping(event.target)) {
    event.preventDefault();
    open();
  }
});

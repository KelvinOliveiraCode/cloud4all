// Diálogos nativos com foco preso pelo navegador.

import { h, icon } from "../core/dom.js";

export function openDialog({ title, subtitle, body, actions = [], className = "" }) {
  const dialog = h("dialog", { class: `dialog ${className}`.trim() });
  const closeButton = h(
    "button",
    {
      class: "dialog-close",
      type: "button",
      "aria-label": "Fechar",
      onclick: () => dialog.close(),
    },
    icon("close", 18)
  );

  const head = h(
    "div",
    { class: "dialog-head" },
    h("div", {}, h("h2", {}, title), subtitle ? h("p", {}, subtitle) : null),
    closeButton
  );

  const bodyEl = h("div", { class: "dialog-body" }, body);
  dialog.append(head, bodyEl);

  if (actions.length) {
    dialog.append(h("div", { class: "dialog-actions" }, ...actions));
  }

  document.body.append(dialog);
  document.body.classList.add("is-locked");
  dialog.showModal();

  const onClose = () => {
    document.body.classList.remove("is-locked");
    dialog.remove();
  };

  dialog.addEventListener("close", onClose);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  return {
    dialog,
    body: bodyEl,
    close: () => dialog.close(),
  };
}

export function confirmDialog({ title, message, confirmLabel = "Confirmar", onConfirm }) {
  const cancel = h(
    "button",
    { class: "btn btn--quiet", type: "button", onclick: () => instance.close() },
    "Cancelar"
  );
  const confirm = h(
    "button",
    {
      class: "btn btn--solid",
      type: "button",
      onclick: () => {
        onConfirm?.();
        instance.close();
      },
    },
    confirmLabel
  );

  const instance = openDialog({
    title,
    body: h("p", { class: "prose" }, message),
    actions: [cancel, confirm],
  });

  return instance;
}

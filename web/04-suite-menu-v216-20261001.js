(() => {
  'use strict';const tr=t=>globalThis.EventsPROIndependentText?.(t)??t;const labelStates=new WeakMap();const label=(node,text,attribute)=>{let states=labelStates.get(node);if(!states){states=new Map();labelStates.set(node,states);}const key=attribute||'textContent';let state=states.get(key);if(!state){state={text,last:''};states.set(key,state);globalThis.EventsPROI18n?.onChange(()=>{const current=attribute?node.getAttribute(attribute):node.textContent;if(node.isConnected&&current===state.last){state.last=tr(state.text);if(attribute)node.setAttribute(attribute,state.last);else node.textContent=state.last;}});}state.text=text;state.last=tr(text);if(attribute)node.setAttribute(attribute,state.last);else node.textContent=state.last;};
  const saveIcon = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 3h12l4 4v14H3V3zM7 3v6h10V3M7 21v-8h10v8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const shareIcon = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M12 16V3m0 0L7 8m5-5 5 5M5 13v7h14v-7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const projects = window.EventsPROProjects;
  if (projects?.mount) {
    const originalMount = projects.mount;
    projects.mount = function (header, adapter) {
      const result = originalMount.call(this, header, adapter);
      const bar = header?.querySelector('.suite-projects');
      if (!bar || bar.querySelector('[data-suite-save]')) return result;
      const retainedSave=bar.querySelector('button[data-suite-action="save"]');if(retainedSave){retainedSave.hidden=false;return result;}
      const save = document.createElement('button');
      save.type = 'button';
      save.className = 'suite-history-button';
      save.dataset.suiteSave = 'true';
      label(save,'Guardar proyecto','aria-label');
      label(save,'Guardar proyecto editable','title');
      save.innerHTML = saveIcon;
      save.onclick = () => {
        try {
          const data = { schema: 'eventspro-suite-project-v1', tool: adapter.id, data: adapter.get() };
          const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
          const link = document.createElement('a');
          link.href = url;
          link.download = adapter.id + '.json';
          link.click();
          setTimeout(() => URL.revokeObjectURL(url), 10000);
        } catch (error) {
          const status = header.querySelector('.suite-project-status');
          if (status) label(status,'No se pudo guardar el proyecto');
        }
      };
      const open = bar.querySelector('button[data-suite-action="open"],button[aria-label="Abrir proyecto"],button[aria-label="Open project"]');
      if (open) open.after(save); else bar.prepend(save);
      const duplicateDownload = bar.querySelector('button[data-suite-action="save"],button:not([data-suite-action="export"])[aria-label="Descargar proyecto (.json)"],button:not([data-suite-action="export"])[aria-label="Download project (.json)"]');
      if (duplicateDownload) duplicateDownload.hidden = true;
      return result;
    };
  }
  const repairSaveButtons = () => {
    for (const bar of document.querySelectorAll('.suite-projects:not(:has([data-suite-save]))')) {
      const retainedSave=bar.querySelector('button[data-suite-action="save"]');if(retainedSave){retainedSave.hidden=false;continue;}
      const download = bar.querySelector('button[data-suite-action="save"],button:not([data-suite-action="export"])[aria-label="Descargar proyecto (.json)"],button:not([data-suite-action="export"])[aria-label="Download project (.json)"]');
      if (!download) continue;
      const save = document.createElement('button');
      save.type = 'button';
      save.className = 'suite-history-button';
      save.dataset.suiteSave = 'true';
      label(save,'Guardar proyecto','aria-label');
      label(save,'Guardar proyecto editable','title');
      save.innerHTML = saveIcon;
      save.onclick = () => download.click();
      const open = bar.querySelector('button[data-suite-action="open"],button[aria-label="Abrir proyecto"],button[aria-label="Open project"]');
      if (open) open.after(save); else bar.prepend(save);
      download.hidden = true;
    }
  };
  const repairBlendHeading = () => {
    const toolbar = document.querySelector('.ep-app .ep-toolbar');
    if (!toolbar?.textContent.includes('Blend Calc')) return;
    const form = document.querySelector('.ep-app .ep-form');
    if (!form || form.querySelector('.ep-project-section-title')) return;
    const heading = document.createElement('h3');
    heading.className = 'ep-project-section-title';
    label(heading,'Proyecto');
    form.prepend(heading);
  };
  const repairShareButton = () => {
    const header = document.querySelector('.ep-app :is(.ep-toolbar,.li-head,.st-header,.lp-head,.ls-header,.cm-top,.ed-head,.la-head)') || document.querySelector('.ep-standalone .tools-toolbar');
    if (!header) return;
    const target = header.querySelector('.suite-projects,.project-actions,.ep-toolbar-actions,.actions,.li-actions') || header;
    const existing = header.querySelector('[data-suite-share]');
    if (existing) {
      if (existing.parentElement !== target) target.append(existing);
      return;
    }
    const share = document.createElement('button');
    share.type = 'button';
    share.className = 'suite-history-button ep-share-action';
    share.dataset.suiteShare = 'true';
    label(share,'Compartir','aria-label');
    label(share,'Compartir enlace de esta herramienta','title');
    share.innerHTML = shareIcon;
    share.onclick = async () => {
      const title = header.querySelector('h1')?.textContent?.trim() || document.title;
      const app = document.querySelector('.ep-app') && !document.querySelector('.ep-standalone');
      const link = new URL(app ? '/index.html' : location.pathname, 'https://tools.eventspro.es');
      if (app) link.searchParams.set('app', title);
      try {
        if (navigator.share) await navigator.share({ title: 'TOOLS EventsPRO · ' + title, url: link.href });
        else {
          await navigator.clipboard.writeText(link.href);
          const status = header.querySelector('.suite-project-status');
          if (status) label(status,'Enlace copiado');
        }
      } catch (error) {
        if (error?.name !== 'AbortError') {
          const status = header.querySelector('.suite-project-status');
          if (status) label(status,'No se pudo compartir el enlace');
        }
      }
    };
    target.append(share);
  };
  const repair = () => { repairSaveButtons(); repairBlendHeading(); repairShareButton(); };
  const observer = new MutationObserver(repair);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', repair, { once: true });
  else repair();
})();

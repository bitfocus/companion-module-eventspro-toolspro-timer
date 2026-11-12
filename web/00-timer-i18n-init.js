/* Timer-only initial language. The suite-wide preference is respected and no project data is touched. */
(function (root) {
  'use strict';
  const I = root.EventsPROI18n;
  if (!I) throw Error('Timer interface translations are unavailable');
  I.register('es', {'language.label':'Idioma','timer.navigation.openTools':'Abrir TOOLS en el navegador'});
  I.register('en', {'language.label':'Language','timer.navigation.openTools':'Open TOOLS in the browser'});
  I.register('es', {
    'timer.workbook.columns':'Selecciona las columnas de intervención y tiempos.',
    'timer.workbook.distinct':'Selecciona columnas diferentes.',
    'timer.workbook.maximum':'Máximo 200 intervenciones en la escaleta.',
    'timer.workbook.empty':'La selección no contiene intervenciones.',
    'timer.workbook.large':'La tabla supera el tamaño admitido.',
    'timer.workbook.added':'Añadidas a la escaleta: {count} · {day} / {session}'
  });
  I.register('en', {
    'timer.workbook.columns':'Select the speaker slot and timing columns.',
    'timer.workbook.distinct':'Select different columns.',
    'timer.workbook.maximum':'The agenda supports a maximum of 200 speaker slots.',
    'timer.workbook.empty':'The selection contains no speaker slots.',
    'timer.workbook.large':'The table exceeds the supported size.',
    'timer.workbook.added':'Added to agenda: {count} · {day} / {session}'
  });
  I.register('es',{'timer.output.hidden':'OCULTA\nSalida oculta','timer.output.visible':'VISIBLE\nSalida visible'});
  I.register('en',{'timer.output.hidden':'HIDE\nOutput hidden','timer.output.visible':'SHOW\nOutput visible'});
  root.addEventListener?.('storage',event=>{if(event.key==='eventspro.interface.language.v1' && ['en','es'].includes(event.newValue))I.setLanguage(event.newValue);});
  let saved;
  try { saved = root.localStorage?.getItem('eventspro.interface.language.v1'); } catch (_) {}
  I.setLanguage(saved === 'es' ? 'es' : 'en');
  const decorateLinks = () => {
    for (const link of root.document.querySelectorAll('.timer-tools-link')) {
      I.bind(link,'timer.navigation.openTools','aria-label');
      I.bind(link,'timer.navigation.openTools','title');
    }
  };
  if (root.document.readyState === 'loading') root.document.addEventListener('DOMContentLoaded',decorateLinks,{once:true});
  else decorateLinks();
})(window);

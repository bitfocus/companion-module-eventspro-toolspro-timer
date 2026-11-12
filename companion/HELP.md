# Timer PRO over a local network

1. Select **Timer in browser over local network** in the connection settings.
2. Open `http://COMPANION-IP:8000/instance/CONNECTION-NAME/index.html`. Use the actual local address, connection name (encode spaces as `%20`) and Companion web port.
3. Drag the START, PAUSE, RESET, mode and duration presets onto your Companion page. Speaker slot presets can prepare or load and start a saved slot.
4. Select **Mobile remote** in Timer and scan the QR code with your phone camera. Both devices must be able to reach Companion on the same local network.
5. Open the speaker output and move it to the presenter display. Browser popup permissions may be required.

No internet is required during the session. The Companion computer must remain on and reachable. The open Timer page preserves its local running state when reclaiming after a module restart; a closed page cannot recover live state after restart. The agenda is stored in the Timer browser. Physical Windows and phone LAN acceptance remains pending.

**Installed Timer (OSC)** retains the existing OSC protocol for the desktop app. This module does not install or modify the Mac app.

## Presenter signal visibility and appearance

Use **SHOW**, **HIDE** or **SHOW / HIDE** presets to control the presenter output. HIDE keeps the clock running and leaves the operator controls available. The `output_visible` variable and the **Speaker output visible** feedback report visibility while Timer is connected.

In **Colors and format**, choose a background preset and a text preset independently. Green and blue chroma presets disable automatic warning colors so the selected key/text colors remain consistent. Enable automatic warning colors again when you want yellow/red phases. Transparent alpha is for web output captured as a browser source; it does not make native Windows or Mac windows transparent. The extended output contains the presenter signal without operator metadata or controls.

These new OSC actions require a matching updated Timer desktop receiver. Existing actions and OSC addresses are unchanged; an older receiver does not gain support for the new actions just by updating this module.

## Interface language

Module configuration, actions, feedbacks and generated presets use English by default. Choose **Español** under **Language** and save the connection to retain Spanish for this connection. Existing action, option, feedback, variable and preset identifiers are unchanged. The module does not rename user-authored speaker slots or messages. The connection setting controls the Companion module interface. The packaged Timer operator and mobile pages have their own globe menu, labelled **Language** in English and **Idioma** in Spanish, with **English** and **Español** options. These pages also start in English when no preference has been saved. The browser preference is retained locally for that origin and browser, independently of the Companion connection setting. It is not sent over LAN: choose the language separately on the phone. Output pages on the same origin receive language changes without renaming speaker slots, messages or projects.

## Español, opcional

El idioma inicial es inglés. Para mostrar la conexión de Companion en español, selecciona **Español** en **Language** y guarda la conexión. La elección se conserva en esa configuración de conexión. No cambian los identificadores de las acciones, opciones, variables, feedbacks, presets ni los comandos OSC existentes.

Las páginas de Timer y del mando móvil tienen un menú de globo **Language / Idioma**, con las opciones **English** y **Español**. Esta preferencia se guarda en el navegador y es independiente de la conexión de Companion. Selecciona el idioma también en el móvil: no se transmite por la red local. La pantalla de salida del mismo origen recibe el cambio de idioma. Los nombres y textos escritos por el usuario se conservan.

### Uso por red local

1. En la conexión, selecciona **Timer en navegador por red local** y abre `http://IP-COMPANION:8000/instance/NOMBRE-CONEXION/index.html`. Sustituye la IP, el puerto web y el nombre reales; codifica los espacios como `%20`.
2. Arrastra los presets de inicio, pausa, reinicio, modo y duración a la página de Companion. Cargar una duración o una intervención la prepara; la acción separada de cargar e iniciar comienza la cuenta.
3. Abre el mando móvil mediante el QR de Timer. Ambos equipos deben poder acceder a Companion por la misma red local.
4. Abre la salida y llévala al monitor del ponente. El navegador puede requerir permiso para abrir la ventana.

**SHOW / HIDE** muestra u oculta la señal del ponente sin detener el contador. Los fondos verde y azul chroma y el color del texto se eligen de forma independiente. La transparencia alfa corresponde a captura de una fuente web; no vuelve transparentes las ventanas nativas de Mac o Windows. Las acciones OSC nuevas requieren un receptor Timer actualizado.

La opción **Timer instalado (OSC)** conserva el protocolo y las conexiones existentes. El módulo no instala ni modifica la aplicación de Mac. La aceptación física con Windows, Companion y un teléfono en una red local sin internet continúa pendiente; las pruebas automáticas no la sustituyen.

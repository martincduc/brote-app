# Brote

Jardin de habitos para iOS, construido con React, Vite y Capacitor. Puedes crear,
editar, completar y eliminar habitos; el progreso se guarda en el dispositivo.

## Desarrollo web

```bash
npm install
npm run dev
```

## Exportar a App Store Connect

Requisitos: macOS, Xcode instalado y una cuenta de Apple Developer.

```bash
npm install
npm run cap:sync
npm run cap:open:ios
```

En Xcode, abre `App` en el proyecto `ios/App`, configura el equipo de firma en
**Signing & Capabilities**, revisa el identificador `com.brote.habitos` y usa
**Product > Archive** para subir la app a App Store Connect.

Para probar directamente en un iPhone conectado:

```bash
npm run cap:run:ios
```
# Brote · jardin de habitos vivos

App mobile de habitos donde cada habito es una planta: crece, florece o se marchita segun su racha y su consistencia reciente. No hay checkbox: se riega arrastrando la planta hacia arriba.

## Correr en VS Code

Requisitos: Node.js 18 o superior.

```bash
cd brote-app
npm install
npm run dev
```

Abre http://localhost:5173. Vite tambien imprime una URL de red: abrela desde tu telefono (mismo Wi-Fi) para probar los gestos con dedos reales.

Extensiones recomendadas de VS Code: ESLint, Prettier, ES7+ React snippets.

## Estructura

```
src/
  App.jsx                marco del telefono, ruteo entre pantallas, pinch-to-zoom-out, chips de demo
  useGarden.js           estado del jardin + persistencia en localStorage
  data.js                habitos semilla, vinculos de raices, posiciones del grafo
  theme.js               temas de ambiente, vitalidad, color de hoja
  styles.css             reset, fuentes, keyframes, layout responsive
  components/
    GardenScreen.jsx     pantalla 01 - jardin (cielo, semana, plantas, hibernacion), perfil, tutorial
    RootsScreen.jsx      pantalla 02 - raices (grafo SVG animado + leyenda)
    Plant.jsx            una planta: gesto de riego, tallo, hojas, brote, onda
    StatusBar.jsx        barra de estado simulada
    ProfileSetup.jsx     configuracion inicial local, sin credenciales
    WelcomeTutorial.jsx  tutorial de uso y primer habito
```

## Conceptos clave

**Vitalidad** (theme.js): 45% racha (tope 21 dias) + 55% consistencia de los ultimos 7 dias. Determina altura del tallo, cantidad y tamano de hojas, saturacion del verde e inclinacion (las descuidadas se doblan, nunca se regana al usuario).

**Clima de la semana**: el promedio de vitalidad elige el tema. floreciendo > 0.68, estable > 0.42, nublado por debajo. Cambia cielo, luz, nubosidad y color del suelo con transiciones de 1.2 s.

**Riego**: arrastrar 42 px o mas hacia arriba sobre una planta (WATER_THRESHOLD en Plant.jsx). Aparece la gota, luego onda expansiva y crecimiento.

**Raices**: boton "Ver raices" o pinch con dos dedos hacia adentro. Los vinculos viven en EDGES (data.js); w controla grosor y velocidad del flujo.

**Hibernacion**: boton de luna. Luciernagas, plantas apagadas y cierre del dia en vez de notificaciones.

## Estado actual

- Reemplazar localStorage por una API o SQLite.
- Alta, edicion, completado y eliminacion de habitos.
- Frecuencia configurable de 1 a 7 dias por semana y porcentaje basado en objetivos reales.
- Programar la hibernacion con la hora real del dispositivo.
- Para app nativa: portar a Expo con react-native-gesture-handler, reanimated y react-native-svg. La logica de theme.js, data.js y useGarden.js se reutiliza tal cual.

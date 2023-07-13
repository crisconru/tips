# Node-Red

[Node-Red](https://nodered.org/) es una herramienta low-code pensada para programar flujos dirigidos por eventos.

- [Documentación oficial](https://nodered.org/docs/)
- [Foro](https://discourse.nodered.org/) para preguntar dudas
- [Node-Red Library](https://flows.nodered.org/) para buscar componentes, flujos y colecciones
- [Github](https://github.com/node-red)
- [Docker Hub](https://hub.docker.com/r/nodered/node-red/)

En una arquitectura IoT de 3 capas puede encajar muy bien en la capa Fog. Aunque hoy en día la tecnología avanza tan rápido
que perfectamente podría moverse a la capa Edge.

Node-Red es un servicio Javascript, donde puedes inyectar eventos o generarlos, hacer algo con ese evento,
y generar otros hacia afuera. Por ejemplo:

- Leer un sensor, procesar su información y mandarla a otro sitio.
- Recibir una petición web, procesarla y devolver el resultado.
- ...

Cualquier cosa que se te pueda imaginar. La gracia está en que es una herramienta que mediante bloques, te permite
definir y visualizar esos flujos de los eventos.

## Crear componentes

Mirar aquí -> [link](./custom-components/custom-components.md)

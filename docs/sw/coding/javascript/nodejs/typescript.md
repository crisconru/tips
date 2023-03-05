# TypeScript

Siempre que puedas, usa TypeScript, ya que aporta muchísimo más que trabajar con
JavaScript.

La mayoría de ejemplos que vas a encontrar trataré que esten en TypeScript.

## TypeScript en NodeJS

### Deps en tu proyecto

1. `typescript`: El lenguaje
2. `@types/node`: Los tipos de Node para que los sepa TypeScript.
3. `ts-node-dev`: Para poder tener hot module reload, HMR, sin usar el típico `nodemon`.

``` bash
npm i -D typescript @types/node ts-node-dev
```

### Crear el tsconfig

``` bash
tsc --init
```

### Ejecutar ficheros

``` bash
ts-node-dev <fichero.ts>
```

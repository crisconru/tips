# Python

Esto es solo una forma de desarrollar con Python muy opinionada. Si tienes otra, probablemente pueda ser mejor que esta, pero esta es la mía hasta ahora.

## Entorno de Desarrollo

Para trabajar con Python te recomiendo que uses una de estas dos opciones:

1. Virtualenvwrapper + Pyenv + Poetry
2. Docker

Para la opción 1 ve a [Entornos Virtuales](entornos_virtuales.md "Explicación de como son los entornos virtuales de Python")

La opción 2 la comentaré en el futuro.

## Dependencias de desarrollo

Yo uso:

- [flake8](https://flake8.pycqa.org/en/latest/) como linter de Python.
- [mypy](http://mypy-lang.org/) como linter de tipado.
- [black](https://black.readthedocs.io/en/stable/) para el formateado de código.

???+ tips "SonarLint"
    [sonarlint](https://www.sonarsource.com/products/sonarlint/) lo uso a través de la extensión de VSCode, y es un linter que te avisa sobre smells y buenas prácticas.

    Es un plus para la seguiridad de tu código.

## IDE

VSCode

1. Instalar las extensiones:

    - [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
    - [python snippets](https://marketplace.visualstudio.com/items?itemName=frhtylcn.pythonsnippets)
    - [Python Type Hint](https://marketplace.visualstudio.com/items?itemName=njqdev.vscode-python-typehint)
    - [SonarLint](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode)
    - [Test Adapter Converter](https://marketplace.visualstudio.com/items?itemName=ms-vscode.test-adapter-converter)

2. Habilitar el linting en VSCode así como los linters

    ``` json title=".vscode/json"
    {
        "python.linting.enabled": true,
        "python.linting.flake8Enabled": true,
        "python.linting.mypyEnabled": true,
    }
    ```

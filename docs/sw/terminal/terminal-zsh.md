# La shell de tus sueños

Vamos a instalar y configurar ese fantástico shell que es ZSH

## ZSH

Abrimos la terminal y lo instalamos  
`sudo apt install zsh`  

## Oh My ZSH

1. Descargarmos el script de la utilidad que le va a aportar todo su valor. El script se llama **install.sh**  
`wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh`  
2. Le damos permisos de ejecución  
`chmod a+x install.sh`  
3. Instalamos el script  
`sh install.sh`  
4. Cambiamos la shell a zsh. Si en el paso anterior, después de instalar todo, al final en el prompt nos pide un password y lo hemos introducido correctamente, lo más probable es que ya se haya cambiado la shell y te puede ahorrar este paso.  
`chsh -s 'which zsh'`  
5. Reiniciar la consola  
`source ~/.zshrc`  

## Configurar Oh My ZSH

Abrir el fichero **.zshrc** con el editor que más te guste  
`scratch-text-editor ~/.zshrc`  

### Plugins

Sobre la línea 54 tenemos algo asi como  
`plugins=(git)`  
Lo único que hay que hacer es ir añadiéndole todos los plugins que quieras ponerle y que esten contenidos en la carpeta **~/.oh-my-zsh/plugins/**. Los plugins se añaden simplemente con un espacio y el nombre al lado (no uses comillas). En mi caso como programo en python uso los siguientes plugins  
`plugins=(git python pip virtualenvwrapper autopep8 pep8)`  
Todos los plugins oficiales están comentados [aquí](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins). El que más me ha llamado la atención es el [plugin de Chuck Norris](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins#chucknorris)  
Una vez terminado, guardamos, cerramos el editor y recargamos la shell  
`source ~/.zshrc`  

### Themes

Lo que le da el aspecto chachi son los temas, y están en la carpeta **~/.oh-my-zsh/themes/**. Aquí están recogidos todos [los temas oficiales con capturas](https://github.com/robbyrussell/oh-my-zsh/wiki/Themes). Yo suelo usar el tema **bira**, aunque a veces uso el **agnoster** con modificaciones.  
Bien pues para poner un tema, abrimos el fichero **~/.zshrc** y en la linea 10 aproximadamente tendremos algo asi como  
`ZSH_THEME="robbyrussell"`  
Simplemente ponemos el que más nos guste  
`ZSH_THEME="bira"`  
Cerramos el editor y reiniciamos la shell  
`source ~/.zshrc`  

### TEMA AGNOSTER TUNEADO  

El tema [agnoster](https://github.com/robbyrussell/oh-my-zsh/wiki/Themes) es muy muy bonito, pero para usarlo hay que tunear ciertas cosas.  

1. Para comprobar que rula tienes que metes estos comandos en la shell
  `echo "\ue0b0 \u00b1 \ue0a0 \u27a6 \u2718 \u26a1 \u2699"`  
  Debería de salir algo así  
  ![unicode icons](https://gist.githubusercontent.com/agnoster/3712874/raw/characters.png)  
  Si no sale, debes instalar las [fuentes Powerline](https://github.com/powerline/fonts)  

  ``` bash
  git clone https://github.com/powerline/fonts.git --depth=1
  cd fonts
  chmod a+x install.sh
  sh install.sh
  cd ..
  sudo rm -R fonts
  ```

2. Una vez sabemos que el tema va a funcionar, lo elegimos en el archivo **~/.zshrc**  
  `ZSH_THEME="agnoster"`  
3. Faltan dos pasos que son opcionales. A mi me ocurre que el **agnoster** no viene preparado para introducir comandos en una linea nueva (cosa que si hace el **bira** por ejemplo). Si tu **agnoster** ya trae esta funcionalidad o no la quieres poner, salta al paso **4**. Si no, tienes que editar el fichero **~/.oh-my-zsh/themes/agnoster**.  
  `gedit ~/.oh-my-zsh/themes/agnoster.zsh-theme`  
  El fichero debe de quedar como [aquí](https://gist.github.com/nweddle/e456229c0a773c32d37b). Si no quieres copiar sin saber que has hecho, sigue leyendo.  
  En la última función, **build_prompt** tendremos algo así  

  ``` bash
  ## Main prompt
  build_prompt() {
    RETVAL=$?
    prompt_status
    prompt_virtualenv
    prompt_context
    prompt_dir
    prompt_git
    prompt_hg
    prompt_end
  }
  ```

  Antes del `prompt_end` tienes que añadirle un `prompt_newline`, osea que quedaría así  

  ``` bash
  ## Main prompt
  build_prompt() {
    RETVAL=$?
    prompt_status
    prompt_virtualenv
    prompt_context
    prompt_dir
    prompt_git
    prompt_hg
    prompt_newline
    prompt_end
  }
  ```

  Pero falta por definir la funcion nueva que has añadido, así que encima  del `## Main prompt` añade lo siguiente  

  ``` bash
  # Newline
  # Add new line to the prompt
  prompt_newline() {
    if [[ -n $CURRENT_BG ]]; then
      echo -n " %{%k%F{$CURRENT_BG}%}$SEGMENT_SEPARATOR
  %{%k%F{$CURRENT_BG}%}$SEGMENT_SEPARATOR"
    else
      echo -n " %{%k%}"
    fi

    echo -n " %{%f%}"
    CURRENT_BG=''
  }
  ```

4. En este punto vamos a añadirle la fecha y hora (un **timestamp**). Para ello, en el fichero del punto anterior **~/.oh-my-zsh/themes/agnoster.zsh-theme** y en el último comando, que es algo asi como  
  `PROMPT='%{%f%b%k%}$(build_prompt) '`  
  Hay que añadirle delante esto  
  `%D{%f/%m/%y}|%D{%L:%M:%S}`  
  La referencia sobre esta utilidad la saqué de [aquí](https://superuser.com/a/1207412). Al final el último comando acaba quedando así  
  `PROMPT='%D{%f/%m/%y}|%D{%L:%M:%S}%{%f%b%k%}$(build_prompt) '` 
5. Por último, recarga la shell  
  `source ~/.zshrc`  

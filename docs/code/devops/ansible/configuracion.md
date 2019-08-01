# Configuración

Todo está autodocumentado en el fichero de configuración global `/etc/ansible/ansible.cfg`:

* Contiene valores por defecto.
* Configuración de escalar permisos.
* Opciones de OpenSSH.
* Opciones de SELinux.
* Configuración de [Ansible Galaxy](https://galaxy.ansible.com/).

La priorización de busqueda de archivos de configuración es:

1. Variable de entorno `ANSIBLE_CONFIG`.
2. Fichero locales `ansible.cfg` y `.ansible.cfg`.
3. Fichero global `/etc/ansible/ansible.cfg`.

## Windows

Info oficial -> [aquí](https://github.com/ansible/ansible/blob/devel/examples/scripts/ConfigureRemotingForAnsible.ps1).

Para poder ser usado en máquinas Windows hace falta:

* En la máquina con Ansible:
    * Instalar pywinrm -> `pip install pywinrm`.
    * Definir `connection` al valor `winrm` -> `-c winrm`.
* En la máquina Windows:
    * Tener `PowerShell 3.0` o superior.
    * Habilitar control remoto con el script [ConfigureRemotingForAnsible.ps1](https://github.com/ansible/ansible/blob/devel/examples/scripts/ConfigureRemotingForAnsible.ps1) desde la web de Ansible.
    * Habilitar puerto `5986`.
* Ignorar certificado SSL -> `ansible_winrm_server_cert_validation=ignore`.

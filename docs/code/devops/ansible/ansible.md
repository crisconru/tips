# Ansible

Ansible es una herramienta de configuración de equipos (por decirlo muy resumidamente). Lo que hace es, a través de SSH, configurar equipos remotos. Estos equipos remotos no necesitan tener un agente / cliente de Ansible, solo SSH y poder usar sudo.

## Instalación

```bash
sudo apt install ansible
# El siguiente comando es para ver que está instalado correctamente
ansible --version
```

Si no lo detectara, haría falta lo siguiente

```bash
sudo apt install software-properties-common
sudo apt-add-repository ppa:ansible/ansible
sudo apt update && sudo apt install -y ansible
```

## Configuración

* `/etc/ansible` -> Carpeta con los ficheros de configuración:
    * `/etc/ansible/ansible.cfg` -> Configuración.
    * `/etc/ansible/hosts` -> Inventario de equipos administrados.

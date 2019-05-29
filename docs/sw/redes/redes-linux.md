# REDES

## Redes WiFi's

Para ver las redes WiFi disponibles usamos el comando

`sudo iw dev wlan0 scan | grep SSID`

## Escanear dispositivos dentro de una red

Primero instalamos nmap

`sudo apt install nmap`

Después comprobamos con ifconfig que IP tenemos y que máscara de red

`sudo ifconfig`

Mi IP es 192.168.1.132 y la máscara de red es 255.255.255.0 (24 bits). Luego uso este comando para ver los dispositivos en mi red

`sudo nmap -sP 192.168.1.0/24`

## Redireccionamiento del Tráfico -> IPTables

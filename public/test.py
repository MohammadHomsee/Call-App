import socket
import threading


ip_server = ""
port = 12000
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind((ip_server, port))
server.listen(5)
if len(ip_server) >= 1:
    print(f"[*] Server running!, listening on, {ip_server}:{port}")
else:
    ip_server = socket.gethostbyname(socket.gethostname())
    print(f"[*] Server running!, listening on", ip_server, ":", port)
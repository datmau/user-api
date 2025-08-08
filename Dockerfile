# Usa una imagen base ligera de Alpine Linux.
FROM alpine:latest

# Instala shadow para la gestión de contraseñas.
RUN apk add --no-cache shadow

# 1. Crea primero el usuario 'appuser'
RUN adduser -D -s /bin/bash appuser

# 2. Después de crear el usuario, establece la contraseña.
# La contraseña es 'bdUs3cur3'. 🚨 CÁMBIALA por una más segura en producción.
RUN echo 'appuser:bdUs3cur3' | chpasswd

# Establece el directorio de trabajo.
WORKDIR /home/appuser

# Cambia al usuario 'appuser'.
USER appuser

# Comando de entrada por defecto para el contenedor.
CMD ["/bin/bash"]
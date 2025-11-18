#!/bin/sh
# Script para esperar a que PostgreSQL esté listo y luego ejecutar Spring Boot

DB_HOST=${DB_HOST:-postgres}

echo "=== Esperando a que PostgreSQL esté listo ==="
echo "DB_HOST: $DB_HOST"
echo "Esperando 10 segundos para que PostgreSQL se inicialice completamente..."

# Esperar un tiempo razonable para que PostgreSQL esté listo
# El depends_on con healthcheck ya asegura que PostgreSQL esté saludable
# pero agregamos un pequeño delay adicional por seguridad
sleep 10

echo "=== Iniciando aplicación Spring Boot ==="
exec java -jar app.jar

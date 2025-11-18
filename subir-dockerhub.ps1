# Script para construir y subir imágenes a Docker Hub
# Uso: .\subir-dockerhub.ps1 -DockerUser "tu-usuario" -Version "v1.0.0"

param(
    [Parameter(Mandatory=$true)]
    [string]$DockerUser,
    
    [Parameter(Mandatory=$false)]
    [string]$Version = "latest"
)

Write-Host "=== Configuración ===" -ForegroundColor Cyan
Write-Host "Usuario Docker Hub: $DockerUser" -ForegroundColor White
Write-Host "Versión: $Version" -ForegroundColor White
Write-Host ""

# Verificar que Docker está corriendo
Write-Host "=== Verificando Docker ===" -ForegroundColor Yellow
try {
    docker ps | Out-Null
    Write-Host "✅ Docker está corriendo" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker no está corriendo. Por favor inicia Docker Desktop." -ForegroundColor Red
    exit 1
}

# Construir imágenes
Write-Host "`n=== Construyendo imágenes ===" -ForegroundColor Yellow
docker-compose build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al construir las imágenes" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Imágenes construidas exitosamente" -ForegroundColor Green

# Etiquetar imágenes
Write-Host "`n=== Etiquetando imágenes ===" -ForegroundColor Yellow

# Servidor
Write-Host "Etiquetando servidor3dae..." -ForegroundColor White
docker tag empresariales3-servidor3dae:latest "$DockerUser/servidor3dae:latest"
if ($Version -ne "latest") {
    docker tag empresariales3-servidor3dae:latest "$DockerUser/servidor3dae:$Version"
}

# Cliente
Write-Host "Etiquetando cliente3react..." -ForegroundColor White
docker tag empresariales3-cliente3react:latest "$DockerUser/cliente3react:latest"
if ($Version -ne "latest") {
    docker tag empresariales3-cliente3react:latest "$DockerUser/cliente3react:$Version"
}

Write-Host "✅ Imágenes etiquetadas" -ForegroundColor Green

# Iniciar sesión en Docker Hub
Write-Host "`n=== Iniciando sesión en Docker Hub ===" -ForegroundColor Yellow
Write-Host "Por favor ingresa tus credenciales de Docker Hub:" -ForegroundColor White
docker login

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al iniciar sesión en Docker Hub" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Sesión iniciada exitosamente" -ForegroundColor Green

# Subir imágenes
Write-Host "`n=== Subiendo imágenes a Docker Hub ===" -ForegroundColor Yellow

# Servidor
Write-Host "Subiendo servidor3dae:latest..." -ForegroundColor White
docker push "$DockerUser/servidor3dae:latest"

if ($Version -ne "latest") {
    Write-Host "Subiendo servidor3dae:$Version..." -ForegroundColor White
    docker push "$DockerUser/servidor3dae:$Version"
}

# Cliente
Write-Host "Subiendo cliente3react:latest..." -ForegroundColor White
docker push "$DockerUser/cliente3react:latest"

if ($Version -ne "latest") {
    Write-Host "Subiendo cliente3react:$Version..." -ForegroundColor White
    docker push "$DockerUser/cliente3react:$Version"
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al subir las imágenes" -ForegroundColor Red
    exit 1
}

Write-Host "`n✅ ¡Imágenes subidas exitosamente a Docker Hub!" -ForegroundColor Green
Write-Host "`nPuedes ver tus imágenes en:" -ForegroundColor Cyan
Write-Host "  - https://hub.docker.com/r/$DockerUser/servidor3dae" -ForegroundColor White
Write-Host "  - https://hub.docker.com/r/$DockerUser/cliente3react" -ForegroundColor White


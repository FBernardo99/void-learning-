
@echo off
title Void Learning - Inicializador

cd /d "%~dp0"

echo Iniciando o Void Learning...
start "" cmd /k "npm.cmd run dev"

timeout /t 5 /nobreak >nul

start "" "http://localhost:5173/dashboard"

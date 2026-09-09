#!/usr/bin/env bash
cd "$(dirname "$0")"
echo "SuiSui Xatspace iniciado en http://127.0.0.1:8000"
echo "Presiona Ctrl+C para detenerlo."
python3 -m http.server 8000

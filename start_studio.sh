#!/bin/bash

echo "🚀 Starte Rezaemotion Video Studio Pipeline..."

# 1. Python Server starten (im Hintergrund)
echo "Starte LTX-2.3 API Server (Port 8000)..."
source venv/bin/activate
python api/ai/ltx_server.py &
PYTHON_PID=$!

# 2. Vite Frontend starten
echo "Starte Dashboard (Port 3000)..."
npm run dev &
VITE_PID=$!

echo ""
echo "✅ Pipeline läuft!"
echo "👉 Dashboard: http://localhost:3000/admin/studio"
echo "👉 KI API: http://localhost:8000"
echo ""
echo "Drücke CTRL+C um das Studio zu beenden."

# Warten auf Beendigung, dann beide Prozesse killen
trap "echo 'Beende Studio...'; kill $PYTHON_PID $VITE_PID; exit" SIGINT SIGTERM
wait

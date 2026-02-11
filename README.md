Il sandbox di cic-kit è un progetto di esempio e sperimentazione usato per sviluppare, testare e documentare i componenti della libreria cic-kit in isolamento, facilitando debug, validazione visiva e casi d’uso reali.


Prima volta (build + start):
docker compose -f docker-compose.emu.yml build --no-cache
Avvio successivo:
docker compose -f docker-compose.emu.yml up
Verifica container attivo:
docker compose -f docker-compose.emu.yml ps
Log in tempo reale:
docker compose -f docker-compose.emu.yml logs -f
Aprire una shell nel container:
docker compose -f docker-compose.emu.yml exec firebase-emulator bash
Stop:
docker compose -f docker-compose.emu.yml down
Stop + rimuovi volumi:
docker compose -f docker-compose.emu.yml down -v
"""
Deploy config — lê credenciais de deploy/.secrets ou de env vars.
NUNCA commite credenciais reais neste arquivo.
Crie deploy/.secrets com base em deploy/.secrets.example.
"""
import os

_secrets_path = os.path.join(os.path.dirname(__file__), ".secrets")
if os.path.exists(_secrets_path):
    with open(_secrets_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#"):
                k, _, v = line.partition("=")
                os.environ.setdefault(k.strip(), v.strip())

HOST = os.environ.get("VPS_HOST", "31.97.173.136")
USER = os.environ.get("VPS_USER", "root")
PASSWORD = os.environ.get("VPS_PASSWORD", "")

if not PASSWORD:
    raise SystemExit(
        "\n[ERRO] VPS_PASSWORD não definido.\n"
        "Crie deploy/.secrets com base em deploy/.secrets.example\n"
        "ou exporte: export VPS_PASSWORD=sua_senha\n"
    )

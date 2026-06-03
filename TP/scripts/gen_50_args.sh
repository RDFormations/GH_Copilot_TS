#!/usr/bin/env bash
# Génère une ligne d'arguments : 50 entiers distincts entre 1 et 100000
gen_50_args_line() {
  python3 - <<'PY'
import random
vals = random.sample(range(1, 100001), 50)
print(" ".join(map(str, vals)))
PY
}

import numpy as np
import matplotlib.pyplot as plt

# --- Parâmetros da linha de 50 Ω projetada na Questão 3(a) ---

# Constantes físicas
c0 = 3e8  # Velocidade da luz no vácuo (m/s)
mu0 = 4 * np.pi * 1e-7 # Permeabilidade do vácuo (H/m)

# Parâmetros da placa RT/Duroid e do cobre
er = 10.8         # Permissividade relativa do substrato
tand = 0.0028       # Tangente de perdas do dielétrico
h = 50 * 25.4e-6    # Espessura do substrato (m)
t = 0.35 * 25.4e-6  # Espessura do condutor de cobre (m)
sigma_c = 5.8e7     # Condutividade do cobre (S/m)

# Parâmetros calculados no projeto para Z0 = 50 Ω
W = 1.126e-3      # Largura da fita (m)
Z0 = 50           # Impedância característica (Ω)
e_eff = 7.186     # Permissividade efetiva calculada
u = c0 / np.sqrt(e_eff) # Velocidade de propagação na linha (m/s)

# --- Faixa de Frequência ---
# Array de frequência de 1 GHz a 20 GHz (200 pontos)
freq = np.linspace(1e9, 20e9, 200)

# --- Cálculo da Atenuação ---

# 1. Atenuação no Dielétrico (alpha_d)
# alpha_d é proporcional à frequência
# λ = u / f
lambda_g = u / freq
alpha_d = 27.3 * ( (e_eff - 1) * er ) / ( (er - 1) * e_eff ) * tand / lambda_g

# 2. Atenuação no Condutor (alpha_c)
# alpha_c depende da resistência superficial Rs, que varia com a frequência
# Primeiro, calcula-se a profundidade pelicular (skin depth) delta
delta = 1 / np.sqrt(np.pi * freq * mu0 * sigma_c)
# Em seguida, a resistência superficial Rs (usando a fórmula para espessura finita)
Rs = (1 / (sigma_c * delta)) / (1 - np.exp(-t / delta))
# Finalmente, calcula-se alpha_c
alpha_c = 8.686 * Rs / (W * Z0)

# 3. Atenuação Total
alpha_total = alpha_c + alpha_d

# --- Geração do Gráfico ---

# Configuração do plot
plt.style.use('seaborn-v0_8-whitegrid')
fig, ax = plt.subplots(figsize=(12, 8))

# Plot das curvas de atenuação
ax.plot(freq / 1e9, alpha_c, label='Atenuação no Condutor ($α_c$)')
ax.plot(freq / 1e9, alpha_d, label='Atenuação no Dielétrico ($α_d$)')
ax.plot(freq / 1e9, alpha_total, color='black', linewidth=2.5, linestyle='--', label='Atenuação Total ($α_{total}$)')

# Configurações de título e rótulos
ax.set_title('Atenuação vs. Frequência para a Linha de $Z_0=50Ω$', fontsize=16)
ax.set_xlabel('Frequência (GHz)', fontsize=12)
ax.set_ylabel('Atenuação (dB/m)', fontsize=12)

# Adiciona a legenda e o grid
ax.legend(fontsize=11)
ax.grid(True, which='both', linestyle='-', linewidth=0.5)

# Exibe o gráfico
plt.show()
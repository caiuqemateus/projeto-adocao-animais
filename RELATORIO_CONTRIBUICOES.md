# Relatório Quantitativo de Contribuições — Dados Reais do Git

> **Repositórios analisados:**
>
> - Backend: `projeto-adocao-animais` (Node.js / Express / Prisma / PostgreSQL)
> - Frontend: `novo-amigo` (Next.js / TypeScript / React)
>
> **Data de geração:** 22/03/2026
>
> **Metodologia:** todos os números extraídos com `git log`, `git shortlog`, `git numstat`, `git stat`. Arquivos `node_modules` e `package-lock` excluídos das contagens de linhas por serem gerados automaticamente. Autores identificados por e-mail para evitar colisão entre nomes locais e nomes do GitHub.

---

## 1. Tabela Geral de Contribuições

| Métrica                             | Luiz Reinã | Rafaela Saraiva | Giovanna Alves | João Pedro | TOTAL PROJETO |
| ----------------------------------- | ---------: | --------------: | -------------: | ---------: | ------------: |
| **Commits (Backend)**               |         15 |              18 |              7 |         39 |        **79** |
| **Commits (Frontend)**              |         66 |              42 |             19 |         28 |       **155** |
| **Commits TOTAL**                   |     **81** |          **60** |         **26** |     **67** |       **234** |
| **% dos commits do projeto**        |      34,6% |           25,6% |          11,1% |      28,6% |          100% |
| **Linhas adicionadas (BE)**         |      1.847 |             952 |            136 |        882 |         3.817 |
| **Linhas adicionadas (FE)**         |      9.671 |           6.066 |            683 |      1.881 |        18.301 |
| **Linhas adicionadas TOTAL**        | **11.518** |       **7.018** |        **819** |  **2.763** |    **22.118** |
| **% das linhas add. do projeto**    |      52,1% |           31,7% |           3,7% |      12,5% |          100% |
| **Linhas removidas (BE)**           |        405 |             305 |            107 |        655 |         1.472 |
| **Linhas removidas (FE)**           |      3.801 |           1.864 |            102 |      1.283 |         7.050 |
| **Linhas removidas TOTAL**          |  **4.206** |       **2.169** |        **209** |  **1.938** |     **8.522** |
| **Linhas totais (add + del)**       | **15.724** |       **9.187** |      **1.028** |  **4.701** |    **30.640** |
| **Arquivos únicos tocados (BE)**    |         37 |              15 |             11 |         47 |             — |
| **Arquivos únicos tocados (FE)**    |         66 |              93 |             18 |         48 |             — |
| **Arquivos únicos TOTAL**           |    **103** |         **108** |         **29** |     **95** |             — |
| **Média de linhas/commit**          |        194 |             153 |             40 |         70 |           131 |
| **Churn ratio (del ÷ add)**         |      36,5% |           30,9% |          25,5% |      70,2% |         38,5% |
| **Dias ativos (BE)**                |          6 |              10 |              5 |         15 |             — |
| **Dias ativos (FE)**                |         17 |              19 |             10 |         16 |             — |
| **Dias ativos TOTAL únicos**        |     **23** |          **29** |         **15** |     **31** |             — |
| **Primeiro commit**                 | 24/09/2025 |      24/09/2025 |     25/09/2025 | 25/09/2025 |    24/09/2025 |
| **Último commit**                   | 21/03/2026 |      20/03/2026 |     20/03/2026 | 17/03/2026 |    21/03/2026 |
| **Interações c/ arquivos críticos** |         24 |              62 |              9 |         44 |             — |

> _Arquivos críticos = padrão `auth|token|middleware|login|user|password|schema|seed|config|context|api` — cada aparição em numstat conta como uma interação._

---

## 2. Cronograma de Commits (por mês)

| Mês       |   Luiz | Rafaela | Giovanna |   João | **TOTAL** |
| --------- | -----: | ------: | -------: | -----: | --------: |
| Set/2025  |      1 |       7 |        2 |     10 |    **20** |
| Out/2025  |     39 |      25 |       12 |     43 |   **119** |
| Nov/2025  |      4 |      12 |        9 |     12 |    **37** |
| Mar/2026  |     37 |      16 |        3 |      2 |    **58** |
| **TOTAL** | **81** |  **60** |   **26** | **67** |   **234** |

> **Pico do projeto:** Outubro/2025 — 119 commits (50,9% de tudo em 1 mês)

### 2.1 Detalhe Backend

| Mês      | Luiz | Rafaela | Giovanna | João |
| -------- | ---: | ------: | -------: | ---: |
| Set/2025 |    1 |       7 |        2 |   10 |
| Out/2025 |    9 |       7 |        5 |   24 |
| Nov/2025 |    0 |       0 |        0 |    4 |
| Mar/2026 |    5 |       4 |        0 |    1 |

### 2.2 Detalhe Frontend

| Mês      | Luiz | Rafaela | Giovanna | João |
| -------- | ---: | ------: | -------: | ---: |
| Out/2025 |   30 |      18 |        7 |   19 |
| Nov/2025 |    4 |      12 |        9 |    8 |
| Mar/2026 |   32 |      12 |        3 |    1 |

---

## 3. Distribuição por Dia da Semana

| Dia        |   Luiz | Rafaela | Giovanna |   João | **TOTAL** |
| ---------- | -----: | ------: | -------: | -----: | --------: |
| Segunda    |      2 |      10 |        7 |      6 |    **25** |
| Terça      |      7 |       5 |        1 |      7 |    **20** |
| **Quarta** | **26** |  **17** |    **7** | **25** |    **75** |
| **Quinta** | **24** |  **19** |    **6** | **15** |    **64** |
| **Sexta**  |     18 |       8 |        3 |     14 |    **43** |
| Sábado     |      4 |       0 |        0 |      0 |     **4** |
| Domingo    |      0 |       1 |        2 |      0 |     **3** |
| **TOTAL**  | **81** |  **60** |   **26** | **67** |   **234** |

> **Dias de pico:** Quarta (75) e Quinta (64) = 59,4% de todos os commits do projeto.

---

## 4. Distribuição por Faixa Horária (horário local)

| Faixa         | Luiz | Rafaela | Giovanna | João | **TOTAL** |
| ------------- | ---: | ------: | -------: | ---: | --------: |
| 00h – 05h     |   10 |       0 |        0 |    0 |    **10** |
| 06h – 11h     |    9 |       0 |        0 |    0 |     **9** |
| **12h – 17h** |   30 |      59 |       24 |   67 |   **180** |
| 18h – 23h     |   32 |       1 |        2 |    0 |    **35** |

> **Padrão do projeto:** 77% dos commits no período 12h–17h. Exceção: Luiz trabalha também à noite (18h–23h = 39,5% dos seus commits) e de madrugada (00h–05h = 12,3%).

---

## 5. Tamanho dos Commits (distribuição)

| Threshold                                  |  Luiz | Rafaela | Giovanna |   João |
| ------------------------------------------ | ----: | ------: | -------: | -----: |
| **> 100 linhas**                           |    32 |      26 |        5 |     18 |
| **> 500 linhas**                           |     8 |       7 |        1 |      4 |
| **> 1.000 linhas**                         |     3 |       4 |        1 |      2 |
| **Maior commit (linhas)**                  | 1.431 |  5.859¹ |    1.673 | 2.131² |
| **Maior commit real (excl. scaffold/pkg)** | 1.431 |   2.052 |    1.673 |    579 |

> ¹ 5.859 = "Initial commit from Create Next App" (scaffold gerado automaticamente, não é código autoral).
> ² 2.131 linhas de João incluem deleção de `package-lock.json`; maior commit de código real = 579 linhas.

### 5.1 Maiores Commits por Autor

| Autor    | Repo | Linhas | Mensagem                                                           |
| -------- | ---- | -----: | ------------------------------------------------------------------ |
| Luiz     | FE   |  1.431 | "Remove unused animal pages and styles, refactor useAnimals hook…" |
| Luiz     | BE   |    346 | "adiciona middleware de verificação de token nas rotas de adoção"  |
| Rafaela  | BE   |  2.052 | Commit de limpeza (170 ins + 1.882 del)                            |
| Rafaela  | FE   |    992 | Implementação de componentes (875 ins + 117 del)                   |
| Giovanna | BE   |  1.673 | Seed data (1.663 ins + 10 del)                                     |
| Giovanna | FE   |    330 | Animais favoritos (323 ins + 7 del)                                |
| João     | FE   |    579 | 8 files changed (386 ins + 193 del)                                |
| João     | BE   |    372 | Endpoint Animal (172 ins + 200 del)                                |

---

## 6. Classificação de Commits por Tipo

> Classificados por correspondência de palavras-chave nas mensagens de commit.

| Tipo                                |      Luiz |   Rafaela |  Giovanna |      João | **TOTAL** |
| ----------------------------------- | --------: | --------: | --------: | --------: | --------: |
| **feat** (nova funcionalidade)      |        31 |        30 |        10 |        20 |    **91** |
| **fix** (correção de bug)           |         1 |         2 |         2 |         9 |    **14** |
| **refactor** (refatoração)          |        31 |         0 |         0 |         0 |    **31** |
| **improve** (melhoria visual/infra) |         6 |         5 |         0 |         4 |    **15** |
| **ruído/merge/noise**               |        12 |        23 |        14 |        34 |    **83** |
| **TOTAL**                           |    **81** |    **60** |    **26** |    **67** |   **234** |
| **% commits significativos**        | **85,2%** | **61,7%** | **46,2%** | **49,3%** | **64,5%** |

---

## 7. Perfis Individuais

---

### 7.1 Luiz Reinã

```
COMMITS
  Backend ..............  15  (18,5% dos seus commits)
  Frontend .............  66  (81,5%)
  TOTAL ................  81  (34,6% do projeto)

LINHAS DE CÓDIGO
  Adicionadas ....... 11.518  (+1.847 BE / +9.671 FE)
  Removidas ..........  4.206  (-405 BE / -3.801 FE)
  Modificadas total .. 15.724  (51,3% das linhas totais do projeto)
  Média por commit ...    194  linhas/commit
  Churn ratio ........  36,5%  (del ÷ add)

ARQUIVOS
  Únicos BE ............  37
  Únicos FE ............  66
  TOTAL únicos .........  103
  Interações críticas ..   24  (auth|token|login|api|config|context)

ATIVIDADE TEMPORAL
  Primeiro commit .... 24/09/2025
  Último commit ...... 21/03/2026
  Dias ativos BE .....   6
  Dias ativos FE .....  17
  Pico mensal ........ Out/2025 (39 commits) + Mar/2026 (37 commits)
  Dia preferido ...... Quarta (26 commits, 32,1%)
  Horário principal .. 18h–23h (32 commits, 39,5%) + 12h–17h (30 commits, 37%)

TAMANHO DE COMMITS
  > 100 linhas .......  32 commits
  > 500 linhas .......   8 commits
  > 1.000 linhas .....   3 commits
  Maior commit ....... 1.431 linhas (FE — refactor + remoção de páginas)

TIPOS DE COMMIT
  feat ................  31  (38,3%)
  refactor ............  31  (38,3%)
  improve .............   6  (7,4%)
  fix .................   1  (1,2%)
  ruído/merge .........  12  (14,8%)

TOP 10 ARQUIVOS MAIS TOCADOS (FE)
  nossos-animais/page.tsx ............  ×18
  page.tsx (raiz) ....................  ×12
  nossos-animais/styles.module.css ...  ×10
  page.module.css ....................  ×10
  AnimalCard/index.tsx ...............   ×6
  AnimalCard/styles.module.css .......   ×6
  Header/index.tsx ...................   ×6
  next.config.ts .....................   ×6
  nosso-time/page.tsx ................   ×6
  Carousel/styles.module.css .........   ×6
```

---

### 7.2 Rafaela Saraiva

```
COMMITS
  Backend ..............  18  (30,0% dos seus commits)
  Frontend .............  42  (70,0%)
  TOTAL ................  60  (25,6% do projeto)

LINHAS DE CÓDIGO
  Adicionadas ........  7.018  (+952 BE / +6.066 FE)
  Removidas ..........  2.169  (-305 BE / -1.864 FE)
  Modificadas total ..  9.187  (30,0% das linhas totais do projeto)
  Média por commit ...    153  linhas/commit
  Churn ratio ........  30,9%  (del ÷ add)

ARQUIVOS
  Únicos BE ............  15
  Únicos FE ............  93  (maior diversidade de arquivos FE do time)
  TOTAL únicos .........  108  (maior diversidade total do time)
  Interações críticas ..   62  (auth|token|login|api|config|context)

ATIVIDADE TEMPORAL
  Primeiro commit .... 24/09/2025
  Último commit ...... 20/03/2026
  Dias ativos BE .....  10
  Dias ativos FE .....  19
  Pico mensal ........ Out/2025 (25) / Nov/2025 (12) / Mar/2026 (16)
  Dia preferido ...... Quinta (19 commits, 31,7%)
  Horário principal .. 12h–17h (59 commits, 98,3%) — pico às 14h (11 commits)

TAMANHO DE COMMITS
  > 100 linhas .......  26 commits
  > 500 linhas .......   7 commits
  > 1.000 linhas .....   4 commits
  Maior commit real .. 2.052 linhas (BE — limpeza/seed) / 992 linhas (FE)

TIPOS DE COMMIT
  feat ................  30  (50,0%)
  improve .............   5  (8,3%)
  fix .................   2  (3,3%)
  refactor ............   0  (0,0%)
  ruído/merge .........  23  (38,3%)

TOP 10 ARQUIVOS MAIS TOCADOS (FE)
  cadastro/page.tsx ..................  ×14
  AuthContext.tsx ....................   ×8
  configuracoes/page.tsx .............   ×7
  cadastro/styles.module.css .........   ×7
  Header/styles.module.css ...........   ×6
  login/page.tsx .....................   ×6
  SideBar/index.tsx ..................   ×6
  SideBar/styles.module.css ..........   ×5
  configuracoes/styles.module.css ....   ×5
  login/styles.module.css ............   ×4
```

---

### 7.3 Giovanna Alves

```
COMMITS
  Backend ..............   7  (26,9% dos seus commits)
  Frontend .............  19  (73,1%)
  TOTAL ................  26  (11,1% do projeto)

LINHAS DE CÓDIGO
  Adicionadas ........    819  (+136 BE / +683 FE)
  Removidas ..........    209  (-107 BE / -102 FE)
  Modificadas total ..  1.028  (3,4% das linhas totais do projeto)
  Média por commit ...     40  linhas/commit
  Churn ratio ........  25,5%  (del ÷ add)

ARQUIVOS
  Únicos BE ............  11
  Únicos FE ............  18
  TOTAL únicos .........  29
  Interações críticas ..   9  (auth|token|login|api|config|context)

ATIVIDADE TEMPORAL
  Primeiro commit .... 25/09/2025
  Último commit ...... 20/03/2026
  Dias ativos BE .....   5
  Dias ativos FE .....  10
  Atividade BE ....... Set–Out/2025 apenas (sem commits BE após Out/2025)
  Dia preferido ...... Segunda (7 commits, 26,9%)
  Horário principal .. 12h–17h (24 commits, 92,3%) — pico às 14h

TAMANHO DE COMMITS
  > 100 linhas .......   5 commits
  > 500 linhas .......   1 commit
  > 1.000 linhas .....   1 commit
  Maior commit ....... 1.673 linhas (BE — seed.js, 1.663 ins + 10 del)
                         330 linhas (FE — animais favoritos, 323 ins + 7 del)

TIPOS DE COMMIT
  feat ................  10  (38,5%)
  fix .................   2  (7,7%)
  ruído/merge .........  14  (53,8%)

TOP ARQUIVOS MAIS TOCADOS (FE)
  sobre/page.tsx .......................  ×5
  page.tsx (raiz) ......................  ×4
  sobre/styles.module.css ..............  ×4
  cadastro/page.tsx ....................  ×2
  animais-favoritos/page.tsx ...........  ×2
  animais-favoritos/styles.module.css ..  ×2
```

---

### 7.4 João Pedro

```
COMMITS
  Backend ..............  39  (58,2% dos seus commits) — maior % BE do time
  Frontend .............  28  (41,8%)
  TOTAL ................  67  (28,6% do projeto)

LINHAS DE CÓDIGO
  Adicionadas ........  2.763  (+882 BE / +1.881 FE)
  Removidas ..........  1.938  (-655 BE / -1.283 FE)
  Modificadas total ..  4.701  (15,3% das linhas totais do projeto)
  Média por commit ...     70  linhas/commit
  Churn ratio ........  70,2%  (del ÷ add) — maior churn do time

ARQUIVOS
  Únicos BE ............  47  (maior cobertura BE do time)
  Únicos FE ............  48
  TOTAL únicos .........  95
  Interações críticas ..  44  (auth|token|login|api|config|schema|seed)

ATIVIDADE TEMPORAL
  Primeiro commit .... 25/09/2025
  Último commit ...... 17/03/2026
  Dias ativos BE .....  15  (maior do time no BE)
  Dias ativos FE .....  16
  Pico mensal ........ Out/2025 (43 commits = 64,2% do seu total)
  Dia preferido ...... Quarta (25 commits, 37,3%)
  Horário principal .. 12h–17h (67 commits, 100%) — TODOS no período diurno

TAMANHO DE COMMITS
  > 100 linhas .......  18 commits
  > 500 linhas .......   4 commits
  > 1.000 linhas .....   2 commits (incluem deleção de package-lock)
  Maior commit real .. 579 linhas (FE — 8 files, 386 ins + 193 del)
                         372 linhas (BE — 172 ins + 200 del, endpoint Animal)

TIPOS DE COMMIT
  feat ................  20  (29,9%)
  fix .................   9  (13,4%)
  improve .............   4  (6,0%)
  ruído/merge .........  34  (50,7%)

TOP ARQUIVOS MAIS TOCADOS
  [BE] teste/user.http ...............  ×10
  [BE] teste/animal.http .............  ×10
  [BE] controllers/Animal.js .........   ×9
  [BE] prisma/schema.prisma ..........   ×7
  [BE] routes/animal.js ..............   ×4
  [FE] page.tsx (raiz) ................   ×6
  [FE] ProductCard/index.tsx .........   ×5
  [FE] nossos-animais/page.tsx .......   ×5
  [FE] ProductCard/styles.module.css .   ×4
  [FE] Menu/index.tsx ................   ×4
```

---

## 8. Distribuição Backend vs Frontend (por Autor)

| Autor    | Commits BE | Commits FE |      % BE |  % FE | Linhas Add BE | Linhas Add FE | % Linhas BE | % Linhas FE |
| -------- | ---------: | ---------: | --------: | ----: | ------------: | ------------: | ----------: | ----------: |
| Luiz     |         15 |         66 |     18,5% | 81,5% |         1.847 |         9.671 |       16,1% |       83,9% |
| Rafaela  |         18 |         42 |     30,0% | 70,0% |           952 |         6.066 |       13,6% |       86,4% |
| Giovanna |          7 |         19 |     26,9% | 73,1% |           136 |           683 |       16,6% |       83,4% |
| **João** |     **39** |         28 | **58,2%** | 41,8% |           882 |         1.881 |   **31,9%** |       68,1% |

> João é o único membro com maioria de commits no backend. Os demais têm foco predominante no frontend.

---

## 9. Totais do Projeto

| Item                     |       Backend |      Frontend |                 **TOTAL** |
| ------------------------ | ------------: | ------------: | ------------------------: |
| Commits                  |            79 |           155 |                   **234** |
| Linhas adicionadas       |         3.817 |        18.301 |                **22.118** |
| Linhas removidas         |         1.472 |         7.050 |                 **8.522** |
| Linhas modificadas total |         5.289 |        25.351 |                **30.640** |
| Pico de commits/mês      | Out/2025 (45) | Out/2025 (74) |        **Out/2025 (119)** |
| Dia mais ativo           |   Quarta (38) |   Quinta (43) |   **Quarta (75 commits)** |
| Faixa horária dominante  |  12h–17h (39) | 12h–17h (141) | **12h–17h (180 commits)** |

---

## 10. Notas Metodológicas

| Item                             | Detalhe                                                                                                                                      |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Filtragem de node_modules**    | `Where-Object {$_.Line -notmatch "node_modules\|package-lock"}` aplicado em todos os `git numstat`                                           |
| **Commit João com node_modules** | Primeiro commit do BE incluía 5.321 arquivos e 1.010.218 linhas de node_modules — excluído integralmente                                     |
| **Initial commit (FE Rafaela)**  | "Initial commit from Create Next App" = scaffold gerado (5.859 linhas); computado no tamanho de commits, mas não representa código autoral   |
| **Aliases de autor**             | Luiz: `133376423@users.noreply.github.com`; Rafaela: `rafaela.saraiva100`; Giovanna: `gigisouza628`; João: `jao1311`                         |
| **"Arquivos únicos"**            | Arquivo modificado em 10 commits = 1 arquivo único na contagem                                                                               |
| **"Interações críticas"**        | Contagem de linhas em `git numstat` cujo caminho contém `auth\|token\|middleware\|login\|user\|password\|schema\|seed\|config\|context\|api` |
| **Churn ratio**                  | `linhas_removidas / linhas_adicionadas` — João (70,2%) reflete reescritas constantes nos endpoints e limpeza de arquivos gerados             |

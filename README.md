# Cloud4All — ache sua nuvem ideal por regra aberta

![HTML5](https://img.shields.io/badge/HTML5-e34f26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572b6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/Live-GitHub_Pages-121013?style=flat-square&logo=githubpages&logoColor=white)

Um único arquivo HTML que traduz "o que você quer fazer e quanto pode gastar" na nuvem certa: nome do serviço, faixa de preço em reais, nível de configuração e link oficial. São 124 serviços de 8 provedores, recomendação determinística e código aberto para auditar linha por linha.

Ver o site: https://kelvinoliveiracode.github.io/cloud4all/

## Problema / Por que existe

Escolher um serviço de nuvem exige inglês, jargão (instância, bucket, vCPU) e paciência para comparar tabelas de preço. Estudante, MEI e pequeno negócio sabem o que querem fazer, mas travam na terminologia, pagam caro demais por medo ou nunca saem do papel achando que nuvem é coisa de empresa grande. A Cloud4All existe para traduzir essa necessidade em uma opção concreta, sem cadastro e sem número inventado.

Resumo aceito no Connepi 2026 (IFPA).

## O que faz

- Recebe a área do negócio (hospedar site, rodar app ou API, banco de dados, guardar arquivos, analisar dados, rede e entrega, treinamento de IA) e a faixa de preço que cabe no bolso.
- Filtra os 124 serviços do catálogo por área interseção preço, refina por provedor, tipo de gratuidade (sempre grátis, grátis no começo, pago) e nível técnico de 1 a 5, e ordena por menor preço ou mais simples.
- Aponta o primeiro da fila como nuvem ideal e mostra o restante em tabela, com cada serviço verificado e o motivo de cada corte ("Como chegamos aqui").
- Se nada passa no filtro, diz que não há indicação honesta para aquele recorte, em vez de forçar uma má recomendação.
- Publica o catálogo como dado aberto (catalogo.json e llms.txt) para que qualquer chat de IA recomende sem instalar nada.
- Ensina vocabulário de nuvem sem jargão: camadas IaaS, PaaS e SaaS, analogias do dia a dia, mito ou verdade, glossário e quiz de 5 perguntas.

| Provedor | Serviços |
|---|---:|
| AWS | 34 |
| Azure | 29 |
| Google Cloud | 30 |
| Oracle Cloud | 8 |
| Cloudflare | 8 |
| DigitalOcean | 7 |
| Firebase | 4 |
| Google | 4 |
| Total | 124 |

## Stack

- HTML5, CSS3 e JavaScript vanilla. Tudo — estilo, catálogo e regra de recomendação — vive em um único arquivo index.html.
- Sem build, sem back-end, sem banco de dados e sem framework. A regra roda inteira no navegador e pode ser auditada linha por linha.
- Fontes: Archivo e IBM Plex Mono (Google Fonts).
- Hospedagem: GitHub Pages.
- Scripts auxiliares: gerar-json.mjs gera catalogo.json e llms.txt a partir do index.html; test.mjs valida a regra com 19 asserções em Node.

## Como funciona

A regra de recomendação é determinística e aberta:

1. área ∩ preço: mantém só serviços que atendem à área escolhida e cabem na faixa de preço.
2. refinamento: provedor, tipo de gratuidade e nível máximo de configuração.
3. ordenação: menor preço ou mais simples; empate resolve pelo outro critério.
4. primeira da fila: nuvem ideal. O restante aparece na tabela da aba Filtros.
5. "Como chegamos aqui" lista cada um dos 124 serviços verificados e por que ficou dentro ou fora.

O modo Iniciante restringe o catálogo ao que se configura por telas guiadas. Toda decisão fica visível: o filtro não é caixa preta.

## Como rodar

- Duplo clique em index.html. Funciona direto no navegador, sem servidor.
- Ou sirva localmente:

```
python -m http.server 8080
```

e abra http://localhost:8080.

- Para regenerar catalogo.json e llms.txt a partir do index.html:

```
node gerar-json.mjs
```

- Para validar a regra de recomendação:

```
node test.mjs
```

(test.mjs roda 19 asserções: cobertura total dos 124 serviços, ausência de duplicatas, filtros de provedor, gratuidade, nível e ordem.)

## Estrutura do projeto

- index.html: página única com estilo, catálogo de 124 serviços e regra de recomendação.
- catalogo.json: catálogo aberto (provedor, área, faixa de preço, gratuidade, nível, links oficiais); gerado por gerar-json.mjs.
- llms.txt: resumo para agentes de IA no formato llmstxt.org; gerado por gerar-json.mjs.
- gerar-json.mjs: extrai o catálogo do index.html e escreve catalogo.json e llms.txt.
- test.mjs: valida a regra filtrar com 19 asserções em Node.
- .nojekyll: desativa o processamento do Jekyll no GitHub Pages.

## Trade-offs e decisões

- Preço em snapshot (out/2026), não em tempo real: evita depender de API de provedor e de chave de API; o usuário confirma sempre na página oficial ligada em cada linha.
- Um único arquivo HTML: fácil de auditar e de hospedar em qualquer lugar; o catálogo fica acoplado ao código.
- Recomendação determinística sem IA no site: resultado previsível e auditável. A IA entra opcionalmente, lendo catalogo.json + llms.txt no chat do usuário.
- Preços aproximados em reais para uso pequeno (conversão aproximada de USD 1 ≈ R$ 5,50); valores podem não refletir promoções nem uso real.
- Não cadastra usuário nem armazena dados: a escolha de tema claro/escuro fica no localStorage do navegador.

## Limitações conhecidas

- Não consulta preço em tempo real (snapshot de out/2026).
- Não configura o serviço escolhido sozinho.
- Não indica nada quando nada passa no filtro (resposta honesta vazia).
- Preços são aproximados para uso pequeno; confirme na página oficial de cada serviço.
- O index.html funciona offline, mas os links oficiais exigem internet.

## Licença

Distribuído sob a licença MIT. Consulte o arquivo de licença do repositório para detalhes.

## Autor

Kelvin Oliveira

- GitHub: https://github.com/KelvinOliveiraCode
- LinkedIn: https://www.linkedin.com/in/kelvin-oliveira-code/
- Portfólio: https://kelvinoliveiracode.github.io/portfolio/

# DREX Project Sample
Este é um projeto de exemplo que demonstra a integração com a plataforma DREX, utilizando o framework Hardhat para interagir com contratos inteligentes. Este projeto serve como ponto de partida para compreender a integração com a plataforma. É essencial ressaltar que a compreensão e utilização das interfaces fornecidas pelo Banco Central são de responsabilidade de cada instituição financeira.

## Dependências

### Dependências de Desenvolvimento
```bash
@nomicfoundation/hardhat-ignition-ethers: ^0.15.1
@nomicfoundation/hardhat-toolbox: ^5.0.0
hardhat: ^2.22.3
ts-node: ^10.9.2
typescript: ^5.4.5
```

### Dependências de Produção
```bash
@nomicfoundation/hardhat-ignition: ^0.15.1
@nomicfoundation/ignition-core: ^0.15.1
@openzeppelin/contracts: ^5.0.2
dotenv: ^16.4.5
```

## Scripts
No projeto, o Ignition desempenha um papel crucial ao simplificar e automatizar o processo de implantação de contratos inteligentes. Aqui estão algumas maneiras pelas quais o Ignition está auxiliando:

- Gerenciamento de Compilação: O Ignition automatiza a compilação dos contratos inteligentes, garantindo que estejam prontos para implantação em diferentes redes EVM based.
- Preparação de Transações: Ele cuida da preparação das transações de implantação, o que inclui a definição de parâmetros necessários e a geração de transações assinadas prontas para serem enviadas para a rede.
- Implantação Simples: Com um único comando, podemos implantar facilmente os contratos em várias redes Ethereum. O Ignition lida com os detalhes técnicos e burocráticos, simplificando o processo para os desenvolvedores..
- Eficiência no Desenvolvimento: Ao automatizar tarefas repetitivas e complexas relacionadas à implantação de contratos, o Ignition permite que os desenvolvedores se concentrem mais no desenvolvimento de funcionalidades e menos na configuração de implantação.


Realiza o deploy do contrato utilizando o Hardhat.
```bash
npm run node ignition:hardhat <ignition module>
```

Exemplo:
```bash
npm run node ignition:besu SwapTwoStepsModule
``` 

## Visualizar hierarquia de dependencia dos contratos

O Hardhat Ignition vem com uma funcionalidade integrada para visualizar o processo de implantação de um módulo no projeto Drex Project Sample. Esta ferramenta é útil para depuração e verificação da execução do plano de implantação do módulo.

Para visualizar um módulo no contexto do Drex Project Sample, você pode usar o comando npm run hierarchy. Isso gera um relatório HTML detalhado que ilustra visualmente o processo de implantação.

### O relatório inclui:

- Um resumo dos contratos que serão implantados.
- Uma visão geral das chamadas de contrato que serão feitas.
- Um gráfico de dependências que mostra os módulos e objetos Future envolvidos no processo.
- Por padrão, o comando npm run hierarchy usará o módulo que possui o maior número de dependências como ponto de partida. Se desejar visualizar um módulo específico, você pode fornecer o caminho para esse módulo como argumento.

Por exemplo:
```bash
npx hardhat ignition visualize ./ignition/modules/SeuModulo.ts
```

Isso abrirá o relatório gerado no navegador padrão do seu sistema.

Para mais informações sobre como visualizar seu módulo no contexto do projeto Drex Project Sample, consulte a documentação oficial do Hardhat Ignition.


## Módulos do Ignition
Os seguintes módulos de Ignition estão disponíveis:
```bash
./ignition/modules/AddressDiscoveryModule.ts
./ignition/modules/RealDigitalDefaultAccountModule.ts
./ignition/modules/RealDigitalDefaultEnableModule.ts
./ignition/modules/RealDigitalModule.ts
./ignition/modules/SwapOneStepModule.ts
./ignition/modules/SwapTwoStepsModule.ts
```
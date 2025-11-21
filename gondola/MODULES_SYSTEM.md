# Sistema de Módulos e Coordenadas

## Estrutura de Módulos

Os módulos da gôndola são segmentados **logicamente** por suas larguras, criando intervalos exclusivos no eixo X:

- **Módulo 1**: X = 0 a 50
- **Módulo 2**: X = 51 a 150

### ⚠️ Importante: Separação Lógica vs Visual

**No Backend/Lógica:**
- Módulos são separados por intervalos de coordenadas X
- Cada produto pertence a um módulo específico baseado em sua coordenada X
- A identificação do módulo é feita através dos intervalos (`xStart` - `xEnd`)

**No Frontend/Visual:**
- **NÃO há separação visual entre módulos**
- Todas as shelves de todos os módulos são exibidas de forma contínua
- A gôndola é renderizada como uma estrutura única e ininterrupta
- O componente `Module` não é usado na renderização

```typescript
// Frontend: shelves contínuas
gondola.modules.forEach(module => {
  module.shelves.forEach(shelf => {
    // Renderiza todas as shelves sequencialmente
  })
})
```

### Representação Visual

```
FRONTEND (Visual Unificado):
┌─────────────────────────────────────────────────────────┐
│  GÔNDOLA                                                │
│  ┌─────────────────────────────────────────────────┐   │
│  │ SHELF 1 (20 colunas: 10 do Mod1 + 10 do Mod2) │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │ SHELF 2 (20 colunas: 10 do Mod1 + 10 do Mod2) │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │ SHELF 3 (20 colunas: 10 do Mod1 + 10 do Mod2) │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘

BACKEND (Lógica por Intervalos):
┌──────────────────────────┬──────────────────────────────┐
│  MÓDULO 1 (X: 0-50)      │  MÓDULO 2 (X: 51-150)       │
│  ┌──────┐ ┌──────┐       │  ┌──────┐ ┌──────┐          │
│  │Shelf1│ │Shelf2│       │  │Shelf1│ │Shelf2│          │
│  │10col │ │10col │       │  │10col │ │10col │          │
│  └──────┘ └──────┘       │  └──────┘ └──────┘          │
│  ┌──────┐                │  ┌──────┐                   │
│  │Shelf3│                │  │Shelf3│                   │
│  │10col │                │  │10col │                   │
│  └──────┘                │  └──────┘                   │
└──────────────────────────┴──────────────────────────────┘

Visualmente: 3 shelves com 20 colunas cada
Backend: 2 módulos, cada um com 3 shelves de 10 colunas
```

**Como funciona a unificação:**
- Shelf visual 1 = Colunas da Shelf 1 do Módulo 1 + Colunas da Shelf 1 do Módulo 2
- Shelf visual 2 = Colunas da Shelf 2 do Módulo 1 + Colunas da Shelf 2 do Módulo 2
- Shelf visual 3 = Colunas da Shelf 3 do Módulo 1 + Colunas da Shelf 3 do Módulo 2

### Função `getUnifiedShelves()`

Esta função é responsável por unificar as shelves de todos os módulos:

```typescript
const unifiedShelves = getUnifiedShelves();
// Retorna array com 3 shelves unificadas
// Cada shelf unificada contém:
// - upperColumns: array com 20 colunas (10 do Mod1 + 10 do Mod2)
// - lowerColumns: array com 20 colunas (10 do Mod1 + 10 do Mod2)
```

O usuário vê visualmente **3 shelves contínuas**, mas internamente:
- As primeiras 10 colunas pertencem ao Módulo 1 (produtos com X entre 0-50)
- As próximas 10 colunas pertencem ao Módulo 2 (produtos com X entre 51-150)

## Coordenadas dos Produtos

Cada produto possui coordenadas absolutas:

### Coordenada X (xPosition)
- Calculada automaticamente baseada no **intervalo do módulo** e na **posição da coluna**
- A largura do módulo é dividida igualmente entre as colunas
- Fórmula: `xPosition = módulo.xStart + (índiceColuna × larguraPorColuna) + (larguraPorColuna / 2)`

**Exemplo para Módulo 1 (0-50) com 10 colunas:**
- Coluna 0: X ≈ 2.5
- Coluna 1: X ≈ 7.5
- Coluna 2: X ≈ 12.5
- ...
- Coluna 9: X ≈ 47.5

### Coordenada Y (yPosition)
- Representa a altura do produto na coluna
- Valor = número de produtos já existentes na coluna
- Incrementa a cada produto adicionado (0, 1, 2, 3...)

## Identificação de Produtos por Módulo

Use a função `getModuleByXPosition(xPosition)` para identificar a qual módulo um produto pertence:

```typescript
const { getModuleByXPosition } = useGondola();

// Exemplo: produto com xPosition = 25
const module = getModuleByXPosition(25);
// Retorna o Módulo 1 (intervalo 0-50)

// Exemplo: produto com xPosition = 100
const module2 = getModuleByXPosition(100);
// Retorna o Módulo 2 (intervalo 51-150)
```

### Como os Produtos São Armazenados

Embora visualmente a gôndola seja contínua, no backend cada produto é armazenado em sua respectiva shelf, que pertence a um módulo específico:

```typescript
// Estrutura de dados:
gondola
  └── modules[]
        └── module (xStart: 0, xEnd: 50)
              └── shelves[]
                    └── shelf
                          ├── upperStack
                          │     └── columns[]
                          │           └── products[] (cada produto tem xPosition entre 0-50)
                          └── lowerStack
                                └── columns[]
                                      └── products[] (cada produto tem xPosition entre 0-50)
```

## Filtragem de Produtos por Módulo

Para obter todos os produtos de um módulo específico:

```typescript
const productsInModule = (moduleId: string) => {
  const module = gondola.modules.find(m => m.id === moduleId);
  if (!module) return [];
  
  const products: IProduct[] = [];
  
  module.shelves.forEach(shelf => {
    // Produtos da stack superior
    shelf.upperStack.columns.forEach(column => {
      products.push(...column.products);
    });
    
    // Produtos da stack inferior
    shelf.lowerStack.columns.forEach(column => {
      products.push(...column.products);
    });
  });
  
  return products;
};
```

## Adicionando Novos Módulos

Para adicionar um novo módulo com intervalo customizado:

```typescript
const createModule = (xStart: number, xEnd: number): IModule => ({
  id: uuidv4(),
  shelves: Array.from({ length: 3 }).map(createShelf),
  xStart,
  xEnd,
});

// Exemplo: Módulo 3 com intervalo 151-200
const module3 = createModule(151, 200);
```

## Validações Importantes

1. **Intervalos não devem se sobrepor**: Certifique-se de que os intervalos de módulos não se sobreponham
2. **Coordenadas X são automáticas**: Ao adicionar um produto, a coordenada X é calculada automaticamente baseada no módulo da shelf
3. **Identificação é por intervalo**: Um produto pertence ao módulo se `module.xStart ≤ product.xPosition ≤ module.xEnd`
4. **Separação visual vs lógica**: O frontend exibe as shelves de forma contínua, mas o backend mantém a separação lógica por módulos

## Fluxo de Trabalho Backend ↔ Frontend

### Quando o Backend Enviar Dados:

```typescript
// Backend retorna produtos com coordenadas X absolutas
{
  id: "abc123",
  name: "Produto A",
  xPosition: 25,  // Backend garante que isso está entre 0-50 (Módulo 1)
  yPosition: 2,
  color: "#9c27b0"
}
```

### No Frontend:

1. **Recebe os dados**: produtos já vêm com `xPosition` e `yPosition`
2. **Renderiza continuamente**: todas as shelves são exibidas sem separação
3. **Identifica módulo quando necessário**: usa `getModuleByXPosition(produto.xPosition)`

```typescript
// Para filtrar ou agrupar por módulo no frontend
const productsInModule1 = allProducts.filter(
  product => product.xPosition >= 0 && product.xPosition <= 50
);
```

### Quando o Frontend Adicionar um Produto:

1. **Usuário clica em uma coluna**: `addProductToColumn(shelfId, stackType, columnId)`
2. **Sistema calcula coordenadas**: baseado no intervalo do módulo da shelf
3. **Produto é criado**: com `xPosition` já dentro do intervalo correto do módulo
4. **Backend pode confiar**: que o `xPosition` está correto para aquele módulo

Isso garante que:
- ✅ O frontend pode exibir uma gôndola visualmente contínua
- ✅ O backend consegue identificar produtos por módulo através das coordenadas X
- ✅ Não há dependência visual da estrutura de módulos
- ✅ A lógica de negócio de módulos permanece intacta
